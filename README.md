# AssetFlow

**Enterprise Asset & Resource Management ERP with AI-Powered Maintenance Insights**

> Built for **Odoo Hackathon 2026**

---

# Overview

AssetFlow is a comprehensive **Enterprise Resource Planning (ERP)** system designed for efficient tracking, allocation, and management of organizational assets and shared resources.

The platform features a modern React frontend, a robust Node.js backend, a database-driven architecture, and an independent AI microservice that provides intelligent maintenance recommendations (Repair vs. Retire) without blocking the core application workflow.

---

# Key Highlights

- Role-Based Access Control (Admin, Asset Manager, Department Head, Employee)
- Complete Asset Lifecycle Management
- Resource Booking with Conflict Prevention
- Maintenance Workflow with AI-Based Insights
- Asset Audits and Reporting
- Real-Time Notifications
- Activity Logs
- AI Maintenance Recommendation Service

---

# Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React + Next |
| Backend | Node.js + Express |
| Database | MongoDB |
| AI Service | Python + FastAPI |
| Authentication | JWT + RBAC |
| APIs | REST APIs |

---

# Features

## Authentication & Dashboard

- Secure Login
- Role-Based Access
- Dashboard Analytics
- Pending Approvals
- Maintenance Summary

---

## Organization Setup

- Department Management
- Employee Directory
- Asset Categories
- Role Management

---

## Asset Management

- Register Assets
- Asset Images
- Asset History
- Asset Tags
- Lifecycle Tracking

Asset States

- Available
- Allocated
- Under Maintenance
- Retired

---

## Allocation & Transfer

- Asset Allocation
- Asset Return
- Expected Return Dates
- Transfer Requests
- Approval Workflow

---

## Resource Booking

Book shared organizational resources including:

- Meeting Rooms
- Vehicles
- Equipment

Features include:

- Calendar View
- Conflict Detection
- Overlapping Booking Prevention

---

## Maintenance Management

- Raise Maintenance Requests
- Upload Images
- Priority Levels
- Approval Workflow
- Status Tracking
- AI Maintenance Insights

---

## Asset Audit

- Create Audit Cycles
- Assign Auditors
- Generate Reports
- Audit Status Tracking

---

## Reports

Generate reports for:

- Asset Utilization
- Maintenance History
- Idle Assets
- Department Assets
- Audit Reports

Export Options

- PDF
- Excel
- CSV

---

## Notifications

- Real-Time Notifications
- Activity Logs
- Email Notifications (Optional)

---

# Project Structure

```text
AssetFlow/
│
├── ai/                 # FastAPI AI microservice
├── backend/            # Node.js + Express backend
├── frontend/           # Next.js frontend
├── tests/              # Test cases
│
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
├── PROJECT_TREE.md     # Detailed project structure
└── README.md           # Project documentation`
```

---

# Local Development Setup

## Prerequisites

Install the following before starting:

- Node.js 20+
- npm
- Python 3.12+
- Git
- Visual Studio Code

---

# Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
NEXT_API_URL=http://localhost:5000/api
```

Start the development server.

```bash
npm run dev
```

Frontend URL

```
http://localhost:3000
```

---

# Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

If Axios is missing, install it manually.

```bash
npm install axios
```

Create a `.env` file.

```env
PORT=5000

MONGO_URI=<your_mongodb_connection_string>

JWT_SECRET=<your_jwt_secret>

AI_MAINTENANCE_URL=http://127.0.0.1:8001/api/ai/maintenance-insights

CORS_ORIGIN=http://localhost:3000
```

Run the backend.

Development Mode

```bash
npm run dev
```

or

```bash
node server.js
```

Backend URL

```
http://localhost:5000
```

---

# AI Service Setup

Navigate to the AI folder.

```bash
cd ai
```

Install dependencies.

```bash
py -m pip install -r requirements.txt
```

If needed, install packages manually.

```bash
pip install fastapi uvicorn pydantic pydantic-settings python-dotenv pytest httpx
```

Run the AI service.

```bash
py -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
```

AI Service URLs

Swagger Documentation

```
http://127.0.0.1:8001/docs
```

Health Check

```
http://127.0.0.1:8001/health
```

---

# Running the Entire Project

Open three terminals.

### Terminal 1

Frontend

```bash
cd frontend
npm run dev
```

---

### Terminal 2

Backend

```bash
cd backend
node server.js
```

or

```bash
npm run dev
```

---

### Terminal 3

AI Service

```bash
cd ai

py -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
```

---

# Default Ports

| Service | Port |
|----------|------|
| Frontend | 3000 |
| Backend | 5000 |
| AI Service | 8001 |

---

# API Documentation

After starting the services:

Backend APIs

```
http://localhost:5000/api
```

AI Swagger Documentation

```
http://127.0.0.1:8001/docs
```

AI Health Endpoint

```
http://127.0.0.1:8001/health
```

Example AI Endpoint

```http
POST /api/ai/maintenance-insights
```

---

# Common Issues

### Node modules not found

```bash
npm install
```

---

### Axios module missing

```bash
npm install axios
```

---

### Python command not recognized on Windows

Use:

```bash
py
```

instead of

```bash
python
```

---

### Backend cannot connect to AI service

Ensure the AI server is running before starting the backend.

---

### CORS Issues

Verify that

```env
CORS_ORIGIN=http://localhost:3000
```

matches the frontend URL.

---

# Contributing

1. Fork the repository.

2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "Add your feature"
```

4. Push the branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

# License

This project was developed for **Odoo Hackathon 2026**.

---

# Support

If you found this project useful, consider giving it a star on GitHub.

Built during **Odoo Hackathon 2026**.
