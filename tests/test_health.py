from fastapi.testclient import TestClient


def test_health_check(client: TestClient) -> None:
    """Validates the health check endpoint returns 200 OK and expected keys."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "service" in data
    assert "version" in data
