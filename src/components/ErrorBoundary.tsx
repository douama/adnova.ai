// ─── ErrorBoundary ─────────────────────────────────────────────────────────
// Catch React render-time errors so a single bad component can't bring down
// the whole app. Renders a friendly fallback with a "Reload" CTA, and logs
// the error to the console + sends a beacon to the `client_errors` table
// (best-effort, non-blocking).
//
// For now we log to Supabase directly rather than a third-party APM. A
// future Sentry/Datadog integration would just swap the `reportError`
// implementation.
import { Component, type ErrorInfo, type ReactNode } from "react";
import { supabase } from "../lib/supabase";

type Props = {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
};

type State = {
  error: Error | null;
};

async function reportError(error: Error, info: ErrorInfo) {
  // eslint-disable-next-line no-console
  console.error("[ErrorBoundary]", error, info);
  try {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id ?? null;
    // Fire-and-forget — never block the UI. We don't await this on purpose.
    void supabase.from("client_errors").insert({
      user_id: userId,
      url: window.location.href,
      message: error.message?.slice(0, 500) ?? null,
      stack: error.stack?.slice(0, 2000) ?? null,
      component_stack: info.componentStack?.slice(0, 2000) ?? null,
      user_agent: navigator.userAgent.slice(0, 300),
    });
  } catch {
    // Reporting must never throw.
  }
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    void reportError(error, info);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }
      return (
        <div className="grid min-h-screen place-items-center bg-white p-6">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-red-50 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 1.66a1 1 0 0 1 1.198 0l8 6a1 1 0 0 1 .401.8v9.04a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 1 17.5V8.46a1 1 0 0 1 .401-.8l8-6ZM10 5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1Zm0 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900">Une erreur est survenue</h1>
            <p className="mt-2 text-sm text-slate-600">
              Le détail a été remonté automatiquement. Tu peux recharger la page ou réessayer.
            </p>
            <pre className="mt-4 max-h-32 overflow-auto rounded-md bg-slate-50 p-3 text-left text-xs text-slate-700">
              {this.state.error.message}
            </pre>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={this.reset}
                className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                Réessayer
              </button>
              <button
                onClick={() => window.location.reload()}
                className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
              >
                Recharger
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
