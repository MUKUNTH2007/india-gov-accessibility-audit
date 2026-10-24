# Architecture and Local Setup

## Project purpose

This repository documents an accessibility audit of India.gov.in and provides a small full-stack dashboard for recorded findings.

## Architecture

- Client: React, TypeScript, and Vite display the audit summary and backend connection status.
- Server: FastAPI provides the health-check API.
- Tests: pytest checks the backend API response.
- Documentation: the audit report and architecture document explain findings, setup, and limitations.
- Evidence: screenshots are stored under docs/screenshots/.

The client handles presentation, while the server provides API responses.

## First vertical feature slice

1. React requests GET /api/health.
2. Vite proxies the request to http://127.0.0.1:8000.
3. FastAPI returns JSON with the API status and service name.
4. The dashboard displays the connection status.
5. A pytest test verifies the endpoint response.

## Local setup

### Backend

From the project root, run:

    cd server
    source .venv/bin/activate
    python -m pip install -r requirements.txt
    python -m uvicorn app.main:app --reload

Health endpoint: http://127.0.0.1:8000/api/health
API documentation: http://127.0.0.1:8000/docs

### Frontend

In a second terminal, run:

    cd ~/Desktop/india-gov-audit/client
    npm install
    npm run dev

### Backend tests

    cd ~/Desktop/india-gov-audit/server
    source .venv/bin/activate
    python -m pytest

### Frontend build

    cd ~/Desktop/india-gov-audit/client
    npm run build

## Audit findings

The recorded Lighthouse accessibility score was 81/100. This is a historical result from the documented audit run, not a live measurement. The report covers landmark and ARIA semantics, contrast, touch targets, link purpose, and list semantics.

## Keyboard testing

During the recorded interactions, Tab and Shift+Tab navigation worked and a visible focus indicator was observed. These observations do not establish complete keyboard accessibility across the website.

## Limitations

The dashboard displays recorded findings and checks backend availability. It does not automatically run Lighthouse or prove that the audited website has been fixed. Further manual testing and retesting are required.
