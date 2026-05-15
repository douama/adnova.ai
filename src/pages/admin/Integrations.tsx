import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Image as ImageIcon,
  Video,
  Camera,
  Sparkles,
  Lock,
  KeyRound,
  Trash2,
  Pencil,
  ShieldCheck,
  Wand2,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

type ProviderId = "anthropic" | "openai" | "runway" | "heygen" | "genspark";

type ProviderDef = {
  id: ProviderId;
  name: string;
  vendor: string;
  purpose: string;
  required: boolean;
  icon: React.ElementType;
  setupUrl: string;
  keyHint: string; // expected prefix to display in form (e.g. "sk-...")
};

type StoredCredential = {
  provider: string;
  key_preview: string;
  is_active: boolean;
  last_rotated_at: string;
  rotated_by_email: string | null;
  notes: string | null;
};

const PROVIDERS: ProviderDef[] = [
  {
    id: "anthropic",
    name: "Anthropic — Claude Sonnet 4.5",
    vendor: "Anthropic",
    purpose: "Autonomous decision engine (claude-decide). Required for the AI ops loop.",
    required: true,
    icon: Sparkles,
    setupUrl: "https://console.anthropic.com/settings/keys",
    keyHint: "sk-ant-...",
  },
  {
    id: "openai",
    name: "OpenAI — Embeddings + gpt-image-1",
    vendor: "OpenAI",
    purpose: "Semantic memory (embed-decision) + AI image creative generation.",
    required: false,
    icon: ImageIcon,
    setupUrl: "https://platform.openai.com/api-keys",
    keyHint: "sk-...",
  },
  {
    id: "runway",
    name: "Runway — Gen-4 Video",
    vendor: "Runway",
    purpose: "AI video creative (4-8s clips). Without a key, falls back to demo Mixkit clips.",
    required: false,
    icon: Video,
    setupUrl: "https://app.runwayml.com/account",
    keyHint: "key_...",
  },
  {
    id: "heygen",
    name: "HeyGen — Avatar IV",
    vendor: "HeyGen",
    purpose: "AI UGC video (talking-head avatar). Without a key, falls back to demo Mixkit clips.",
    required: false,
    icon: Camera,
    setupUrl: "https://app.heygen.com/settings/api",
    keyHint: "...",
  },
  {
    id: "genspark",
    name: "Genspark — Image & Video AI",
    vendor: "Genspark",
    purpose: "AI image creative (text-to-image) + AI video creative (text-to-video). Without a key, falls back to demo mode.",
    required: false,
    icon: Wand2,
    setupUrl: "https://www.genspark.ai/",
    keyHint: "gs-...",
  },
];

const PROJECT_REF = "jrfxmgxtnftbcxoqzagz";
const SECRETS_URL = `https://supabase.com/dashboard/project/${PROJECT_REF}/functions/secrets`;

function fmtAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function AdminIntegrations() {
  const [credentials, setCredentials] = useState<Record<string, StoredCredential>>({});
  const [counts, setCounts] = useState<Record<string, { count: number; cost: number }>>({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ProviderId | null>(null);
  const [formKey, setFormKey] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const [creds, creatives] = await Promise.all([
        supabase.rpc("list_provider_credentials"),
        supabase
          .from("creatives")
          .select("generation_engine, generation_meta")
          .not("generation_engine", "is", null)
          .gte("created_at", since),
      ]);
      if (creds.error) {
        setError(`Credentials lookup failed: ${creds.error.message}`);
      } else {
        const map: Record<string, StoredCredential> = {};
        for (const c of (creds.data ?? []) as StoredCredential[]) {
          map[c.provider] = c;
        }
        setCredentials(map);
      }

      const cmap: Record<string, { count: number; cost: number }> = {};
      for (const c of creatives.data ?? []) {
        const engine = c.generation_engine ?? "unknown";
        const meta = c.generation_meta as { cost_usd?: number } | null;
        const cost = Number(meta?.cost_usd ?? 0);
        if (!cmap[engine]) cmap[engine] = { count: 0, cost: 0 };
        cmap[engine].count += 1;
        cmap[engine].cost += cost;
      }
      setCounts(cmap);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  function openEdit(id: ProviderId) {
    setEditing(id);
    setFormKey("");
    setFormNotes(credentials[id]?.notes ?? "");
    setError(null);
    setSuccess(null);
  }

  function closeEdit() {
    setEditing(null);
    setFormKey("");
    setFormNotes("");
    setError(null);
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    if (formKey.trim().length < 10) {
      setError("API key is too short.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const { error } = await supabase.rpc("set_provider_credential", {
        p_provider: editing,
        p_api_key: formKey.trim(),
        p_notes: formNotes.trim() || null,
      });
      if (error) throw error;
      setSuccess(`${editing} key saved and active.`);
      closeEdit();
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSubmitting(false);
    }
  }

  async function onRevoke(provider: ProviderId) {
    if (!confirm(`Revoke ${provider} credential? Edge Functions will fall back to env var (if set) or fail.`)) return;
    setError(null);
    try {
      const { error } = await supabase.rpc("delete_provider_credential", {
        p_provider: provider,
      });
      if (error) throw error;
      setSuccess(`${provider} credential revoked.`);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to revoke");
    }
  }

  async function onToggle(provider: ProviderId, isActive: boolean) {
    setError(null);
    try {
      const { error } = await supabase.rpc("toggle_provider_credential", {
        p_provider: provider,
        p_is_active: isActive,
      });
      if (error) throw error;
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to toggle");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">AI Integrations</h1>
        <p className="mt-1 text-sm text-muted-strong">
          Manage provider API keys directly from the admin console. Keys are stored RLS-locked
          in the database; only Edge Functions running with the service role can read them.
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

      <div className="rounded-2xl border border-orange/30 bg-orange/[0.05] p-5">
        <h2 className="flex items-center gap-2 text-base font-bold text-ink">
          <ShieldCheck className="h-4 w-4 text-orange" strokeWidth={2} />
          How key storage works
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-body">
          <li>
            · <strong className="text-ink">Resolution order</strong> : DB credential first,{" "}
            <code className="rounded bg-card px-1 text-orange">Deno.env.get()</code> fallback,
            then demo mode (where applicable).
          </li>
          <li>
            · <strong className="text-ink">RLS-locked</strong> : the{" "}
            <code className="rounded bg-card px-1 text-orange">provider_credentials</code>{" "}
            table has zero policies — anon and authenticated reads are blocked. Only the
            Supabase service role can decrypt them via the{" "}
            <code className="rounded bg-card px-1 text-orange">get_provider_credential</code>{" "}
            internal RPC.
          </li>
          <li>
            · <strong className="text-ink">Audit trail</strong> : every rotation logs the admin
            who triggered it + a UTC timestamp. Plain-text keys are never returned to the
            browser — only a 5-char prefix / 4-char suffix preview.
          </li>
          <li>
            · <strong className="text-ink">Or use Edge Function secrets</strong> for legacy
            workflows :{" "}
            <a
              href={SECRETS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-orange hover:underline"
            >
              Supabase dashboard
              <ExternalLink className="h-3 w-3" />
            </a>
            .
          </li>
        </ul>
      </div>

      <div className="grid gap-4">
        {PROVIDERS.map((p) => {
          const Icon = p.icon;
          const cred = credentials[p.id];

          // Demo / production indicator from creatives.generation_engine
          const engineMap: Record<ProviderId, string[]> = {
            anthropic: [],
            openai: ["gpt-image-1"],
            runway: ["runway-gen4", "demo-video"],
            heygen: ["heygen-avatar-iv", "demo-ugc"],
            genspark: ["genspark-image", "genspark-video", "demo-genspark"],
          };
          const engineKeys = engineMap[p.id] ?? [];
          const stats = engineKeys.reduce(
            (acc, k) => {
              const c = counts[k];
              if (c) {
                acc.count += c.count;
                acc.cost += c.cost;
              }
              return acc;
            },
            { count: 0, cost: 0 },
          );
          const hasDemoActivity = engineKeys.some((k) => k.startsWith("demo-") && counts[k]);
          const hasRealActivity = engineKeys.some(
            (k) => !k.startsWith("demo-") && counts[k],
          );

          const live = cred?.is_active;

          return (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-lg ${
                      live
                        ? "bg-orange/[0.12] text-orange"
                        : "bg-white/[0.05] text-muted-strong"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-ink">{p.name}</h3>
                      {p.required ? (
                        <span className="rounded-md border border-orange/30 bg-orange/[0.08] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange">
                          Required
                        </span>
                      ) : null}
                      {live ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/[0.08] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          <Lock className="h-2.5 w-2.5" />
                          Vault active
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs text-muted-strong">{p.vendor}</p>
                    <p className="mt-2 text-sm text-body">{p.purpose}</p>

                    {cred ? (
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                        <code className="rounded-md border border-orange/30 bg-orange/[0.06] px-2 py-1 font-mono text-orange">
                          {cred.key_preview}
                        </code>
                        <span className="text-muted">
                          rotated {fmtAgo(cred.last_rotated_at)}
                          {cred.rotated_by_email ? ` · by ${cred.rotated_by_email}` : ""}
                        </span>
                      </div>
                    ) : (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-muted-strong">
                        no DB credential · falls back to env var
                      </div>
                    )}

                    {cred?.notes ? (
                      <p className="mt-2 text-[11px] italic text-muted">{cred.notes}</p>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {hasRealActivity ? (
                    <span className="inline-flex items-center gap-1 rounded-md border border-orange/40 bg-orange/[0.08] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-orange">
                      <CheckCircle2 className="h-3 w-3" />
                      Production
                    </span>
                  ) : hasDemoActivity ? (
                    <span className="inline-flex items-center gap-1 rounded-md border border-muted/40 bg-muted/[0.08] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                      Demo mode
                    </span>
                  ) : p.required && !cred ? (
                    <span className="inline-flex items-center gap-1 rounded-md border border-muted/40 bg-muted/[0.12] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                      <AlertCircle className="h-3 w-3" />
                      Configure
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-white/[0.03] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                      {cred ? "Standby" : "Not used"}
                    </span>
                  )}

                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(p.id)}
                      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-orange/40 bg-orange/[0.08] px-2.5 text-xs font-medium text-orange transition-colors hover:bg-orange/[0.14]"
                    >
                      {cred ? (
                        <>
                          <Pencil className="h-3 w-3" /> Rotate
                        </>
                      ) : (
                        <>
                          <KeyRound className="h-3 w-3" /> Add key
                        </>
                      )}
                    </button>
                    {cred ? (
                      <>
                        <button
                          onClick={() => onToggle(p.id, !cred.is_active)}
                          className="inline-flex h-8 items-center rounded-lg border border-border bg-white/[0.03] px-2.5 text-xs font-medium text-body transition-colors hover:border-border-strong hover:text-ink"
                        >
                          {cred.is_active ? "Disable" : "Enable"}
                        </button>
                        <button
                          onClick={() => onRevoke(p.id)}
                          className="inline-flex h-8 items-center rounded-lg border border-muted/30 bg-muted/[0.05] px-2.5 text-xs font-medium text-muted-strong transition-colors hover:border-muted/50 hover:text-ink"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </>
                    ) : null}
                    <a
                      href={p.setupUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-muted transition-colors hover:text-orange"
                    >
                      Get key
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {!loading && (stats.count > 0 || hasDemoActivity) ? (
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/60 pt-4 text-xs">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                      Generations (24h)
                    </div>
                    <div className="mt-1 text-lg font-bold tabular-nums text-ink">
                      {stats.count}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                      Cost (24h)
                    </div>
                    <div className="mt-1 text-lg font-bold tabular-nums text-ink">
                      ${stats.cost.toFixed(2)}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-muted">
        Edge Functions affected: <code className="text-body">claude-decide</code>,{" "}
        <code className="text-body">embed-decision</code>,{" "}
        <code className="text-body">generate-creative-image</code>,{" "}
        <code className="text-body">generate-creative-video</code>,{" "}
        <code className="text-body">generate-creative-ugc</code>,{" "}
        <code className="text-body">generate-creative-image-genspark</code>,{" "}
        <code className="text-body">generate-creative-video-genspark</code>,{" "}
        <code className="text-body">healthcheck</code>. They look up{" "}
        <code className="text-body">provider_credentials</code> first, then fall back to Edge
        Function secrets.
      </p>

      {/* Modal */}
      {editing ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeEdit();
          }}
        >
          <form
            onSubmit={onSave}
            className="glass-strong glass-highlight w-full max-w-lg overflow-hidden rounded-2xl"
          >
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-base font-bold text-ink">
                {credentials[editing] ? "Rotate" : "Add"}{" "}
                {PROVIDERS.find((p) => p.id === editing)?.name}
              </h2>
              <p className="mt-1 text-xs text-muted">
                The key is sent over TLS, stored in an RLS-locked table, and never returned to
                the browser again. Only Edge Functions can read it.
              </p>
            </div>
            <div className="space-y-4 px-6 py-5">
              <label className="block">
                <span className="text-xs font-medium text-muted-strong">API key</span>
                <input
                  type="password"
                  value={formKey}
                  onChange={(e) => setFormKey(e.target.value)}
                  required
                  autoFocus
                  placeholder={PROVIDERS.find((p) => p.id === editing)?.keyHint ?? ""}
                  className="field-input mt-1.5 font-mono"
                  autoComplete="off"
                  spellCheck={false}
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted-strong">
                  Notes <span className="text-muted">(optional, e.g. "team Stripe acct")</span>
                </span>
                <input
                  type="text"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
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
                onClick={closeEdit}
                disabled={submitting}
                className="inline-flex h-9 items-center rounded-lg border border-border bg-white/[0.03] px-3 text-sm font-medium text-body transition-colors hover:border-border-strong hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || formKey.length < 10}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-orange px-3.5 text-sm font-bold text-white transition-all hover:bg-orange-hover disabled:opacity-50"
              >
                <Lock className="h-3.5 w-3.5" />
                {submitting ? "Saving…" : credentials[editing] ? "Rotate" : "Save"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
