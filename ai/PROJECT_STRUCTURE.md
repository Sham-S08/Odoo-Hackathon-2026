# Project Structure: FastAPI AI Microservice

This document outlines the production-ready directory structure, file roles, naming conventions, and coding standards for the independent FastAPI microservice.

---

## Directory Layout

```text
ai-service/
├── .github/                 # CI/CD Workflows
│   └── workflows/
│       └── test.yml
├── app/                     # Main Application Package
│   ├── api/                 # API Routers & Endpoints
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   │   └── insights.py
│   │   │   └── router.py
│   │   └── deps.py          # Dependency Injection (auth, db, sessions)
│   ├── core/                # System Configuration & Core Logic
│   │   ├── config.py        # Environment variables & settings
│   │   └── security.py      # Token verification, headers validation
│   ├── models/              # Internal ML Data Models & Mappings
│   ├── schemas/             # Pydantic Schemas (Request/Response validation)
│   │   └── insights.py
│   ├── services/            # Business Logic & Model Inference Engine
│   │   └── inference.py
│   ├── ML_models/           # Pre-trained Model Artifacts & Weights
│   │   └── maintenance_v1.bin
│   ├── __init__.py
│   └── main.py              # Application Entry Point
├── tests/                   # Test Suite
│   ├── conftest.py          # Pytest fixtures and environment setups
│   ├── test_api/            # Endpoint tests
│   │   └── test_insights.py
│   └── test_services/       # ML inference tests
│       └── test_inference.py
├── .dockerignore
├── .gitignore
├── Dockerfile               # Containerization script
├── README.md
└── requirements.txt         # Package dependencies list
```

---

## Directory & File Purpose

### Directories
*   `app/`: The root package for all application code.
*   `app/api/`: Handles incoming HTTP layers. All route declarations and request handling reside here.
*   `app/core/`: Contains modules that handle global settings, security rules, and database connection pools (read-only for historic queries).
*   `app/schemas/`: Houses `Pydantic` schemas used to validate, parse, and document JSON requests and responses.
*   `app/services/`: Contains the core machine learning inference operations, separating HTTP routing from calculation algorithms.
*   `app/ML_models/`: Git LFS (Large File Storage) tracked directory containing the trained model binaries (e.g. Scikit-learn pickle or joblib files).
*   `tests/`: Separate test module containing all integration and unit tests using `pytest`.

### Key Files
*   `app/main.py`: Initializes the FastAPI application object, registers middleware (CORS, trusted hosts), sets up exception handlers, and mounts API routers.
*   `app/api/deps.py`: Contains reusable FastAPI dependency functions (e.g., extracting API key headers).
*   `app/core/config.py`: Utilizes `pydantic-settings` to load and parse `.env` files and environment variable limits.
*   `app/api/v1/endpoints/insights.py`: Implements the `POST /api/ai/maintenance-insights` endpoint logic, coordinating schema parsing and calling inference services.
*   `tests/conftest.py`: Establishes mock client configurations and mock database connections for test isolation.

---

## Naming Conventions

The project adheres strictly to **PEP 8** style guidelines for naming:

| Element | Rule | Example |
| :--- | :--- | :--- |
| **Directories** | All lowercase, singular, separated by underscores if necessary. | `schemas/`, `ml_models/` |
| **Modules (Files)** | All lowercase, snake_case. | `insights.py`, `inference.py` |
| **Classes** | PascalCase. | `MaintenanceRequestSchema`, `InferenceService` |
| **Functions** | lowercase_with_underscores (snake_case). | `calculate_health_score()`, `predict_insights()` |
| **Variables / Arguments** | lowercase_with_underscores (snake_case). | `asset_age_months`, `request_id` |
| **Constants** | UPPERCASE_WITH_UNDERSCORES. | `MAX_AGE_MONTHS`, `DEFAULT_TIMEOUT_SEC` |

---

## Coding Standards

### 1. Static Typing (PEP 484)
Type hints are mandatory for all function declarations. This guarantees safety, enables auto-completion, and allows static analysis tools to catch structural bugs early.
```python
def predict_insights(health_score: float) -> str:
    # Function body
```

### 2. Dependency Injection
Use FastAPI's native `Depends` system to inject dependencies (like settings, database connections, or API key validation) to ensure code modularity and testability.

### 3. Error Handling and Exception Overrides
All operational exceptions (e.g. model failed to load, inputs out of bounds) must raise a `HTTPException` with a corresponding HTTP status code. Avoid raw `try-except` blocks without specified logs.

### 4. Code Formatting and Linting
*   **Formatter:** `black` for unified code styling (88-character line limit).
*   **Imports:** `isort` to organize imports (standard library first, third-party second, local package third).
*   **Linter:** `flake8` or `ruff` to identify code smells, unused variables, and type inconsistencies.
