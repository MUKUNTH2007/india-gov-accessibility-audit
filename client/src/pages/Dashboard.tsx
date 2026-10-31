
import AuditModal from "../components/AuditModal";
import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  service: string;
};

export default function Dashboard() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }
        return response.json() as Promise<HealthResponse>;
      })
      .then((data) => {
        if (active) setHealth(data);
      })
      .catch(() => {
        if (active) setApiError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="overview-grid" aria-label="Audit overview">
        <article className="panel">
          <h2>Accessibility Score</h2>
          <p className="panel-label">
            Recorded Lighthouse accessibility score
          </p>
          <p className="score">
            81<span>/100</span>
          </p>
          <p className="muted">
            Historical result from the recorded audit, not a live measurement.
          </p>
        </article>

        <article className="panel">
          <h2>Backend Status</h2>
          <p className="panel-label">Backend connection</p>
          <p className="connection" role="status" aria-live="polite">
            {health
              ? `Connected — ${health.status}`
              : apiError
                ? "Not connected"
                : "Checking API…"}
          </p>
          <p className="muted">
            {health
              ? health.service
              : "Start the FastAPI server to check the connection."}
          </p>
        </article>
      </section>

     <section className="content-section" aria-labelledby="dashboard-heading">
  <p className="eyebrow">AUDIT SUMMARY</p>
  <h2 id="dashboard-heading">India.gov.in Accessibility Audit</h2>

  <p className="muted">
    This dashboard presents the recorded accessibility audit results
    and the main areas requiring improvement.
  </p>

  <AuditModal />
</section>

      <section className="panel keyboard-panel" aria-labelledby="keyboard-heading">
        <p className="eyebrow">MANUAL CHECK</p>
        <h2 id="keyboard-heading">Keyboard navigation observations</h2>

        <ul>
          <li>Tab navigation worked during the tested interactions.</li>
          <li>Shift+Tab navigation worked during the tested interactions.</li>
          <li>A visible focus indicator was observed.</li>
        </ul>

        <p className="muted">
          These observations cover only the interactions tested,
          not every page and control on the website.
        </p>
      </section>
    </>
  );
  
}

