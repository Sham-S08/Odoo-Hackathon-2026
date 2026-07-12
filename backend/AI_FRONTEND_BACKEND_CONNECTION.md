# AI + Frontend to Backend Integration Guide

This document explains how the frontend and AI service should connect to the Node.js backend server in this repository.

## 1. Backend base URL

All backend routes are mounted under `/api`.

Default local base URL:

- `http://localhost:5000/api`

Backend entry points:

- `backend/server.js`
- `backend/app.js`
- `backend/assetflow-backend/src/routes/index.js`

## 2. Start the backend server

From the backend folder:

```bash
cd backend
node server.js
```

Or from the package folder:

```bash
cd backend/assetflow-backend
npm start
```

## 3. Common frontend connection pattern

Every authenticated request should send:

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

Frontend environment variable example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Example fetch wrapper:

```js
const API_BASE = import.meta.env.VITE_API_BASE_URL;

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  return response.json();
}
```

## 4. Response format the frontend should expect

The backend returns a consistent success payload shape:

```json
{
  "message": "Login successful",
  "data": {
    "token": "jwt-token",
    "employee": {
      "id": "emp-1",
      "role": "Admin"
    }
  }
}
```

Error responses follow this format:

```json
{
  "message": "Missing or invalid Authorization header"
}
```

## 5. All backend route families

### 5.1 Auth

Base path: `/api/auth`

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/auth/signup` | Create employee account |
| POST | `/api/auth/login` | Login and get access token |
| GET | `/api/auth/profile` | Fetch current logged-in profile |
| POST | `/api/auth/forgot-password` | Placeholder, currently returns 501 |

Example login request:

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

Example login response:

```json
{
  "message": "Login successful",
  "data": {
    "token": "<jwt>",
    "employee": {
      "id": "emp-001",
      "firstName": "Admin",
      "lastName": "User",
      "email": "admin@example.com",
      "role": "Admin"
    }
  }
}
```

### 5.2 Dashboard

Base path: `/api/dashboard`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/dashboard` | Get dashboard summary |

### 5.3 Departments

Base path: `/api/departments`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/departments` | List departments |
| POST | `/api/departments` | Create department |
| PUT | `/api/departments/:id` | Update department |
| DELETE | `/api/departments/:id` | Delete department |

### 5.4 Asset Categories

Base path: `/api/asset-categories`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/asset-categories` | List categories |
| POST | `/api/asset-categories` | Create category |
| PUT | `/api/asset-categories/:id` | Update category |
| DELETE | `/api/asset-categories/:id` | Delete category |

### 5.5 Employees

Base path: `/api/employees`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/employees` | List employees |
| GET | `/api/employees/:id` | Get employee details |
| PATCH | `/api/employees/:id/promote` | Promote employee |
| PATCH | `/api/employees/:id/status` | Change employee status |

### 5.6 Assets

Base path: `/api/assets`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/assets` | List assets |
| GET | `/api/assets/:id` | Get asset by id |
| POST | `/api/assets` | Create asset |
| PUT | `/api/assets/:id` | Update asset |
| DELETE | `/api/assets/:id` | Delete asset |
| GET | `/api/assets/:id/history` | Get asset lifecycle history |

### 5.7 Allocations

Base path: `/api/allocations`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/allocations` | List allocations |
| POST | `/api/allocations` | Create allocation |
| PATCH | `/api/allocations/:id/return` | Return asset allocation |

### 5.8 Transfers

Base path: `/api/transfers`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/transfers` | List transfers |
| POST | `/api/transfers` | Create transfer |
| PATCH | `/api/transfers/:id/approve` | Approve transfer |
| PATCH | `/api/transfers/:id/reject` | Reject transfer |

### 5.9 Bookings

Base path: `/api/bookings`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/bookings` | List bookings |
| POST | `/api/bookings` | Create booking |
| PUT | `/api/bookings/:id` | Update booking |
| DELETE | `/api/bookings/:id` | Delete booking |
| PATCH | `/api/bookings/:id/cancel` | Cancel booking |

### 5.10 Maintenance

Base path: `/api/maintenance`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/maintenance` | List maintenance records |
| POST | `/api/maintenance` | Create maintenance job |
| PATCH | `/api/maintenance/:id/approve` | Approve maintenance |
| PATCH | `/api/maintenance/:id/reject` | Reject maintenance |
| PATCH | `/api/maintenance/:id/assign-technician` | Assign technician |
| PATCH | `/api/maintenance/:id/resolve` | Resolve maintenance |

