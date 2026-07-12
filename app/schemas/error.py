from typing import Any, Dict
from pydantic import BaseModel, Field, ConfigDict


class ErrorResponseSchema(BaseModel):
    """Pydantic validation schema for error responses."""

    error: bool = Field(
        default=True,
        description="Indicator flag that the request encountered an error.",
    )
    message: str = Field(
        ..., min_length=1, description="Human-readable description of the error."
    )
    details: Dict[str, Any] = Field(
        default_factory=dict,
        description="Additional context, sub-errors, or input validation fields that caused the failure.",
    )

    model_config = ConfigDict(
        frozen=True,
        extra="forbid",
        json_schema_extra={
            "example": {
                "error": True,
                "message": "Validation failed",
                "details": {
                    "asset.age": "ensure this value is greater than or equal to 0"
                },
            }
        },
    )
