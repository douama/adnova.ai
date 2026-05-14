import { Link } from "react-router-dom";
import { useAuth } from "../../stores/authStore";
import { Logo } from "../../components/ui/logo";
import { Container } from "../../components/ui/container";

// M1 placeholder. M2 will re-skin the full dashboard (MetricsOverview,
// CampaignsTable, AIActivityPanel) with dark theme + Supabase Realtime.
export function DashboardPage() {
  const { user, signOut } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] ?? "there";

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-muted-strong sm:inline">
                {user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="text-sm text-muted-strong transition-colors hover:text-ink"
              >
                Sign out
              </button>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            Welcome aboard
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            Hey <em>{firstName}</em>.
          </h1>
          <p className="mt-5 text-base text-body">
            Your workspace is live. The full tenant dashboard (metrics, campaigns, AI
            decisions feed) ships next milestone — for now you can connect ad accounts and
            invite your team.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FeatureCard
              title="Connect ad accounts"
              body="Plug Meta, Google, TikTok and 6 more. OAuth in 30 seconds each."
              cta="Coming in M2"
            />
            <FeatureCard
              title="Invite teammates"
              body="Bring marketing + ops people in. Owner / admin / editor / viewer roles."
              cta="Coming in M2"
            />
          </div>

          <div className="mt-12 inline-flex flex-col items-center rounded-2xl border border-border bg-card p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-orange">
              Backend already live
            </span>
            <p className="mt-2 max-w-md text-sm text-body">
              AI ops engine, autonomous loop, cross-run memory, observability and
              healthcheck are all running in production on Supabase. The dashboard UI
              will plug in next.
            </p>
            <Link
              to="/"
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl border border-border-strong bg-white/[0.03] px-5 text-sm font-medium text-body transition-all hover:border-white/25 hover:text-ink"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

function FeatureCard({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-left">
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-body">{body}</p>
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-orange/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange">
        <span className="h-1 w-1 rounded-full bg-orange" /> {cta}
      </div>
    </div>
  );
}
