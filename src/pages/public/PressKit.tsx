import { Container } from "../../components/ui/container";
import { CTA } from "../../components/marketing/CTA";
import { PRESS_RELEASES, AWARDS, EXECUTIVES } from "../../data/press";
import { Award as AwardIcon, Newspaper, Download } from "lucide-react";

export function PressKitPage() {
  return (
    <>
      <section className="pt-20 pb-12 sm:pt-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Press
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tighter text-ink sm:text-6xl">
              Press <em>kit</em>.
            </h1>
            <p className="mt-5 text-base text-body sm:text-lg">
              Logos, exec bios, recent announcements and recognitions. Media inquiries:{" "}
              <a href="mailto:press@adnova.ai" className="text-orange hover:underline">
                press@adnova.ai
              </a>
              .
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border-strong bg-white/[0.03] px-5 py-3 text-sm font-medium text-body">
              <Download className="h-4 w-4 text-orange" strokeWidth={2} />
              Brand assets ZIP — coming soon
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange">
                <Newspaper className="h-3.5 w-3.5" strokeWidth={2} />
                Recent announcements
              </div>
              <ul className="mt-5 space-y-3">
                {PRESS_RELEASES.map((r) => (
                  <li
                    key={r.date + r.title}
                    className="flex items-start gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="w-20 shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted">
                      {new Date(r.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex-1 text-sm text-body">{r.title}</span>
                    <span className="shrink-0 rounded border border-border bg-white/[0.03] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-strong">
                      {r.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange">
                <AwardIcon className="h-3.5 w-3.5" strokeWidth={2} />
                Awards &amp; recognition
              </div>
              <ul className="mt-5 space-y-3">
                {AWARDS.map((a) => (
                  <li
                    key={a.year + a.award}
                    className="flex items-start gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="w-12 shrink-0 text-base font-bold tabular-nums text-orange">
                      {a.year}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-bold text-ink">{a.award}</span>
                      <span className="text-xs text-muted">{a.org}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-ink sm:text-4xl">
              <em>Executives</em>.
            </h2>
            <p className="mt-3 text-base text-body">
              Available for podcasts, panels and interviews. Reach out via{" "}
              <a href="mailto:press@adnova.ai" className="text-orange hover:underline">
                press@adnova.ai
              </a>
              .
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {EXECUTIVES.map((e) => (
              <div
                key={e.name}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="text-base font-bold text-ink">{e.name}</h3>
                <div className="mt-1 text-xs text-muted-strong">{e.role}</div>
                <p className="mt-4 text-sm leading-relaxed text-body">{e.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
