import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Gauge,
  Building2,
  Users,
  Sparkles,
  DollarSign,
  AlertCircle,
  LogOut,
  Shield,
  Plug,
  Network,
  Megaphone,
  Image as ImageIcon,
  Handshake,
} from "lucide-react";
import { Logo } from "../ui/logo";
import { ThemeToggle } from "../ui/ThemeToggle";
import { LanguageToggle } from "../ui/LanguageToggle";
import { useAuth } from "../../stores/authStore";

const NAV_SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: "Operations",
    items: [
      { to: "/admin", label: "Overview", icon: Gauge, end: true },
      { to: "/admin/ai-monitor", label: "AI Monitor", icon: Sparkles },
      { to: "/admin/logs", label: "Errors", icon: AlertCircle },
    ],
  },
  {
    title: "Ad infrastructure",
    items: [
      { to: "/admin/platforms", label: "Ad Platforms", icon: Network },
      { to: "/admin/campaigns", label: "Campaigns", icon: Megaphone },
      { to: "/admin/creatives", label: "Creatives", icon: ImageIcon },
      { to: "/admin/integrations", label: "AI Integrations", icon: Plug },
    ],
  },
  {
    title: "Business",
    items: [
      { to: "/admin/tenants", label: "Tenants", icon: Building2 },
      { to: "/admin/users", label: "Users", icon: Users },
      { to: "/admin/affiliates", label: "Affiliates", icon: Handshake },
      { to: "/admin/revenue", label: "Revenue", icon: DollarSign },
    ],
  },
];

type NavItem = {
  to: string;
  label: string;
  icon: React.ElementType;
  end?: boolean;
};

export function AdminLayout() {
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
      <div className="flex h-16 items-center gap-2 px-6">
        <Logo />
        <span className="rounded-md border border-orange/30 bg-orange/[0.08] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange">
          Admin
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted">
              {section.title}
            </div>
            {section.items.map((item) => {
              const isActive = item.end
                ? location.pathname === item.to
                : location.pathname === item.to ||
                  location.pathname.startsWith(item.to + "/");
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
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
          </div>
        ))}
      </nav>

      <div className="border-t border-border px-3 py-3">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
        >
          ← Back to tenant app
        </Link>
      </div>
    </aside>
  );
}

function Topbar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const initial =
    (user?.user_metadata?.full_name as string | undefined)?.[0]?.toUpperCase() ??
    user?.email?.[0]?.toUpperCase() ??
    "?";

  return (
    <header className="glass-strong sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border px-6 sm:px-10">
      <div className="flex items-center gap-2 text-sm text-muted-strong">
        <Shield className="h-4 w-4 text-orange" strokeWidth={1.75} />
        <span>Super-admin console</span>
      </div>

      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-orange/30 bg-orange/[0.08] text-sm font-bold text-orange transition-colors hover:bg-orange/[0.12]"
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
      </div>
    </header>
  );
}
