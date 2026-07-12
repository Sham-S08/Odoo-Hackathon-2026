from typing import List
from pydantic import BaseModel, Field, ConfigDict
from app.schemas.asset import AssetSchema
from app.schemas.maintenance import MaintenanceHistorySchema


class AIRequestSchema(BaseModel):
    """Pydantic validation schema for the AI insights request body."""

    asset: AssetSchema = Field(
        ..., description="Details of the asset to evaluate."
    )
    maintenance_history: List[MaintenanceHistorySchema] = Field(
        default_factory=list,
        description="Historical log of past maintenance requests for this asset.",
    )

    model_config = ConfigDict(
        frozen=True,
        extra="forbid",
        json_schema_extra={
            "example": {
                "asset": {
                    "id": 42,
                    "asset_tag": "AST-HVAC-001",
                    "name": "Server Room AC Unit",
                    "category": "HVAC",
                    "age": 36,
                    "condition": "Fair",
                },
                "maintenance_history": [
                    {
                        "date": "2026-05-15",
                        "issue": "Replaced standard compressor filter",
                        "status": "Resolved",
                    }
                ],
            }
        },
    )
