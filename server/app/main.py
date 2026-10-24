from fastapi import FastAPI

app = FastAPI(
    title="India.gov.in Audit API",
    description="A small API supporting the accessibility audit project.",
    version="1.0.0",
)


@app.get("/api/health")
def health_check() -> dict[str, str]:
    """Return the backend status for local development checks."""
    return {
        "status": "ok",
        "service": "India.gov.in Audit API",
    }
