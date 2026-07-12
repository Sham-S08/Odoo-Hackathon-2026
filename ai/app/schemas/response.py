from typing import Literal
from pydantic import BaseModel, Field, ConfigDict


class AIResponseSchema(BaseModel):
    """Pydantic validation schema for the AI insights success response."""

    recommendation: Literal["REPAIR", "RETIRE"] = Field(
        ..., description="Recommended action for the asset: REPAIR or RETIRE."
    )
    asset_health: int = Field(
        ...,
        ge=0,
        le=100,
        description="Normalized health score percentage of the asset. Range: 0 to 100.",
    )
    reason: str = Field(
        ...,
        min_length=1,
        description="Clear, user-friendly text explaining the rationale for the recommendation.",
    )

    model_config = ConfigDict(
        frozen=True,
        extra="forbid",
        json_schema_extra={
            "example": {
                "recommendation": "REPAIR",
                "asset_health": 82,
                "reason": "Good condition with low repair frequency.",
            }
        },
    )
