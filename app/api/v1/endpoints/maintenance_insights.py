import logging
from fastapi import APIRouter, Depends, status
from app.schemas import AIRequestSchema, AIResponseSchema
from app.services.maintenance_service import MaintenanceInsightsService

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post(
    "/maintenance-insights",
    response_model=AIResponseSchema,
    status_code=status.HTTP_200_OK,
    summary="Generate Maintenance Insights",
    description=(
        "Evaluates the health score of an asset based on its age, condition, and maintenance "
        "history, and suggests whether to Repair or Retire."
    ),
)
async def create_maintenance_insights(
    payload: AIRequestSchema,
    service: MaintenanceInsightsService = Depends(),
) -> AIResponseSchema:
    """POST endpoint to process maintenance insights requests."""
    logger.info(
        f"POST /maintenance-insights received request for asset ID {payload.asset.id}."
    )

    # Call the service layer to get evaluation results
    response = await service.get_insights(payload)

    logger.info(
        f"POST /maintenance-insights returning response for asset ID {payload.asset.id}."
    )
    return response
