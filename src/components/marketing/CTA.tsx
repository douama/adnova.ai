import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "../ui/container";

export function CTA() {
  const { t } = useTranslation();
  return (
    <section className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center sm:px-16 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(closest-side at 50% 0%, rgba(255,77,0,0.6), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
              {t("cta.title1")} <em>{t("cta.title2")}</em>?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-body">{t("cta.subtitle")}</p>
            <div className="mt-9 flex flex-row items-stretch justify-center gap-2 sm:gap-3">
              <Link
                to="/register"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-orange px-4 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow hover:-translate-y-0.5 sm:flex-none sm:px-8"
              >
                {t("cta.primary")} <span aria-hidden>→</span>
              </Link>
              <Link
                to="/pricing"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border-strong bg-white/[0.03] px-4 text-sm font-medium text-body transition-all hover:border-white/25 hover:text-ink hover:bg-white/[0.06] sm:flex-none sm:px-7"
              >
                {t("cta.secondary")}
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted">{t("cta.note")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
