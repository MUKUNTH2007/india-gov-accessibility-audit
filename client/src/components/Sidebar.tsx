
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Audit sidebar">
      <h2>Audit Sections</h2>

      <nav aria-label="Audit section navigation">
        <ul className="sidebar-list">
          <li>
            <NavLink to="/">Overview</NavLink>
          </li>

          <li>
            <NavLink to="/findings">Accessibility Issues</NavLink>
          </li>

          <li>
            <NavLink to="/data-table">Audit Data</NavLink>
          </li>

          <li>
            <NavLink to="/feedback">Feedback Form</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
