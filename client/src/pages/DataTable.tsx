
const auditData = [
  {
    id: 1,
    issue: "Page structure and landmarks",
    priority: "High",
    status: "Needs review",
  },
  {
    id: 2,
    issue: "ARIA roles and hidden content",
    priority: "High",
    status: "Needs review",
  },
  {
    id: 3,
    issue: "Colour contrast",
    priority: "High",
    status: "Needs review",
  },
  {
    id: 4,
    issue: "Touch target size",
    priority: "Medium",
    status: "Needs review",
  },
  {
    id: 5,
    issue: "Links and list semantics",
    priority: "Medium",
    status: "Needs review",
  },
];

export default function DataTable() {
  return (
    <section aria-labelledby="table-heading">
      <p className="eyebrow">AUDIT RECORDS</p>

      <h2 id="table-heading">Accessibility Audit Data</h2>

      <p className="muted">
        A structured overview of the identified accessibility issues.
      </p>

      <div className="table-container">
        <table>
          <caption>
            India.gov.in accessibility audit findings and review status
          </caption>

          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Accessibility issue</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
            </tr>
          </thead>

          <tbody>
            {auditData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.issue}</td>
                <td>{item.priority}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
