import { Navigate } from "react-router-dom";
import { useIsSuperAdmin } from "../../lib/superAdmin";

export function RequireSuperAdmin({ children }: { children: React.ReactNode }) {
  const state = useIsSuperAdmin();

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

  if (state.status === "error" || !state.isSuperAdmin) {
    // Non-admins are redirected to the regular tenant dashboard.
    // Server-side RLS will block them from data anyway.
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
