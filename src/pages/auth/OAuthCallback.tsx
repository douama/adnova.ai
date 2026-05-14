import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Logo } from "../../components/ui/logo";

// Generic OAuth landing page : every ad-platform redirect comes back here
// (e.g. https://adnovaai.vercel.app/oauth/callback?code=...&state=...).
// We post the code+state to the oauth-callback Edge Function which
// exchanges them for tokens and persists into platform_connections.

export function OAuthCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState<string>("Finalising your connection…");
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const code = params.get("code");
    const state = params.get("state");
    const errorParam = params.get("error") ?? params.get("error_description");

    if (errorParam) {
      setStatus("error");
      setMessage(errorParam);
      return;
    }
    if (!code || !state) {
      setStatus("error");
      setMessage("Missing code or state from the redirect.");
      return;
    }

    (async () => {
      try {
        const redirectUri = `${window.location.origin}/oauth/callback`;
        const { data, error } = await supabase.functions.invoke<{
          ok?: boolean;
          connection?: { platform: string; account_name?: string };
          needs_account_selection?: boolean;
          error?: string;
        }>("oauth-callback", { body: { code, state, redirect_uri: redirectUri } });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        setStatus("ok");
        const platform = data?.connection?.platform ?? "the platform";
        setMessage(
          data?.needs_account_selection
            ? `Connected to ${platform}. We'll pick your ad account on first sync.`
            : `Connected to ${data?.connection?.account_name ?? platform}.`,
        );
        // Auto-redirect back to settings after a short pause
        setTimeout(() => navigate("/settings", { replace: true }), 1800);
      } catch (e) {
        setStatus("error");
        setMessage(e instanceof Error ? e.message : "Connection failed");
      }
    })();
  }, [params, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-12 text-center">
        <Logo />
        <div className="mt-12 glass glass-highlight w-full rounded-2xl p-8">
          {status === "loading" ? (
            <>
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-border border-t-orange" />
              <h1 className="text-2xl font-bold tracking-tighter text-ink">Connecting…</h1>
              <p className="mt-2 text-sm text-muted-strong">{message}</p>
            </>
          ) : status === "ok" ? (
            <>
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" strokeWidth={2} />
              </div>
              <h1 className="text-2xl font-bold tracking-tighter text-ink">All set.</h1>
              <p className="mt-2 text-sm text-body">{message}</p>
              <p className="mt-4 text-xs text-muted">Redirecting…</p>
            </>
          ) : (
            <>
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-muted/10 text-muted-strong">
                <AlertCircle className="h-6 w-6" strokeWidth={2} />
              </div>
              <h1 className="text-2xl font-bold tracking-tighter text-ink">
                <em>Connection failed</em>
              </h1>
              <p className="mt-2 text-sm text-body">{message}</p>
              <Link
                to="/settings"
                className="mt-6 inline-flex h-10 items-center rounded-xl border border-border-strong bg-white/[0.03] px-5 text-sm font-medium text-body transition-colors hover:border-white/25 hover:text-ink"
              >
                Back to Settings
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
