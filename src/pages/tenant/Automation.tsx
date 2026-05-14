import { Workflow } from "lucide-react";

export function AutomationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-ink">Automation</h1>
        <p className="mt-1 text-sm text-muted-strong">
          Custom rules and guardrails the AI must respect.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-16 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-border bg-bg text-muted">
          <Workflow className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <h2 className="mt-5 text-xl font-bold text-ink">Rules engine ships in M3</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Define hard guardrails the AI must follow : <em>"Never scale if ROAS &lt; 3.5×"</em>,{" "}
          <em>"Kill any creative with CTR &lt; 0.8% after 500 impressions"</em>. Currently
          enforced via the system prompt — soon editable per tenant.
        </p>
        <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-orange/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange">
          <span className="h-1 w-1 rounded-full bg-orange" /> Coming M3
        </div>
      </div>
    </div>
  );
}
