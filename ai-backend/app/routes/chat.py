"""
POST /api/chat — main chat endpoint with SSE streaming.

Request body:
  {
    "message": "string (required, 1-2000 chars)",
    "conversation_id": "uuid string (optional — omit for new conversation)"
  }

Response: SSE stream
  data: {"type": "init",    "conversation_id": "uuid"}
  data: {"type": "delta",   "content": "word "}
  data: {"type": "done",    "content": ""}
  data: {"type": "error",   "content": "message"}
"""
import json
import logging
from typing import AsyncGenerator, Optional

from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field, field_validator
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.agent.agent import run_agent
from app.config import get_settings

logger = logging.getLogger(__name__)
router = APIRouter(tags=["chat"])
limiter = Limiter(key_func=get_remote_address)

settings = get_settings()


# ── Request / Response models ──────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    conversation_id: Optional[str] = Field(default=None)

    @field_validator("message")
    @classmethod
    def strip_message(cls, v: str) -> str:
        stripped = v.strip()
        if not stripped:
            raise ValueError("Message cannot be empty or whitespace only")
        return stripped

    @field_validator("conversation_id")
    @classmethod
    def validate_conv_id(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and len(v.strip()) == 0:
            return None
        return v


# ── SSE helpers ────────────────────────────────────────────────────────────────
def sse_event(data: dict) -> str:
    return f"data: {json.dumps(data)}\n\n"


async def stream_chat(request: ChatRequest) -> AsyncGenerator[str, None]:
    try:
        async for chunk in run_agent(
            message=request.message,
            conversation_id=request.conversation_id,
        ):
            yield sse_event(chunk)
    except Exception as e:
        logger.error(f"Stream error: {e}", exc_info=True)
        yield sse_event({"type": "error", "content": "Something went wrong. Please try again."})


# ── Route ──────────────────────────────────────────────────────────────────────
@router.post("/chat")
@limiter.limit(settings.rate_limit)
async def chat(request: Request, body: ChatRequest):
    return StreamingResponse(
        stream_chat(body),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",  # disable nginx buffering
            "Connection": "keep-alive",
        },
    )