### 5.11 AI

Base path: `/api/ai`

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/ai/maintenance-insights` | Get AI maintenance insights |

Example AI request:

```http
POST http://localhost:5000/api/ai/maintenance-insights
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "assetId": "A-1001",
  "departmentId": "D-01",
  "type": "maintenance"
}
```

Example AI response:

```json
{
  "message": "AI maintenance insights generated",
  "data": {
    "fallback": true,
    "message": "AI service unavailable; returning fallback insights",
    "details": "Connection refused"
  }
}
```

### 5.12 Audits

Base path: `/api/audits`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/audits` | List audits |
| POST | `/api/audits` | Create audit |
| PATCH | `/api/audits/:id/start` | Start audit |
| PATCH | `/api/audits/:id/close` | Close audit |
| POST | `/api/audits/:id/verify` | Verify audit |

### 5.13 Reports

Base path: `/api/reports`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/reports/assets` | Asset report |
| GET | `/api/reports/maintenance` | Maintenance report |
| GET | `/api/reports/booking` | Booking report |
| GET | `/api/reports/audit` | Audit report |
| GET | `/api/reports/department` | Department report |

### 5.14 Notifications

Base path: `/api/notifications`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/notifications` | List notifications |
| PATCH | `/api/notifications/:id/read` | Mark notification as read |

### 5.15 Activity Logs

Base path: `/api/activity-logs`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/activity-logs` | List activity logs |

### 5.16 Search

Base path: `/api/search`

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/search` | Global search |

## 6. How the AI and frontend connect to the backend

### Frontend to backend

- Frontend uses `http://localhost:5000/api` as the base URL.
- Frontend sends normal JSON requests.
- Frontend includes the JWT token in the `Authorization` header.

### Backend to AI service

- The backend forwards AI requests to `AI_MAINTENANCE_INSIGHTS_URL`.
- Default backend env value:

```env
AI_MAINTENANCE_INSIGHTS_URL=http://127.0.0.1:8000/maintenance-insights
```

Connection flow:

1. Frontend calls `POST /api/ai/maintenance-insights`
2. Backend checks JWT and role middleware
3. Backend forwards the request to the Python AI service
4. Backend returns the AI response or fallback data

## 7. Example end-to-end flow

### Login

```http
POST http://localhost:5000/api/auth/login
```

Response:

```json
{
  "message": "Login successful",
  "data": {
    "token": "jwt-token",
    "employee": {
      "id": "emp-1",
      "role": "Admin"
    }
  }
}
```

### Fetch assets

```http
GET http://localhost:5000/api/assets
Authorization: Bearer <jwt_token>
```

Response:

```json
{
  "message": "Assets fetched",
  "data": [
    {
      "id": "asset-1",
      "name": "Laptop",
      "status": "Active"
    }
  ]
}
```

### Get AI insights

```http
POST http://localhost:5000/api/ai/maintenance-insights
Authorization: Bearer <jwt_token>
```

Response:

```json
{
  "message": "AI maintenance insights generated",
  "data": {
    "fallback": true,
    "message": "AI service unavailable; returning fallback insights",
    "details": "AI service down"
  }
}
```

## 8. Environment variables

Add these settings to the backend environment file:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/assetflow
JWT_ACCESS_SECRET=your_secret_here
JWT_ACCESS_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
AI_MAINTENANCE_INSIGHTS_URL=http://127.0.0.1:8000/maintenance-insights
```

## 9. CORS note

The backend uses CORS for cross-origin requests.

If the frontend is running on a different port or origin, set `CORS_ORIGIN` to the correct frontend origin.

## 10. Recommended integration summary

- Frontend URL: `http://localhost:5000/api`
- Health URL: `http://localhost:5000/health`
- Authentication: `POST /api/auth/login`
- AI integration: `POST /api/ai/maintenance-insights`
- General response shape: `{ message, data }`

This gives the frontend a clean API contract while letting the backend remain the single bridge to the AI service.
