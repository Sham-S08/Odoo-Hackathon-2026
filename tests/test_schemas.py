import pytest
from pydantic import ValidationError
from datetime import date
from app.schemas import (
    AssetSchema,
    MaintenanceHistorySchema,
    AIRequestSchema,
    AIResponseSchema,
    ErrorResponseSchema,
)


def test_asset_schema_validation() -> None:
    """Validates AssetSchema behavior with valid and invalid values."""
    # Valid asset data
    valid_data = {
        "id": 1,
        "asset_tag": "AST-01",
        "name": "Chiller",
        "category": "HVAC",
        "age": 12,
        "condition": "Excellent",
    }
    asset = AssetSchema(**valid_data)
    assert asset.id == 1
    assert asset.condition == "Excellent"

    # Invalid ID
    with pytest.raises(ValidationError):
        AssetSchema(**{**valid_data, "id": 0})

    # Invalid Age
    with pytest.raises(ValidationError):
        AssetSchema(**{**valid_data, "age": -1})

    # Invalid Condition
    with pytest.raises(ValidationError):
        AssetSchema(**{**valid_data, "condition": "Old"})


def test_maintenance_schema_validation() -> None:
    """Validates MaintenanceHistorySchema behavior with status limits."""
    valid_data = {
        "date": "2026-07-01",
        "issue": "Oil change",
        "status": "Resolved",
    }
    record = MaintenanceHistorySchema(**valid_data)
    assert record.date == date(2026, 7, 1)
    assert record.status == "Resolved"

    # Invalid Status
    with pytest.raises(ValidationError):
        MaintenanceHistorySchema(**{**valid_data, "status": "Done"})


def test_ai_request_schema_validation() -> None:
    """Validates request nesting and default values."""
    valid_payload = {
        "asset": {
            "id": 1,
            "asset_tag": "AST-01",
            "name": "Chiller",
            "category": "HVAC",
            "age": 12,
            "condition": "Excellent",
        }
    }
    req = AIRequestSchema(**valid_payload)
    assert req.asset.name == "Chiller"
    assert req.maintenance_history == []


def test_ai_response_schema_validation() -> None:
    """Validates response range and recommendation enums."""
    valid_response = {
        "recommendation": "Repair",
        "asset_health": 85,
        "reason": "Stable operation history.",
    }
    res = AIResponseSchema(**valid_response)
    assert res.recommendation == "Repair"
    assert res.asset_health == 85

    # Out of bounds health score
    with pytest.raises(ValidationError):
        AIResponseSchema(**{**valid_response, "asset_health": 101})

    # Invalid recommendation
    with pytest.raises(ValidationError):
        AIResponseSchema(**{**valid_response, "recommendation": "Replace"})
