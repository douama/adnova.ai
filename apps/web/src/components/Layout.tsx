import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../stores/authStore";

const nav = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/campaigns", label: "Campaigns" },
  { to: "/creatives", label: "Creatives" },
  { to: "/analytics", label: "Analytics" },
  { to: "/automation", label: "Automation" },
  { to: "/accounts", label: "Accounts" },
  { to: "/settings", label: "Settings" },
];

export function Layout() {
  const { session, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-60 flex-col border-r border-slate-200 bg-white p-4 md:flex">
        <div className="mb-6 px-2">
          <div className="text-lg font-semibold text-brand-700">AdNova AI</div>
          <div className="text-xs text-slate-500">Phase 1 — skeleton</div>
        </div>
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
          <div className="text-sm text-slate-500">{session?.email}</div>
          <button
            onClick={logout}
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
