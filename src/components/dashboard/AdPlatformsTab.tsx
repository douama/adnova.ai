import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  Lock,
  Plus,
  Trash2,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { PLATFORMS } from "../../data/platforms";
import { PlatformIcon } from "../ui/PlatformIcon";
import { useCurrentTenant, useCurrentTenantId } from "../../stores/tenantStore";
import type { Database } from "../../lib/database.types";

type Connection = Database["public"]["Tables"]["platform_connections"]["Row"];
type PlanTier = Database["public"]["Enums"]["plan_tier"];

// Plan → allowed platforms.
// trial    → only Meta (the user can validate the full flow with the most common platform)
// starter  → Meta + Google
// growth   → all 9
// enterprise → all 9
const PLAN_ACCESS: Record<PlanTier, string[]> = {
  trial: ["meta"],
  starter: ["meta", "google"],
  growth: PLATFORMS.map((p) => p.id),
  enterprise: PLATFORMS.map((p) => p.id),
};

// Human-readable unlock copy
function planRequiredFor(platform: string): { plan: string; label: string } {
  if (platform === "google") return { plan: "starter", label: "Starter" };
  return { plan: "growth", label: "Pro" };
}

// Per-platform credential hints surfaced in the modal
const CREDENTIAL_HINTS: Record<string, { tokenLabel: string; tokenPlaceholder: string; accountLabel: string; accountPlaceholder: string; docsUrl: string }> = {
  meta: {
    tokenLabel: "Long-lived user access token",
    tokenPlaceholder: "EAAB...",
    accountLabel: "Ad account ID (optional)",
    accountPlaceholder: "act_1234567890",
    docsUrl: "https://developers.facebook.com/docs/marketing-api/get-started",
  },
  google: {
    tokenLabel: "OAuth refresh token",
    tokenPlaceholder: "1//0g-...",
    accountLabel: "Customer ID",
    accountPlaceholder: "123-456-7890",
    docsUrl: "https://developers.google.com/google-ads/api/docs/oauth/overview",
  },
  tiktok: {
    tokenLabel: "Long-term access token",
    tokenPlaceholder: "Access token from TikTok Business",
    accountLabel: "Advertiser ID",
    accountPlaceholder: "1234567890",
    docsUrl: "https://business-api.tiktok.com/portal",
  },
  linkedin: {
    tokenLabel: "OAuth access token",
    tokenPlaceholder: "AQXd...",
    accountLabel: "Ad account URN",
    accountPlaceholder: "urn:li:sponsoredAccount:1234567",
    docsUrl: "https://learn.microsoft.com/en-us/linkedin/marketing/getting-started",
  },
  youtube: {
    tokenLabel: "OAuth refresh token",
    tokenPlaceholder: "1//0g-...",
    accountLabel: "Customer ID",
    accountPlaceholder: "123-456-7890",
    docsUrl: "https://developers.google.com/google-ads/api/docs/oauth/overview",
  },
  pinterest: {
    tokenLabel: "Access token",
    tokenPlaceholder: "pina_...",
    accountLabel: "Ad account ID",
    accountPlaceholder: "549...",
    docsUrl: "https://developers.pinterest.com/docs/getting-started/authentication/",
  },
  snapchat: {
    tokenLabel: "OAuth refresh token",
    tokenPlaceholder: "Snapchat refresh token",
    accountLabel: "Ad account ID",
    accountPlaceholder: "8c8a2f...",
    docsUrl: "https://marketingapi.snapchat.com/docs/",
  },
  x: {
    tokenLabel: "OAuth 2.0 access token",
    tokenPlaceholder: "Bearer ...",
    accountLabel: "Ad account ID",
    accountPlaceholder: "18ce5...",
    docsUrl: "https://developer.x.com/en/docs/twitter-ads-api",
  },
  amazon: {
    tokenLabel: "LWA refresh token",
    tokenPlaceholder: "Atzr|...",
    accountLabel: "Profile ID",
    accountPlaceholder: "1234567890",
    docsUrl: "https://advertising.amazon.com/API/docs/en-us/getting-started/overview",
  },
};

