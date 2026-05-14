import { useState } from "react";
import { User, Building2, Plug, ShoppingBag } from "lucide-react";
import { useAuth } from "../../stores/authStore";
import { useCurrentTenant } from "../../stores/tenantStore";
import { EcommerceTab } from "../../components/dashboard/EcommerceTab";
import { AdPlatformsTab } from "../../components/dashboard/AdPlatformsTab";

type Tab = "account" | "workspace" | "integrations" | "ecommerce";

export function SettingsPage() {
  const [tab, setTab] = useState<Tab>("account");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">Settings</h1>
        <p className="mt-1 text-sm text-muted-strong">
          Manage your account, workspace, and integrations.
        </p>
      </div>

      <div className="flex gap-1 border-b border-border">
        <TabBtn active={tab === "account"} onClick={() => setTab("account")} icon={<User className="h-3.5 w-3.5" />}>
          Account
        </TabBtn>
        <TabBtn active={tab === "workspace"} onClick={() => setTab("workspace")} icon={<Building2 className="h-3.5 w-3.5" />}>
          Workspace
        </TabBtn>
        <TabBtn active={tab === "integrations"} onClick={() => setTab("integrations")} icon={<Plug className="h-3.5 w-3.5" />}>
          Ad platforms
        </TabBtn>
        <TabBtn active={tab === "ecommerce"} onClick={() => setTab("ecommerce")} icon={<ShoppingBag className="h-3.5 w-3.5" />}>
          E-commerce
        </TabBtn>
      </div>

      <div>
        {tab === "account" && <AccountTab />}
        {tab === "workspace" && <WorkspaceTab />}
        {tab === "integrations" && <AdPlatformsTab />}
        {tab === "ecommerce" && <EcommerceTab />}
      </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm transition-colors ${
        active
          ? "border-orange font-bold text-ink"
          : "border-transparent text-muted-strong hover:text-ink"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function AccountTab() {
  const { user } = useAuth();
  const fullName = (user?.user_metadata?.full_name as string | undefined) ?? "—";
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card title="Profile" subtitle="Your personal info on AdNova.">
        <KV label="Full name" value={fullName} />
        <KV label="Email" value={user?.email ?? "—"} />
        <KV label="User ID" value={user?.id ?? "—"} mono />
        <p className="mt-4 text-xs text-muted">
          Profile editing arrives soon. Reach out to support to change anything.
        </p>
      </Card>
      <Card title="Sessions" subtitle="Devices and sessions logged into your account.">
        <KV label="Current session" value="Active · this browser" />
        <KV
          label="Last sign-in"
          value={user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "—"}
        />
      </Card>
    </div>
  );
}

function WorkspaceTab() {
  const tenant = useCurrentTenant();
  if (!tenant) {
    return <p className="text-sm text-muted">Loading workspace…</p>;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card title="Workspace" subtitle="Settings for this tenant.">
        <KV label="Name" value={tenant.name} />
        <KV label="Your role" value={tenant.role} />
        <KV label="Plan" value={tenant.plan ?? "trial"} />
        <KV label="Tenant ID" value={tenant.tenant_id} mono />
      </Card>
      <Card title="Members" subtitle="Invite teammates and manage roles.">
        <p className="text-sm text-muted">
          Member management ships next. For now, owners can invite via the Supabase Auth admin
          panel.
        </p>
      </Card>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <p className="mt-1 text-xs text-muted">{subtitle}</p>
      <div className="mt-5 space-y-3">{children}</div>
    </div>
  );
}

function KV({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 text-sm">
      <span className="text-muted">{label}</span>
      <span className={`text-ink ${mono ? "font-mono text-xs" : ""}`}>{value}</span>
    </div>
  );
}
