import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./stores/authStore";
import { useTenants } from "./stores/tenantStore";
import { PublicLayout } from "./components/layout/PublicLayout";
import { TenantLayout } from "./components/layout/TenantLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { RequireAuth } from "./components/layout/RequireAuth";
import { RequireSuperAdmin } from "./components/layout/RequireSuperAdmin";

// Public marketing
import { LandingPage } from "./pages/public/Landing";
import { PricingPage } from "./pages/public/Pricing";
import { CustomersPage } from "./pages/public/Customers";
import { VsSmartlyPage } from "./pages/public/VsSmartly";
import { BlogPage } from "./pages/public/Blog";
import { BlogArticlePage } from "./pages/public/BlogArticle";
import { AboutPage } from "./pages/public/About";
import { CareersPage } from "./pages/public/Careers";
import { PressKitPage } from "./pages/public/PressKit";
import { PartnersPage } from "./pages/public/Partners";
import { TermsPage } from "./pages/public/Terms";
import { PrivacyPage } from "./pages/public/Privacy";
import { AffiliateApplyPage } from "./pages/public/AffiliateApply";

// Auth
import { LoginPage } from "./pages/auth/Login";
import { RegisterPage } from "./pages/auth/Register";
import { AuthCallback } from "./pages/auth/AuthCallback";
import { OnboardingPage } from "./pages/auth/Onboarding";

// Tenant app
import { DashboardPage } from "./pages/tenant/Dashboard";
import { DecisionsPage } from "./pages/tenant/Decisions";
import { CreativesPage } from "./pages/tenant/Creatives";
import { AudiencesPage } from "./pages/tenant/Audiences";
import { AutomationPage } from "./pages/tenant/Automation";
import { SettingsPage } from "./pages/tenant/Settings";
import { AffiliateDashboardPage } from "./pages/tenant/Affiliate";

// Super admin
import { AdminLoginPage } from "./pages/admin/AdminLogin";
import { AdminOverview } from "./pages/admin/Overview";
import { AdminIntegrations } from "./pages/admin/Integrations";
import { AdminTenants } from "./pages/admin/Tenants";
import { AdminUsers } from "./pages/admin/Users";
import { AdminAIMonitor } from "./pages/admin/AIMonitor";
import { AdminRevenue } from "./pages/admin/Revenue";
import { AdminLogs } from "./pages/admin/Logs";
import { AdminPlatforms } from "./pages/admin/Platforms";
import { AdminCampaigns } from "./pages/admin/Campaigns";
import { AdminCreatives } from "./pages/admin/Creatives";
import { AdminAffiliates } from "./pages/admin/Affiliates";

export function App() {
  const { session, loading, init } = useAuth();
  const loadTenants = useTenants((s) => s.load);
  const clearTenants = useTenants((s) => s.clear);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (session) loadTenants();
    else clearTenants();
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
      {/* Public marketing (with Nav + Footer) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/vs-smartly" element={<VsSmartlyPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/press-kit" element={<PressKitPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/affiliate/apply" element={<AffiliateApplyPage />} />
      </Route>

      {/* Auth (full-bleed dark, no PublicLayout chrome) */}
      <Route
        path="/login"
        element={session ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={session ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
      />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/onboarding"
        element={
          <RequireAuth>
            <OnboardingPage />
          </RequireAuth>
        }
      />

      {/* Authenticated tenant app */}
      <Route
        element={
          <RequireAuth>
            <TenantLayout />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/decisions" element={<DecisionsPage />} />
        <Route path="/creatives" element={<CreativesPage />} />
        <Route path="/audiences" element={<AudiencesPage />} />
        <Route path="/automation" element={<AutomationPage />} />
        <Route path="/affiliate" element={<AffiliateDashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Super-admin login (full-bleed, no admin layout) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Super-admin console (gated by is_super_admin RPC) */}
      <Route
        element={
          <RequireSuperAdmin>
            <AdminLayout />
          </RequireSuperAdmin>
        }
      >
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/platforms" element={<AdminPlatforms />} />
        <Route path="/admin/campaigns" element={<AdminCampaigns />} />
        <Route path="/admin/creatives" element={<AdminCreatives />} />
        <Route path="/admin/integrations" element={<AdminIntegrations />} />
        <Route path="/admin/tenants" element={<AdminTenants />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/affiliates" element={<AdminAffiliates />} />
        <Route path="/admin/ai-monitor" element={<AdminAIMonitor />} />
        <Route path="/admin/revenue" element={<AdminRevenue />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
