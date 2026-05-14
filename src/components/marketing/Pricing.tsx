import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { Container } from "../ui/container";
import { PLANS } from "../../data/plans";

type Billing = "monthly" | "yearly";

const YEARLY_DISCOUNT = 0.2; // 20% off when billed yearly

function yearlyMonthlyPrice(monthly: number): number {
  return Math.round(monthly * (1 - YEARLY_DISCOUNT));
}

export function Pricing() {
  const { t } = useTranslation();
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="pb-14 pt-6 sm:pb-20 sm:pt-10">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            {t("pricing.kicker")}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            <em>{t("pricing.title")}</em>.
          </h2>
          <p className="mt-4 text-base text-body">{t("pricing.subtitle")}</p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-1.5 rounded-full glass p-1">
            <BillingBtn
              active={billing === "monthly"}
              onClick={() => setBilling("monthly")}
              label={t("pricing.billingMonthly")}
            />
            <BillingBtn
              active={billing === "yearly"}
              onClick={() => setBilling("yearly")}
              label={t("pricing.billingYearly")}
              badge={t("pricing.save20")}
            />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => {
            const isPopular = p.popular;
            const isCustom = p.price === 0;
            const displayPrice = isCustom
              ? 0
              : billing === "yearly"
              ? yearlyMonthlyPrice(p.price)
              : p.price;
            const annualTotal = isCustom ? 0 : displayPrice * 12;

            return (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-2xl p-7 transition-all glass glass-highlight ${
                  isPopular
                    ? "border-orange/40 shadow-glow-sm ring-1 ring-orange/30"
                    : "hover:-translate-y-0.5"
                }`}
              >
                {isPopular ? (
                  <div className="absolute -top-3 right-6 rounded-full bg-orange px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow-sm">
                    {t("pricing.mostPopular")}
                  </div>
                ) : null}

                <h3 className="text-lg font-bold text-ink">{p.name}</h3>
                <p className="mt-1 text-xs text-muted-strong">{t(`plans.${p.id}Summary`)}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  {isCustom ? (
                    <span className="text-3xl font-bold tracking-tighter text-ink">{t("pricing.custom")}</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold tracking-tighter text-ink">
                        ${displayPrice}
                      </span>
                      <span className="text-sm text-muted-strong">{t("pricing.perMonth")}</span>
                    </>
                  )}
                </div>

                {!isCustom && billing === "yearly" ? (
                  <p className="mt-1.5 text-[11px] text-orange">
                    {t("pricing.billedYearlyPrefix")} ${annualTotal}{t("pricing.billedYearlySuffix")} ${(p.price * 12 - annualTotal).toFixed(0)}
                  </p>
                ) : !isCustom ? (
                  <p className="mt-1.5 text-[11px] text-muted">{t("pricing.billedMonthly")}</p>
                ) : null}

                <ul className="mt-5 flex-1 space-y-3">
                  {(t(`plans.${p.id}Features`, { returnObjects: true }) as string[]).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-body">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={p.id === "enterprise" ? "/about" : "/register"}
                  className={`mt-7 inline-flex h-11 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                    isPopular
                      ? "bg-orange text-white hover:bg-orange-hover hover:shadow-glow hover:-translate-y-0.5"
                      : "glass-soft text-body hover:text-ink hover:-translate-y-0.5"
                  }`}
                >
                  {p.id === "enterprise" ? t("plans.ctaContactSales") : t("plans.ctaStartTrial")}
                </Link>
              </div>
            );
          })}
        </div>

        {billing === "yearly" ? (
          <p className="mt-8 text-center text-xs text-muted">
            {t("pricing.yearlyNote1")}{" "}
            <Link to="/about" className="text-orange hover:text-orange-hover">
              {t("pricing.yearlyNoteLink")}
            </Link>{" "}
            {t("pricing.yearlyNote2")}
          </p>
        ) : null}
      </Container>
    </section>
  );
}

function BillingBtn({
  active,
  onClick,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex h-9 items-center gap-2 rounded-full px-4 text-xs font-medium transition-all ${
        active
          ? "bg-orange text-white shadow-glow-sm"
          : "text-muted-strong hover:text-ink"
      }`}
    >
      {label}
      {badge ? (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
            active
              ? "bg-white/20 text-white"
              : "bg-orange/15 text-orange"
          }`}
        >
          {badge}
        </span>
      ) : null}
    </button>
  );
}
