import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Findings from "./pages/Findings";
import DataTable from "./pages/DataTable";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";

import { AuthProvider, useAuth } from "./context/AuthContext";

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <footer className="page-footer">
        India.gov.in Accessibility Audit – Internship Stage 2
      </footer>
    </>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        }
      />

      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
