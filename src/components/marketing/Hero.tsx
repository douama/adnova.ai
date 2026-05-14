import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
          <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium text-muted-strong sm:px-4 sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
            <span className="whitespace-nowrap">{t("hero.badge")}</span>
          </div>

          <h1 className="mt-5 text-[clamp(1.5rem,6.5vw,2.5rem)] font-bold leading-[1.1] tracking-tighter text-ink sm:mt-7 sm:text-6xl sm:leading-[1.05] md:text-7xl">
            <span className="whitespace-nowrap">{t("hero.title1")}</span>
            <br />
            <em>{t("hero.title2")}</em>.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-body sm:mt-7 sm:text-lg md:text-xl">
            {t("hero.subtitle")}{" "}
            <span className="text-ink font-medium">{t("hero.metric")}</span>.
          </p>

          <div className="mt-8 flex flex-row items-stretch justify-center gap-2 sm:mt-10 sm:gap-3">
            <Link
              to="/register"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-orange px-4 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow hover:-translate-y-0.5 sm:flex-none sm:px-8"
            >
              {t("hero.ctaPrimary")} <span aria-hidden>→</span>
            </Link>
            <a
              href="#how-it-works"
              className="glass-soft inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium text-body transition-all hover:text-ink hover:-translate-y-0.5 sm:flex-none sm:px-7"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>

          <p className="mt-6 text-xs text-muted">{t("hero.trialNote")}</p>
        </div>
      </Container>
    </section>
  );
}
