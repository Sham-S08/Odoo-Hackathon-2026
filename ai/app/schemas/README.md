# Pydantic Schemas Reference

This folder contains the Pydantic v2 schemas used for incoming request payload validation, serialization, error mapping, and API output formatting.

---

## 1. Asset Schema (`AssetSchema`)
*   **Purpose:** Validates the physical and structural attributes of the asset under evaluation.
*   **Validation Rules:**
    *   `id`: Must be an integer strictly greater than 0 (`gt=0`).
    *   `asset_tag`: Non-empty string.
    *   `name`: Non-empty string.
    *   `category`: Non-empty string representing asset grouping (e.g. `HVAC`, `Conveyor`).
    *   `age`: Non-negative integer representing age in months (`ge=0`).
    *   `condition`: String strictly constrained to one of the following literal values: `"Excellent"`, `"Good"`, `"Fair"`, `"Poor"`.
*   **Example JSON:**
    ```json
    {
      "id": 42,
      "asset_tag": "AST-HVAC-001",
      "name": "Server Room AC Unit",
      "category": "HVAC",
      "age": 36,
      "condition": "Fair"
    }
    ```

---

## 2. Maintenance History Schema (`MaintenanceHistorySchema`)
*   **Purpose:** Validates a single past maintenance occurrence logged for an asset.
*   **Validation Rules:**
    *   `date`: Must be a valid date format (conforming to ISO-8601, parsed to Python's `datetime.date`).
    *   `issue`: Non-empty string describing the problem/repair.
    *   `status`: String strictly constrained to one of: `"Pending"`, `"Approved"`, `"In Progress"`, `"Resolved"`.
*   **Example JSON:**
    ```json
    {
      "date": "2026-05-15",
      "issue": "Replaced standard compressor filter",
      "status": "Resolved"
    }
    ```

---

## 3. AI Request Schema (`AIRequestSchema`)
*   **Purpose:** The validated payload for the POST endpoint `/api/ai/maintenance-insights`.
*   **Validation Rules:**
    *   `asset`: Required field containing a valid `AssetSchema` object.
    *   `maintenance_history`: Optional list of `MaintenanceHistorySchema` items. Defaults to an empty list `[]` if omitted.
*   **Example JSON:**
    ```json
    {
      "asset": {
        "id": 42,
        "asset_tag": "AST-HVAC-001",
        "name": "Server Room AC Unit",
        "category": "HVAC",
        "age": 36,
        "condition": "Fair"
      },
      "maintenance_history": [
        {
          "date": "2026-05-15",
          "issue": "Replaced standard compressor filter",
          "status": "Resolved"
        }
      ]
    }
    ```

---

## 4. AI Response Schema (`AIResponseSchema`)
*   **Purpose:** Standard success response structure returned to the Node.js/Express backend after evaluation.
*   **Validation Rules:**
    *   `recommendation`: String strictly constrained to either `"Repair"` or `"Retire"`.
    *   `asset_health`: Integer between `0` and `100` inclusive (`ge=0, le=100`).
    *   `reason`: Non-empty string justifying the decision.
*   **Example JSON:**
    ```json
    {
      "recommendation": "Repair",
      "asset_health": 82,
      "reason": "Good condition with low repair frequency."
    }
    ```

---

## 5. Error Response Schema (`ErrorResponseSchema`)
*   **Purpose:** Standardized error format for schema validation failures or application-level errors.
*   **Validation Rules:**
    *   `error`: Boolean, always defaults to `true`.
    *   `message`: Non-empty string summarizing the failure.
    *   `details`: Arbitrary dictionary containing key-value pairs mapping the problematic parameters to their specific failure reasons.
*   **Example JSON:**
    ```json
    {
      "error": true,
      "message": "Validation failed",
      "details": {
        "asset.age": "ensure this value is greater than or equal to 0"
      }
    }
    ```
