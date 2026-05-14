import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./stores/authStore";
import { useTenants } from "./stores/tenantStore";
import { PublicLayout } from "./components/layout/PublicLayout";
import { RequireAuth } from "./components/layout/RequireAuth";

import { LandingPage } from "./pages/public/Landing";
import { LoginPage } from "./pages/auth/Login";
import { RegisterPage } from "./pages/auth/Register";
import { AuthCallback } from "./pages/AuthCallback";
import { OnboardingPage } from "./pages/Onboarding";
import { DashboardPage } from "./pages/tenant/Dashboard";

export function App() {
  const { session, loading, init } = useAuth();
  const loadTenants = useTenants((s) => s.load);
  const clearTenants = useTenants((s) => s.clear);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (session) {
      loadTenants();
    } else {
      clearTenants();
    }
  }, [session, loadTenants, clearTenants]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg text-muted-strong">
        <div className="text-center">
          <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-border border-t-orange" />
          <p className="text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public marketing */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        {/* M3 marketing pages plug in here :
            /pricing /customers /vs-smartly /blog /about /careers /press-kit
            /partners /terms /privacy */}
      </Route>

      {/* Auth (full-bleed dark, no PublicLayout) */}
      <Route
        path="/login"
        element={session ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={session ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
      />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Auth-required */}
      <Route
        path="/onboarding"
        element={
          <RequireAuth>
            <OnboardingPage />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />

      {/* Fallback : send anything unknown back to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
