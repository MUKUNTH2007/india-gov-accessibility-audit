
const findings = [
  {
    title: "Page structure and landmarks",
    detail:
      "The audit reported that the document did not have a main landmark.",
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

export default function Findings() {
  return (
    <section aria-labelledby="findings-heading">
      <p className="eyebrow">ACCESSIBILITY AUDIT</p>

      <h2 id="findings-heading">Five issue groups to address</h2>

      <p className="muted">
        Priorities are initial recommendations. Confirm each issue
        during manual review before deciding it is fixed.
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
  );
}
