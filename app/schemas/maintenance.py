import datetime
from typing import Literal
from pydantic import BaseModel, Field, ConfigDict


class MaintenanceHistorySchema(BaseModel):
    """Pydantic validation schema for past maintenance records."""

    date: datetime.date = Field(..., description="Date when the maintenance event occurred.")
    issue: str = Field(
        ..., min_length=1, description="Description of the maintenance issue."
    )
    status: Literal["Pending", "Approved", "In Progress", "Resolved"] = Field(
        ..., description="Execution status of the maintenance task."
    )

    model_config = ConfigDict(
        frozen=True,
        extra="forbid",
        json_schema_extra={
            "example": {
                "date": "2026-05-15",
                "issue": "Replaced standard compressor filter",
                "status": "Resolved",
            }
        },
    )
