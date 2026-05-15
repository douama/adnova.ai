import { useCallback, useEffect, useState } from "react";
import {
  CreditCard,
  Wallet,
  Lock,
  KeyRound,
  Pencil,
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

type PaymentProvider = "stripe" | "paypal";
type Mode = "test" | "live";

type SlotDef = {
  slot: string;
  label: string;
  hint: string;        // placeholder shown in form
  isPublishable: boolean;
  minLength: number;
};

type ProviderDef = {
  id: PaymentProvider;
  name: string;
  tagline: string;
  setupUrl: string;
  icon: React.ElementType;
  slots: SlotDef[];
};

type StoredCredential = {
  provider: string;
  slot: string;
  key_preview: string;
  is_publishable: boolean;
  mode: Mode;
  is_active: boolean;
  last_rotated_at: string;
  rotated_by_email: string | null;
  notes: string | null;
};

const PROVIDERS: ProviderDef[] = [
  {
    id: "stripe",
    name: "Stripe",
    tagline: "Cards, ACH, SEPA, Apple Pay & Google Pay via Checkout + Customer Portal.",
    setupUrl: "https://dashboard.stripe.com/apikeys",
    icon: CreditCard,
    slots: [
      {
        slot: "publishable_key",
        label: "Publishable key",
        hint: "pk_test_… or pk_live_…",
        isPublishable: true,
        minLength: 32,
      },
      {
        slot: "secret_key",
        label: "Secret key",
        hint: "sk_test_… or sk_live_…",
        isPublishable: false,
        minLength: 32,
      },
      {
        slot: "webhook_secret",
        label: "Webhook signing secret",
        hint: "whsec_…",
        isPublishable: false,
        minLength: 16,
      },
    ],
  },
  {
    id: "paypal",
    name: "PayPal",
    tagline: "PayPal Wallet + Pay Later + Venmo via the Smart Payment Buttons SDK.",
    setupUrl: "https://developer.paypal.com/dashboard/applications",
    icon: Wallet,
    slots: [
      {
        slot: "client_id",
        label: "Client ID",
        hint: "AeA…",
        isPublishable: true,
        minLength: 32,
      },
      {
        slot: "client_secret",
        label: "Client secret",
        hint: "EH…",
        isPublishable: false,
        minLength: 32,
      },
      {
        slot: "webhook_id",
        label: "Webhook ID",
        hint: "8…",
        isPublishable: false,
        minLength: 8,
      },
    ],
  },
];

function fmtAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function inferMode(value: string): Mode {
  // Stripe convention: pk_test_..., sk_test_..., pk_live_..., sk_live_...
  if (value.startsWith("pk_live_") || value.startsWith("sk_live_")) return "live";
  if (value.startsWith("pk_test_") || value.startsWith("sk_test_")) return "test";
  // whsec_ (Stripe webhook) and PayPal keys carry no mode prefix — caller uses formMode
  return "test";
}

export function AdminPayments() {
  const [credentials, setCredentials] = useState<Record<string, StoredCredential>>({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ provider: PaymentProvider; slot: SlotDef } | null>(null);
  const [formKey, setFormKey] = useState("");
  const [formMode, setFormMode] = useState<Mode>("test");
  const [formNotes, setFormNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("list_payment_credentials");
      if (error) {
        setError(`Lookup failed: ${error.message}`);
        return;
      }
      const map: Record<string, StoredCredential> = {};
      for (const row of (data ?? []) as StoredCredential[]) {
        map[`${row.provider}:${row.slot}`] = row;
      }
      setCredentials(map);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  function openEdit(provider: PaymentProvider, slot: SlotDef) {
    const key = `${provider}:${slot.slot}`;
    setEditing({ provider, slot });
    setFormKey("");
    setFormMode((credentials[key]?.mode as Mode) ?? "test");
    setFormNotes(credentials[key]?.notes ?? "");
    setError(null);
    setSuccess(null);
  }

  function closeEdit() {
    setEditing(null);
    setFormKey("");
    setFormMode("test");
    setFormNotes("");
    setError(null);
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const trimmed = formKey.trim();
    if (trimmed.length < editing.slot.minLength) {
      setError(`Key looks too short (expected ≥ ${editing.slot.minLength} chars).`);
      return;
    }
    const detected = inferMode(trimmed);
    const finalMode =
      editing.provider === "stripe" && editing.slot.slot !== "webhook_secret"
        ? detected
        : formMode;
    setSubmitting(true);
    setError(null);
    try {
      const { error } = await supabase.rpc("set_payment_credential", {
        p_provider: editing.provider,
        p_slot: editing.slot.slot,
        p_api_key: trimmed,
        p_mode: finalMode,
        p_is_publishable: editing.slot.isPublishable,
        p_notes: formNotes.trim() || null,
      });
      if (error) throw error;
      setSuccess(`${editing.provider} ${editing.slot.label} saved (${finalMode}).`);
      closeEdit();
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSubmitting(false);
    }
  }

  async function onRevoke(provider: PaymentProvider, slot: string, label: string) {
    if (!confirm(`Revoke ${provider} ${label}? Checkout flows depending on it will start failing.`))
      return;
    setError(null);
    try {
      const { error } = await supabase.rpc("delete_payment_credential", {
        p_provider: provider,
        p_slot: slot,
      });
      if (error) throw error;
      setSuccess(`${provider} ${label} revoked.`);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to revoke");
    }
  }

  async function onToggle(provider: PaymentProvider, slot: string, next: boolean) {
    setError(null);
    try {
      const { error } = await supabase.rpc("toggle_payment_credential", {
        p_provider: provider,
        p_slot: slot,
        p_is_active: next,
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
        <h1 className="text-3xl font-bold tracking-tighter text-ink">Payment providers</h1>
        <p className="mt-1 text-sm text-muted-strong">
          Stripe and PayPal credentials for the billing layer. Publishable keys are returned to
          the browser (Stripe.js / PayPal SDK); secrets are service-role-only and only readable
          by Edge Functions.
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
          Security model
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-body">
          <li>
            · <strong className="text-ink">Publishable keys</strong> (Stripe publishable_key,
            PayPal client_id) are surfaced to the browser via{" "}
            <code className="rounded bg-card px-1 text-orange">list_payment_credentials_public()</code>.
          </li>
          <li>
            · <strong className="text-ink">Secrets</strong> (Stripe secret_key / webhook_secret,
            PayPal client_secret / webhook_id) only ever leave the database via{" "}
            <code className="rounded bg-card px-1 text-orange">get_payment_credential()</code>,
            which is granted to the service role only.
          </li>
          <li>
            · <strong className="text-ink">Mode</strong> (test / live) is auto-detected from
            Stripe prefixes; for PayPal you pick it manually.
          </li>
          <li>
            · <strong className="text-ink">Audit trail</strong>: every rotation logs the admin
            email + UTC timestamp. The browser only ever sees a 7-char prefix / 4-char suffix
            preview of secret keys.
          </li>
        </ul>
      </div>

      <div className="grid gap-4">
        {PROVIDERS.map((p) => {
          const Icon = p.icon;
          const slotsConfigured = p.slots.filter((s) => credentials[`${p.id}:${s.slot}`]).length;
          const allConfigured = slotsConfigured === p.slots.length;
          const anyLive = p.slots.some(
            (s) => credentials[`${p.id}:${s.slot}`]?.mode === "live",
          );

          return (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-lg ${
                      allConfigured
                        ? "bg-orange/[0.12] text-orange"
                        : "bg-white/[0.05] text-muted-strong"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-ink">{p.name}</h3>
                      {anyLive ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/[0.08] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          Live
                        </span>
                      ) : slotsConfigured > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-orange/30 bg-orange/[0.08] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange">
                          Test
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md border border-muted/40 bg-muted/[0.12] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                          <AlertCircle className="h-2.5 w-2.5" />
                          Not configured
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-body">{p.tagline}</p>
                    <p className="mt-1 text-[11px] text-muted">
                      {slotsConfigured} / {p.slots.length} credentials configured
                    </p>
                  </div>
                </div>
                <a
                  href={p.setupUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-strong transition-colors hover:text-orange"
                >
                  {p.name} dashboard
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="mt-5 grid gap-2">
                {p.slots.map((s) => {
                  const cred = credentials[`${p.id}:${s.slot}`];
                  return (
                    <div
                      key={s.slot}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-bg/40 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-ink">{s.label}</span>
                          {s.isPublishable ? (
                            <span className="rounded-md border border-border bg-white/[0.03] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-strong">
                              browser-safe
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-md border border-orange/30 bg-orange/[0.06] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange">
                              <Lock className="h-2.5 w-2.5" />
                              secret
                            </span>
                          )}
                          {cred ? (
                            <span
                              className={`rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                cred.mode === "live"
                                  ? "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400"
                                  : "border-muted/30 bg-muted/[0.08] text-muted-strong"
                              }`}
                            >
                              {cred.mode}
                            </span>
                          ) : null}
                        </div>
                        {cred ? (
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                            <code className="rounded-md border border-orange/30 bg-orange/[0.06] px-2 py-0.5 font-mono text-orange">
                              {cred.key_preview}
                            </code>
                            <span className="text-muted">
                              rotated {fmtAgo(cred.last_rotated_at)}
                              {cred.rotated_by_email ? ` · ${cred.rotated_by_email}` : ""}
                            </span>
                          </div>
                        ) : (
                          <p className="mt-1 text-[11px] text-muted">Not configured.</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(p.id, s)}
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-orange/40 bg-orange/[0.08] px-2.5 text-xs font-medium text-orange transition-colors hover:bg-orange/[0.14]"
                        >
                          {cred ? (
                            <>
                              <Pencil className="h-3 w-3" />
                              Rotate
                            </>
                          ) : (
                            <>
                              <KeyRound className="h-3 w-3" />
                              Set
                            </>
                          )}
                        </button>
                        {cred ? (
                          <>
                            <button
                              onClick={() => onToggle(p.id, s.slot, !cred.is_active)}
                              className="inline-flex h-8 items-center rounded-lg border border-border bg-white/[0.03] px-2.5 text-xs font-medium text-body transition-colors hover:border-border-strong hover:text-ink"
                            >
                              {cred.is_active ? "Disable" : "Enable"}
                            </button>
                            <button
                              onClick={() => onRevoke(p.id, s.slot, s.label)}
                              className="inline-flex h-8 items-center rounded-lg border border-muted/30 bg-muted/[0.05] px-2.5 text-xs font-medium text-muted-strong transition-colors hover:border-muted/50 hover:text-ink"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {loading ? (
        <p className="text-xs text-muted">Loading credentials…</p>
      ) : null}

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
                {credentials[`${editing.provider}:${editing.slot.slot}`] ? "Rotate" : "Set"}{" "}
                {PROVIDERS.find((p) => p.id === editing.provider)?.name} —{" "}
                {editing.slot.label}
              </h2>
              <p className="mt-1 text-xs text-muted">
                Sent over TLS, stored RLS-locked, never returned in plaintext to the browser.
              </p>
            </div>
            <div className="space-y-4 px-6 py-5">
              <label className="block">
                <span className="text-xs font-medium text-muted-strong">
                  {editing.slot.label}
                </span>
                <input
                  type={editing.slot.isPublishable ? "text" : "password"}
                  value={formKey}
                  onChange={(e) => setFormKey(e.target.value)}
                  required
                  autoFocus
                  placeholder={editing.slot.hint}
                  className="field-input mt-1.5 font-mono"
                  autoComplete="off"
                  spellCheck={false}
                />
              </label>
              {(editing.provider === "paypal" || editing.slot.slot === "webhook_secret") ? (
                <label className="block">
                  <span className="text-xs font-medium text-muted-strong">Mode</span>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full glass p-1">
                    <button
                      type="button"
                      onClick={() => setFormMode("test")}
                      className={`h-8 rounded-full px-3 text-xs font-medium transition-colors ${
                        formMode === "test"
                          ? "bg-orange text-white"
                          : "text-muted-strong hover:text-ink"
                      }`}
                    >
                      Sandbox
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormMode("live")}
                      className={`h-8 rounded-full px-3 text-xs font-medium transition-colors ${
                        formMode === "live"
                          ? "bg-orange text-white"
                          : "text-muted-strong hover:text-ink"
                      }`}
                    >
                      Live
                    </button>
                  </div>
                </label>
              ) : (
                <p className="text-[11px] text-muted">
                  Mode (test / live) is auto-detected from the Stripe key prefix.
                </p>
              )}
              <label className="block">
                <span className="text-xs font-medium text-muted-strong">
                  Notes <span className="text-muted">(optional)</span>
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
                disabled={submitting || formKey.length < editing.slot.minLength}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-orange px-3.5 text-sm font-bold text-white transition-all hover:bg-orange-hover disabled:opacity-50"
              >
                <Lock className="h-3.5 w-3.5" />
                {submitting
                  ? "Saving…"
                  : credentials[`${editing.provider}:${editing.slot.slot}`]
                  ? "Rotate"
                  : "Save"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