export function AdPlatformsTab() {
  const tenantId = useCurrentTenantId();
  const tenant = useCurrentTenant();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<string | null>(null);

  const plan: PlanTier = (tenant?.plan ?? "trial") as PlanTier;
  const allowed = PLAN_ACCESS[plan] ?? PLAN_ACCESS.trial!;

  const reload = useCallback(async () => {
    if (!tenantId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("platform_connections")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("created_at", { ascending: false });
      if (error) {
        setError(error.message);
        return;
      }
      setConnections((data ?? []) as Connection[]);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    reload();
  }, [reload]);

  async function removeConnection(connectionId: string) {
    if (!tenantId) return;
    if (!confirm("Disconnect this ad account? Existing campaigns stay intact, but the AI will stop syncing it.")) return;
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke<{ ok?: boolean; error?: string }>(
        "connect-ad-platform",
        { body: { action: "delete", tenant_id: tenantId, connection_id: connectionId } },
      );
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setSuccess("Connection removed");
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-muted-strong">
          Connect your ad accounts so AdNova can read campaigns, generate creatives, and run
          optimizations. Available platforms depend on your plan{" "}
          <span className="rounded-md border border-orange/30 bg-orange/[0.06] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange">
            {plan}
          </span>
          .
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-xl border border-orange/30 bg-orange/[0.06] px-4 py-3 text-sm text-orange">
          {success}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORMS.map((p) => {
          const isAllowed = allowed.includes(p.id);
          const conn = connections.find((c) => c.platform === p.id && c.is_active);
          const required = planRequiredFor(p.id);
          return (
            <div
              key={p.id}
              className={`flex items-start justify-between gap-3 rounded-2xl border p-5 transition-colors ${
                conn
                  ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                  : isAllowed
                  ? "border-border bg-card hover:border-border-strong"
                  : "border-border bg-card opacity-70"
              }`}
            >
              <div className="flex min-w-0 items-start gap-3">
                <PlatformIcon platform={p.id} className="h-9 w-9 shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-ink">{p.name}</span>
                    {!isAllowed ? (
                      <Lock className="h-3 w-3 text-muted" strokeWidth={2} />
                    ) : null}
                  </div>
                  {conn ? (
                    <div className="mt-0.5 truncate text-[10px] text-emerald-400" title={conn.account_name ?? conn.account_id}>
                      Connected · {conn.account_name ?? conn.account_id.slice(0, 12)}
                    </div>
                  ) : (
                    <div className="text-[10px] uppercase tracking-wider text-muted">
                      {isAllowed ? "Not connected" : `Locked · ${required.label}+`}
                    </div>
                  )}
                </div>
              </div>

              {conn ? (
                <button
                  onClick={() => removeConnection(conn.id)}
                  className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-muted/30 bg-muted/[0.04] px-2.5 text-xs font-medium text-muted-strong transition-colors hover:border-muted/50 hover:text-ink"
                  title="Disconnect"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              ) : isAllowed ? (
                <button
                  onClick={() => setConnecting(p.id)}
                  disabled={loading}
                  className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-orange/40 bg-orange/[0.08] px-3 text-xs font-bold text-orange transition-colors hover:bg-orange/[0.14]"
                >
                  <Plus className="h-3 w-3" /> Connect
                </button>
              ) : (
                <a
                  href="/pricing"
                  className="inline-flex h-9 shrink-0 items-center rounded-lg border border-border bg-white/[0.03] px-3 text-xs font-medium text-muted-strong transition-colors hover:border-border-strong hover:text-ink"
                >
                  Upgrade
                </a>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-muted">
        <strong className="text-body">Trial</strong> · Meta only · <strong className="text-body">Starter</strong> · Meta + Google ·{" "}
        <strong className="text-body">Pro / Agency / Enterprise</strong> · all 9 platforms.
        Native OAuth flows in next sprint — for now we accept long-lived access tokens generated
        from each platform's developer dashboard.
      </p>

      {connecting && tenantId ? (
        <ConnectModal
          platform={connecting}
          tenantId={tenantId}
          onClose={() => setConnecting(null)}
          onCreated={async () => {
            setConnecting(null);
            await reload();
            setSuccess("Ad account connected ✓");
          }}
        />
      ) : null}
    </div>
  );
}

function ConnectModal({
  platform,
  tenantId,
  onClose,
  onCreated,
}: {
  platform: string;
  tenantId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const def = PLATFORMS.find((p) => p.id === platform);
  const hint = CREDENTIAL_HINTS[platform] ?? CREDENTIAL_HINTS.meta!;
  const [accessToken, setAccessToken] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [busy, setBusy] = useState<"test" | "create" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  async function testIt() {
    setError(null);
    setTestResult(null);
    setBusy("test");
    try {
      const { data, error } = await supabase.functions.invoke<{ ok?: boolean; info?: { account_name?: string; account_id?: string; pending_validation?: boolean }; error?: string }>(
        "connect-ad-platform",
        { body: { action: "test", provider: platform, access_token: accessToken.trim(), account_id: accountId.trim() || undefined } },
      );
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (data?.info?.pending_validation) {
        setTestResult("Token accepted (live validation pending).");
      } else {
        setTestResult(`✓ ${data?.info?.account_name ?? data?.info?.account_id ?? "Token is valid"}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Test failed");
    } finally {
      setBusy(null);
    }
  }

  async function save() {
    setError(null);
    setBusy("create");
    try {
      const { data, error } = await supabase.functions.invoke<{ ok?: boolean; error?: string }>(
        "connect-ad-platform",
        {
          body: {
            action: "create",
            tenant_id: tenantId,
            provider: platform,
            access_token: accessToken.trim(),
            account_id: accountId.trim() || undefined,
            account_name: accountName.trim() || undefined,
          },
        },
      );
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      onCreated();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && !busy) onClose();
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
        className="glass-strong glass-highlight w-full max-w-lg overflow-hidden rounded-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-border px-6 py-4">
          <div className="flex items-start gap-3">
            <PlatformIcon platform={platform} className="h-10 w-10 shrink-0" />
            <div>
              <h2 className="text-base font-bold text-ink">Connect {def?.name}</h2>
              <p className="mt-0.5 text-xs text-muted">
                Long-lived access token from your {def?.name} developer dashboard.
              </p>
            </div>
          </div>
          <a
            href={hint.docsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md border border-border bg-white/[0.03] px-2 text-[10px] text-muted-strong transition-colors hover:text-orange"
          >
            Docs <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>

        <div className="space-y-4 px-6 py-5">
          <label className="block">
            <span className="text-xs font-medium text-muted-strong">{hint.tokenLabel}</span>
            <input
              type="password"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              required
              placeholder={hint.tokenPlaceholder}
              className="field-input mt-1.5 font-mono"
              autoComplete="off"
              spellCheck={false}
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-muted-strong">
              {hint.accountLabel}
              {platform === "meta" ? (
                <span className="ml-1 text-muted">— auto-detected if blank</span>
              ) : null}
            </span>
            <input
              type="text"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              required={platform !== "meta"}
              placeholder={hint.accountPlaceholder}
              className="field-input mt-1.5 font-mono"
              autoComplete="off"
              spellCheck={false}
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-muted-strong">
              Friendly name <span className="text-muted">(optional)</span>
            </span>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder='e.g. "Maison Aubergine · Main"'
              className="field-input mt-1.5"
            />
          </label>

          {platform !== "meta" ? (
            <div className="flex items-start gap-2 rounded-xl border border-orange/20 bg-orange/[0.04] px-3 py-2.5 text-[11px] text-orange">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                Live validation for {def?.name} ships in the next release. Tokens are stored
                securely and flagged "pending validation" — the AI starts syncing once we wire
                the API.
              </span>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-3 py-2 text-xs text-muted-strong">
              {error}
            </div>
          ) : null}
          {testResult ? (
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] px-3 py-2 text-xs text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {testResult}
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-border bg-bg/40 px-6 py-3">
          <button
            type="button"
            onClick={testIt}
            disabled={busy !== null || !accessToken}
            className="inline-flex h-9 items-center rounded-lg border border-border bg-white/[0.03] px-3 text-xs font-medium text-body transition-colors hover:border-border-strong disabled:opacity-50"
          >
            {busy === "test" ? "Testing…" : "Test"}
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={busy !== null}
              className="inline-flex h-9 items-center rounded-lg border border-border bg-white/[0.03] px-3 text-xs font-medium text-body transition-colors hover:border-border-strong disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy !== null || !accessToken}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-orange px-3.5 text-xs font-bold text-white transition-all hover:bg-orange-hover disabled:opacity-50"
            >
              {busy === "create" ? "Connecting…" : "Connect"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
