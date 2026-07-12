# Project Directory Structure

This document outlines the folder layout, architectural boundaries, dependency flows, and design best practices applied in the **AssetFlow AI Microservice**.

---

## 1. Complete Folder Tree

The directory tree represents the actual project structure currently deployed in the workspace:

```text
ai/
├── app/                             # Main application package
│   ├── api/                         # Presentation Layer (API endpoints)
│   │   ├── v1/                      # Version 1 API modules
│   │   │   ├── endpoints/           # Specific endpoint routers
│   │   │   │   ├── __init__.py
│   │   │   │   ├── health.py        # GET /health health-check endpoint
│   │   │   │   └── maintenance_insights.py # POST /maintenance-insights endpoint
│   │   │   ├── __init__.py
│   │   │   └── router.py            # Merges v1 routes
│   │   ├── __init__.py
│   │   └── deps.py                  # API dependencies injection declarations
│   ├── core/                        # Infrastructure config, loggers, exceptions
│   │   ├── __init__.py
│   │   ├── config.py                # Pydantic BaseSettings class definition
│   │   ├── constants.py             # Centralized decision constants and weights
│   │   ├── exceptions.py            # Global exception handlers registration
│   │   ├── logging_config.py        # Python dictConfig setup
│   │   └── settings.py              # Exportable settings instance
│   ├── models/                      # Internal data entities / representations (currently empty)
│   │   └── __init__.py
│   ├── schemas/                     # Validation Layer (Pydantic v2 schemas)
│   │   ├── __init__.py
│   │   ├── asset.py                 # AssetSchema validation
│   │   ├── error.py                 # ErrorResponseSchema validation
│   │   ├── maintenance.py           # MaintenanceHistorySchema validation
│   │   ├── request.py               # AIRequestSchema validation
│   │   ├── response.py              # AIResponseSchema validation
│   │   └── README.md                # Schema references documentation
│   ├── services/                    # Business Layer (Logic and evaluation engines)
│   │   ├── __init__.py
│   │   ├── maintenance_service.py   # Orchestrator for insights queries
│   │   └── rule_engine.py           # Rule-based scoring decision engine
│   ├── utils/                       # Common helper utilities (currently empty)
│   │   └── __init__.py
│   ├── __init__.py
│   └── main.py                      # FastAPI application entrypoint
├── tests/                           # Automation Test Suite
│   ├── __init__.py
│   ├── conftest.py                  # Pytest shared fixtures
│   ├── test_endpoints.py            # API endpoint integration tests
│   ├── test_health.py               # Health check test
│   ├── test_rule_engine.py          # Rule engine mathematical calculations tests
│   └── test_schemas.py              # Pydantic schema validation boundary tests
├── .env                             # Local system variables
├── .env.example                     # Environment template file
├── AI_ARCHITECTURE.md               # System architectural design spec
├── AI_DECISION_LOGIC.md             # Decision-matrix mapping spec
├── AI_SCOPE.md                      # Project scope agreement
├── API_CONTRACT.md                  # REST interface contract spec
├── PROJECT_STRUCTURE.md             # Initial folder structures spec
├── README.md                        # Project manual and running guide
└── requirements.txt                 # Dependencies manifest
```

---

## 2. Folder Purpose

*   `app/`: Houses the entire FastAPI source code and configuration modules.
*   `app/api/`: Presentation layer mapping HTTP requests, response configurations, and dependency resolution.
*   `app/api/v1/`: Organizes all Version 1 endpoint routes.
*   `app/api/v1/endpoints/`: Individual controllers separating concerns between different API domain areas.
*   `app/core/`: Infrastructure folder handling system settings, constants, logging setups, and error boundaries.
*   `app/models/`: Reserved for database representations or internal machine learning representation mappings.
*   `app/schemas/`: Data validation layer containing validation classes for API input parsing and output serialization.
*   `app/services/`: Core business logic directory executing the calculations, rules, and evaluations.
*   `tests/`: Independent automated test package containing validation suites.

---

## 3. File Purpose

