from typing import Literal
from pydantic import BaseModel, Field, ConfigDict


class AssetSchema(BaseModel):
    """Pydantic validation schema for core asset attributes."""

    id: int = Field(
        ..., gt=0, description="Unique database ID of the asset. Must be greater than 0."
    )
    asset_tag: str = Field(
        ..., min_length=1, description="Unique business identifier tag of the asset."
    )
    name: str = Field(
        ..., min_length=1, description="Human-readable name of the asset."
    )
    category: str = Field(
        ..., min_length=1, description="Category/type class of the asset."
    )
    age: int = Field(
        ...,
        ge=0,
        description="Age of the asset in months. Must be greater than or equal to 0.",
    )
    condition: Literal["Excellent", "Good", "Fair", "Poor"] = Field(
        ..., description="Current physical condition of the asset."
    )

    # Configuration block for Pydantic v2 validation settings
    model_config = ConfigDict(
        frozen=True,
        extra="forbid",
        json_schema_extra={
            "example": {
                "id": 42,
                "asset_tag": "AST-HVAC-001",
                "name": "Server Room AC Unit",
                "category": "HVAC",
                "age": 36,
                "condition": "Fair",
            }
        },
    )
