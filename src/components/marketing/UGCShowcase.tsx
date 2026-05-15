// UGC Showcase section — landing page proof of UGC ad generation capability.
// Video: Pexels #8995580 "Woman doing skin care" — free commercial use (Pexels license).
// Portrait 1080×1920, 25fps, plays on loop with no sound.
import { useRef, useEffect, useState } from "react";
import { Camera, Zap, TrendingUp, Star, Play } from "lucide-react";

const UGC_VIDEO_SRC = "https://videos.pexels.com/video-files/8995580/8995580-hd_1080_1920_25fps.mp4";
const UGC_VIDEO_FALLBACK = "https://videos.pexels.com/video-files/8995580/8995580-hd_720_1280_25fps.mp4";

const BENEFITS = [
  {
    icon: <TrendingUp className="h-4 w-4" />,
    title: "3× more engagement",
    desc: "UGC-style ads outperform traditional creatives in click-through rate across all platforms.",
  },
  {
    icon: <Zap className="h-4 w-4" />,
    title: "Generated in seconds",
    desc: "Product image or URL → AI script → avatar video. No filming, no studio, no waiting.",
  },
  {
    icon: <Star className="h-4 w-4" />,
    title: "100+ avatars & voices",
    desc: "Choose from diverse AI avatars with natural voices in 30+ languages, or train your own.",
  },
];

export function UGCShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/[0.06] blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full bg-orange/[0.04] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-20">

          {/* ── Phone mockup + video ───────────────────────────────────────── */}
          <div className="flex-shrink-0 flex flex-col items-center">
            {/* Phone frame */}
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute -inset-4 rounded-[3rem] bg-orange/[0.08] blur-2xl" />

              {/* Phone shell */}
              <div className="relative w-[220px] sm:w-[260px] rounded-[2.5rem] border-2 border-white/[0.12] bg-[#0a0a0a] shadow-[0_0_60px_rgba(0,0,0,0.8)] p-[6px]">
                {/* Screen bezel */}
                <div className="relative overflow-hidden rounded-[2.1rem] bg-black">
                  {/* Dynamic island */}
                  <div className="absolute top-2.5 left-1/2 z-20 -translate-x-1/2 h-[22px] w-[80px] rounded-full bg-black" />

                  {/* Video */}
                  <div className="relative aspect-[9/19.5]">
                    <video
                      ref={videoRef}
                      src={UGC_VIDEO_SRC}
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedData={() => setLoaded(true)}
                      onError={(e) => {
                        // Fallback to lower res if HD fails
                        const video = e.currentTarget;
                        if (video.src !== UGC_VIDEO_FALLBACK) {
                          video.src = UGC_VIDEO_FALLBACK;
                          video.load();
                        }
                      }}
                      className="h-full w-full object-cover"
                    />

                    {/* Play button shown before video loads */}
                    {!playing && !loaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                          <Play className="h-6 w-6 text-white ml-0.5" strokeWidth={2.5} />
                        </div>
                      </div>
                    )}

                    {/* UGC overlay: username + caption */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 pt-12">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-orange to-pink-500 flex items-center justify-center">
                              <span className="text-[9px] font-bold text-white">S</span>
                            </div>
                            <span className="text-xs font-semibold text-white">@sophiaskincare</span>
                          </div>
                          <p className="text-[10px] text-white/80 leading-tight max-w-[140px]">
                            This serum changed my skin in 2 weeks ✨ #skincare #glowup
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2.5">
                          <div className="flex flex-col items-center">
                            <div className="text-white/80 text-lg">❤️</div>
                            <span className="text-[9px] text-white/70">84K</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-white/80 text-lg">💬</div>
                            <span className="text-[9px] text-white/70">1.2K</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* "AI Generated" badge */}
                    <div className="absolute top-8 left-2 flex items-center gap-1 rounded-full border border-orange/40 bg-orange/20 px-2 py-0.5 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                      <span className="text-[9px] font-bold uppercase tracking-wider text-orange">AI Generated</span>
                    </div>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="mt-1.5 flex justify-center">
                  <div className="h-1 w-20 rounded-full bg-white/20" />
                </div>
              </div>
            </div>

            {/* Platform logos under phone */}
            <div className="mt-6 flex items-center gap-2 text-[10px] text-muted">
              <span>Auto-publish to</span>
              {["TikTok", "Reels", "Shorts"].map((p) => (
                <span
                  key={p}
                  className="rounded-md border border-border bg-white/[0.04] px-2 py-0.5 font-medium text-muted-strong"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* ── Copy ─────────────────────────────────────────────────────────── */}
          <div className="flex-1 max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange mb-6">
              <Camera className="h-3.5 w-3.5" />
              UGC Avatar Studio
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-ink leading-[1.1]">
              UGC ads that feel{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange-hover">
                human
              </span>
              <br />
              generated by AI in seconds.
            </h2>

            <p className="mt-4 text-base text-muted-strong leading-relaxed">
              Upload your product image or paste a product URL. AdNova writes the script,
              selects the avatar, and renders a UGC video ready to launch — no studio, no talent,
              no editing software.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-5">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-orange/30 bg-orange/[0.08] text-orange">
                    {b.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink">{b.title}</div>
                    <div className="mt-0.5 text-xs text-muted-strong">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="/signup"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-orange px-6 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow-sm hover:-translate-y-0.5"
              >
                <Camera className="h-4 w-4" strokeWidth={2} />
                Generate your first UGC ad
              </a>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <div className="flex -space-x-1.5">
                  {["#f59e0b", "#3b82f6", "#10b981"].map((c) => (
                    <div
                      key={c}
                      className="h-6 w-6 rounded-full border-2 border-bg"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <span>Free on all plans · no watermark</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
