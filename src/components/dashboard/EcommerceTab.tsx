import { useCallback, useEffect, useState } from "react";
import {
  ShoppingBag,
  CheckCircle2,
  RefreshCcw,
  Trash2,
  AlertCircle,
  ExternalLink,
  Plus,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useCurrentTenantId } from "../../stores/tenantStore";

type Provider = "shopify" | "woocommerce";

type Connection = {
  id: string;
  provider: string;
  shop_domain: string;
  token_preview: string;
  is_active: boolean;
  last_synced_at: string | null;
  last_sync_status: string | null;
  last_sync_error: string | null;
  product_count: number;
  created_at: string;
};

function fmtAgo(iso: string | null): string {
  if (!iso) return "never";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function EcommerceTab() {
  const tenantId = useCurrentTenantId();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<Provider | null>(null);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!tenantId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("list_ecommerce_connections", {
        _tenant_id: tenantId,
      });
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

  async function syncNow(connectionId: string) {
    if (!tenantId) return;
    setError(null);
    setSuccess(null);
    setSyncing(connectionId);
    try {
      const { data, error } = await supabase.functions.invoke<{ ok?: boolean; count?: number; error?: string }>(
        "sync-ecommerce",
        { body: { action: "sync", tenant_id: tenantId, connection_id: connectionId } },
      );
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setSuccess(`Synced ${data?.count ?? 0} products`);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sync failed");
    } finally {
      setSyncing(null);
    }
  }

  async function removeConnection(connectionId: string) {
    if (!tenantId) return;
    if (!confirm("Remove this store connection? Synced products will be removed too.")) return;
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke<{ ok?: boolean; error?: string }>(
        "sync-ecommerce",
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
        <h2 className="flex items-center gap-2 text-base font-bold text-ink">
          <ShoppingBag className="h-4 w-4 text-orange" strokeWidth={1.75} />
          E-commerce stores
        </h2>
        <p className="mt-1 text-sm text-muted-strong">
          Connect Shopify or WooCommerce to import your product catalog. Selected products will
          auto-populate creative prompts and let AdNova generate platform-specific ads.
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

      {loading ? (
        <div className="rounded-2xl border border-border bg-card px-5 py-8 text-center text-sm text-muted">
          Loading…
        </div>
      ) : null}

      {!loading && connections.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-5 py-8 text-center">
          <ShoppingBag className="mx-auto h-6 w-6 text-muted" strokeWidth={1.5} />
          <p className="mt-3 text-sm text-body">No store connected yet.</p>
          <p className="mt-1 text-xs text-muted">
            Connect a Shopify or WooCommerce store below to start generating creatives directly
            from your products.
          </p>
        </div>
      ) : null}

      {!loading && connections.length > 0 ? (
        <div className="space-y-3">
          {connections.map((c) => (
            <div key={c.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <ProviderLogo provider={c.provider} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-ink capitalize">{c.provider}</h3>
                      <span
                        className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          c.last_sync_status === "success"
                            ? "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400"
                            : c.last_sync_status === "error"
                            ? "border-muted/30 bg-muted/[0.08] text-muted-strong"
                            : "border-orange/30 bg-orange/[0.06] text-orange"
                        }`}
                      >
                        {c.last_sync_status === "success"
                          ? "Connected"
                          : c.last_sync_status === "error"
                          ? "Error"
                          : "New"}
                      </span>
                    </div>
                    <a
                      href={`https://${c.shop_domain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted hover:text-orange"
                    >
                      {c.shop_domain}
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                      <span>
                        Token <code className="text-body">{c.token_preview}</code>
                      </span>
                      <span>·</span>
                      <span>{c.product_count} products</span>
                      <span>·</span>
                      <span>Last sync {fmtAgo(c.last_synced_at)}</span>
                    </div>
                    {c.last_sync_error ? (
                      <p className="mt-1.5 inline-flex items-start gap-1.5 text-[11px] text-muted-strong">
                        <AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-orange" />
                        {c.last_sync_error}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => syncNow(c.id)}
                    disabled={syncing === c.id}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-orange/40 bg-orange/[0.08] px-3 text-xs font-medium text-orange transition-colors hover:bg-orange/[0.14] disabled:opacity-50"
                  >
                    <RefreshCcw className={`h-3 w-3 ${syncing === c.id ? "animate-spin" : ""}`} />
                    {syncing === c.id ? "Syncing…" : "Sync now"}
                  </button>
                  <button
                    onClick={() => removeConnection(c.id)}
                    className="inline-flex h-9 items-center rounded-lg border border-muted/30 bg-muted/[0.05] px-2 text-xs text-muted-strong transition-colors hover:border-muted/50 hover:text-ink"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => setAdding("shopify")}
          className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-border bg-card p-5 text-left transition-colors hover:border-orange/40 hover:bg-orange/[0.03]"
        >
          <div className="flex items-center gap-3">
            <ProviderLogo provider="shopify" />
            <div>
              <h3 className="text-sm font-bold text-ink">Connect Shopify</h3>
              <p className="mt-0.5 text-[11px] text-muted">
                Admin API access token
              </p>
            </div>
          </div>
          <Plus className="h-4 w-4 text-muted" />
        </button>
        <button
          onClick={() => setAdding("woocommerce")}
          className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-border bg-card p-5 text-left transition-colors hover:border-orange/40 hover:bg-orange/[0.03]"
        >
          <div className="flex items-center gap-3">
            <ProviderLogo provider="woocommerce" />
            <div>
              <h3 className="text-sm font-bold text-ink">Connect WooCommerce</h3>
              <p className="mt-0.5 text-[11px] text-muted">
                REST API key + secret
              </p>
            </div>
          </div>
          <Plus className="h-4 w-4 text-muted" />
        </button>
      </div>

      {adding ? (
        <ConnectModal
          provider={adding}
          tenantId={tenantId ?? ""}
          onClose={() => setAdding(null)}
          onCreated={async () => {
            setAdding(null);
            await reload();
            setSuccess("Store connected. Click Sync now to import your products.");
          }}
        />
      ) : null}
    </div>
  );
}

function ProviderLogo({ provider }: { provider: string }) {
  if (provider === "shopify") {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#7AB55C]/15 text-[#95BF47]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
          <path d="M15.337 2.072c-.097-.005-.16-.005-.16-.005s-.205.063-.541.17a3.787 3.787 0 0 0-.252-.626c-.376-.717-.926-1.097-1.594-1.097h-.001c-.046 0-.092.005-.138.009C12.616.498 12.582.46 12.547.42 12.257.105 11.884-.043 11.439.013 10.578.038 9.721.66 9.024 1.752c-.49.768-.864 1.733-.97 2.48-.99.308-1.685.522-1.701.527-.499.157-.515.172-.581.642-.05.355-1.358 10.484-1.358 10.484l10.99 1.9 4.766-1.184S15.435 2.078 15.337 2.072zM12.94 1.806c-.286.089-.61.187-.961.296.001-.503-.058-1.21-.295-1.819.762.144 1.139.998 1.256 1.523zm-1.612.5c-.65.2-1.358.42-2.069.638.2-.766.58-1.529 1.046-2.03.173-.187.415-.395.703-.514.27.563.328 1.36.32 1.906zm-1.012-3.13c.23 0 .424.05.59.149-.265.137-.522.336-.762.594-.621.667-1.097 1.701-1.288 2.7-.589.182-1.166.36-1.697.526.339-1.582 1.665-3.928 3.157-3.969z"/>
        </svg>
      </div>
    );
  }
  if (provider === "woocommerce") {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#7F54B3]/15 text-[#7F54B3]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
          <path d="M2.227 2.077A2.227 2.227 0 0 0 0 4.304v13.038a2.227 2.227 0 0 0 2.227 2.227h8.336L14.41 24l-.926-4.43h8.29A2.227 2.227 0 0 0 24 17.342V4.304a2.227 2.227 0 0 0-2.227-2.227zm.46 2.227h18.626c.244 0 .445.2.445.445v13.038c0 .245-.201.445-.445.445h-9.99l.589 2.821-3.55-2.821H2.687a.446.446 0 0 1-.445-.445V4.749c0-.244.201-.445.445-.445zm2.158 2.193c-.292.014-.566.166-.74.412-.157.213-.227.487-.205.74.59 3.737 1.135 6.255 1.638 7.554.198.495.43.722.74.74.494.029.991-.43 1.486-1.376l1.638-3.108c.226 1.991.967 3.502 2.218 4.527.353.292.71.43 1.06.396a.998.998 0 0 0 .825-.495c.176-.31.246-.66.205-1.018-.103-1.305.085-3.075.575-5.317.504-2.32.355-3.297-.466-2.93a.875.875 0 0 0-.45.659c-.305 1.617-.692 3.001-1.169 4.117-.66-1.32-1.196-3.075-1.595-5.317-.183-1.038-.659-1.5-1.443-1.388-.532.083-.948.546-1.235 1.388l-1.682 4.117c-.292-1.169-.55-2.59-.825-4.26-.092-.726-.495-1.085-1.224-1.087-.052 0-.105.002-.155.005z"/>
        </svg>
      </div>
    );
  }
  return null;
}

function ConnectModal({
  provider,
  tenantId,
  onClose,
  onCreated,
}: {
  provider: Provider;
  tenantId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [shopDomain, setShopDomain] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [busy, setBusy] = useState<"test" | "create" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  async function testConnection() {
    setError(null);
    setTestResult(null);
    setBusy("test");
    try {
      const { data, error } = await supabase.functions.invoke<{ ok?: boolean; shop?: { name: string }; error?: string }>(
        "sync-ecommerce",
        {
          body: {
            action: "test",
            provider,
            shop_domain: shopDomain.trim(),
            api_token: apiToken.trim(),
            api_secret: apiSecret.trim() || undefined,
          },
        },
      );
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setTestResult(`Connected to ${data?.shop?.name ?? shopDomain}`);
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
        "sync-ecommerce",
        {
          body: {
            action: "create",
            tenant_id: tenantId,
            provider,
            shop_domain: shopDomain.trim(),
            api_token: apiToken.trim(),
            api_secret: apiSecret.trim() || undefined,
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

  const isWoo = provider === "woocommerce";

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
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-base font-bold text-ink">
            Connect {provider === "shopify" ? "Shopify" : "WooCommerce"}
          </h2>
          <p className="mt-1 text-xs text-muted">
            {provider === "shopify"
              ? "Create a Custom App in Shopify admin → Apps → Develop apps → grant read_products."
              : "WooCommerce admin → Advanced → REST API → Add key with read permissions."}
          </p>
        </div>
        <div className="space-y-4 px-6 py-5">
          <label className="block">
            <span className="text-xs font-medium text-muted-strong">
              Shop domain
            </span>
            <input
              type="text"
              value={shopDomain}
              onChange={(e) => setShopDomain(e.target.value)}
              required
              placeholder={
                provider === "shopify" ? "yourstore.myshopify.com" : "yourstore.com"
              }
              className="field-input mt-1.5"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-strong">
              {isWoo ? "Consumer key" : "Admin API access token"}
            </span>
            <input
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              required
              placeholder={isWoo ? "ck_..." : "shpat_..."}
              className="field-input mt-1.5 font-mono"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          {isWoo ? (
            <label className="block">
              <span className="text-xs font-medium text-muted-strong">Consumer secret</span>
              <input
                type="password"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                required
                placeholder="cs_..."
                className="field-input mt-1.5 font-mono"
                autoComplete="off"
                spellCheck={false}
              />
            </label>
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
            onClick={testConnection}
            disabled={busy !== null || !shopDomain || !apiToken || (isWoo && !apiSecret)}
            className="inline-flex h-9 items-center rounded-lg border border-border bg-white/[0.03] px-3 text-xs font-medium text-body transition-colors hover:border-border-strong disabled:opacity-50"
          >
            {busy === "test" ? "Testing…" : "Test connection"}
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
              disabled={busy !== null || !shopDomain || !apiToken || (isWoo && !apiSecret)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-orange px-3.5 text-xs font-bold text-white transition-all hover:bg-orange-hover disabled:opacity-50"
            >
              {busy === "create" ? "Saving…" : "Save & connect"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
