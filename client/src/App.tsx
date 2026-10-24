import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  service: string;
};

const findings = [
  {
    title: "Page structure and landmarks",
    detail: "The audit reported that the document did not have a main landmark.",
    priority: "High",
  },
  {
    title: "ARIA roles and hidden content",
    detail:
      "The audit reported incompatible ARIA roles and focusable descendants inside aria-hidden content.",
    priority: "High",
  },
  {
    title: "Colour contrast",
    detail:
      "Some foreground and background colour combinations did not have sufficient contrast.",
    priority: "High",
  },
  {
    title: "Touch target size",
    detail:
      "Some interactive targets did not have sufficient size or spacing.",
    priority: "Medium",
  },
  {
    title: "Links and list semantics",
    detail:
      "The audit reported identical links with the same purpose and list items outside valid list containers.",
    priority: "Medium",
  },
];

export default function App() {
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
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">INTERNSHIP · STAGE 2</p>
        <h1>India.gov.in Accessibility Audit</h1>
        <p className="intro">
          A documented accessibility audit with evidence, findings, and a
          starter application for future improvements.
        </p>
      </header>

      <section className="overview-grid" aria-label="Audit overview">
        <article className="panel">
          <p className="panel-label">Recorded Lighthouse accessibility score</p>
          <p className="score">
            81<span>/100</span>
          </p>
          <p className="muted">
            Historical result from the recorded audit, not a live measurement.
          </p>
        </article>

        <article className="panel">
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

      <section className="content-section" aria-labelledby="findings-heading">
        <p className="eyebrow">AUDIT SUMMARY</p>
        <h2 id="findings-heading">Five issue groups to address</h2>
        <p className="muted">
          Priorities are initial recommendations. Confirm each issue during
          manual review before deciding it is fixed.
        </p>

        <ul className="finding-list">
          {findings.map((finding) => (
            <li className="finding-card" key={finding.title}>
              <div>
                <h3>{finding.title}</h3>
                <p>{finding.detail}</p>
              </div>
              <span
                className={`priority priority-${finding.priority.toLowerCase()}`}
              >
                {finding.priority} priority
              </span>
            </li>
          ))}
        </ul>
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
          These observations cover only the interactions tested, not every page
          and control on the website.
        </p>
      </section>

      <footer className="page-footer">
        The detailed report and saved screenshots are preserved in the project’s
        <code> docs/ </code> directory. This application does not run Lighthouse.
      </footer>
    </main>
  );
}
