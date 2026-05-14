import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Star, TrendingUp, Check } from "lucide-react";
import { Container } from "../ui/container";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-20">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Orange glow blob */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #FF4D00, transparent)" }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Trust pill — live activity + brand count */}
          <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium text-muted-strong sm:px-4 sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
            </span>
            <span className="whitespace-nowrap">{t("hero.badge")}</span>
          </div>

          {/* Main headline */}
          <h1 className="mt-5 text-[clamp(1.5rem,6.5vw,2.5rem)] font-bold leading-[1.1] tracking-tighter text-ink sm:mt-7 sm:text-6xl sm:leading-[1.05] md:text-7xl">
            <span className="whitespace-nowrap">{t("hero.title1")}</span>
            <br />
            <em>{t("hero.title2")}</em>.
          </h1>

          {/* Subhead */}
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-body sm:mt-7 sm:text-lg md:text-xl">
            {t("hero.subtitle")}
          </p>

          {/* Value bullets — concrete promises that lift conversion */}
          <ul className="mx-auto mt-5 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-strong sm:text-sm">
            <li className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-orange" strokeWidth={2.5} />
              {t("hero.value1")}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-orange" strokeWidth={2.5} />
              {t("hero.value2")}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-orange" strokeWidth={2.5} />
              {t("hero.value3")}
            </li>
          </ul>

          {/* CTAs */}
          <div className="mt-8 flex flex-row items-stretch justify-center gap-2 sm:mt-9 sm:gap-3">
            <Link
              to="/register"
              className="group inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-orange px-4 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow hover:-translate-y-0.5 sm:flex-none sm:px-8"
            >
              {t("hero.ctaPrimary")}
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <a
              href="#how-it-works"
              className="glass-soft inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium text-body transition-all hover:text-ink hover:-translate-y-0.5 sm:flex-none sm:px-7"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>

          <p className="mt-5 text-xs text-muted">{t("hero.trialNote")}</p>

          {/* Social proof — stars + ROAS metric */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] text-muted-strong sm:text-xs">
            <div className="inline-flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" strokeWidth={0} />
                ))}
              </div>
              <span>
                <strong className="text-ink">4.9/5</strong> — 1 284 reviews
              </span>
            </div>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <div className="inline-flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3 text-emerald-400" strokeWidth={2.5} />
              <span>
                <strong className="text-ink">{t("hero.metric")}</strong>
              </span>
            </div>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <strong className="text-ink">2 412</strong> {t("hero.brandsScaling")}
            </span>
          </div>

        </div>
      </Container>
    </section>
  );
}
