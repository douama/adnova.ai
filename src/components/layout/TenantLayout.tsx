import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  Image as ImageIcon,
  Users,
  Workflow,
  Settings as SettingsIcon,
  LogOut,
  ChevronsUpDown,
  Check,
  Handshake,
} from "lucide-react";
import { Logo } from "../ui/logo";
import { useAuth } from "../../stores/authStore";
import { useCurrentTenant, useTenants } from "../../stores/tenantStore";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/decisions", label: "Decisions", icon: ListChecks },
  { to: "/creatives", label: "Creatives", icon: ImageIcon },
  { to: "/audiences", label: "Audiences", icon: Users },
  { to: "/automation", label: "Automation", icon: Workflow },
  { to: "/affiliate", label: "Partner", icon: Handshake },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export function TenantLayout() {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-6 py-8 sm:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="hidden w-60 flex-col border-r border-border bg-surface lg:flex">
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {NAV.map((item) => {
          const isActive =
            location.pathname === item.to ||
            location.pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-orange/[0.08] text-orange"
                  : "text-muted-strong hover:bg-white/[0.04] hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-border px-3 py-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
        >
          ← Back to homepage
        </Link>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-bg/60 px-6 backdrop-blur-xl sm:px-10">
      <TenantSwitcher />
      <UserMenu />
    </header>
  );
}

function TenantSwitcher() {
  const tenants = useTenants((s) => s.tenants);
  const current = useCurrentTenant();
  const setCurrent = useTenants((s) => s.setCurrent);
  const [open, setOpen] = useState(false);

  if (!current) {
    return (
      <div className="text-sm text-muted">Loading workspace…</div>
    );
  }

  if (tenants.length === 1) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-orange/[0.12] text-xs font-bold text-orange">
          {current.name?.[0]?.toUpperCase() ?? "?"}
        </div>
        <div>
          <div className="font-bold text-ink">{current.name}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted">
            {current.role}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-border-strong"
      >
        <div className="grid h-7 w-7 place-items-center rounded-md bg-orange/[0.12] text-xs font-bold text-orange">
          {current.name?.[0]?.toUpperCase() ?? "?"}
        </div>
        <div className="text-left">
          <div className="font-bold text-ink">{current.name}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted">
            {current.role}
          </div>
        </div>
        <ChevronsUpDown className="ml-2 h-3.5 w-3.5 text-muted" />
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-full z-20 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-card shadow-card">
            <div className="border-b border-border px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted">
              Workspaces
            </div>
            <ul className="max-h-64 overflow-y-auto">
              {tenants.map((t) => {
                const active = t.tenant_id === current.tenant_id;
                return (
                  <li key={t.tenant_id}>
                    <button
                      onClick={() => {
                        setCurrent(t.tenant_id);
                        setOpen(false);
                      }}
                      className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="flex items-center gap-2">
                        <div className="grid h-6 w-6 place-items-center rounded bg-orange/[0.12] text-[10px] font-bold text-orange">
                          {t.name?.[0]?.toUpperCase() ?? "?"}
                        </div>
                        <span>
                          <span className="block text-ink">{t.name}</span>
                          <span className="block text-[10px] uppercase tracking-wider text-muted">
                            {t.role}
                          </span>
                        </span>
                      </span>
                      {active ? <Check className="h-3.5 w-3.5 text-orange" /> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}

function UserMenu() {
  const { user, signOut } = useAuth();
  const initial =
    (user?.user_metadata?.full_name as string | undefined)?.[0]?.toUpperCase() ??
    user?.email?.[0]?.toUpperCase() ??
    "?";
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-sm font-bold text-ink transition-colors hover:border-border-strong"
      >
        {initial}
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card shadow-card">
            <div className="border-b border-border px-3 py-3">
              <div className="text-xs font-bold uppercase tracking-wider text-muted">
                Signed in as
              </div>
              <div className="mt-1 truncate text-sm text-ink">{user?.email}</div>
            </div>
            <ul>
              <li>
                <Link
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-body transition-colors hover:bg-white/[0.04] hover:text-ink"
                >
                  <SettingsIcon className="h-3.5 w-3.5" />
                  Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-body transition-colors hover:bg-white/[0.04] hover:text-ink"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
