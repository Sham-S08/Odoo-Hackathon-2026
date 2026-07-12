import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture(scope="module")
def client() -> TestClient:
    """Fixture providing an HTTP TestClient bound to the FastAPI application.

    Ensures application startup events are fired correctly during testing.
    """
    with TestClient(app) as c:
        yield c
