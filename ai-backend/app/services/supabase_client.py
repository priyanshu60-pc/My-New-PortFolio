"""
Supabase client singleton.
Uses the service_role (secret) key — bypasses RLS.
NEVER expose this key to the browser or frontend code.
"""
import logging
from functools import lru_cache

from supabase import Client, create_client

from app.config import get_settings

logger = logging.getLogger(__name__)


@lru_cache
def get_supabase() -> Client:
    settings = get_settings()
    client = create_client(settings.supabase_url, settings.supabase_secret_key)
    logger.info("Supabase client initialized")
    return client
