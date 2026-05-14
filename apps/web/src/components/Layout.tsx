import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../stores/authStore";
import { useCurrentTenant, useTenants } from "../stores/tenantStore";

const nav = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/decisions", label: "Decision Log" },
  { to: "/creatives", label: "Creatives" },
  { to: "/accounts", label: "Accounts" },
];

export function Layout() {
  const user = useAuth((s) => s.user);
  const signOut = useAuth((s) => s.signOut);
  const currentTenant = useCurrentTenant();
  const tenants = useTenants((s) => s.tenants);
  const setCurrent = useTenants((s) => s.setCurrent);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-60 flex-col border-r border-slate-200 bg-white p-4 md:flex">
        <div className="mb-6 px-2">
          <div className="text-lg font-semibold" style={{ color: "#FF4D00" }}>
            AdNova<span style={{ color: "#FF4D00" }}>.</span>
          </div>
          <div className="text-xs text-slate-500">{currentTenant?.name ?? "—"}</div>
        </div>

        {tenants.length > 1 ? (
          <select
            value={currentTenant?.tenant_id ?? ""}
            onChange={(e) => setCurrent(e.target.value)}
            className="mb-3 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700"
          >
            {tenants.map((t) => (
              <option key={t.tenant_id} value={t.tenant_id}>
                {t.name} · {t.role}
              </option>
            ))}
          </select>
        ) : null}

        <nav className="flex flex-col gap-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "rounded-md px-3 py-2 text-sm",
                  isActive ? "bg-brand-50 text-brand-700 font-medium" : "text-slate-700 hover:bg-slate-100",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div className="text-sm text-slate-500">{user?.email}</div>
          <button
            onClick={signOut}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            Sign out
          </button>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
