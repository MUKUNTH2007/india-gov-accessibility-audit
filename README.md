# India.gov.in Accessibility Audit

## Overview

This project documents an accessibility audit of India.gov.in and provides a small full-stack dashboard for recorded findings.

The recorded Lighthouse accessibility score was 81/100. This is a historical result from the documented audit run, not a live measurement.

## Project structure

- `client/` — React, TypeScript, and Vite frontend.
- `server/` — FastAPI backend.
- `server/tests/` — Backend API tests.
- `tests/` — Root test directory for future tests.
- `docs/audit-report.md` — Findings, evidence, priorities, and recommendations.
- `docs/architecture.md` — Architecture and local setup.
- `docs/screenshots/` — Audit evidence screenshots.

## Run locally

### Backend

```bash
cd ~/Desktop/india-gov-audit/server
source .venv/bin/activate
python -m uvicorn app.main:app --reload
```

Health endpoint: `http://127.0.0.1:8000/api/health`

### Frontend

Open a second Terminal window:

```bash
cd ~/Desktop/india-gov-audit/client
npm run dev
```

Open the local URL shown by Vite.

## Verification

Backend tests:

```bash
cd ~/Desktop/india-gov-audit/server
source .venv/bin/activate
python -m pytest
```

Frontend production build:

```bash
cd ~/Desktop/india-gov-audit/client
npm run build
```

## Limitations

The dashboard presents recorded audit findings and checks backend availability. It does not run Lighthouse automatically or prove that the audited website has been fixed. Keyboard observations apply only to the interactions recorded in the audit.