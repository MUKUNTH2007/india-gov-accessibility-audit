
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("dashboard-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dashboard-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

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

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>
    </>
  );
}
