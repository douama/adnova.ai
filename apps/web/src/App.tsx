import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./stores/authStore";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { OnboardingPage } from "./pages/Onboarding";
import { DashboardPage } from "./pages/Dashboard";
import { ConnectedAccounts } from "./pages/ConnectedAccounts";

export function App() {
  const { session, loading } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center text-slate-500">Loading…</div>;

  return (
    <Routes>
      <Route path="/login" element={session ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/register" element={session ? <Navigate to="/" replace /> : <RegisterPage />} />
      <Route path="/onboarding" element={session ? <OnboardingPage /> : <Navigate to="/login" replace />} />
      <Route
        path="/"
        element={session ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<DashboardPage />} />
        <Route path="accounts" element={<ConnectedAccounts />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
