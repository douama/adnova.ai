import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Minus } from "lucide-react";
import { Container } from "../ui/container";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="pb-14 pt-6 sm:pb-20 sm:pt-10">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              {t("faq.kicker")}
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
              {t("faq.title1")} <em>{t("faq.title2")}</em> {t("faq.title3")}
            </h2>
            <p className="mt-5 text-sm text-body">
              {t("faq.support1")}{" "}
              <a
                href="mailto:hello@adnova.ai"
                className="text-orange hover:text-orange-hover"
              >
                hello@adnova.ai
              </a>{" "}
              {t("faq.support2")}
            </p>
          </div>

          <div className="space-y-2">
            {FAQ_KEYS.map((key, idx) => {
              const isOpen = idx === openIndex;
              const q = t(`faq.${key}Q`);
              const a = t(`faq.${key}A`);
              return (
                <div
                  key={key}
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
                      {q}
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
                        {a}
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
