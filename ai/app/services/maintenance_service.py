import logging
from app.schemas import AIRequestSchema, AIResponseSchema
from app.services.rule_engine import RuleEngine

logger = logging.getLogger(__name__)


class MaintenanceInsightsService:
    """Service class handling the business logic for asset maintenance evaluation."""

    def __init__(self) -> None:
        self.rule_engine = RuleEngine()

    async def get_insights(self, payload: AIRequestSchema) -> AIResponseSchema:
        """Evaluates asset metrics and returns repair/retire insights.

        Invokes the rule engine to determine health score and recommendations.
        Catches exceptions to fail silently with a fallback response.
        """
        logger.info(
            f"Service layer called for asset ID: {payload.asset.id} (Tag: {payload.asset.asset_tag})"
        )

        try:
            # Delegate computation to the RuleEngine
            recommendation, health_score, reason = self.rule_engine.evaluate_asset(payload)

            response = AIResponseSchema(
                recommendation=recommendation,
                asset_health=health_score,
                reason=reason,
            )
            logger.info(
                f"Service layer returning evaluation outcome: {response.recommendation} (Health: {response.asset_health})"
            )
            return response

        except Exception as exc:
            # Catch exceptions and log details to prevent core ERP blocks
            logger.error(
                f"Rule Engine failed for asset ID {payload.asset.id} due to: {str(exc)}",
                exc_info=True
            )

            # Safe fallback output
            fallback_response = AIResponseSchema(
                recommendation="REPAIR",
                asset_health=50,
                reason="AI recommendation temporarily unavailable. Manual review recommended.",
            )
            logger.warning(
                f"Service layer returning safety fallback: {fallback_response.recommendation} (Health: {fallback_response.asset_health})"
            )
            return fallback_response

