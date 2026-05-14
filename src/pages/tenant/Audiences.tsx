import { Users } from "lucide-react";

export function AudiencesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">Audiences</h1>
        <p className="mt-1 text-sm text-muted-strong">
          Lookalike, retargeting and custom audiences across platforms.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-16 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-border bg-bg text-muted">
          <Users className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <h2 className="mt-5 text-xl font-bold text-ink">Audience builder ships in M3</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          AdNova will auto-build lookalike and retargeting audiences from your conversion
          history. Cross-platform, deduped, refreshed daily.
        </p>
        <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-orange/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange">
          <span className="h-1 w-1 rounded-full bg-orange" /> Coming M3
        </div>
      </div>
    </div>
  );
}
