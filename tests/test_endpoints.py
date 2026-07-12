from fastapi.testclient import TestClient


def test_maintenance_insights_success_full(client: TestClient) -> None:
    """Verifies that a valid payload returns the mocked response successfully."""
    payload = {
        "asset": {
            "id": 1,
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
    # Test prefix-less route /api/ai/maintenance-insights
    response = client.post("/api/ai/maintenance-insights", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["recommendation"] == "Repair"
    assert data["asset_health"] == 72
    assert "reason" in data

    # Test versioned route /api/v1/ai/maintenance-insights
    response_v1 = client.post("/api/v1/ai/maintenance-insights", json=payload)
    assert response_v1.status_code == 200


def test_maintenance_insights_success_empty_history(client: TestClient) -> None:
    """Verifies default list factory on maintenance_history."""
    payload = {
        "asset": {
            "id": 1,
            "asset_tag": "AST-HVAC-001",
            "name": "Server Room AC Unit",
            "category": "HVAC",
            "age": 36,
            "condition": "Fair",
        }
    }
    response = client.post("/api/ai/maintenance-insights", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["recommendation"] == "Repair"


def test_maintenance_insights_invalid_asset_id(client: TestClient) -> None:
    """Asserts that negative or zero asset IDs fail schema validation."""
    payload = {
        "asset": {
            "id": 0,  # Invalid id <= 0
            "asset_tag": "AST-01",
            "name": "Chiller",
            "category": "HVAC",
            "age": 12,
            "condition": "Excellent",
        }
    }
    response = client.post("/api/ai/maintenance-insights", json=payload)
    assert response.status_code == 422


def test_maintenance_insights_invalid_condition(client: TestClient) -> None:
    """Asserts that invalid condition literals fail schema validation."""
    payload = {
        "asset": {
            "id": 1,
            "asset_tag": "AST-01",
            "name": "Chiller",
            "category": "HVAC",
            "age": 12,
            "condition": "Damaged",  # Invalid condition literal
        }
    }
    response = client.post("/api/ai/maintenance-insights", json=payload)
    assert response.status_code == 422


def test_maintenance_insights_missing_asset(client: TestClient) -> None:
    """Asserts that requests lacking an asset field fail validation."""
    payload = {
        "maintenance_history": []
    }
    response = client.post("/api/ai/maintenance-insights", json=payload)
    assert response.status_code == 422
