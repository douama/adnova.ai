import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Container } from "../ui/container";
import { PLANS } from "../../data/plans";

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">Four plans.</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            <em>Pick yours</em>.
          </h2>
          <p className="mt-4 text-base text-body">
            Every plan includes a 14-day free trial. No credit card. Cancel anytime.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => {
            const isPopular = p.popular;
            return (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-2xl border p-7 transition-all ${
                  isPopular
                    ? "border-orange bg-card shadow-glow-sm"
                    : "border-border bg-card hover:border-border-strong"
                }`}
              >
                {isPopular ? (
                  <div className="absolute -top-3 right-6 rounded-full bg-orange px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most popular
                  </div>
                ) : null}

                <h3 className="text-lg font-bold text-ink">{p.name}</h3>
                <p className="mt-1 text-xs text-muted-strong">{p.summary}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  {p.price > 0 ? (
                    <>
                      <span className="text-4xl font-bold tracking-tighter text-ink">${p.price}</span>
                      <span className="text-sm text-muted-strong">/{p.period}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold tracking-tighter text-ink">Custom</span>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
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
                      ? "bg-orange text-white hover:bg-orange-hover hover:shadow-glow"
                      : "border border-border-strong bg-white/[0.03] text-body hover:border-white/25 hover:text-ink hover:bg-white/[0.06]"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
