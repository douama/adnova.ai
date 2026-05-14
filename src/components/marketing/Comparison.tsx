import { useTranslation } from "react-i18next";
import { Container } from "../ui/container";

type Verdict = "yes" | "no" | "partial";
type Row = { featureKey: string; smartly: Verdict; adnova: Verdict; noteKey?: string };

const ROWS: Row[] = [
  { featureKey: "row1", smartly: "yes",     adnova: "yes" },
  { featureKey: "row2", smartly: "partial", adnova: "yes", noteKey: "row2Note" },
  { featureKey: "row3", smartly: "yes",     adnova: "yes" },
  { featureKey: "row4", smartly: "no",      adnova: "yes", noteKey: "row4Note" },
  { featureKey: "row5", smartly: "no",      adnova: "yes" },
  { featureKey: "row6", smartly: "no",      adnova: "yes", noteKey: "row6Note" },
  { featureKey: "row7", smartly: "partial", adnova: "yes", noteKey: "row7Note" },
  { featureKey: "row8", smartly: "yes",     adnova: "no",  noteKey: "row8Note" },
];

function Cell({ value }: { value: Verdict }) {
  if (value === "yes") return <span className="text-orange">●</span>;
  if (value === "partial") return <span className="text-muted-strong">◐</span>;
  return <span className="text-muted">○</span>;
}

export function Comparison() {
  const { t } = useTranslation();
  return (
    <section className="pb-14 pt-6 sm:pb-20 sm:pt-10">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            {t("comparison.kicker1")} <em>{t("comparison.kicker2")}</em>.
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            {t("comparison.title")}
          </h2>
          <p className="mt-4 text-base text-body">{t("comparison.subtitle")}</p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid grid-cols-[1fr_auto_auto] gap-px bg-border text-sm">
            <div className="bg-surface px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-strong">
              {t("comparison.headerFeature")}
            </div>
            <div className="bg-surface px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-muted-strong">
              Smartly
            </div>
            <div className="bg-surface px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-orange">
              AdNova
            </div>

            {ROWS.map((r) => (
              <div className="contents" key={r.featureKey}>
                <div className="bg-card px-6 py-4 text-body">
                  {t(`comparison.${r.featureKey}`)}
                  {r.noteKey ? (
                    <div className="mt-0.5 text-xs text-muted">{t(`comparison.${r.noteKey}`)}</div>
                  ) : null}
                </div>
                <div className="bg-card px-6 py-4 text-center text-lg">
                  <Cell value={r.smartly} />
                </div>
                <div className="bg-card px-6 py-4 text-center text-lg">
                  <Cell value={r.adnova} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