*   `app/main.py`: Main entry point initializing FastAPI, configuring CORS middlewares, and registering exception handlers.
*   `app/api/v1/router.py`: Aggregates endpoints under Version 1 routers.
*   `app/api/v1/endpoints/health.py`: Declares the `/health` endpoint to monitor application operational status.
*   `app/api/v1/endpoints/maintenance_insights.py`: Controller mapping `POST /maintenance-insights` requests.
*   `app/core/config.py`: Implements environment variable mapping using `pydantic-settings`.
*   `app/core/settings.py`: Instantiates and exports settings configs.
*   `app/core/constants.py`: Stores weights, boundaries, condition scores, and age bracket constraints.
*   `app/core/logging_config.py`: Applies consistent formatting structures to console outputs.
*   `app/core/exceptions.py`: Catches raw Python errors and converts them to standard JSON formats.
*   `app/schemas/asset.py`: Sanitizes and validates physical attributes (e.g. positive IDs, conditions).
*   `app/schemas/maintenance.py`: Formats dates and verifies status literal types.
*   `app/schemas/request.py`: Groups request payloads.
*   `app/schemas/response.py`: Forces success outputs to match Odoo Hackathon properties.
*   `app/schemas/error.py`: Standardizes exception payloads returned to Node.js.
*   `app/services/maintenance_service.py`: Direct orchestrator service triggering the rule engine.
*   `app/services/rule_engine.py`: Computes asset health and recommendations.
*   `tests/conftest.py`: Establishes modular `TestClient` configurations.
*   `tests/test_health.py`: Asserts correct status outputs from `/health`.
*   `tests/test_schemas.py`: Checks boundary rules on schemas.
*   `tests/test_endpoints.py`: Verifies endpoints return 422 for malformed payloads.
*   `tests/test_rule_engine.py`: Validates calculation correctness (such as bracket allocations).

---

## 4. Clean Architecture Mapping

The directories translate directly to Clean Architecture components:

```text
┌─────────────────────────────────────────────────────────────┐
│ PRESENTATION LAYER (HTTP Routing & Request Flow)            │
│  - app/api/v1/endpoints/                                    │
└───────────────┬─────────────────────────────────────────────┘
                │ (Calls Orchestrator via DI)
┌───────────────▼─────────────────────────────────────────────┐
│ BUSINESS LAYER (Services & Domain Calculations)             │
│  - app/services/ (maintenance_service.py, rule_engine.py)   │
└───────────────┬─────────────────────────────────────────────┘
                │ (Uses schemas to validate structures)
┌───────────────▼─────────────────────────────────────────────┐
│ DATA / VALIDATION LAYER (Structures & Formats)              │
│  - app/schemas/ (asset.py, request.py, response.py)         │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ INFRASTRUCTURE LAYER (Cross-Cutting Configs)                 │
│  - app/core/ (config.py, constants.py, exceptions.py)       │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Dependency Flow

All request and data communication flows strictly downward:

```text
Frontend Client
      │
      ▼ (POST JSON Payload)
FastAPI Endpoint (app/api/v1/endpoints/maintenance_insights.py)
      │
      ▼ (Calls)
Maintenance Insights Service (app/services/maintenance_service.py)
      │
      ▼ (Delegates)
Rule Engine (app/services/rule_engine.py)
      │
      ▼ (Validates & Serializes)
AI Response Schema (app/schemas/response.py)
      │
      ▼ (Returns HTTP JSON Response)
Client User
```

### Communication Boundaries and Forbidden Dependencies
1.  **Strict Downward Dependency:** Outer layers can import inner layers, but inner layers must remain completely unaware of outer layers. For example:
    *   `RuleEngine` (Business Layer) **must never** import API endpoints or controllers (Presentation Layer).
    *   `MaintenanceInsightsService` **must never** access route parameters directly.
2.  **No Logic in Presentation:** Endpoints must act strictly as routers. They are forbidden from performing health score calculations or decision branching.
3.  **Data Isolation:** Pydantic schemas are purely structures. They are forbidden from carrying database connections or executing business calculations.

---

## 6. Best Practices

*   **SOLID Principles:**
    *   *Single Responsibility (SRP):* `RuleEngine` calculates scores, `MaintenanceInsightsService` orchestrates call flows and protects against failures, and `maintenance_insights.py` handles routing.
    *   *Open/Closed (OCP):* Adding new models or logic (like machine learning models) only requires extending or replacing the `RuleEngine` target, leaving the API layer unchanged.
*   **Separation of Concerns:** Split cleanly into routing, validation, business processing, and infrastructure configurations.
*   **Maintainability:** Centralizing all thresholds and coefficients into `constants.py` makes it simple to tune calculations without modifying core Python logic.
*   **Scalability:** Python FastAPI microservice architecture isolates heavy mathematical/CPU processing away from the main Node.js I/O transaction thread.

---

## 7. Production Readiness

1.  **Thread Protection:** Independent execution prevents CPU spikes in Python logic from choking the main Node.js web server.
2.  **Robust Error Boundaries:** If the AI rules fail or run out of bounds, the service logs the incident and yields a fallback recommendation safely, preventing crash cascades in the core ERP.
3.  **High Code Quality:** Full typing annotations, zero magic numbers, structured JSON response formats, and comprehensive test coverage make this codebase highly stable and ready for enterprise integration.
