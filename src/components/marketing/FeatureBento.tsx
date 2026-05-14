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
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            The platform
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">
            Everything an <em>ad agency</em>{" "}
            <span className="block">does. In one API.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-6 md:grid-rows-[260px_220px]">
          {/* 1 — Big tile : live AI decision feed (md col span 4, row span 2) */}
          <Tile className="md:col-span-4 md:row-span-2" featured>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
                    Live AI decisions
                  </span>
                </div>
                <span className="text-[10px] text-muted">Last 24h · 1,284 actions</span>
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-tighter text-ink sm:text-3xl">
                The AI never <em>sleeps</em>.
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-body">
                Our autonomous engine analyses every campaign every 30 minutes — kills losers, scales winners,
                rewrites creatives. You approve milestones, not micro-decisions.
              </p>

              {/* Mock decision feed */}
              <div className="mt-auto space-y-1.5">
                <FeedRow
                  type="scale"
                  brand="Meta · Maison Aubergine"
                  action="Scale +12% — ROAS 6.2× over $850 baseline"
                  time="2m ago"
                />
                <FeedRow
                  type="kill"
                  brand="TikTok · Ondine Apparel"
                  action="Pause ad set — CTR 0.4% after 1,820 impressions"
                  time="9m ago"
                />
                <FeedRow
                  type="create"
                  brand="Google · BeanBox Coffee"
                  action="Generated 3 new image variants for autumn drop"
                  time="14m ago"
                />
              </div>
            </div>
          </Tile>

          {/* 2 — 9 platforms (col span 2, row 1) */}
          <Tile className="md:col-span-2 md:row-span-1">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 text-orange">
                <Network className="h-4 w-4" strokeWidth={1.75} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  9 ad platforms
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-ink">
                One workspace, every channel.
              </h3>
              <div className="mt-auto grid grid-cols-5 gap-1.5">
                {PLATFORMS.slice(0, 9).map((p) => (
                  <PlatformIcon key={p.id} platform={p.id} className="h-7 w-7" />
                ))}
              </div>
            </div>
          </Tile>

          {/* 3 — Stats (col span 2, row 1) */}
          <Tile className="md:col-span-2 md:row-span-1">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 text-orange">
                <BarChart3 className="h-4 w-4" strokeWidth={1.75} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Performance
                </span>
              </div>
              <div className="mt-auto">
                <div className="text-5xl font-bold tracking-tighter text-ink">
                  4.82<span className="text-orange">×</span>
                </div>
                <p className="mt-1 text-xs text-muted-strong">
                  Average ROAS across 2,412 brands
                </p>
                <p className="mt-0.5 text-[10px] text-muted">
                  Up from 2.1× before AdNova
                </p>
              </div>
            </div>
          </Tile>

          {/* 4 — AI engines (col span 3, row 1) */}
          <Tile className="md:col-span-3 md:row-span-1">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 text-orange">
                <Sparkles className="h-4 w-4" strokeWidth={1.75} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  AI creatives
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-ink">
                Images, videos, UGC — at scale.
              </h3>
              <p className="mt-1 text-xs text-muted-strong">
                Image Studio · Video Engine · Avatar Studio
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

          {/* 5 — API + Security (col span 3, row 1) */}
          <Tile className="md:col-span-3 md:row-span-1">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 text-orange">
                <Code2 className="h-4 w-4" strokeWidth={1.75} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Developer first
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-ink">
                Embed AdNova in your own product.
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
                SOC 2 · GDPR · RLS-locked tenants
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
  brand,
  action,
  time,
}: {
  type: "scale" | "kill" | "create";
  brand: string;
  action: string;
  time: string;
}) {
  const cfg = {
    scale: { dot: "bg-emerald-400", label: "Scale" },
    kill: { dot: "bg-rose-400", label: "Pause" },
    create: { dot: "bg-orange", label: "Create" },
  }[type];
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-bg/40 px-3 py-2 text-xs">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${cfg.dot}`} />
      <span className="hidden w-12 shrink-0 text-[10px] font-bold uppercase tracking-wider text-muted-strong sm:inline">
        {cfg.label}
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
