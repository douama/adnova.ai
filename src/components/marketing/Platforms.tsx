import { useTranslation } from "react-i18next";
import { Container } from "../ui/container";
import { PLATFORMS } from "../../data/platforms";
import { PlatformIcon } from "../ui/PlatformIcon";

export function Platforms() {
  const { t } = useTranslation();
  return (
    <section id="features" className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            {t("platforms.kicker")}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            <em>{t("platforms.title")}</em>.
          </h2>
          <p className="mt-4 text-base text-body">{t("platforms.subtitle")}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-9">
          {PLATFORMS.map((p) => (
            <div
              key={p.id}
              className="group relative flex aspect-square items-center justify-center rounded-xl border border-border bg-card transition-all hover:border-border-strong hover:-translate-y-0.5"
              title={p.name}
            >
              <PlatformIcon
                platform={p.id}
                className="h-12 w-12 transition-transform group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
