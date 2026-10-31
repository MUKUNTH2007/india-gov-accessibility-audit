
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="site-brand">
          <h1>India.gov.in Accessibility Audit</h1>
        </div>

        <nav aria-label="Main navigation">
          <ul className="nav-list">
            <li>
              <NavLink to="/">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/findings">Findings</NavLink>
            </li>
            <li>
              <NavLink to="/data-table">Data Table</NavLink>
            </li>
            <li>
              <NavLink to="/feedback">Feedback</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
