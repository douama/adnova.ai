import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./stores/authStore";
import { useTenants } from "./stores/tenantStore";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { AuthCallback } from "./pages/AuthCallback";
import { OnboardingPage } from "./pages/Onboarding";
import { DashboardPage } from "./pages/Dashboard";
import { DecisionsPage } from "./pages/Decisions";
import { CreativesPage } from "./pages/Creatives";
import { ConnectedAccounts } from "./pages/ConnectedAccounts";

export function App() {
  const { session, loading, init } = useAuth();
  const loadTenants = useTenants((s) => s.load);
  const clearTenants = useTenants((s) => s.clear);

  // Bootstrap auth listener au démarrage
  useEffect(() => {
    init();
  }, [init]);

  // Charge la liste des tenants quand la session devient active.
  // Clear quand on se déconnecte.
  useEffect(() => {
    if (session) {
      loadTenants();
    } else {
      clearTenants();
    }
  }, [session, loadTenants, clearTenants]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center text-slate-500">
        <div className="text-center">
          <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-brand-600" />
          Chargement…
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={session ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/register" element={session ? <Navigate to="/" replace /> : <RegisterPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/onboarding" element={session ? <OnboardingPage /> : <Navigate to="/login" replace />} />
      <Route path="/" element={session ? <Layout /> : <Navigate to="/login" replace />}>
        <Route index element={<DashboardPage />} />
        <Route path="decisions" element={<DecisionsPage />} />
        <Route path="creatives" element={<CreativesPage />} />
        <Route path="accounts" element={<ConnectedAccounts />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
