import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Database } from "../../lib/database.types";

type ClientError = Database["public"]["Tables"]["client_errors"]["Row"];

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function AdminLogs() {
  const [errors, setErrors] = useState<ClientError[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    supabase
      .from("client_errors")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setDbError(error.message);
        else setErrors(data ?? []);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">Frontend errors</h1>
        <p className="mt-1 text-sm text-muted-strong">
          React render-time exceptions captured by ErrorBoundary · last 100 · Sentry-lite
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-muted">Loading…</div>
        ) : dbError ? (
          <div className="m-5 rounded-lg border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
            {dbError}
          </div>
        ) : errors.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-sm font-bold text-ink">No errors logged 🎉</p>
            <p className="mt-1 text-xs text-muted">
              The ErrorBoundary writes here whenever a React component throws during render.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border/60">
            {errors.map((e) => {
              const open = expanded === e.id;
              return (
                <li key={e.id} className="px-5 py-4">
                  <button
                    onClick={() => setExpanded(open ? null : e.id)}
                    className="block w-full text-left"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-mono text-sm text-ink">
                          {e.message ?? "(no message)"}
                        </div>
                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                          <span>{formatRelative(e.created_at)}</span>
                          {e.url ? <span>· {new URL(e.url).pathname}</span> : null}
                          {e.user_id ? (
                            <span className="font-mono">
                              · user {e.user_id.slice(0, 8)}…
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <span className="text-xs text-muted">
                        {open ? "▼ collapse" : "▶ details"}
                      </span>
                    </div>
                  </button>

                  {open ? (
                    <div className="mt-3 space-y-3 border-t border-border/60 pt-3">
                      {e.url ? (
                        <Block label="URL" value={e.url} />
                      ) : null}
                      {e.user_agent ? (
                        <Block label="User-Agent" value={e.user_agent} />
                      ) : null}
                      {e.stack ? (
                        <Block label="Stack" value={e.stack} pre />
                      ) : null}
                      {e.component_stack ? (
                        <Block label="Component stack" value={e.component_stack} pre />
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function Block({
  label,
  value,
  pre = false,
}: {
  label: string;
  value: string;
  pre?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-strong">
        {label}
      </div>
      <div
        className={`mt-1 rounded-md border border-border bg-bg p-3 text-xs text-body ${
          pre ? "whitespace-pre-wrap font-mono" : "break-all"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
