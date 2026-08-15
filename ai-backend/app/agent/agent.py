"""
Core agent logic.

Flow:
  1. Get or create conversation in Supabase
  2. Load message history
  3. Build system prompt with knowledge base
  4. Stream OpenAI response (with function-calling support)
  5. Handle tool calls (send_contact_message)
  6. Persist assistant message
  7. Yield SSE chunks upstream
"""
import json
import logging
import re
from datetime import datetime, timezone
from typing import AsyncGenerator, Optional

from openai import AsyncOpenAI

from app.agent.instructions import build_system_prompt
from app.agent.tools import TOOLS
from app.config import get_settings
from app.knowledge.base import build_knowledge_context
from app.services.contact import save_contact_message
from app.services.conversation import (
    create_conversation,
    get_messages,
    save_message,
    update_conversation_timestamp,
)

logger = logging.getLogger(__name__)
settings = get_settings()

_client: Optional[AsyncOpenAI] = None


def get_openai_client() -> AsyncOpenAI:
    global _client
    if _client is None:
        _client = AsyncOpenAI(api_key=settings.openai_api_key)
    return _client


def _is_valid_email(email: str) -> bool:
    return bool(re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email))


async def run_agent(
    message: str,
    conversation_id: Optional[str] = None,
) -> AsyncGenerator[dict, None]:
    """
    Main agent generator. Yields SSE-ready dicts.
    """
    # ── 1. Conversation setup ──────────────────────────────────────────────────
    if not conversation_id:
        conversation_id = await create_conversation()
        logger.info(f"Created new conversation: {conversation_id}")
    else:
        logger.info(f"Resuming conversation: {conversation_id}")

    # Emit conversation ID first so the frontend can persist it
    yield {"type": "init", "conversation_id": conversation_id}

    # ── 2. Load history ────────────────────────────────────────────────────────
    history = await get_messages(conversation_id)

    # ── 3. Save user message ───────────────────────────────────────────────────
    await save_message(conversation_id, "user", message)

    # ── 4. Build prompt ────────────────────────────────────────────────────────
    knowledge = build_knowledge_context()
    current_date = datetime.now(timezone.utc).strftime("%B %d, %Y")
    system_prompt = build_system_prompt(knowledge, current_date)

    messages = [{"role": "system", "content": system_prompt}]
    # Append history (cap at last 20 messages to stay within context)
    for h in history[-20:]:
        messages.append({"role": h["role"], "content": h["content"]})
    # Add current user message
    messages.append({"role": "user", "content": message})

    # ── 5. Stream from OpenAI ──────────────────────────────────────────────────
    client = get_openai_client()
    full_response = ""
    tool_call_accumulator: dict = {}

    try:
        stream = await client.chat.completions.create(
            model=settings.openai_model,
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
            max_tokens=settings.openai_max_tokens,
            temperature=settings.openai_temperature,
            stream=True,
        )

        async for chunk in stream:
            delta = chunk.choices[0].delta if chunk.choices else None
            if delta is None:
                continue

            # ── Text delta ─────────────────────────────────────────────────────
            if delta.content:
                full_response += delta.content
                yield {"type": "delta", "content": delta.content}

            # ── Tool call accumulation ─────────────────────────────────────────
            if delta.tool_calls:
                for tc in delta.tool_calls:
                    idx = tc.index
                    if idx not in tool_call_accumulator:
                        tool_call_accumulator[idx] = {
                            "id": tc.id or "",
                            "name": tc.function.name or "" if tc.function else "",
                            "arguments": "",
                        }
                    if tc.id:
                        tool_call_accumulator[idx]["id"] = tc.id
                    if tc.function:
                        if tc.function.name:
                            tool_call_accumulator[idx]["name"] = tc.function.name
                        if tc.function.arguments:
                            tool_call_accumulator[idx]["arguments"] += tc.function.arguments

    except Exception as e:
        logger.error(f"OpenAI stream error: {e}", exc_info=True)
        yield {"type": "error", "content": "I'm having trouble connecting right now. Please try again."}
        return

    # ── 6. Handle tool calls ───────────────────────────────────────────────────
    if tool_call_accumulator:
        for idx, tc in tool_call_accumulator.items():
            if tc["name"] == "send_contact_message":
                try:
                    args = json.loads(tc["arguments"])
                    name = args.get("name", "").strip()
                    email = args.get("email", "").strip()
                    msg_content = args.get("message", "").strip()

                    # Validate
                    if not name or not email or not msg_content:
                        tool_result = "Missing required fields. Please provide name, email, and message."
                    elif not _is_valid_email(email):
                        tool_result = "The email address doesn't look valid. Please double-check it."
                    else:
                        await save_contact_message(name, email, msg_content, conversation_id)
                        tool_result = f"Message saved successfully from {name} ({email})."
                        logger.info(f"Contact message saved for conversation {conversation_id}")

                except (json.JSONDecodeError, KeyError) as e:
                    logger.error(f"Tool call parse error: {e}")
                    tool_result = "There was an error processing the contact message."

                # Second OpenAI call with tool result to get final response
                messages.append({
                    "role": "assistant",
                    "tool_calls": [{
                        "id": tc["id"],
                        "type": "function",
                        "function": {"name": tc["name"], "arguments": tc["arguments"]},
                    }],
                })
                messages.append({
                    "role": "tool",
                    "tool_call_id": tc["id"],
                    "content": tool_result,
                })

                try:
                    follow_up = await client.chat.completions.create(
                        model=settings.openai_model,
                        messages=messages,
                        max_tokens=512,
                        temperature=settings.openai_temperature,
                        stream=True,
                    )
                    async for chunk in follow_up:
                        delta = chunk.choices[0].delta if chunk.choices else None
                        if delta and delta.content:
                            full_response += delta.content
                            yield {"type": "delta", "content": delta.content}
                except Exception as e:
                    logger.error(f"Follow-up stream error: {e}", exc_info=True)
                    yield {"type": "delta", "content": "\n\nYour message has been saved successfully!"}

    # ── 7. Persist assistant response ──────────────────────────────────────────
    if full_response:
        await save_message(conversation_id, "assistant", full_response)
        await update_conversation_timestamp(conversation_id)

    yield {"type": "done", "content": ""}
