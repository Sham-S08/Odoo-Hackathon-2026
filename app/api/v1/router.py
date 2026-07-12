from fastapi import APIRouter
from app.api.v1.endpoints import maintenance_insights

# Initialize the v1 router
api_router = APIRouter()

# Include routing for AI maintenance insights
api_router.include_router(
    maintenance_insights.router, prefix="/ai", tags=["AI Insights"]
)

