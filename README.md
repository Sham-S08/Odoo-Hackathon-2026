# AssetFlow AI Microservice

This microservice acts as the predictive analysis engine for the AssetFlow Enterprise Asset & Resource Management System. It is an independent FastAPI microservice built to perform offline diagnostic assessments (Repair vs. Retire) on industrial equipment.

---

## Technical Stack
*   **Language:** Python 3.12+
*   **Framework:** FastAPI
*   **ASGI Server:** Uvicorn
*   **Data Validation:** Pydantic v2
*   **Settings Management:** Pydantic-settings

---

## Folder Structure

```text
ai/
├── app/                     # Core application source
│   ├── api/                 # Endpoint routing logic
│   │   ├── v1/              # API Version 1 routers
│   │   │   ├── endpoints/   # Endpoint controllers (health, insights)
│   │   │   └── router.py    # Merged API routes
│   │   └── deps.py          # Dependency injection functions
│   ├── core/                # System settings, exceptions and logger setup
│   │   ├── config.py        # Environment variables loader
│   │   ├── exceptions.py    # Global exception handler
│   │   └── logging_config.py# Unified logging layout
│   ├── models/              # Internal ML representations
│   ├── schemas/             # Request/Response schemas
│   ├── services/            # Calculation and inference rules
│   ├── utils/               # Common helper utilities
│   └── main.py              # Application entrypoint
├── tests/                   # Pytest test suite
├── docs/                    # Architecture diagrams and specifications
├── .env.example             # Configuration settings template
├── .env                     # Local settings instance (git-ignored)
├── README.md                # Deployment and developer manual
└── requirements.txt         # Package requirements manifest
```

---

## Installation & Setup Guide

Follow these steps to establish your local development virtual environment:

### 1. Create a Virtual Environment
In the root directory of the AI microservice, execute the virtual environment command:
```bash
python -m venv .venv
```

### 2. Activate the Virtual Environment
Activate the environment according to your operating system shell:
*   **Windows (PowerShell):**
    ```powershell
    .venv\Scripts\Activate.ps1
    ```
*   **Windows (Command Prompt):**
    ```cmd
    .venv\Scripts\activate.bat
    ```
*   **Linux / macOS (Bash/Zsh):**
    ```bash
    source .venv/bin/activate
    ```

### 3. Install Core Dependencies
Install the required application packages listed in the manifest file:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

---

## Running the Application

Ensure the virtual environment is active, then launch the Uvicorn ASGI server with hot-reload enabled:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

---

## API Documentation

When the application is running, the following endpoints are available:

*   **Core Health Endpoint:** [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)
*   **Interactive Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
*   **Static ReDoc UI:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## Running the Test Suite

To run the unit and integration tests, run the following command in the virtual environment:

```bash
pytest
```