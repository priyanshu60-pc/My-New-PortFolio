"""
Conversation and message CRUD operations against Supabase.

Tables used:
  - conversations: id, created_at, updated_at
  - messages: id, conversation_id, role, content, created_at
"""
import logging
from datetime import datetime, timezone
from typing import Optional

from app.services.supabase_client import get_supabase

logger = logging.getLogger(__name__)


async def create_conversation() -> str:
    """Create a new conversation row and return its UUID."""
    supabase = get_supabase()
    result = supabase.table("conversations").insert({}).execute()
    return result.data[0]["id"]


async def get_messages(conversation_id: str) -> list[dict]:
    """
    Fetch all messages for a conversation, ordered by created_at ASC.
    Returns list of {"role": ..., "content": ...} dicts.
    """
    supabase = get_supabase()
    result = (
        supabase.table("messages")
        .select("role, content, created_at")
        .eq("conversation_id", conversation_id)
        .order("created_at", desc=False)
        .execute()
    )
    return result.data or []


async def save_message(conversation_id: str, role: str, content: str) -> str:
    """Insert a message row. role must be 'user' or 'assistant'."""
    assert role in ("user", "assistant"), f"Invalid role: {role}"
    supabase = get_supabase()
    result = (
        supabase.table("messages")
        .insert({
            "conversation_id": conversation_id,
            "role": role,
            "content": content,
        })
        .execute()
    )
    return result.data[0]["id"]


async def update_conversation_timestamp(conversation_id: str) -> None:
    """Update the updated_at field on the conversation."""
    supabase = get_supabase()
    supabase.table("conversations").update(
        {"updated_at": datetime.now(timezone.utc).isoformat()}
    ).eq("id", conversation_id).execute()
