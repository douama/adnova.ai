import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { Database } from "../../lib/database.types";

type Tenant = Database["public"]["Tables"]["tenants"]["Row"];

const STATUS_COLORS: Record<string, string> = {
  active: "border-orange/30 bg-orange/[0.08] text-orange",
  trial: "border-border bg-white/[0.04] text-body",
  suspended: "border-muted/30 bg-muted/[0.08] text-muted-strong",
  churned: "border-muted/30 bg-muted/[0.05] text-muted",
};

const AI_MODE_COLORS: Record<string, string> = {
  autonomous: "border-orange/30 bg-orange/[0.08] text-orange",
  guardrails: "border-border bg-white/[0.04] text-body",
  advisory: "border-border bg-white/[0.03] text-muted-strong",
};

export function AdminTenants() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    supabase
      .from("tenants")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setError(error.message);
        else setTenants(data ?? []);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return tenants;
    const q = query.trim().toLowerCase();
    return tenants.filter(
      (t) =>
        t.name?.toLowerCase().includes(q) ||
        t.slug?.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q),
    );
  }, [tenants, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-ink">Tenants</h1>
          <p className="mt-1 text-sm text-muted-strong">
            {tenants.length} workspaces total
          </p>
        </div>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            strokeWidth={1.75}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, slug, ID…"
            className="field-input h-10 w-64 pl-9"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-muted">Loading…</div>
        ) : error ? (
          <div className="m-5 rounded-lg border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-muted">
            {query ? `No match for "${query}"` : "No tenants yet"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted">
                  <th className="px-5 py-3 font-bold">Name</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 font-bold">Plan</th>
                  <th className="px-5 py-3 font-bold">AI mode</th>
                  <th className="px-5 py-3 font-bold">Created</th>
                  <th className="px-5 py-3 font-bold">ID</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-border/60 last:border-0 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5 font-medium text-ink">{t.name}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          STATUS_COLORS[t.status] ?? STATUS_COLORS.trial
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 capitalize text-body">{t.plan}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          AI_MODE_COLORS[t.ai_mode] ?? AI_MODE_COLORS.advisory
                        }`}
                      >
                        {t.ai_mode}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-muted">
                      {new Date(t.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[10px] text-muted">
                      {t.id.slice(0, 8)}…
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
