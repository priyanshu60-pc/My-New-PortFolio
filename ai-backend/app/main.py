"""
FastAPI application entry point.
- CORS configured from environment
- SlowAPI rate limiting
- Routers mounted under /api
"""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.config import get_settings
from app.routes import health, chat

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── Rate limiter ───────────────────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    logger.info("Starting Priyanshu AI backend")
    logger.info(f"Model: {settings.openai_model}")
    logger.info(f"Allowed origins: {settings.origins_list}")
    yield
    logger.info("Shutting down Priyanshu AI backend")


# ── App ────────────────────────────────────────────────────────────────────────
def create_app() -> FastAPI:
    settings = get_settings()

    app = FastAPI(
        title="Priyanshu Portfolio AI",
        description="AI agent backend for Priyanshu Chakraborty's portfolio",
        version="1.0.0",
        docs_url="/docs",
        redoc_url=None,
        lifespan=lifespan,
    )

    # CORS — only allow configured origins
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.origins_list,
        allow_credentials=False,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Accept"],
    )

    # Rate limiting
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

    # Routers
    app.include_router(health.router, prefix="/api")
    app.include_router(chat.router, prefix="/api")

    return app


app = create_app()
