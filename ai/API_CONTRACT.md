# API Contract: Maintenance Insights

This document outlines the API contract for the AI predictive maintenance endpoint. This contract serves as the integration interface between the Node.js/Express backend and the FastAPI AI service.

---

## Endpoint Specification

### Endpoint
`/api/ai/maintenance-insights`

### HTTP Method
`POST`

---

## Request Parameters

The request payload must be sent in the HTTP Request Body as a JSON object.

### Request Body Schema

```json
{
  "request_id": "string (uuid or integer)",
  "asset_id": "string (uuid or integer)",
  "asset_category": "string",
  "asset_age_months": "integer",
  "description": "string",
  "reporter_id": "string (uuid or integer)",
  "reported_at": "string (ISO 8601 datetime)",
  "last_maintenance_date": "string (ISO 8601 datetime) or null"
}
```

### Required Fields
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `request_id` | String | Unique identifier of the newly saved maintenance request. |
| `asset_id` | String | Unique identifier of the asset requiring maintenance. |
| `asset_category` | String | The category of the asset (e.g., `HVAC`, `Conveyor`, `Vehicle`). Used for model selection. |
| `asset_age_months`| Integer | Total age of the asset in months. |
| `description` | String | The textual description of the maintenance issue reported. |
| `reported_at` | String | Timestamp when the maintenance request was saved. Format: `YYYY-MM-DDTHH:mm:ssZ`. |

### Optional Fields
| Field Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `last_maintenance_date`| String / Null| `null` | Timestamp of the last completed maintenance on this asset. Format: `YYYY-MM-DDTHH:mm:ssZ`. |
| `reporter_id` | String / Null| `null` | Identifier of the employee reporting the issue. |

---

## Response Specification

The response body returns only the three official fields specified in the hackathon guidelines.

### Response Body Schema

```json
{
  "recommendation": "string (Repair | Retire)",
  "asset_health": "integer (0 to 100)",
  "reason": "string"
}
```

---

## Error & Validation Rules

### Validation Rules
1.  `asset_age_months` must be a non-negative integer ($\ge 0$).
2.  `reported_at` and `last_maintenance_date` must conform to standard ISO 8601 date-time patterns.
3.  `description` must not be empty and must have a minimum length of 5 characters.
4.  `asset_health` output will always be normalized as an integer between `0` and `100`.
5.  `recommendation` must strictly return either `"Repair"` or `"Retire"`.

### HTTP Status Codes
| Code | Status | Scenario |
| :--- | :--- | :--- |
| `200` | OK | Prediction completed successfully and payload returned. |
| `400` | Bad Request | Validation failed for input parameters. |
| `422` | Unprocessable Entity | Schema is correct but values are invalid (e.g. negative age, invalid datetime). |
| `500` | Internal Server Error | AI inference engine exception or model loading failure. |

---

## Payload Examples

### Sample Request
```json
{
  "request_id": "req-98231-x",
  "asset_id": "ast-4421-m",
  "asset_category": "conveyor_belt",
  "asset_age_months": 42,
  "description": "The conveyor belt is making a high-pitched grinding noise and slipping under load.",
  "reporter_id": "usr-554",
  "reported_at": "2026-07-12T11:30:00Z",
  "last_maintenance_date": "2026-05-10T08:00:00Z"
}
```

### Sample Success Response (`200 OK`)
```json
{
  "recommendation": "Repair",
  "asset_health": 82,
  "reason": "Good condition with low repair frequency."
}
```

### Sample Failure Response (`422 Unprocessable Entity`)
```json
{
  "detail": [
    {
      "loc": ["body", "asset_age_months"],
      "msg": "ensure this value is greater than or equal to 0",
      "type": "value_error.number.not_ge"
    }
  ]
}
```

---

## Notes for Backend Engineer

> [!IMPORTANT]
> **1. Post-Save Execution Hook**
> The call to `/api/ai/maintenance-insights` **must only occur after** the maintenance request transaction has successfully committed to the database. Do not block the primary user request pipeline to call the AI service.

> [!WARNING]
> **2. Non-blocking Async Orchestration**
> Wrap the HTTP request to the AI service in a try-catch block inside an asynchronous task worker (e.g., using `setImmediate()`, a background message broker, or event emitters). If the AI service is down (e.g., connection timed out, returns `502`/`500`/`404`), log the incident as a warning and fail silently. The main application thread must not be impacted.

> [!NOTE]
> **3. Optional Field Updates**
> The output predictions from this API are strictly optional recommendations. If the AI service fails to return a valid output, leave the corresponding fields in the database as default (or manual) values. Do not show error notifications to the operator.
