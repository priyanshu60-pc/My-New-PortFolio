"""
Contact message service.

Table: contact_messages
  - id, name, email, message, status (default 'new'), conversation_id, created_at
"""
import logging
from typing import Optional

from app.services.supabase_client import get_supabase

logger = logging.getLogger(__name__)


async def save_contact_message(
    name: str,
    email: str,
    message: str,
    conversation_id: Optional[str] = None,
) -> str:
    """
    Insert a contact message into the contact_messages table.
    Returns the new row's UUID.
    """
    supabase = get_supabase()

    payload = {
        "name": name.strip(),
        "email": email.strip().lower(),
        "message": message.strip(),
        "status": "new",
    }
    if conversation_id:
        payload["conversation_id"] = conversation_id

    result = supabase.table("contact_messages").insert(payload).execute()
    row_id = result.data[0]["id"]
    logger.info(f"Contact message saved: id={row_id}, from={email}")
    return row_id
