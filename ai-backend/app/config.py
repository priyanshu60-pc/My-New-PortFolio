"""
Configuration — loaded from .env via pydantic-settings.
All secrets stay server-side only.
"""
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # OpenAI
    openai_api_key: str
    openai_model: str = "gpt-4o-mini"
    openai_max_tokens: int = 1024
    openai_temperature: float = 0.7

    # Supabase
    supabase_url: str
    supabase_secret_key: str  # service_role key — never expose to browser

    # CORS — comma-separated origins
    allowed_origins: str = "http://localhost:5173,http://localhost:4173"

    # Rate limiting
    rate_limit: str = "10/minute"

    @property
    def origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
