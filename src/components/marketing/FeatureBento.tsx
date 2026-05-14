import { useTranslation } from "react-i18next";
import {
  Sparkles,
  BarChart3,
  Network,
  Code2,
  ShieldCheck,
} from "lucide-react";
import { Container } from "../ui/container";
import { PlatformIcon } from "../ui/PlatformIcon";
import { PLATFORMS } from "../../data/platforms";

export function FeatureBento() {
  const { t } = useTranslation();
  return (
    <section className="pb-14 pt-6 sm:pb-20 sm:pt-10">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            {t("featureBento.kicker")}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            {t("featureBento.title1")} <em>{t("featureBento.title2")}</em>{" "}
            <span className="block">{t("featureBento.title3")}</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-6 md:grid-rows-[260px_220px]">
          {/* 1 — Big tile : live AI decision feed */}
          <Tile className="md:col-span-4 md:row-span-2" featured>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
                    {t("featureBento.tile1Badge")}
                  </span>
                </div>
                <span className="text-[10px] text-muted">{t("featureBento.tile1Sub")}</span>
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-tighter text-ink sm:text-3xl">
                {t("featureBento.tile1Title1")} <em>{t("featureBento.tile1Title2")}</em>.
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-body">
                {t("featureBento.tile1Desc")}
              </p>

              {/* Mock decision feed */}
              <div className="mt-auto space-y-1.5">
                <FeedRow
                  type="scale"
                  label={t("featureBento.feedScale")}
                  brand="Meta · Maison Aubergine"
                  action="Scale +12% — ROAS 6.2× over $850 baseline"
                  time="2m ago"
                />
                <FeedRow
                  type="kill"
                  label={t("featureBento.feedPause")}
                  brand="TikTok · Ondine Apparel"
                  action="Pause ad set — CTR 0.4% after 1,820 impressions"
                  time="9m ago"
                />
                <FeedRow
                  type="create"
                  label={t("featureBento.feedCreate")}
                  brand="Google · BeanBox Coffee"
                  action="Generated 3 new image variants for autumn drop"
                  time="14m ago"
                />
              </div>
            </div>
          </Tile>

          {/* 2 — 9 platforms */}
          <Tile className="md:col-span-2 md:row-span-1">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 text-orange">
                <Network className="h-4 w-4" strokeWidth={1.75} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t("featureBento.tile2Badge")}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-ink">
                {t("featureBento.tile2Title")}
              </h3>
              <div className="mt-auto grid grid-cols-5 gap-2.5">
                {PLATFORMS.slice(0, 9).map((p) => (
                  <PlatformIcon key={p.id} platform={p.id} className="h-14 w-14" />
                ))}
              </div>
            </div>
          </Tile>

          {/* 3 — Stats */}
          <Tile className="md:col-span-2 md:row-span-1">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 text-orange">
                <BarChart3 className="h-4 w-4" strokeWidth={1.75} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t("featureBento.tile3Badge")}
                </span>
              </div>
              <div className="mt-auto">
                <div className="text-5xl font-bold tracking-tighter text-ink">
                  4.82<span className="text-orange">×</span>
                </div>
                <p className="mt-1 text-xs text-muted-strong">
                  {t("featureBento.tile3Sub")}
                </p>
                <p className="mt-0.5 text-[10px] text-muted">
                  {t("featureBento.tile3SubSmall")}
                </p>
              </div>
            </div>
          </Tile>

          {/* 4 — AI engines */}
          <Tile className="md:col-span-3 md:row-span-1">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 text-orange">
                <Sparkles className="h-4 w-4" strokeWidth={1.75} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t("featureBento.tile4Badge")}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-ink">
                {t("featureBento.tile4Title")}
              </h3>
              <p className="mt-1 text-xs text-muted-strong">
                {t("featureBento.tile4Sub")}
              </p>
              <div className="mt-auto grid grid-cols-3 gap-2">
                <CreativeMini
                  gradient="from-orange/30 to-fuchsia-500/20"
                  label="Image"
                  hint="2s · $0.04"
                />
                <CreativeMini
                  gradient="from-cyan-500/30 to-blue-500/20"
                  label="Video"
                  hint="4-8s clip"
                />
                <CreativeMini
                  gradient="from-emerald-500/30 to-orange/20"
                  label="UGC"
                  hint="Avatar IV"
                />
              </div>
            </div>
          </Tile>

          {/* 5 — API + Security */}
          <Tile className="md:col-span-3 md:row-span-1">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 text-orange">
                <Code2 className="h-4 w-4" strokeWidth={1.75} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t("featureBento.tile5Badge")}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-ink">
                {t("featureBento.tile5Title")}
              </h3>
              <div className="mt-3 rounded-lg border border-border bg-bg/60 p-3 font-mono text-[10px] leading-relaxed text-body">
                <span className="text-muted">POST</span>{" "}
                <span className="text-ink">/v1/decisions</span>
                <br />
                <span className="text-muted">tenant_id:</span>{" "}
                <span className="text-orange">"acme"</span>
              </div>
              <div className="mt-auto flex items-center gap-2 text-[10px] text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                {t("featureBento.tile5Sub")}
              </div>
            </div>
          </Tile>
        </div>
      </Container>
    </section>
  );
}

function Tile({
  children,
  className = "",
  featured = false,
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`glass glass-highlight relative overflow-hidden rounded-3xl p-6 transition-all hover:-translate-y-0.5 ${className}`}
    >
      {featured ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #FF4D00, transparent 70%)" }}
        />
      ) : null}
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function FeedRow({
  type,
  label,
  brand,
  action,
  time,
}: {
  type: "scale" | "kill" | "create";
  label: string;
  brand: string;
  action: string;
  time: string;
}) {
  const dot = {
    scale: "bg-emerald-400",
    kill: "bg-rose-400",
    create: "bg-orange",
  }[type];
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-bg/40 px-3 py-2 text-xs">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      <span className="hidden w-12 shrink-0 text-[10px] font-bold uppercase tracking-wider text-muted-strong sm:inline">
        {label}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider text-muted">{brand}</div>
        <div className="truncate text-xs text-body">{action}</div>
      </div>
      <span className="shrink-0 text-[10px] text-muted">{time}</span>
    </div>
  );
}

function CreativeMini({
  gradient,
  label,
  hint,
}: {
  gradient: string;
  label: string;
  hint: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border">
      <div className={`aspect-square w-full bg-gradient-to-br ${gradient}`} />
      <div className="px-2 py-1.5">
        <div className="text-[11px] font-bold text-ink">{label}</div>
        <div className="text-[9px] text-muted">{hint}</div>
      </div>
    </div>
  );
}
