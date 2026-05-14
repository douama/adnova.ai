import { Navigate } from "react-router-dom";
import { useAuth } from "../../stores/authStore";
import { useIsSuperAdmin } from "../../lib/superAdmin";

export function RequireSuperAdmin({ children }: { children: React.ReactNode }) {
  const session = useAuth((s) => s.session);
  const state = useIsSuperAdmin();

  // Not authenticated at all → send to admin login (separate UX from tenant)
  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (state.status === "loading") {
    return (
      <div className="grid min-h-screen place-items-center bg-bg text-muted-strong">
        <div className="text-center">
          <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-border border-t-orange" />
          <p className="text-sm">Checking access…</p>
        </div>
      </div>
    );
  }

  // Authenticated but NOT super-admin → show admin login with error
  // (cleaner UX than redirecting to /dashboard which feels random)
  if (state.status === "error" || !state.isSuperAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
