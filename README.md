# India.gov.in Accessibility Audit

## Overview

This project documents an accessibility audit of India.gov.in and provides a full-stack dashboard for presenting recorded accessibility findings.

The recorded Lighthouse accessibility score was 81/100. This is a historical result from the documented audit run, not a live measurement.

## Project Structure

- `client/` — React, TypeScript, and Vite frontend.
- `server/` — FastAPI backend.
- `server/tests/` — Backend API tests.
- `tests/` — Root test directory.
- `docs/audit-report.md` — Findings, evidence, priorities, and recommendations.
- `docs/architecture.md` — Architecture and local setup.
- `docs/screenshots/` — Audit evidence screenshots.

## Frontend Features

The accessibility dashboard includes:

- Dashboard displaying the recorded audit score and backend connection status.
- Findings page displaying identified accessibility issues.
- Data Table presenting five recorded accessibility findings.
- Feedback form with labelled controls and HTML validation.
- Modal dialog displaying additional audit information.
- Shared header navigation and sidebar navigation.
- Skip-to-main-content link.
- Responsive page layout.

## Accessibility Implementation

The application uses semantic HTML5 elements, including:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<aside>`
- `<footer>`

Additional accessibility features include:

- Descriptive labels for form controls.
- Fieldsets and legends for grouped radio buttons.
- Accessible table captions and column headers.
- ARIA labels and heading associations.
- Visible keyboard focus indicators.
- Native HTML dialog element.
- Keyboard-accessible navigation.

## Accessibility Testing

The following manual checks were performed:

| Test | Result |
|---|---|
| Keyboard navigation | Passed |
| Skip navigation link | Passed |
| Navigation links | Passed |
| Feedback form required-field validation | Passed |
| Invalid email validation | Passed |
| Modal opening and closing | Passed |
| VoiceOver heading navigation | Passed |
| VoiceOver navigation links | Passed |
| VoiceOver modal testing | Passed |
| VoiceOver form labels | Passed |
| VoiceOver data table | Passed |
| Production HTML validation | Zero errors |

Colour contrast combinations were reviewed against WCAG AA requirements. The combinations measured in the stylesheet passed the applicable contrast thresholds.

Note: These checks represent the interactions tested and do not establish complete WCAG conformance.

## Run Locally

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

### Backend tests

```bash
cd ~/Desktop/india-gov-audit/server
source .venv/bin/activate
python -m pytest
```

### Frontend production build

```bash
cd ~/Desktop/india-gov-audit/client
npm run build
```

### Production preview

```bash
cd ~/Desktop/india-gov-audit/client
npm run preview
```

## Limitations

- The dashboard presents recorded audit findings and does not run Lighthouse automatically.
- The historical Lighthouse score is not a live measurement.
- The feedback form currently demonstrates frontend validation and does not persist submissions to a database.
- Keyboard and screen-reader observations apply only to the interactions tested.
- Manual accessibility checks do not guarantee complete WCAG compliance.
