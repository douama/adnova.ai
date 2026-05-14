import { useCallback, useEffect, useState } from "react";
import {
  KeyRound,
  Pencil,
  Trash2,
  CheckCircle2,
  Lock,
  ExternalLink,
  Copy,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { PLATFORMS } from "../../data/platforms";
import { PlatformIcon } from "../../components/ui/PlatformIcon";

type OAuthApp = {
  platform: string;
  client_id_preview: string;
  scopes: string;
  is_active: boolean;
  configured_at: string;
  configured_by_email: string | null;
  notes: string | null;
};

// Where each platform's OAuth app is registered, so admins can deep-link to it.
const PLATFORM_DOCS: Record<string, string> = {
  meta: "https://developers.facebook.com/apps",
  google: "https://console.cloud.google.com/apis/credentials",
  tiktok: "https://business-api.tiktok.com/portal",
  linkedin: "https://www.linkedin.com/developers/apps",
  youtube: "https://console.cloud.google.com/apis/credentials",
  pinterest: "https://developers.pinterest.com/apps",
  snapchat: "https://kit.snapchat.com/portal",
  x: "https://developer.x.com/en/portal/dashboard",
  amazon: "https://advertising.amazon.com/API/docs/en-us/setting-up/overview",
};

function fmtAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function AdminOAuthApps() {
  const [apps, setApps] = useState<Record<string, OAuthApp>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const redirectUri =
    typeof window !== "undefined"
      ? `${window.location.origin}/oauth/callback`
      : "/oauth/callback";

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("list_oauth_apps");
      if (error) {
        setError(error.message);
        return;
      }
      const map: Record<string, OAuthApp> = {};
      for (const row of (data ?? []) as OAuthApp[]) map[row.platform] = row;
      setApps(map);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  async function onRevoke(platform: string) {
    if (!confirm(`Revoke ${platform} OAuth app? Existing tenant connections stay; new "Sign in with ${platform}" attempts will fail until you re-add the app.`)) return;
    setError(null);
    try {
      const { error } = await supabase.rpc("delete_oauth_app", { p_platform: platform });
      if (error) throw error;
      setSuccess(`${platform} OAuth app removed.`);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  async function copyRedirect() {
    try {
      await navigator.clipboard.writeText(redirectUri);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (_) { /* ignore */ }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">OAuth apps</h1>
        <p className="mt-1 text-sm text-muted-strong">
          Register one developer app per ad platform. AdNova uses these credentials to redirect
          every tenant through a "Sign in with X" flow.
        </p>
      </div>

      <div className="glass glass-highlight rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-orange" strokeWidth={2} />
          <div className="flex-1">
            <h2 className="text-sm font-bold text-ink">Redirect URI to register</h2>
            <p className="mt-1 text-xs text-muted-strong">
              Paste this exact URL in each platform's developer console as the OAuth redirect /
              callback URL. Anything else and the token exchange will reject the code.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 truncate rounded-lg border border-orange/30 bg-orange/[0.05] px-3 py-2 font-mono text-xs text-orange">
                {redirectUri}
              </code>
              <button
                onClick={copyRedirect}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-white/[0.03] px-3 text-xs font-medium text-body transition-colors hover:border-border-strong"
              >
                {copied ? <CheckCircle2 className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
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

      <div className="grid gap-4">
        {PLATFORMS.map((p) => {
          const app = apps[p.id];
          const docsUrl = PLATFORM_DOCS[p.id];
          return (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <PlatformIcon platform={p.id} className="h-10 w-10 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-ink">{p.name}</h3>
                      {app?.is_active ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/[0.08] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md border border-muted/30 bg-muted/[0.08] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                          Not configured
                        </span>
                      )}
                    </div>
                    {app ? (
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                        <code className="rounded border border-orange/30 bg-orange/[0.06] px-1.5 py-0.5 font-mono text-orange">
                          {app.client_id_preview}
                        </code>
                        <span>
                          Rotated {fmtAgo(app.configured_at)}
                          {app.configured_by_email ? ` · by ${app.configured_by_email}` : ""}
                        </span>
                      </div>
                    ) : (
                      <p className="mt-1 text-xs text-muted">
                        Tenants will fall back to manual access-token paste until you register
                        the developer app.
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditing(p.id)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-orange/40 bg-orange/[0.08] px-3 text-xs font-medium text-orange transition-colors hover:bg-orange/[0.14]"
                  >
                    {app ? (
                      <>
                        <Pencil className="h-3 w-3" /> Rotate
                      </>
                    ) : (
                      <>
                        <KeyRound className="h-3 w-3" /> Register
                      </>
                    )}
                  </button>
                  {app ? (
                    <button
                      onClick={() => onRevoke(p.id)}
                      className="inline-flex h-9 items-center rounded-lg border border-muted/30 bg-muted/[0.05] px-2 text-xs text-muted-strong transition-colors hover:border-muted/50 hover:text-ink"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  ) : null}
                  {docsUrl ? (
                    <a
                      href={docsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center gap-1 text-[11px] text-muted transition-colors hover:text-orange"
                    >
                      Console
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {editing ? (
        <EditModal
          platform={editing}
          existing={apps[editing]}
          onClose={() => setEditing(null)}
          onSaved={async () => {
            setEditing(null);
            await reload();
            setSuccess("OAuth app saved.");
          }}
        />
      ) : null}

      {loading ? (
        <p className="text-center text-xs text-muted">Loading…</p>
      ) : null}
    </div>
  );
}

function EditModal({
  platform,
  existing,
  onClose,
  onSaved,
}: {
  platform: string;
  existing: OAuthApp | undefined;
  onClose: () => void;
  onSaved: () => void;
}) {
  const def = PLATFORMS.find((p) => p.id === platform);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [scopes, setScopes] = useState(existing?.scopes ?? "");
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const { error } = await supabase.rpc("set_oauth_app", {
        p_platform: platform,
        p_client_id: clientId.trim(),
        p_client_secret: clientSecret.trim(),
        p_scopes: scopes.trim() || null,
        p_notes: notes.trim() || null,
      });
      if (error) throw error;
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
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
        onSubmit={save}
        className="glass-strong glass-highlight w-full max-w-lg overflow-hidden rounded-2xl"
      >
        <div className="flex items-start gap-3 border-b border-border px-6 py-4">
          <PlatformIcon platform={platform} className="h-10 w-10 shrink-0" />
          <div>
            <h2 className="text-base font-bold text-ink">
              {existing ? "Rotate" : "Register"} {def?.name} OAuth app
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              Get the Client ID + Client Secret from the {def?.name} developer console. The
              redirect URI must match exactly (see the panel above).
            </p>
          </div>
        </div>
        <div className="space-y-4 px-6 py-5">
          <label className="block">
            <span className="text-xs font-medium text-muted-strong">Client ID</span>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
              minLength={3}
              placeholder={existing?.client_id_preview ?? "App / Client ID"}
              className="field-input mt-1.5 font-mono"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-strong">Client secret</span>
            <input
              type="password"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              required
              minLength={6}
              placeholder="•••••••••••••"
              className="field-input mt-1.5 font-mono"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-strong">
              Scopes{" "}
              <span className="text-muted">(optional — defaults vary per platform)</span>
            </span>
            <input
              type="text"
              value={scopes}
              onChange={(e) => setScopes(e.target.value)}
              placeholder="e.g. ads_read,ads_management,business_management"
              className="field-input mt-1.5 font-mono text-[11px]"
              autoComplete="off"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-strong">
              Notes <span className="text-muted">(optional)</span>
            </span>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={200}
              className="field-input mt-1.5"
            />
          </label>
          {error ? (
            <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-3 py-2 text-xs text-muted-strong">
              {error}
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-border bg-bg/40 px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="inline-flex h-9 items-center rounded-lg border border-border bg-white/[0.03] px-3 text-xs font-medium text-body transition-colors hover:border-border-strong disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy || clientId.length < 3 || clientSecret.length < 6}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-orange px-3.5 text-xs font-bold text-white transition-all hover:bg-orange-hover disabled:opacity-50"
          >
            <Lock className="h-3.5 w-3.5" />
            {busy ? "Saving…" : existing ? "Rotate" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
