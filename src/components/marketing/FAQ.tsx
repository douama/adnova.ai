import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Container } from "../ui/container";

type Item = { q: string; a: string };

const FAQS: Item[] = [
  {
    q: "How autonomous is AdNova really?",
    a: "Every 30 minutes our autonomous engine analyses your live campaigns, applies hard guardrails (no scaling under 3.5× ROAS, no daily lift over 15%, kill creatives under 0.8% CTR after 500 impressions), and either logs proposals or executes directly depending on your AI mode. You set the autonomy level per workspace.",
  },
  {
    q: "What happens if the AI makes a bad call?",
    a: "You see every decision in the Decision Log with reason, confidence, and the exact metric trail that justified it. Anything can be rolled back in one click. Decisions under 0.6 confidence default to “suggested” in non-autonomous mode so you approve before execution.",
  },
  {
    q: "Do I need to connect every ad platform?",
    a: "No — start with one. AdNova adapts to your data: a Meta-only account still gets full creative gen, audience builder, and budget optimization. Add more channels later and the AI auto-rebalances spend across them.",
  },
  {
    q: "Which AI models power the platform?",
    a: "AdNova runs a tuned reasoning engine for autonomous decisions, a proprietary image studio for visuals, an in-house video synthesis pipeline for motion, and an avatar engine for UGC. The orchestration is our IP; the underlying weights stay under the hood. Enterprise customers can bring their own model keys for cost transparency.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — every plan is month-to-month. Yearly plans pre-pay 12 months with a 20% discount but get a pro-rated refund on cancellation, no questions. No long-term lock-ins.",
  },
  {
    q: "Is it safe for my data?",
    a: "Every workspace is RLS-locked at the database level. Provider API keys never round-trip to the browser — only their last-4-char preview. We are SOC 2 Type II in audit, GDPR-aligned, and EU residency is available on Enterprise.",
  },
  {
    q: "How long until I see results?",
    a: "Most brands see ROAS improvements within 7 days of connecting their first ad account. The AI learns your brand voice and ICP during the trial — by day 14 you're typically running at 2-3× your previous ROAS baseline.",
  },
  {
    q: "Do you offer agency / white-label pricing?",
    a: "Yes — the Agency plan ($499/mo, or $399/mo annually) gives you unlimited ad accounts, unlimited AI creatives, white-label dashboards for your clients, and the private API. Enterprise contracts add custom volume + dedicated CSM.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-14 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
              Questions{" "}
              <em>brands ask</em> before they sign up.
            </h2>
            <p className="mt-5 text-sm text-body">
              Don't see yours?{" "}
              <a
                href="mailto:hello@adnova.ai"
                className="text-orange hover:text-orange-hover"
              >
                hello@adnova.ai
              </a>{" "}
              — typically a 2-hour reply.
            </p>
          </div>

          <div className="space-y-2">
            {FAQS.map((item, idx) => {
              const isOpen = idx === openIndex;
              return (
                <div
                  key={item.q}
                  className="glass overflow-hidden rounded-2xl transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:text-ink"
                  >
                    <span
                      className={`text-sm font-bold ${
                        isOpen ? "text-ink" : "text-body"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${
                        isOpen
                          ? "border-orange/40 bg-orange/10 text-orange"
                          : "border-border text-muted-strong"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-3 w-3" />
                      ) : (
                        <Plus className="h-3 w-3" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-200 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-body">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
