import { useEffect, useState } from "react";
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

type FeedDecision = {
  type: "scale" | "kill" | "create";
  brand: string;
  action: string;
};

const FEED_POOL: FeedDecision[] = [
  { type: "scale",  brand: "Meta · Maison Aubergine",      action: "Scale +12% — ROAS 6.2× over $850 baseline" },
  { type: "kill",   brand: "TikTok · Ondine Apparel",      action: "Pause ad set — CTR 0.4% after 1,820 impressions" },
  { type: "create", brand: "Google · BeanBox Coffee",      action: "Generated 3 new image variants for autumn drop" },
  { type: "scale",  brand: "LinkedIn · Forge Studio",      action: "Budget +$200 — kept ROAS above 4.2×" },
  { type: "kill",   brand: "Meta · Lumière Skincare",      action: "Killed bottom 2 creatives — CTR 0.6% × 800 imps" },
  { type: "create", brand: "Meta · Calder & Sons",         action: "New lookalike — seed 3,420 buyers, 1% LAL" },
  { type: "scale",  brand: "TikTok · Tessera Home",        action: "Reallocated $1.4K from Pinterest to TikTok" },
  { type: "scale",  brand: "YouTube · Foundry Pro",        action: "Scale +18% — ROAS 5.8× over $1,200 baseline" },
  { type: "create", brand: "TikTok · Maison Aubergine",    action: "Generated UGC video — 14s vertical, 3 variants" },
  { type: "kill",   brand: "Snapchat · Ondine Apparel",    action: "Pause campaign — CPA $42 vs $28 target" },
  { type: "create", brand: "Pinterest · Beacon Optics",    action: "A/B started — 4 hooks against current winner" },
  { type: "scale",  brand: "Meta · Stagehand Audio",       action: "Scale +9% — keeping CPA $14 below target" },
];

const VISIBLE = 3;
const TICK_MS = 3500;

type FeedRow = FeedDecision & { id: number; bornAt: number };

function useLiveFeed(): FeedRow[] {
  const [rows, setRows] = useState<FeedRow[]>(() => {
    const now = Date.now();
    return FEED_POOL.slice(0, VISIBLE).map((item, i) => ({
      ...item,
      id: now - i,
      bornAt: now - (i + 1) * 120_000,
    }));
  });
  const [cursor, setCursor] = useState(VISIBLE);

  useEffect(() => {
    const tick = setInterval(() => {
      setCursor((c) => c + 1);
      setRows((prev) => {
        const next = FEED_POOL[cursor % FEED_POOL.length]!;
        return [
          { ...next, id: Date.now(), bornAt: Date.now() },
          ...prev.slice(0, VISIBLE - 1),
        ];
      });
    }, TICK_MS);
    return () => clearInterval(tick);
  }, [cursor]);

  return rows;
}

function formatAge(bornAt: number, nowMs: number): string {
  const diff = Math.max(0, nowMs - bornAt);
  if (diff < 30_000) return "now";
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  return `${min}m ago`;
}

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

              {/* Live decision feed — rotates every 3.5s */}
              <LiveFeed t={t} />
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

function LiveFeed({ t }: { t: (key: string) => string }) {
  const rows = useLiveFeed();
  // Tick once per second so timestamps stay live.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const labelByType: Record<FeedDecision["type"], string> = {
    scale: t("featureBento.feedScale"),
    kill: t("featureBento.feedPause"),
    create: t("featureBento.feedCreate"),
  };
  const dotByType: Record<FeedDecision["type"], string> = {
    scale: "bg-emerald-400",
    kill: "bg-rose-400",
    create: "bg-orange",
  };

  return (
    <div className="mt-auto space-y-1.5">
      {rows.map((row, i) => (
        <div
          key={row.id}
          className={`flex items-center gap-3 rounded-xl border border-border bg-bg/40 px-3 py-2 text-xs ${
            i === 0 ? "animate-fade-up" : ""
          }`}
        >
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotByType[row.type]}`} />
          <span className="hidden w-12 shrink-0 text-[10px] font-bold uppercase tracking-wider text-muted-strong sm:inline">
            {labelByType[row.type]}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-wider text-muted">{row.brand}</div>
            <div className="truncate text-xs text-body">{row.action}</div>
          </div>
          <span className="shrink-0 text-[10px] text-muted tabular-nums">
            {formatAge(row.bornAt, now)}
          </span>
        </div>
      ))}
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
