
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Findings from "./pages/Findings";
import DataTable from "./pages/DataTable";
import Feedback from "./pages/Feedback";

export default function App() {
  return (
    <>
      <Header />

      <div className="app-layout">
        <Sidebar />

        <main id="main-content" className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/findings" element={<Findings />} />
            <Route path="/data-table" element={<DataTable />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
      </div>

      <footer className="page-footer">
        India.gov.in Accessibility Audit – Internship Stage 2
      </footer>
    </>
  );
}
