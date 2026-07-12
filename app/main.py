import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging_config import setup_logging
from app.core.exceptions import register_exception_handlers
from app.api.v1.endpoints import health
from app.api.v1.router import api_router

# Initialize system logging formatters
setup_logging()
logger = logging.getLogger("app.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Context manager for startup and shutdown event lifecycles."""
    logger.info(f"{settings.APP_NAME} started on http://{settings.HOST}:{settings.PORT}")
    logger.info(f"Swagger API documentation available at http://{settings.HOST}:{settings.PORT}/docs")
    yield


# Initialize the main FastAPI application with metadata and lifespan hook
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Asynchronous predictive maintenance evaluation and asset health analysis engine.",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# Configure Cross-Origin Resource Sharing (CORS)
# Allowing standard headers and methods for integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register global HTTP and validation exception handlers
register_exception_handlers(app)

# Include the root health router directly (GET /health)
app.include_router(health.router)

# Include the V1 Router with the version prefix (GET/POST /api/v1/...)
app.include_router(api_router, prefix="/api/v1")

