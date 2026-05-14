import { useTranslation } from "react-i18next";
import { Plug, Brain, Rocket } from "lucide-react";
import { Container } from "../ui/container";

export function HowItWorks() {
  const { t } = useTranslation();
  const STEPS = [
    { n: "01", titleKey: "howItWorks.step1Title", bodyKey: "howItWorks.step1Body", icon: Plug,   duration: "~30s" },
    { n: "02", titleKey: "howItWorks.step2Title", bodyKey: "howItWorks.step2Body", icon: Brain,  duration: "~10 min" },
    { n: "03", titleKey: "howItWorks.step3Title", bodyKey: "howItWorks.step3Body", icon: Rocket, duration: "24 / 7" },
  ];
  return (
    <section id="how-it-works" className="pb-14 pt-6 sm:pb-20 sm:pt-10">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            {t("howItWorks.kicker")}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            {t("howItWorks.title1")} <em>{t("howItWorks.title2")}</em>.
          </h2>
        </div>

        <div className="relative mt-10">
          {/* Connecting dotted line on desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-12 hidden h-px w-[calc(66%-4rem)] -translate-x-1/2 md:block"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 50%, transparent 0%)",
              backgroundSize: "8px 1px",
              backgroundRepeat: "repeat-x",
              color: "var(--border2)",
            }}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.n}
                  className="glass glass-highlight relative flex flex-col rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange/10 text-orange ring-1 ring-orange/30">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="rounded-full border border-border bg-bg/40 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-strong">
                      {s.duration}
                    </span>
                  </div>
                  <div className="mt-5 text-xs font-bold tracking-widest text-orange">
                    {s.n}
                  </div>
                  <h3 className="mt-1.5 text-2xl font-bold tracking-tighter text-ink">
                    {t(s.titleKey)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{t(s.bodyKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
