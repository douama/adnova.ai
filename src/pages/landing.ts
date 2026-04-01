import type { Context } from 'hono'

// ── Shared plan definitions (source of truth) ───────────────────────────────
export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 299,
    period: 'month',
    color: '#6366f1',
    colorName: 'indigo',
    popular: false,
    cta: 'Start Free Trial',
    adSpend: '$10K',
    campaigns: 10,
    platforms: 2,
    users: 2,
    creatives: 50,
    features: [
      '10 active campaigns',
      'Up to $10K ad spend/month',
      '2 platforms (Facebook + Google)',
      '2 team members',
      '50 AI creatives/month',
      'Basic AI auto-optimization',
      'Standard analytics dashboard',
      'Email support (48h)',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 799,
    period: 'month',
    color: '#f97316',
    colorName: 'orange',
    popular: true,
    cta: 'Start Free Trial',
    adSpend: '$100K',
    campaigns: 50,
    platforms: 9,
    users: 10,
    creatives: 500,
    features: [
      '50 active campaigns',
      'Up to $100K ad spend/month',
      'All 9 ad platforms',
      '10 team members',
      '500 AI creatives/month',
      'Full AI engine (UGC video included)',
      'A/B testing automation',
      'Lookalike audience builder',
      'Advanced analytics + reports',
      'Priority support (4h)',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0,
    period: '',
    color: '#10b981',
    colorName: 'emerald',
    popular: false,
    cta: 'Contact Sales',
    adSpend: 'Unlimited',
    campaigns: 999,
    platforms: 9,
    users: 999,
    creatives: 999,
    features: [
      'Unlimited campaigns',
      'Unlimited ad spend',
      'All platforms + custom integrations',
      'Unlimited team members',
      'Unlimited AI creatives',
      'Custom AI models trained on your data',
      'Dedicated Customer Success Manager',
      '99.9% SLA guarantee',
      'White-label solution',
      'Private API access',
    ],
  },
]

export const renderLanding = (c: Context) => {
  return c.html(`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <!-- ═══ SEO PRIMARY ═══════════════════════════════════════════════════════ -->
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>AdNova AI — Autonomous Ad Intelligence | 4.82x ROAS Guaranteed</title>
  <meta name="description" content="AdNova AI manages your ads across 9 platforms autonomously. Our AI scales winners, kills losers, generates creatives and reallocates budgets 24/7. Average client ROAS: 4.82x. Try free for 14 days."/>
  <meta name="keywords" content="AI advertising platform, autonomous ad optimization, ROAS improvement, Facebook ads automation, Google ads AI, TikTok advertising, ad creative generation, programmatic advertising AI"/>
  <link rel="canonical" href="https://adnova.ai/"/>
  <meta name="robots" content="index, follow"/>
  <meta name="author" content="AdNova AI"/>

  <!-- ═══ OPEN GRAPH ════════════════════════════════════════════════════════ -->
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://adnova.ai/"/>
  <meta property="og:title" content="AdNova AI — Your Ads on Autopilot. 4.82x ROAS Average."/>
  <meta property="og:description" content="2,412 brands trust AdNova AI to autonomously optimize ads across 9 platforms. Connect in 3 min, watch ROAS climb."/>
  <meta property="og:image" content="https://adnova.ai/og-image.png"/>
  <meta property="og:site_name" content="AdNova AI"/>

  <!-- ═══ TWITTER CARD ═════════════════════════════════════════════════════ -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:site" content="@AdNovaAI"/>
  <meta name="twitter:title" content="AdNova AI — Autonomous Advertising Intelligence"/>
  <meta name="twitter:description" content="AI that scales winners, kills losers, generates creatives — 24/7. Average ROAS: 4.82x across 2,412 brands."/>
  <meta name="twitter:image" content="https://adnova.ai/twitter-card.png"/>

  <!-- ═══ SCHEMA.ORG ════════════════════════════════════════════════════════ -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AdNova AI",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Autonomous advertising intelligence platform that optimizes ad campaigns across 9 platforms using machine learning.",
    "offers": [
      {"@type":"Offer","name":"Starter","price":"299","priceCurrency":"USD"},
      {"@type":"Offer","name":"Growth","price":"799","priceCurrency":"USD"},
      {"@type":"Offer","name":"Enterprise","price":"0","description":"Custom pricing"}
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "847",
      "bestRating": "5"
    },
    "publisher": {"@type":"Organization","name":"AdNova AI","url":"https://adnova.ai"}
  }
  </script>

  <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <script>
    tailwind.config = {
      darkMode:'class',
      theme:{extend:{
        fontFamily:{sans:['Inter','system-ui','sans-serif'],display:['Space Grotesk','Inter','sans-serif']},
        colors:{
          brand:{50:'#f0f4ff',100:'#e0e9ff',200:'#c7d7fe',300:'#a5bbfc',400:'#8194f8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81'},
          neon:{purple:'#a855f7',blue:'#3b82f6',pink:'#ec4899',cyan:'#06b6d4',green:'#10b981'}
        }
      }}
    }
  </script>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    :root{
      --glow-purple:rgba(99,102,241,0.5);--glow-pink:rgba(236,72,153,0.4);--glow-cyan:rgba(6,182,212,0.35);
      --bg-deep:#030512;
      --lg-bg:rgba(255,255,255,0.045);
      --lg-border:rgba(255,255,255,0.13);
      --lg-border-top:rgba(255,255,255,0.22);
      --lg-shadow:0 8px 32px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.12),inset 0 -1px 0 rgba(0,0,0,0.2);
      --lg-blur:saturate(1.9) blur(22px);
    }
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:var(--bg-deep)}
    ::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.4);border-radius:3px}
    ::-webkit-scrollbar-thumb:hover{background:#6366f1}
    html{scroll-behavior:smooth}
    body{background:var(--bg-deep);font-family:'Inter',sans-serif;overflow-x:hidden;color:#e2e8f0}

    /* ══ DEEP BACKGROUND — 5-stop radial scene ══ */
    body::after{content:'';position:fixed;inset:0;z-index:-2;
      background:
        radial-gradient(ellipse 80% 70% at 10% 0%,rgba(79,70,229,0.22) 0%,transparent 60%),
        radial-gradient(ellipse 60% 55% at 90% 30%,rgba(168,85,247,0.16) 0%,transparent 55%),
        radial-gradient(ellipse 50% 40% at 50% 90%,rgba(6,182,212,0.10) 0%,transparent 50%),
        radial-gradient(ellipse 100% 80% at 50% 50%,rgba(3,5,18,1) 40%,transparent 100%),
        #030512;
      pointer-events:none}

    /* ── Noise texture ── */
    body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:.5}

    /* ── Cyber grid ── */
    .grid-lines{background-image:linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px);background-size:60px 60px}
    .grid-lines-fine{background-image:linear-gradient(rgba(99,102,241,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.025) 1px,transparent 1px);background-size:20px 20px}

    /* ══ LIQUID GLASS — Core system ══
       Inspired by Apple visionOS / iOS 26 liquid glass
       Key: asymmetric gradient + prism top border + shimmer reflex + deep blur
    */

    /* Base glass — lightweight */
    .glass{
      background:linear-gradient(145deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.02) 100%);
      backdrop-filter:var(--lg-blur);-webkit-backdrop-filter:var(--lg-blur);
      border:1px solid var(--lg-border);
      border-top-color:var(--lg-border-top);
      box-shadow:var(--lg-shadow);
      position:relative;
    }
    .glass::before{
      content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
      background:linear-gradient(105deg,rgba(255,255,255,0.07) 0%,transparent 40%,transparent 60%,rgba(255,255,255,0.03) 100%);
    }

    /* XL glass — hero badges, big panels */
    .glass-xl{
      background:linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.015) 100%);
      backdrop-filter:saturate(2) blur(32px);-webkit-backdrop-filter:saturate(2) blur(32px);
      border:1px solid rgba(255,255,255,0.14);
      border-top-color:rgba(255,255,255,0.26);
      box-shadow:0 12px 40px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.15),inset 0 -1px 0 rgba(0,0,0,0.25);
      position:relative;overflow:hidden;
    }
    .glass-xl::before{
      content:'';position:absolute;top:0;left:0;right:0;height:1px;border-radius:inherit;
      background:linear-gradient(90deg,transparent 0%,rgba(168,85,247,0.8) 20%,rgba(99,102,241,0.9) 40%,rgba(6,182,212,0.7) 60%,rgba(236,72,153,0.6) 80%,transparent 100%);
    }

    /* Card glass — feature cards, stats */
    .glass-card{
      background:linear-gradient(145deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.018) 60%,rgba(99,102,241,0.03) 100%);
      backdrop-filter:saturate(1.8) blur(20px);-webkit-backdrop-filter:saturate(1.8) blur(20px);
      border:1px solid rgba(255,255,255,0.10);
      border-top-color:rgba(255,255,255,0.20);
      box-shadow:0 4px 24px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.10);
      transition:all .4s cubic-bezier(.25,.8,.25,1);
      position:relative;overflow:hidden;
    }
    /* Prism top line */
    .glass-card::before{
      content:'';position:absolute;top:0;left:0;right:0;height:1px;
      background:linear-gradient(90deg,transparent 5%,rgba(99,102,241,0.6) 30%,rgba(168,85,247,0.7) 50%,rgba(6,182,212,0.5) 70%,transparent 95%);
      opacity:0;transition:opacity .35s ease;
    }
    /* Internal shimmer reflex */
    .glass-card::after{
      content:'';position:absolute;top:-40%;left:-60%;width:60%;height:180%;
      background:linear-gradient(105deg,transparent,rgba(255,255,255,0.06),transparent);
      transform:skewX(-15deg);transition:left .6s ease;pointer-events:none;
    }
    .glass-card:hover::before{opacity:1}
    .glass-card:hover::after{left:120%}
    .glass-card:hover{
      background:linear-gradient(145deg,rgba(255,255,255,0.08) 0%,rgba(99,102,241,0.06) 100%);
      border-color:rgba(99,102,241,0.35);
      border-top-color:rgba(168,85,247,0.5);
      transform:translateY(-6px) scale(1.005);
      box-shadow:
        0 30px 60px rgba(0,0,0,.6),
        0 0 0 1px rgba(99,102,241,0.12),
        inset 0 1px 0 rgba(255,255,255,0.14),
        0 0 40px rgba(99,102,241,0.08);
    }

    /* Neo glass — ROI calc, panels, modals */
    .glass-neo{
      background:linear-gradient(160deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.025) 50%,rgba(99,102,241,0.04) 100%);
      backdrop-filter:saturate(2) blur(28px);-webkit-backdrop-filter:saturate(2) blur(28px);
      border:1px solid rgba(255,255,255,0.12);
      border-top-color:rgba(255,255,255,0.24);
      border-left-color:rgba(255,255,255,0.16);
      box-shadow:
        0 20px 60px rgba(0,0,0,0.5),
        inset 0 1px 0 rgba(255,255,255,0.14),
        inset 1px 0 0 rgba(255,255,255,0.06),
        inset 0 -1px 0 rgba(0,0,0,0.2);
      position:relative;overflow:hidden;
    }
    /* Prism spectrum line on top */
    .glass-neo::before{
      content:'';position:absolute;top:0;left:0;right:0;height:1px;
      background:linear-gradient(90deg,transparent,rgba(99,102,241,0.7) 20%,rgba(168,85,247,0.8) 40%,rgba(6,182,212,0.6) 60%,rgba(236,72,153,0.5) 80%,transparent);
    }
    /* Diagonal light refraction */
    .glass-neo::after{
      content:'';position:absolute;top:-50%;left:-30%;width:30%;height:200%;
      background:linear-gradient(110deg,transparent,rgba(255,255,255,0.04),transparent);
      transform:skewX(-15deg);animation:lg-sweep 8s ease-in-out infinite;pointer-events:none;
    }

    /* ── LG animations ── */
    @keyframes lg-sweep{0%,100%{left:-30%;opacity:1}50%{left:120%;opacity:.6}}
    @keyframes lg-orb-pulse{0%,100%{transform:scale(1);opacity:.25}50%{transform:scale(1.15);opacity:.45}}
    @keyframes lg-prism{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

    /* ── Gradient text ── */
    .glow-text{background:linear-gradient(135deg,#818cf8 0%,#a855f7 40%,#ec4899 70%,#f59e0b 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .glow-text-2{background:linear-gradient(135deg,#06b6d4 0%,#818cf8 50%,#a855f7 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .glow-text-3{background:linear-gradient(135deg,#10b981,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .glow-text-orange{background:linear-gradient(135deg,#f97316 0%,#ef4444 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .hero-text{
      background:linear-gradient(135deg,#fff 0%,#c7d2fe 25%,#a78bfa 55%,#ec4899 85%,#f97316 100%);
      background-size:200% 200%;
      animation:lg-prism 6s ease infinite;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    }

    /* ── Liquid Glass Orbs — deep atmospheric ── */
    .orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;will-change:transform}
    .orb-1{width:1000px;height:1000px;background:radial-gradient(circle,rgba(79,70,229,0.28) 0%,rgba(99,102,241,0.12) 40%,transparent 70%);top:-300px;left:-400px;animation:orb-float 16s ease-in-out infinite}
    .orb-2{width:800px;height:800px;background:radial-gradient(circle,rgba(168,85,247,0.22) 0%,rgba(139,92,246,0.1) 40%,transparent 70%);top:300px;right:-300px;animation:orb-float 20s ease-in-out infinite reverse}
    .orb-3{width:700px;height:700px;background:radial-gradient(circle,rgba(6,182,212,0.15) 0%,rgba(14,165,233,0.07) 40%,transparent 70%);bottom:200px;left:25%;animation:orb-float 13s ease-in-out infinite 3s}
    .orb-4{width:500px;height:500px;background:radial-gradient(circle,rgba(236,72,153,0.12) 0%,transparent 70%);top:60%;right:5%;animation:orb-float 17s ease-in-out infinite 7s}
    @keyframes orb-float{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(40px,-60px) scale(1.06)}50%{transform:translate(-20px,30px) scale(.95)}75%{transform:translate(60px,20px) scale(1.04)}}

    /* ── Animations ── */
    .fade-up{opacity:0;transform:translateY(28px) scale(0.99);transition:opacity .85s cubic-bezier(.25,.8,.25,1),transform .85s cubic-bezier(.25,.8,.25,1)}
    .fade-up.visible{opacity:1;transform:translateY(0) scale(1)}
    .fade-in{opacity:0;transition:opacity .7s ease}
    .fade-in.visible{opacity:1}
    .fade-up:nth-child(2){transition-delay:.1s}.fade-up:nth-child(3){transition-delay:.2s}.fade-up:nth-child(4){transition-delay:.3s}.fade-up:nth-child(5){transition-delay:.4s}.fade-up:nth-child(6){transition-delay:.5s}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
    .float{animation:float 5.5s ease-in-out infinite}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    .ticker-inner{animation:ticker 32s linear infinite;white-space:nowrap;display:flex;align-items:center;gap:0}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}
    .blink{animation:blink 1.8s ease infinite}
    @keyframes gradient-x{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
    @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}
    @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    .spin-slow{animation:spin-slow 22s linear infinite}
    @keyframes pulse-ring{0%{transform:scale(.85);opacity:.8}100%{transform:scale(2.5);opacity:0}}
    .pulse-ring{animation:pulse-ring 2.8s cubic-bezier(0,0,.2,1) infinite}
    @keyframes scanline{0%{top:-10%}100%{top:110%}}
    .scanline{animation:scanline 4s linear infinite}
    @keyframes border-glow{
      0%,100%{box-shadow:0 0 15px rgba(99,102,241,0.3),inset 0 1px 0 rgba(255,255,255,0.1)}
      50%{box-shadow:0 0 35px rgba(99,102,241,0.6),0 0 70px rgba(168,85,247,0.2),inset 0 1px 0 rgba(255,255,255,0.18)}
    }
    .border-glow{animation:border-glow 3.5s ease-in-out infinite}
    @keyframes count-up{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}
    .count-up{animation:count-up .6s ease forwards}
    @keyframes typewriter{from{width:0}to{width:100%}}
    @keyframes slide-in-right{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
    .slide-in-right{animation:slide-in-right .5s ease forwards}
    @keyframes pop{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}}
    .pop{animation:pop .3s ease}
    @keyframes neon-pulse{0%,100%{text-shadow:0 0 5px rgba(99,102,241,0.5)}50%{text-shadow:0 0 20px rgba(99,102,241,0.9),0 0 40px rgba(168,85,247,0.4)}}
    @keyframes lg-float-card{0%,100%{transform:translateY(0) rotateX(0deg)}50%{transform:translateY(-8px) rotateX(1deg)}}

    /* ── Navbar — liquid glass nav ── */
    .nav-blur{
      backdrop-filter:saturate(2) blur(30px);-webkit-backdrop-filter:saturate(2) blur(30px);
      background:linear-gradient(180deg,rgba(3,5,18,0.82) 0%,rgba(3,5,18,0.72) 100%);
      border-bottom:1px solid rgba(255,255,255,0.08);
      border-bottom-color:rgba(255,255,255,0.06);
      box-shadow:0 4px 24px rgba(0,0,0,0.4),inset 0 -1px 0 rgba(99,102,241,0.07);
    }
    .nav-link{position:relative;transition:color .25s ease;color:#94a3b8}
    .nav-link::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1.5px;background:linear-gradient(90deg,#6366f1,#a855f7,#ec4899);transition:width .35s ease;border-radius:2px}
    .nav-link:hover::after,.nav-link.active::after{width:100%}
    .nav-link:hover{color:#c7d2fe}

    /* ── Buttons — liquid glass primary ── */
    .btn-primary{
      background:linear-gradient(135deg,#4338ca 0%,#6d28d9 40%,#7c3aed 70%,#a855f7 100%);
      background-size:200% 200%;
      animation:gradient-x 4s ease infinite;
      transition:all .3s cubic-bezier(.25,.8,.25,1);
      box-shadow:
        0 4px 30px rgba(99,102,241,0.55),
        inset 0 1px 0 rgba(255,255,255,0.20),
        inset 0 -1px 0 rgba(0,0,0,0.15);
    }
    .btn-primary:hover{
      transform:translateY(-2px) scale(1.02);
      box-shadow:
        0 12px 45px rgba(99,102,241,0.75),
        0 0 0 1px rgba(168,85,247,0.3),
        inset 0 1px 0 rgba(255,255,255,0.25);
    }
    .btn-primary:active{transform:translateY(0px) scale(0.98)}
    .btn-ghost{
      background:linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02));
      border:1px solid rgba(255,255,255,0.12);
      border-top-color:rgba(255,255,255,0.2);
      backdrop-filter:blur(12px);
      box-shadow:0 2px 12px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.08);
      transition:all .3s ease;
    }
    .btn-ghost:hover{
      background:linear-gradient(145deg,rgba(99,102,241,0.12),rgba(99,102,241,0.05));
      border-color:rgba(99,102,241,0.4);
      transform:translateY(-1px);
      box-shadow:0 6px 20px rgba(99,102,241,0.2),inset 0 1px 0 rgba(255,255,255,0.12);
    }
    .btn-outline-brand{
      border:1px solid rgba(99,102,241,0.45);
      border-top-color:rgba(168,85,247,0.5);
      color:#a5b4fc;
      background:linear-gradient(145deg,rgba(99,102,241,0.06),rgba(99,102,241,0.02));
      backdrop-filter:blur(10px);
      transition:all .3s ease;
      box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);
    }
    .btn-outline-brand:hover{
      background:linear-gradient(145deg,rgba(99,102,241,0.14),rgba(99,102,241,0.06));
      border-color:#6366f1;color:#c7d2fe;
      box-shadow:0 6px 20px rgba(99,102,241,0.25);
    }
    .btn-cyan{background:linear-gradient(135deg,#0891b2,#06b6d4);transition:all .3s ease;box-shadow:0 4px 20px rgba(6,182,212,0.4)}
    .btn-cyan:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(6,182,212,0.6)}

    /* ── Micro-feedback ripple ── */
    .ripple-btn{position:relative;overflow:hidden}
    .ripple-btn::after{content:'';position:absolute;border-radius:50%;background:rgba(255,255,255,0.18);width:0;height:0;top:50%;left:50%;transform:translate(-50%,-50%);transition:width .45s ease,height .45s ease,opacity .45s ease;opacity:0}
    .ripple-btn:active::after{width:220px;height:220px;opacity:0}

    /* ── Stat cards — liquid glass ── */
    .stat-card{
      background:linear-gradient(145deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.018) 60%,rgba(99,102,241,0.04) 100%);
      backdrop-filter:saturate(1.8) blur(20px);-webkit-backdrop-filter:saturate(1.8) blur(20px);
      border:1px solid rgba(255,255,255,0.10);
      border-top-color:rgba(255,255,255,0.22);
      box-shadow:0 4px 24px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.10);
      transition:all .4s cubic-bezier(.25,.8,.25,1);
      position:relative;overflow:hidden;
    }
    .stat-card::before{
      content:'';position:absolute;top:0;left:0;right:0;height:1px;
      background:linear-gradient(90deg,transparent,rgba(99,102,241,0.5),rgba(168,85,247,0.6),rgba(6,182,212,0.4),transparent);
      opacity:0;transition:opacity .3s ease;
    }
    .stat-card::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent 55%,rgba(99,102,241,0.05));pointer-events:none}
    .stat-card:hover{
      background:linear-gradient(145deg,rgba(99,102,241,0.1) 0%,rgba(255,255,255,0.04) 100%);
      border-color:rgba(99,102,241,0.3);border-top-color:rgba(168,85,247,0.45);
      transform:translateY(-5px) scale(1.01);
      box-shadow:0 24px 48px rgba(0,0,0,.55),0 0 35px rgba(99,102,241,0.1);
    }
    .stat-card:hover::before{opacity:1}

    /* ── Feature icon ── */
    .feat-icon{width:54px;height:54px;border-radius:16px;display:flex;align-items:center;justify-content:center;position:relative;box-shadow:0 4px 16px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.15)}
    .feat-icon-glow{position:absolute;inset:-6px;border-radius:22px;opacity:0;filter:blur(14px);transition:opacity .35s ease}
    .glass-card:hover .feat-icon-glow{opacity:.7}

    /* ── Pricing — liquid glass cards ── */
    .plan-card{
      background:linear-gradient(155deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.018) 50%,rgba(3,5,18,0.2) 100%);
      backdrop-filter:saturate(1.8) blur(24px);-webkit-backdrop-filter:saturate(1.8) blur(24px);
      border:1px solid rgba(255,255,255,0.10);
      border-top-color:rgba(255,255,255,0.20);
      box-shadow:0 8px 32px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.10);
      transition:all .45s cubic-bezier(.25,.8,.25,1);
      position:relative;overflow:hidden;
    }
    /* Shimmer sweep */
    .plan-card::after{
      content:'';position:absolute;top:0;left:-100%;width:55%;height:100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent);
      transition:left .75s ease;pointer-events:none;
    }
    .plan-card:hover::after{left:160%}
    .plan-card:hover{
      transform:translateY(-12px) scale(1.01);
      box-shadow:0 40px 80px rgba(0,0,0,.65),0 0 60px rgba(99,102,241,0.08);
      border-color:rgba(99,102,241,0.25);
      border-top-color:rgba(168,85,247,0.35);
    }
    .plan-card.popular{
      border-color:rgba(249,115,22,0.5);
      border-top-color:rgba(249,115,22,0.75);
      background:linear-gradient(155deg,rgba(249,115,22,0.07) 0%,rgba(255,255,255,0.03) 50%,rgba(3,5,18,0.15) 100%);
    }
    .plan-card.popular::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,#f97316,#ef4444,#a855f7,transparent)}

    /* ── Testimonials — liquid glass ── */
    .testi-card{
      background:linear-gradient(145deg,rgba(255,255,255,0.045) 0%,rgba(255,255,255,0.015) 100%);
      backdrop-filter:saturate(1.7) blur(18px);-webkit-backdrop-filter:saturate(1.7) blur(18px);
      border:1px solid rgba(255,255,255,0.09);
      border-top-color:rgba(255,255,255,0.18);
      box-shadow:0 4px 24px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.08);
      transition:all .35s ease;position:relative;overflow:hidden;
    }
    .testi-card:hover{
      background:linear-gradient(145deg,rgba(99,102,241,0.07) 0%,rgba(255,255,255,0.03) 100%);
      border-color:rgba(99,102,241,0.25);border-top-color:rgba(168,85,247,0.4);
      transform:translateY(-5px);
      box-shadow:0 24px 48px rgba(0,0,0,0.55),0 0 30px rgba(99,102,241,0.08);
    }
    .testi-card::before{content:'\\201C';position:absolute;top:-10px;left:16px;font-size:120px;color:rgba(99,102,241,0.07);line-height:1;font-family:Georgia,serif;pointer-events:none}

    /* ── Demo screen ── */
    .demo-screen{
      background:linear-gradient(160deg,rgba(8,12,28,0.97),rgba(15,22,46,0.97));
      border:1px solid rgba(255,255,255,0.10);
      border-top-color:rgba(255,255,255,0.18);
      border-radius:22px;overflow:hidden;
      box-shadow:
        0 60px 120px rgba(0,0,0,.88),
        0 0 0 1px rgba(99,102,241,0.10),
        inset 0 1px 0 rgba(255,255,255,0.08),
        0 0 80px rgba(99,102,241,0.05);
      animation:lg-float-card 7s ease-in-out infinite;
    }
    .screen-shimmer{position:absolute;top:0;left:-100%;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent);animation:shimmer 6s ease-in-out infinite}

    /* ── Section label ── */
    .section-label{
      display:inline-flex;align-items:center;gap:8px;padding:6px 18px;border-radius:24px;
      background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(168,85,247,0.06));
      border:1px solid rgba(99,102,241,0.25);
      border-top-color:rgba(168,85,247,0.35);
      backdrop-filter:blur(10px);
      box-shadow:0 2px 12px rgba(99,102,241,0.1),inset 0 1px 0 rgba(255,255,255,0.06);
      font-size:11px;font-weight:700;color:#a5b4fc;text-transform:uppercase;letter-spacing:.12em;
    }

    /* ── AI dot ── */
    .ai-dot{width:7px;height:7px;border-radius:50%;background:#10b981;display:inline-block;box-shadow:0 0 12px rgba(16,185,129,1)}
    .ai-dot.blink{animation:blink 1.5s ease infinite}

    /* ── Divider ── */
    .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)}
    .neon-line{height:1px;background:linear-gradient(90deg,transparent 0%,rgba(99,102,241,0.7) 25%,rgba(168,85,247,0.8) 50%,rgba(236,72,153,0.6) 75%,transparent 100%);box-shadow:0 0 12px rgba(99,102,241,0.3)}

    /* ── Mobile nav ── */
    #mobile-nav{transition:all .35s cubic-bezier(.25,.8,.25,1);max-height:0;overflow:hidden;opacity:0}
    #mobile-nav.open{max-height:500px;opacity:1}

    /* ── Orbit ring ── */
    .orbit-ring{position:absolute;border-radius:50%;border:1px dashed rgba(99,102,241,0.18)}

    /* ── Platform chip — liquid glass ── */
    .platform-chip{
      display:flex;align-items:center;gap:10px;padding:8px 18px;
      background:linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
      border:1px solid rgba(255,255,255,0.09);
      border-top-color:rgba(255,255,255,0.16);
      border-radius:999px;flex-shrink:0;cursor:default;
      backdrop-filter:blur(12px);
      box-shadow:0 2px 8px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.06);
      transition:all .3s ease;
    }
    .platform-chip:hover{
      background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(99,102,241,0.04));
      border-color:rgba(99,102,241,0.3);
      box-shadow:0 4px 16px rgba(99,102,241,0.15),inset 0 1px 0 rgba(255,255,255,0.08);
      transform:scale(1.04) translateY(-1px);
    }
    .platform-logo{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,0.4)}

    /* ── Metric badge — liquid glass ── */
    .metric-badge{
      display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;
      backdrop-filter:blur(8px);
      box-shadow:0 2px 8px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.06);
    }

    /* ── Holo card ── */
    .holo-card{position:relative;overflow:hidden}
    .holo-card::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.04) 50%,transparent 65%);pointer-events:none}

    /* ── Counter ── */
    .counter{display:inline-block;transition:all .4s ease}

    /* ── Scroll indicator ── */
    .scroll-indicator{animation:float 2.5s ease-in-out infinite}

    /* ── Campaign row ── */
    .campaign-row{transition:all .2s ease}
    .campaign-row:hover{background:rgba(255,255,255,0.03);border-radius:8px}

    /* ── AI Timeline (simulator) ── */
    .sim-step{opacity:0;transform:translateY(8px);transition:all .4s ease}
    .sim-step.active{opacity:1;transform:translateY(0)}
    .sim-step.done{opacity:.5}
    .sim-step.done .step-icon{background:rgba(16,185,129,0.2) !important;border-color:rgba(16,185,129,0.4) !important}
    .sim-step.done .step-icon i{color:#10b981 !important}

    /* ── ROI Calculator — liquid glass inputs ── */
    .roi-input{
      background:linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025));
      border:1px solid rgba(255,255,255,0.12);border-top-color:rgba(255,255,255,0.2);
      border-radius:12px;padding:10px 16px;color:#fff;font-size:14px;font-weight:600;width:100%;
      transition:all .2s ease;outline:none;backdrop-filter:blur(10px);
      box-shadow:0 2px 8px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.06);
    }
    .roi-input:focus{border-color:rgba(99,102,241,0.55);border-top-color:rgba(168,85,247,0.7);box-shadow:0 0 0 3px rgba(99,102,241,0.12)}
    .roi-input:hover{border-color:rgba(255,255,255,0.2)}
    .roi-result{transition:all .5s cubic-bezier(.25,.8,.25,1)}

    /* ── Case study card — liquid glass ── */
    .case-card{
      background:linear-gradient(145deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.018) 100%);
      backdrop-filter:saturate(1.7) blur(20px);-webkit-backdrop-filter:saturate(1.7) blur(20px);
      border:1px solid rgba(255,255,255,0.09);border-top-color:rgba(255,255,255,0.18);
      border-radius:20px;
      box-shadow:0 4px 24px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.07);
      transition:all .35s ease;position:relative;overflow:hidden;
    }
    .case-card:hover{background:linear-gradient(145deg,rgba(99,102,241,0.07) 0%,rgba(255,255,255,0.03) 100%);border-color:rgba(99,102,241,0.3);border-top-color:rgba(168,85,247,0.45);transform:translateY(-6px);box-shadow:0 28px 56px rgba(0,0,0,0.55),0 0 35px rgba(99,102,241,0.09)}
    .case-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:var(--case-gradient)}

    /* ── Video demo wrapper — liquid glass ── */
    .video-wrapper{border-radius:18px;overflow:hidden;position:relative;border:1px solid rgba(255,255,255,0.10);border-top-color:rgba(255,255,255,0.18);box-shadow:0 8px 32px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.07)}
    .video-play-btn{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,rgba(99,102,241,0.85),rgba(168,85,247,0.85));backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .3s ease;box-shadow:0 0 40px rgba(99,102,241,0.5),inset 0 1px 0 rgba(255,255,255,0.2)}
    .video-play-btn:hover{background:linear-gradient(135deg,rgba(99,102,241,1),rgba(168,85,247,1));transform:translate(-50%,-50%) scale(1.12);box-shadow:0 0 70px rgba(99,102,241,0.7)}

    /* ── AI Typing effect ── */
    .type-cursor::after{content:'|';animation:blink .8s ease infinite;color:#6366f1;margin-left:2px}

    /* ── Step connector ── */
    .step-connector{flex:1;height:1px;background:linear-gradient(90deg,rgba(99,102,241,0.4),rgba(168,85,247,0.4))}

    /* ── Tooltip — liquid glass ── */
    .tooltip-wrap{position:relative}
    .tooltip-wrap .tooltip-box{display:none;position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);background:linear-gradient(145deg,rgba(15,15,32,0.97),rgba(10,10,24,0.97));border:1px solid rgba(99,102,241,0.3);border-top-color:rgba(168,85,247,0.4);border-radius:10px;padding:8px 14px;font-size:11px;color:#c7d2fe;white-space:nowrap;z-index:100;box-shadow:0 10px 30px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.06);backdrop-filter:blur(16px)}
    .tooltip-wrap:hover .tooltip-box{display:block}

    /* ── Comparison table ── */
    .compare-row:hover{background:rgba(255,255,255,0.025)}
    .compare-check{color:#10b981;font-size:14px}
    .compare-cross{color:#ef4444;font-size:14px}

    /* ── Cyber border ── */
    .cyber-border{position:relative}
    .cyber-border::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(135deg,rgba(99,102,241,0.5),rgba(168,85,247,0.3),rgba(236,72,153,0.3),transparent);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}

    /* ── Plan perk ── */
    .plan-perk{display:flex;align-items:center;gap:8px;font-size:13px;color:#64748b}

    /* ── Scroll Progress Bar — liquid glass ── */
    #scroll-progress{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#6366f1,#a855f7,#ec4899,#f97316);z-index:9999;width:0%;transition:width 0.1s linear;box-shadow:0 0 8px rgba(99,102,241,0.6)}

    /* ── Hero badge — liquid glass ── */
    #hero-badge{background:linear-gradient(135deg,rgba(255,255,255,0.07) 0%,rgba(99,102,241,0.06) 100%);backdrop-filter:saturate(2) blur(20px)}
  </style>
</head>
<body>

<!-- ── Scroll Progress Bar ─────────────────────────────────────────────── -->
<div id="scroll-progress"></div>

<!-- ════════════════════════════════════════════════════════════
     NAVIGATION
════════════════════════════════════════════════════════════ -->
<nav class="nav-blur fixed top-0 left-0 right-0 z-50" id="navbar">
  <div class="max-w-7xl mx-auto px-5 md:px-8 h-[68px] flex items-center justify-between">
    <a href="/" class="flex items-center gap-3 group" aria-label="AdNova AI Home">
      <div class="relative">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          <i class="fas fa-bolt text-white text-sm"></i>
        </div>
        <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-pink-600 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300"></div>
      </div>
      <span class="font-black text-white text-[18px] tracking-tight">AdNova <span class="glow-text">AI</span></span>
    </a>

    <div class="hidden md:flex items-center gap-5">
      <a href="#use-cases" class="nav-link text-sm font-medium">Use Cases</a>
      <a href="#features" class="nav-link text-sm font-medium">Features</a>
      <a href="#demo" class="nav-link text-sm font-medium">Demo</a>
      <a href="#pricing" class="nav-link text-sm font-medium">Pricing</a>
      <a href="#case-studies" class="nav-link text-sm font-medium">Results</a>
    </div>

    <div class="hidden md:flex items-center gap-3">
      <a href="/login" class="btn-ghost text-sm text-slate-300 font-medium px-4 py-2 rounded-xl" onclick="trackEvent('nav_signin')">Sign In</a>
      <a href="/register" class="btn-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 ripple-btn" onclick="trackEvent('nav_trial_cta')">
        <i class="fas fa-rocket text-xs"></i> Start Free Trial
      </a>
    </div>

    <button onclick="toggleMobileNav()" class="md:hidden glass rounded-xl w-10 h-10 flex items-center justify-center transition-all hover:bg-white/10" aria-label="Menu">
      <i class="fas fa-bars text-slate-300 text-sm" id="mobile-icon"></i>
    </button>
  </div>

  <div id="mobile-nav" class="md:hidden border-t border-white/5 bg-black/85 backdrop-blur-2xl">
    <div class="px-5 py-4 space-y-1">
      <a href="#use-cases" onclick="toggleMobileNav()" class="block text-sm text-slate-400 py-2.5 px-4 rounded-xl hover:bg-white/5 transition-all">Use Cases</a>
      <a href="#features" onclick="toggleMobileNav()" class="block text-sm text-slate-400 py-2.5 px-4 rounded-xl hover:bg-white/5 transition-all">Features</a>
      <a href="#demo" onclick="toggleMobileNav()" class="block text-sm text-slate-400 py-2.5 px-4 rounded-xl hover:bg-white/5 transition-all">Demo</a>
      <a href="#pricing" onclick="toggleMobileNav()" class="block text-sm text-slate-400 py-2.5 px-4 rounded-xl hover:bg-white/5 transition-all">Pricing</a>
      <div class="pt-3 flex flex-col gap-2 border-t border-white/5 mt-2">
        <a href="/login" class="btn-ghost text-sm text-center text-slate-300 font-medium px-4 py-2.5 rounded-xl">Sign In</a>
        <a href="/register" class="btn-primary text-white text-sm font-bold px-4 py-3 rounded-xl text-center flex items-center justify-center gap-2">
          <i class="fas fa-rocket text-xs"></i> Start Free Trial
        </a>
      </div>
    </div>
  </div>
</nav>

<!-- ════════════════════════════════════════════════════════════
     HERO — 2-column layout (image 2 design)
════════════════════════════════════════════════════════════ -->
<section class="grid-lines min-h-screen flex items-center relative overflow-hidden pt-[68px]" id="hero">
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
  <div class="orb orb-4"></div>
  <!-- Extra orb behind right column -->
  <div class="orb" style="width:650px;height:650px;background:radial-gradient(circle,rgba(99,102,241,0.18) 0%,rgba(168,85,247,0.1) 40%,transparent 70%);top:10%;right:-100px;filter:blur(90px);animation:orb-float 12s ease-in-out infinite 2s"></div>

  <div class="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent scanline pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-16 relative z-10 w-full">

    <!-- ─ 2-column grid ─ -->
    <div class="grid grid-cols-1 lg:grid-cols-[44%_56%] gap-8 xl:gap-12 items-center">

      <!-- ══ LEFT COLUMN — marketing copy ══ -->
      <div class="flex flex-col items-start fade-up">

        <!-- Status badge -->
        <div class="inline-flex items-center gap-3 glass-neo px-5 py-2.5 rounded-full mb-7 cursor-default border-glow" id="hero-badge">
          <div class="relative flex-shrink-0">
            <div class="ai-dot blink"></div>
            <div class="absolute inset-0 rounded-full bg-emerald-400 pulse-ring opacity-50"></div>
          </div>
          <span class="text-xs font-bold text-slate-300 tracking-wide">AI Engine v2.0 — Live · 2,412 brands</span>
          <span class="text-xs bg-gradient-to-r from-brand-500/30 to-purple-500/30 text-brand-300 px-2.5 py-1 rounded-full font-black border border-brand-500/25 flex-shrink-0">94.2% acc.</span>
        </div>

        <!-- Headline — left aligned, large -->
        <h1 class="font-black leading-[1.0] tracking-tight mb-5 text-left" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(44px,5.5vw,86px)">
          <span class="text-white block">Your ads, on</span>
          <span class="hero-text block mt-1">full autopilot.</span>
        </h1>

        <!-- Sub headline -->
        <p class="text-base md:text-lg text-slate-400 mb-6 leading-relaxed text-left" style="font-weight:300;max-width:460px">
          AdNova AI watches your campaigns <strong class="text-slate-200 font-semibold">every 15 minutes</strong>, scales winners +10% when ROAS &gt; 3.5×, kills creatives with CTR &lt; 0.8%, and generates replacements — <em class="text-slate-300">automatically.</em>
        </p>

        <!-- Proof point chips — horizontal row -->
        <div class="flex flex-wrap items-center gap-2 mb-7">
          <span class="flex items-center gap-1.5 text-xs text-slate-400 glass px-3.5 py-2 rounded-full">
            <i class="fas fa-check-circle text-emerald-400 text-xs"></i> ROAS boost: <strong class="text-white ml-1">+128%</strong>
          </span>
          <span class="flex items-center gap-1.5 text-xs text-slate-400 glass px-3.5 py-2 rounded-full">
            <i class="fas fa-check-circle text-emerald-400 text-xs"></i> Time saved: <strong class="text-white ml-1">18h/week</strong>
          </span>
          <span class="flex items-center gap-1.5 text-xs text-slate-400 glass px-3.5 py-2 rounded-full">
            <i class="fas fa-check-circle text-emerald-400 text-xs"></i> Waste: <strong class="text-white ml-1">-73%</strong>
          </span>
        </div>

        <!-- CTA buttons — horizontal -->
        <div class="flex flex-col sm:flex-row items-start gap-3 mb-8">
          <a href="/register" class="btn-primary text-white font-black px-8 rounded-2xl text-base flex items-center gap-3 group relative overflow-hidden ripple-btn" style="padding-top:17px;padding-bottom:17px" onclick="trackEvent('hero_cta_primary')">
            <i class="fas fa-rocket text-sm group-hover:rotate-12 transition-transform"></i>
            Start Free — No credit card
          </a>
          <a href="#demo" class="btn-ghost text-slate-300 font-semibold px-6 py-4 rounded-2xl text-base flex items-center gap-3 group" onclick="trackEvent('hero_cta_demo')">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center group-hover:bg-brand-500/35 transition-colors" style="background:rgba(99,102,241,0.18)">
              <i class="fas fa-play text-brand-400 text-xs ml-0.5"></i>
            </div>
            Watch 90s Demo
          </a>
        </div>

        <!-- Trust micro-line -->
        <div class="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
          <span class="flex items-center gap-1.5"><i class="fas fa-shield-halved text-emerald-600"></i> No credit card</span>
          <span class="flex items-center gap-1.5"><i class="fas fa-rotate-left text-slate-600"></i> Cancel anytime</span>
          <span class="flex items-center gap-1.5"><i class="fas fa-lock text-slate-600"></i> SOC2 · GDPR</span>
        </div>

        <!-- Scroll indicator — desktop only -->
        <div class="hidden lg:flex mt-10 scroll-indicator flex-col items-start gap-2 opacity-30">
          <div class="flex items-center gap-3">
            <div class="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5">
              <div class="w-1 h-2 rounded-full bg-brand-400/60" style="animation:float 1.8s ease-in-out infinite"></div>
            </div>
            <span class="text-xs text-slate-600 tracking-wider uppercase">Scroll to explore</span>
          </div>
        </div>
      </div>

      <!-- ══ RIGHT COLUMN — live stats bar + dashboard mock ══ -->
      <div class="flex flex-col gap-3 fade-up" style="transition-delay:.15s">

        <!-- Live stats pill — floats above the dashboard -->
        <div class="glass-neo flex items-center gap-0 rounded-2xl py-2.5 px-4 overflow-hidden self-stretch" id="hero-live-bar">
          <div class="flex items-center gap-2 flex-shrink-0 mr-4 border-r border-white/10 pr-4">
            <div class="relative">
              <div class="ai-dot blink"></div>
              <div class="absolute inset-0 rounded-full bg-emerald-400 pulse-ring opacity-40"></div>
            </div>
            <span class="text-xs font-black text-emerald-400 tracking-widest">LIVE</span>
          </div>
          <div class="flex items-center gap-x-4 gap-y-1.5 text-xs flex-wrap">
            <div class="flex items-center gap-1.5">
              <i class="fas fa-brain text-brand-400 text-xs"></i>
              <span class="font-black text-slate-200" id="live-decisions">12,847</span>
              <span class="text-slate-500">AI decisions today</span>
            </div>
            <span class="text-white/10 hidden sm:block">|</span>
            <div class="hidden sm:flex items-center gap-1.5">
              <i class="fas fa-chart-line text-purple-400 text-xs"></i>
              <span class="font-black text-purple-400">4.82x</span>
              <span class="text-slate-500">avg ROAS</span>
            </div>
            <span class="text-white/10 hidden md:block">|</span>
            <div class="hidden md:flex items-center gap-1.5">
              <i class="fas fa-dollar-sign text-emerald-400 text-xs"></i>
              <span class="font-black text-emerald-400">$601K</span>
              <span class="text-slate-500">revenue today</span>
            </div>
            <span class="text-white/10 hidden lg:block">|</span>
            <div class="hidden lg:flex items-center gap-1.5">
              <i class="fas fa-users text-cyan-400 text-xs"></i>
              <span class="font-black text-cyan-400">2,412</span>
              <span class="text-slate-500">active brands</span>
            </div>
          </div>
        </div>

        <!-- Dashboard mock -->
        <div class="demo-screen relative" id="hero-dashboard">
          <div class="screen-shimmer"></div>

          <!-- Browser chrome -->
          <div class="px-4 py-2.5 flex items-center gap-3 border-b border-white/[0.06]" style="background:linear-gradient(180deg,rgba(4,8,24,0.92),rgba(4,8,22,0.85));backdrop-filter:blur(10px)">
            <div class="flex gap-1.5">
              <div class="w-2.5 h-2.5 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-amber-500/70 hover:bg-amber-500 transition-colors cursor-pointer"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/70 hover:bg-emerald-500 transition-colors cursor-pointer"></div>
            </div>
            <div class="flex-1 rounded-md h-5 flex items-center px-2.5 gap-1.5 max-w-[200px] mx-auto" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06)">
              <i class="fas fa-lock text-emerald-500/60 text-[10px]"></i>
              <span class="text-[10px] text-slate-500">app.adnova.ai/dashboard</span>
            </div>
            <div class="flex items-center gap-1.5 ml-auto">
              <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 blink"></div>
              <span class="text-[10px] text-slate-600">Live</span>
            </div>
          </div>

          <!-- Dashboard content -->
          <div class="p-3 md:p-4" style="background:rgba(2,4,18,0.65)">
            <!-- 4 KPI cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
              ${heroKPI('$124,850', 'Ad Spend', '+18.4%', 'fa-dollar-sign', 'from-brand-500 to-purple-600', true)}
              ${heroKPI('4.82x', 'Blended ROAS', '+0.6x', 'fa-chart-line', 'from-emerald-500 to-teal-600', true)}
              ${heroKPI('47', 'Campaigns Active', '12 scaling ↑', 'fa-bullhorn', 'from-blue-500 to-cyan-600', false)}
              ${heroKPI('8,294', 'Conversions', '+22.1%', 'fa-check-circle', 'from-amber-500 to-orange-600', true)}
            </div>
            <!-- Platform ROAS + AI Activity -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div class="rounded-xl p-3 border border-white/[0.05]" style="background:rgba(255,255,255,0.018)">
                <div class="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-2">
                  <i class="fas fa-plug text-brand-400 text-xs"></i> Platform ROAS
                </div>
                <div class="space-y-2">
                  ${heroPlatformBar('Facebook', '#1877F2', 34, '$42.3K', '4.1x')}
                  ${heroPlatformBar('Google', '#4285F4', 28, '$35.1K', '5.2x')}
                  ${heroPlatformBar('TikTok', '#ff0050', 20, '$25.2K', '4.6x')}
                  ${heroPlatformBar('Instagram', '#E1306C', 12, '$15.4K', '3.8x')}
                </div>
              </div>
              <div class="rounded-xl p-3 border border-white/[0.05]" style="background:rgba(255,255,255,0.018)">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-slate-500 flex items-center gap-2">
                    <i class="fas fa-brain text-brand-400 text-xs"></i> AI Activity
                  </span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-black flex items-center gap-1" style="background:rgba(16,185,129,0.15);color:#10b981;border:1px solid rgba(16,185,129,0.2)">
                    <span class="ai-dot blink" style="width:4px;height:4px"></span> LIVE
                  </span>
                </div>
                <div class="space-y-1.5" id="hero-ai-feed">
                  ${heroFeedItem('arrow-trend-up', '#10b981', '"Summer Collection" scaled +10% — ROAS 5.2x', '2m ago')}
                  ${heroFeedItem('scissors', '#ef4444', 'Killed 2 TikTok creatives — CTR 0.3%', '8m ago')}
                  ${heroFeedItem('wand-magic-sparkles', '#a855f7', 'Generated 4 UGC variants for "Product Launch"', '15m ago')}
                  ${heroFeedItem('users', '#06b6d4', 'Expanded lookalike — +1.8M reach added', '31m ago')}
                </div>
              </div>
            </div>
          </div>
        </div><!-- /dashboard -->

      </div><!-- /right column -->
    </div><!-- /2-col grid -->
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     PLATFORM TICKER
════════════════════════════════════════════════════════════ -->
<div class="py-6 overflow-hidden relative" id="platforms" style="background:linear-gradient(180deg,rgba(3,5,18,0.85),rgba(4,7,22,0.9));border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);backdrop-filter:blur(12px)">
  <div class="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style="background:linear-gradient(90deg,rgba(2,5,16,0.95),transparent)"></div>
  <div class="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style="background:linear-gradient(-90deg,rgba(2,5,16,0.95),transparent)"></div>
  <div class="ticker-inner gap-4">
    ${Array(2).fill(['Facebook Ads','Google Ads','Instagram Ads','TikTok Ads','LinkedIn Ads','YouTube Ads','Pinterest Ads','X (Twitter) Ads','Snapchat Ads']).flat().map(p => `
    <div class="platform-chip group">
      <div class="platform-logo ${getPlatformGrad(p)}"><i class="${getPlatformIcon(p)} text-white"></i></div>
      <span class="text-sm font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">${p}</span>
    </div>`).join('')}
  </div>
</div>

<!-- ════════════════════════════════════════════════════════════
     STATS — REAL NUMBERS
════════════════════════════════════════════════════════════ -->
<section class="py-16 relative overflow-hidden">
  <div class="absolute inset-0 grid-lines-fine opacity-50"></div>
  <div class="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
    <div class="text-center mb-10 fade-up">
      <div class="section-label mb-4"><i class="fas fa-chart-bar text-brand-400"></i> Verified Platform Impact</div>
      <h2 class="font-black text-4xl md:text-6xl text-white mb-3" style="font-family:'Space Grotesk',sans-serif">
        Numbers that<br/><span class="glow-text-2">don't lie</span>
      </h2>
      <p class="text-slate-500 text-lg max-w-xl mx-auto">Aggregated from 2,412 live brands — updated daily. <a href="#case-studies" class="text-brand-400 hover:text-brand-300 transition-colors">See individual case studies →</a></p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
      ${bigStat('$2.1B+', 'Ad Spend Managed', 'fa-dollar-sign', 'from-brand-500 to-purple-600', 'Every dollar tracked & optimized in real-time')}
      ${bigStat('47K+', 'Active Campaigns', 'fa-bullhorn', 'from-purple-500 to-pink-600', 'Across 9 major ad platforms simultaneously')}
      ${bigStat('4.82x', 'Average ROAS', 'fa-chart-line', 'from-emerald-500 to-teal-600', 'vs 2.1x industry average — verified by third-party audit')}
      ${bigStat('2,412', 'Brands Worldwide', 'fa-globe', 'from-cyan-500 to-blue-600', 'Agencies, e-commerce & enterprise clients')}
    </div>
    <div class="mt-8 glass-neo rounded-2xl p-5 grid grid-cols-2 md:grid-cols-4 gap-5 fade-up">
      ${miniMetric('94.2%', 'AI Prediction Accuracy', 'fa-bullseye', '#6366f1')}
      ${miniMetric('72h', 'Performance Forecasting', 'fa-clock', '#a855f7')}
      ${miniMetric('0.3%', 'Avg Wasted Spend', 'fa-trash', '#10b981')}
      ${miniMetric('18 min', 'Median Setup Time', 'fa-rocket', '#f97316')}
    </div>
  </div>
</section>

<div class="neon-line mx-auto max-w-4xl"></div>

<!-- ════════════════════════════════════════════════════════════
     USE CASES — CONCRETS avec démos
════════════════════════════════════════════════════════════ -->
<section class="py-16 relative" id="use-cases">
  <div class="max-w-7xl mx-auto px-5 md:px-8">
    <div class="text-center mb-12 fade-up">
      <div class="section-label mb-4"><i class="fas fa-lightbulb text-brand-400"></i> Real Use Cases</div>
      <h2 class="font-black text-4xl md:text-6xl text-white mb-4" style="font-family:'Space Grotesk',sans-serif">
        See exactly what<br/><span class="glow-text">AdNova does</span>
      </h2>
      <p class="text-slate-500 text-lg max-w-2xl mx-auto">Not "AI magic" — concrete actions your campaigns get, every day.</p>
    </div>

    <!-- Use case tabs -->
    <div class="flex flex-wrap items-center justify-center gap-2 mb-8 fade-up" id="uc-tabs">
      <button onclick="setUCTab('scale')" class="uc-tab active-tab px-5 py-2.5 rounded-xl text-sm font-bold transition-all" data-tab="scale">
        <i class="fas fa-arrow-trend-up mr-2"></i>Auto-Scaling
      </button>
      <button onclick="setUCTab('kill')" class="uc-tab px-5 py-2.5 rounded-xl text-sm font-bold transition-all" data-tab="kill">
        <i class="fas fa-scissors mr-2"></i>Creative Killer
      </button>
      <button onclick="setUCTab('generate')" class="uc-tab px-5 py-2.5 rounded-xl text-sm font-bold transition-all" data-tab="generate">
        <i class="fas fa-wand-magic-sparkles mr-2"></i>AI Creative Gen
      </button>
      <button onclick="setUCTab('audience')" class="uc-tab px-5 py-2.5 rounded-xl text-sm font-bold transition-all" data-tab="audience">
        <i class="fas fa-users mr-2"></i>Audience Intel
      </button>
    </div>

    <!-- Use case panels -->
    <div id="uc-scale" class="uc-panel fade-up">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div class="section-label mb-4 w-fit" style="background:rgba(16,185,129,0.1);border-color:rgba(16,185,129,0.3);color:#6ee7b7"><i class="fas fa-arrow-trend-up"></i> Auto-Scaling Engine</div>
          <h3 class="font-black text-3xl text-white mb-4" style="font-family:'Space Grotesk',sans-serif">Scales winners before you even wake up</h3>
          <p class="text-slate-400 leading-relaxed mb-5">Every 15 minutes, the AI checks each campaign. When ROAS &gt; 3.5× AND spend &gt; $1K/day AND CTR &gt; 2%, it increases budget +10%. This compounds — a $500/day campaign becomes $1,345/day in 10 days if performance holds.</p>
          <div class="space-y-3 mb-6">
            ${ucProof('Real trigger', 'ROAS ≥ 3.5× + CTR ≥ 2% + daily spend ≥ $1K', 'emerald')}
            ${ucProof('Scale amount', '+10% every 72h (configurable: 5%–25%)', 'emerald')}
            ${ucProof('Safety rails', 'Never exceeds your daily budget cap', 'emerald')}
            ${ucProof('Avg result', 'Clients see +43% revenue in first 30 days', 'emerald')}
          </div>
          <a href="/register" class="btn-primary text-white font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 ripple-btn" onclick="trackEvent('uc_scale_cta')">
            <i class="fas fa-play text-xs"></i> Try Auto-Scaling Free
          </a>
        </div>
        <div class="glass-neo rounded-2xl p-5 fade-in">
          <!-- Animated scaling timeline -->
          <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <div class="ai-dot blink"></div> LIVE SIMULATION — "Summer Collection" Campaign
          </div>
          <div class="space-y-3" id="scale-sim">
            ${scaleSimStep('Day 1', 'Budget: $500/day', 'ROAS: 4.1× · CTR: 2.8%', 'Threshold met — scaling initiated', 'emerald', 0)}
            ${scaleSimStep('Day 4', 'Budget: $550/day (+10%)', 'ROAS: 4.3× · CTR: 3.1%', 'Still strong — scaling again', 'emerald', 1)}
            ${scaleSimStep('Day 7', 'Budget: $605/day (+10%)', 'ROAS: 4.0× · CTR: 2.9%', 'Consistent — budget increased', 'emerald', 2)}
            ${scaleSimStep('Day 10', 'Budget: $665/day (+10%)', 'ROAS: 3.8× · Monitoring...', 'Watching — 1 more check needed', 'amber', 3)}
          </div>
          <div class="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span class="text-xs text-slate-500">10-day result:</span>
            <div class="flex items-center gap-3">
              <span class="text-xs text-slate-500 line-through">$500/day</span>
              <i class="fas fa-arrow-right text-emerald-400 text-xs"></i>
              <span class="text-base font-black text-emerald-400">$665/day</span>
              <span class="text-xs text-emerald-500 px-2 py-1 rounded-lg" style="background:rgba(16,185,129,0.12)">+33% spend</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="uc-kill" class="uc-panel hidden fade-up">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div class="section-label mb-4 w-fit" style="background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.3);color:#fca5a5"><i class="fas fa-scissors"></i> Creative Killer</div>
          <h3 class="font-black text-3xl text-white mb-4" style="font-family:'Space Grotesk',sans-serif">Stops budget drain before you notice</h3>
          <p class="text-slate-400 leading-relaxed mb-5">The AI monitors every creative's CTR in real-time. After 1,000 impressions, if CTR falls below 0.8%, it pauses the ad automatically — before you waste another dollar. Average client saves $15K/month.</p>
          <div class="space-y-3 mb-6">
            ${ucProof('Kill threshold', 'CTR &lt; 0.8% after 1,000 impressions', 'red')}
            ${ucProof('Response time', 'Paused within 15 minutes of threshold breach', 'red')}
            ${ucProof('What happens next', 'AI flags for review + generates replacement', 'red')}
            ${ucProof('Avg saved', '$15,200/month per Growth client', 'red')}
          </div>
          <a href="/register" class="font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 ripple-btn" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#fca5a5" onclick="trackEvent('uc_kill_cta')">
            <i class="fas fa-scissors text-xs"></i> Activate Creative Killer
          </a>
        </div>
        <div class="glass-neo rounded-2xl p-5 fade-in">
          <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-red-400 blink"></div> REAL EXAMPLE — 24h campaign audit
          </div>
          <div class="space-y-2">
            ${creativeKillRow('Hero-Video-V1.mp4', '0.2%', 12400, 'killed', '#ef4444')}
            ${creativeKillRow('Static-Banner-A.jpg', '0.6%', 3200, 'killed', '#ef4444')}
            ${creativeKillRow('UGC-Testimonial-3.mp4', '4.8%', 8900, 'scaling', '#10b981')}
            ${creativeKillRow('Carousel-Products-B', '3.1%', 5600, 'active', '#6366f1')}
            ${creativeKillRow('Story-Format-V2.mp4', '0.7%', 1100, 'killed', '#ef4444')}
          </div>
          <div class="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-3 text-center">
            <div><div class="text-xl font-black text-red-400">3</div><div class="text-xs text-slate-500">Killed today</div></div>
            <div><div class="text-xl font-black text-emerald-400">$2.4K</div><div class="text-xs text-slate-500">Wasted spend stopped</div></div>
            <div><div class="text-xl font-black text-brand-400">2</div><div class="text-xs text-slate-500">New replacements queued</div></div>
          </div>
        </div>
      </div>
    </div>

    <div id="uc-generate" class="uc-panel hidden fade-up">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div class="section-label mb-4 w-fit" style="background:rgba(168,85,247,0.1);border-color:rgba(168,85,247,0.3);color:#d8b4fe"><i class="fas fa-wand-magic-sparkles"></i> AI Creative Generator</div>
          <h3 class="font-black text-3xl text-white mb-4" style="font-family:'Space Grotesk',sans-serif">Fresh creatives, zero effort</h3>
          <p class="text-slate-400 leading-relaxed mb-5">When a creative is killed, the AI immediately generates replacements using your brand assets, winning copy patterns, and audience insights. Average generation time: 4 minutes. No designer needed.</p>
          <div class="space-y-3 mb-6">
            ${ucProof('Output types', 'Static images, carousels, UGC-style videos, Stories', 'purple')}
            ${ucProof('Generation time', 'avg 4 minutes from kill to replacement live', 'purple')}
            ${ucProof('A/B testing', 'Auto-launches 3 variants, kills 2, scales 1', 'purple')}
            ${ucProof('CTR improvement', 'AI-generated creatives avg 34% higher CTR', 'purple')}
          </div>
          <a href="/register" class="font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 ripple-btn" style="background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.3);color:#d8b4fe" onclick="trackEvent('uc_generate_cta')">
            <i class="fas fa-wand-magic-sparkles text-xs"></i> Generate Your First Creative
          </a>
        </div>
        <div class="glass-neo rounded-2xl p-5 fade-in">
          <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-purple-400 blink"></div> AI GENERATION LOG — last 2h
          </div>
          <div class="space-y-3">
            ${genLogRow('UGC-Testimonial-4.mp4', 'Video 15s', '4 min', '5.1% CTR predicted', 'Live', '#a855f7')}
            ${genLogRow('Summer-Hero-V4.jpg', 'Static 1080×1080', '2 min', '3.8% CTR predicted', 'Live', '#a855f7')}
            ${genLogRow('Retarget-Carousel-C', 'Carousel ×5', '7 min', '2.9% CTR predicted', 'Testing', '#f97316')}
            ${genLogRow('Story-Flash-Sale.mp4', 'Story 9:16', '3 min', '4.4% CTR predicted', 'Live', '#a855f7')}
          </div>
          <div class="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-4 text-xs text-slate-500">
            <i class="fas fa-info-circle text-brand-400"></i>
            All creatives trained on your brand kit, tone, and top-performing past ads
          </div>
        </div>
      </div>
    </div>

    <div id="uc-audience" class="uc-panel hidden fade-up">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div class="section-label mb-4 w-fit" style="background:rgba(6,182,212,0.1);border-color:rgba(6,182,212,0.3);color:#67e8f9"><i class="fas fa-users"></i> Audience Intelligence</div>
          <h3 class="font-black text-3xl text-white mb-4" style="font-family:'Space Grotesk',sans-serif">Finds your best customers before they find you</h3>
          <p class="text-slate-400 leading-relaxed mb-5">The AI continuously monitors audience saturation. When a segment's CPM rises &gt;15%, it proactively builds a fresh lookalike from your top 1% converters and launches it — preventing performance cliffs.</p>
          <div class="space-y-3 mb-6">
            ${ucProof('Saturation detection', 'CPM rise > 15% triggers new audience build', 'cyan')}
            ${ucProof('Lookalike quality', 'Built from top 1% converters — not all buyers', 'cyan')}
            ${ucProof('Cross-platform', 'Syncs audiences across all 9 platforms', 'cyan')}
            ${ucProof('Avg reach expansion', '+2.3M qualified impressions per month', 'cyan')}
          </div>
          <a href="/register" class="font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 ripple-btn" style="background:rgba(6,182,212,0.15);border:1px solid rgba(6,182,212,0.3);color:#67e8f9" onclick="trackEvent('uc_audience_cta')">
            <i class="fas fa-users text-xs"></i> Build Smarter Audiences
          </a>
        </div>
        <div class="glass-neo rounded-2xl p-5 fade-in">
          <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-cyan-400 blink"></div> AUDIENCE HEALTH — 7 active segments
          </div>
          <div class="space-y-3">
            ${audienceHealthRow('Top Converters 1%', '1.2M', 92, '$4.20', 'healthy')}
            ${audienceHealthRow('Retarget: Cart Abandon', '340K', 78, '$6.80', 'healthy')}
            ${audienceHealthRow('Interest: Fashion', '4.5M', 41, '$18.40', 'saturated')}
            ${audienceHealthRow('Lookalike 2% (new)', '2.1M', 85, '$5.10', 'new')}
            ${audienceHealthRow('Website Visitors 14d', '890K', 66, '$9.30', 'warning')}
          </div>
          <div class="mt-4 pt-4 border-t border-white/[0.06]">
            <div class="flex items-center gap-2 text-xs text-amber-400">
              <i class="fas fa-triangle-exclamation"></i>
              "Interest: Fashion" saturated — AI building 3% lookalike replacement now
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     INTERACTIVE SIMULATOR — ROI CALCULATOR
════════════════════════════════════════════════════════════ -->
<section class="py-16 relative overflow-hidden" style="background:linear-gradient(180deg,rgba(4,7,22,0.75),rgba(3,5,18,0.85));backdrop-filter:blur(2px)" id="demo">
  <div class="absolute inset-0 grid-lines opacity-40"></div>
  <div class="absolute inset-0" style="background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(99,102,241,0.07),transparent)"></div>
  <div class="max-w-5xl mx-auto px-5 md:px-8 relative z-10">
    <div class="text-center mb-10 fade-up">
      <div class="section-label mb-4"><i class="fas fa-calculator text-brand-400"></i> ROI Simulator</div>
      <h2 class="font-black text-4xl md:text-5xl text-white mb-3" style="font-family:'Space Grotesk',sans-serif">
        Your numbers, <span class="glow-text">your results</span>
      </h2>
      <p class="text-slate-500 text-base max-w-xl mx-auto">Enter your current ad spend and ROAS — see what AdNova AI would deliver in 30 days.</p>
    </div>

    <div class="glass-neo rounded-3xl p-6 md:p-8 fade-up" id="roi-calc">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div>
          <label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Monthly Ad Spend</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
            <input type="number" id="roi-spend" class="roi-input pl-8" value="10000" min="1000" max="10000000" oninput="calcROI()" />
          </div>
          <div class="flex gap-2 mt-2 flex-wrap">
            ${roiPreset('$5K', 5000)}${roiPreset('$10K', 10000)}${roiPreset('$50K', 50000)}${roiPreset('$100K', 100000)}
          </div>
        </div>
        <div>
          <label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Current ROAS</label>
          <div class="relative">
            <input type="number" id="roi-roas" class="roi-input" value="2.5" min="0.5" max="20" step="0.1" oninput="calcROI()" />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">×</span>
          </div>
          <div class="flex gap-2 mt-2 flex-wrap">
            ${roiPreset('1.5×', null, 1.5, true)}${roiPreset('2.5×', null, 2.5, true)}${roiPreset('4×', null, 4, true)}
          </div>
        </div>
        <div>
          <label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Industry</label>
          <select id="roi-industry" class="roi-input" onchange="calcROI()" style="cursor:pointer">
            <option value="ecom">E-commerce</option>
            <option value="saas">SaaS / Software</option>
            <option value="agency">Agency / B2B</option>
            <option value="finance">Finance / Insurance</option>
            <option value="health">Health / Wellness</option>
          </select>
        </div>
      </div>

      <!-- Results -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" id="roi-results">
        ${roiResultCard('roi-new-roas', 'Projected ROAS', '4.7×', 'fa-chart-line', '#6366f1', 'After 30 days with AdNova AI')}
        ${roiResultCard('roi-extra-rev', 'Extra Revenue', '+$10,975', 'fa-dollar-sign', '#10b981', 'Monthly revenue gain')}
        ${roiResultCard('roi-saved', 'Wasted Spend Saved', '$2,100', 'fa-piggy-bank', '#f97316', 'Recovered from bad creatives')}
        ${roiResultCard('roi-roi', 'Platform ROI', '14.3×', 'fa-rocket', '#a855f7', 'Return on AdNova subscription')}
      </div>

      <!-- Methodology note -->
      <div class="flex items-start gap-3 p-4 rounded-xl mb-6" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06)">
        <i class="fas fa-info-circle text-brand-400 mt-0.5 flex-shrink-0"></i>
        <p class="text-xs text-slate-500 leading-relaxed">Projections based on median improvement across 2,412 active clients. E-commerce median: +89% ROAS in 30 days. Individual results vary based on niche, competition, and starting ROAS. <a href="#case-studies" class="text-brand-400 hover:underline">See verified case studies →</a></p>
      </div>

      <div class="text-center">
        <a href="/register" class="btn-primary text-white font-black px-10 py-4 rounded-2xl inline-flex items-center gap-3 ripple-btn" onclick="trackEvent('roi_calc_cta')">
          <i class="fas fa-bolt"></i>
          Get These Results — Start Free Trial
          <i class="fas fa-arrow-right text-xs"></i>
        </a>
        <p class="text-xs text-slate-600 mt-3">14-day free trial · No credit card · Cancel anytime</p>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     FEATURES — AI MODULES
════════════════════════════════════════════════════════════ -->
<section class="py-16 relative" id="features">
  <div class="max-w-7xl mx-auto px-5 md:px-8">
    <div class="text-center mb-12 fade-up">
      <div class="section-label mb-4"><i class="fas fa-brain text-brand-400"></i> AI-Powered Modules</div>
      <h2 class="font-black text-4xl md:text-6xl text-white mb-3" style="font-family:'Space Grotesk',sans-serif">
        6 AI engines,<br/><span class="glow-text">zero manual work</span>
      </h2>
      <p class="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">Each module runs independently, 24/7, making hundreds of micro-decisions that compound into massive performance gains.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${featureCard('fa-arrow-trend-up','from-brand-500 to-purple-600','rgba(99,102,241,0.45)','Performance Predictor','Forecasts campaign performance 72h ahead using ML trained on $2B+ ad data. Tells you which campaigns to scale before they peak — not after.','94.2% accuracy','#6366f1')}
      ${featureCard('fa-wand-magic-sparkles','from-purple-500 to-pink-600','rgba(168,85,247,0.45)','Creative Generator','When a creative dies, the AI generates 3 replacements in under 4 minutes using your brand assets and winning copy patterns from past top performers.','4 min avg gen time','#a855f7')}
      ${featureCard('fa-dollar-sign','from-emerald-500 to-teal-600','rgba(16,185,129,0.45)','Budget Optimizer','Auto-scales winners +10% every 72h. Reallocates budget from losers to winners in real-time. Never spends a dollar where it shouldn\'t.','$847K optimized today','#10b981')}
      ${featureCard('fa-users','from-blue-500 to-cyan-600','rgba(59,130,246,0.45)','Audience Intelligence','Detects saturation 48h early, builds lookalike segments from top 1% converters, and expands reach before CPM spikes hit your budget.','2.3M reach avg boost','#3b82f6')}
      ${featureCard('fa-skull','from-red-500 to-rose-600','rgba(239,68,68,0.45)','Creative Killer','Auto-pauses CTR &lt; 0.8% creatives after 1,000 impressions. Stops budget drain in 15 minutes — not 3 days when your team finally notices.','8,472 killed this month','#ef4444')}
      ${featureCard('fa-pen-nib','from-amber-500 to-orange-600','rgba(245,158,11,0.45)','Copy Engine','Generates 50+ headline variants per campaign, A/B tests them silently, promotes the winner, and archives the losers with learnings for next time.','34% avg CTR lift','#f59e0b')}
    </div>

    <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 fade-up">
      ${featureHighlight('fa-shield-halved', '#10b981', 'Enterprise Security', 'SOC2 Type II certified. GDPR & CCPA compliant. AES-256 encryption at rest, TLS 1.3 in transit.')}
      ${featureHighlight('fa-code', '#6366f1', 'Full REST API', 'Integrate AdNova AI into your existing stack. Webhooks, custom triggers, and white-label options.')}
      ${featureHighlight('fa-headset', '#f97316', '24/7 Expert Support', 'Dedicated AI advertising specialists, live chat and video onboarding — not a chatbot.')}
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     LIVE AI DEMO — animated walkthrough
════════════════════════════════════════════════════════════ -->
<section class="py-16 relative overflow-hidden" style="background:linear-gradient(180deg,rgba(4,7,22,0.75),rgba(3,5,18,0.8));backdrop-filter:blur(2px)">
  <div class="absolute inset-0 grid-lines opacity-30"></div>
  <div class="max-w-5xl mx-auto px-5 md:px-8 relative z-10">
    <div class="text-center mb-10 fade-up">
      <div class="section-label mb-4"><i class="fas fa-play text-brand-400"></i> 90-Second Walkthrough</div>
      <h2 class="font-black text-4xl md:text-5xl text-white mb-3" style="font-family:'Space Grotesk',sans-serif">
        Watch AdNova work <span class="glow-text-2">live</span>
      </h2>
      <p class="text-slate-500">Click play to see the full autonomous loop in action</p>
    </div>

    <!-- Video embed placeholder — styled as a real player -->
    <div class="video-wrapper fade-up mb-8" style="aspect-ratio:16/9;max-height:520px" id="demo-player">
      <!-- Animated "fake" dashboard walkthrough using CSS animations -->
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#0a0f1e,#121c32);display:flex;flex-direction:column;overflow:hidden;position:relative">
        <!-- Screen content: demo walkthrough frames -->
        <div class="px-5 py-3 flex items-center gap-3 border-b" style="background:rgba(4,8,22,0.9);border-color:rgba(255,255,255,0.06)">
          <div class="flex gap-1.5"><div class="w-2.5 h-2.5 rounded-full bg-red-500/60"></div><div class="w-2.5 h-2.5 rounded-full bg-amber-500/60"></div><div class="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></div></div>
          <div class="flex-1 h-5 rounded-md flex items-center px-3 text-xs text-slate-600 max-w-xs mx-auto" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.05)">
            <i class="fas fa-lock text-emerald-500/60 mr-2 text-xs"></i>app.adnova.ai/campaigns
          </div>
        </div>
        <div class="flex-1 p-4 relative" style="background:rgba(2,4,18,0.7)">
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="rounded-xl p-3 border border-white/[0.05]" style="background:rgba(255,255,255,0.02)">
              <div class="text-xs text-slate-500 mb-1">ROAS Today</div>
              <div class="text-2xl font-black text-white" id="demo-roas-val">4.82<span class="text-base text-emerald-400">×</span></div>
              <div class="text-xs text-emerald-400 mt-1">↑ +0.6× vs yesterday</div>
            </div>
            <div class="rounded-xl p-3 border border-white/[0.05]" style="background:rgba(255,255,255,0.02)">
              <div class="text-xs text-slate-500 mb-1">Active Campaigns</div>
              <div class="text-2xl font-black text-white" id="demo-camp-val">47</div>
              <div class="text-xs text-brand-400 mt-1">12 auto-scaling now</div>
            </div>
            <div class="rounded-xl p-3 border border-white/[0.05]" style="background:rgba(255,255,255,0.02)">
              <div class="text-xs text-slate-500 mb-1">AI Decisions / hr</div>
              <div class="text-2xl font-black text-white">487K</div>
              <div class="text-xs text-purple-400 mt-1">Fully autonomous</div>
            </div>
          </div>
          <!-- Animated AI event log -->
          <div class="rounded-xl border border-white/[0.05] p-3" style="background:rgba(255,255,255,0.015)">
            <div class="flex items-center gap-2 mb-3">
              <div class="ai-dot blink"></div>
              <span class="text-xs font-bold text-slate-400">AI Engine — Live Decisions</span>
            </div>
            <div id="demo-log" class="space-y-1.5 text-xs font-mono overflow-hidden" style="max-height:130px"></div>
          </div>
        </div>
        <!-- Play overlay -->
        <div class="video-play-btn" id="demo-play-btn" onclick="startDemoWalkthrough()">
          <i class="fas fa-play text-white text-xl ml-1" id="demo-play-icon"></i>
        </div>
      </div>
    </div>

    <!-- Step indicators -->
    <div class="flex items-center justify-center gap-2 flex-wrap fade-up" id="demo-steps">
      ${demoStep(1, 'Connect Platform', 'active')}
      <div class="step-connector hidden md:block max-w-[40px]"></div>
      ${demoStep(2, 'AI Analyzes', 'pending')}
      <div class="step-connector hidden md:block max-w-[40px]"></div>
      ${demoStep(3, 'Scale Winners', 'pending')}
      <div class="step-connector hidden md:block max-w-[40px]"></div>
      ${demoStep(4, 'Kill Losers', 'pending')}
      <div class="step-connector hidden md:block max-w-[40px]"></div>
      ${demoStep(5, 'Generate Creative', 'pending')}
      <div class="step-connector hidden md:block max-w-[40px]"></div>
      ${demoStep(6, 'Report', 'pending')}
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     HOW IT WORKS
════════════════════════════════════════════════════════════ -->
<section class="py-16 relative overflow-hidden">
  <div class="absolute inset-0 grid-lines-fine opacity-40"></div>
  <div class="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
    <div class="text-center mb-12 fade-up">
      <div class="section-label mb-4"><i class="fas fa-gears text-brand-400"></i> How It Works</div>
      <h2 class="font-black text-4xl md:text-6xl text-white" style="font-family:'Space Grotesk',sans-serif">
        Live in <span class="glow-text-2">18 minutes</span>
      </h2>
      <p class="text-slate-500 text-lg mt-3 max-w-xl mx-auto">Real setup time from 2,412 clients. Median: 18 min. Fastest: 4 min. No code, no CSV, no headache.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
      <div class="hidden md:block absolute top-16 left-1/3 right-1/3 h-px" style="background:linear-gradient(90deg,rgba(99,102,241,0.6),rgba(168,85,247,0.6));box-shadow:0 0 8px rgba(99,102,241,0.4)"></div>
      ${howStep('01','Connect Platforms','Link your ad accounts with OAuth in one click — no API keys, no CSV exports. Facebook, Google, TikTok and 6 more connect in seconds.','plug','brand','rgba(99,102,241,0.12)')}
      ${howStep('02','Set Your Guardrails','Define max budget, min ROAS threshold, creative approval on/off, scale increment. The AI operates only within your rules.','sliders','purple','rgba(168,85,247,0.12)')}
      ${howStep('03','Watch the AI Work','AdNova makes 487,000 decisions/hour across all your accounts. You get a daily digest, real-time alerts for major moves, and full audit logs.','rocket','emerald','rgba(16,185,129,0.12)')}
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     CASE STUDIES — PREUVES CONCRÈTES
════════════════════════════════════════════════════════════ -->
<section class="py-16 relative" style="background:linear-gradient(180deg,rgba(3,5,18,0.65),rgba(4,7,22,0.75))" id="case-studies">
  <div class="max-w-7xl mx-auto px-5 md:px-8">
    <div class="text-center mb-12 fade-up">
      <div class="section-label mb-4"><i class="fas fa-trophy text-brand-400"></i> Verified Case Studies</div>
      <h2 class="font-black text-4xl md:text-6xl text-white mb-4" style="font-family:'Space Grotesk',sans-serif">
        Real brands,<br/><span class="glow-text">real numbers</span>
      </h2>
      <p class="text-slate-500 text-lg max-w-xl mx-auto">Verified by third-party audits. No cherry-picking — these are median results.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      ${caseStudyCard(
        'E-commerce — Fashion',
        'TechnoTrend Paris',
        'from-brand-500 to-purple-600',
        [['ROAS', '2.1×', '5.4×', '+157%'], ['Monthly Revenue', '$84K', '$218K', '+160%'], ['Wasted Spend', '$18K', '$1.2K', '-93%']],
        'Switched from manual bidding to AdNova AI. In 6 weeks, the Creative Killer eliminated 47 underperforming ads and replaced them with AI-generated UGC videos. ROAS hit 5.4× — highest in company history.',
        'Growth Plan · 6 weeks'
      )}
      ${caseStudyCard(
        'SaaS — B2B Lead Gen',
        'Apex Marketing Group',
        'from-emerald-500 to-teal-600',
        [['Cost per Lead', '$47', '$19', '-60%'], ['Qualified Leads/mo', '340', '891', '+162%'], ['Team Hours Saved', '0', '22h/wk', 'new']],
        'B2B campaigns are notoriously hard to automate. AdNova AI\'s Audience Intelligence identified LinkedIn job-title segments 3× more likely to convert, reducing CPL from $47 to $19 in 45 days.',
        'Growth Plan · 45 days'
      )}
      ${caseStudyCard(
        'DTC — Health & Beauty',
        'LuxoGroup',
        'from-pink-500 to-rose-600',
        [['Ad Spend', '$10K', '$200K', '+1,900%'], ['ROAS', '3.2×', '4.6×', '+44%'], ['Creative CTR', '1.2%', '4.8%', '+300%']],
        'Scaled from $10K to $200K monthly spend in 8 weeks while maintaining ROAS above 4×. Auto-Scaling compounded budget increases daily. AI-generated creatives outperformed the agency\'s work by 3×.',
        'Enterprise Plan · 8 weeks'
      )}
    </div>

    <!-- Comparison table — AdNova vs manual vs other tools -->
    <div class="glass-neo rounded-2xl overflow-hidden fade-up">
      <div class="p-5 border-b border-white/[0.06]">
        <h3 class="font-black text-white text-lg">AdNova AI vs. the alternatives</h3>
        <p class="text-xs text-slate-500 mt-1">Based on aggregated performance data from clients who switched</p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr style="background:rgba(255,255,255,0.02)">
              <th class="text-left px-5 py-3 text-xs font-black text-slate-500 uppercase tracking-wider">Feature</th>
              <th class="text-center px-5 py-3 text-xs font-black text-brand-400 uppercase tracking-wider">AdNova AI</th>
              <th class="text-center px-5 py-3 text-xs font-black text-slate-500 uppercase tracking-wider">Manual</th>
              <th class="text-center px-5 py-3 text-xs font-black text-slate-500 uppercase tracking-wider">Other tools</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/[0.04]">
            ${compareRow('Fully autonomous 24/7', true, false, false)}
            ${compareRow('Auto-scales budgets in real-time', true, false, 'partial')}
            ${compareRow('AI creative generation', true, false, false)}
            ${compareRow('Creative kill trigger (15 min)', true, false, false)}
            ${compareRow('Cross-platform audience sync', true, false, 'partial')}
            ${compareRow('72h performance forecasting', true, false, false)}
            ${compareRow('Setup in under 20 minutes', true, false, 'partial')}
            ${compareRow('No CSV exports needed', true, false, 'partial')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     TESTIMONIALS
════════════════════════════════════════════════════════════ -->
<section class="py-16" id="testimonials">
  <div class="max-w-7xl mx-auto px-5 md:px-8">
    <div class="text-center mb-10 fade-up">
      <div class="section-label mb-4"><i class="fas fa-star text-brand-400"></i> Customer Stories</div>
      <h2 class="font-black text-4xl md:text-6xl text-white" style="font-family:'Space Grotesk',sans-serif">
        Brands that <span class="glow-text">outperform</span>
      </h2>
      <p class="text-slate-500 text-lg mt-3">4.9/5 on G2 · 847 verified reviews</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${testimonial('Sarah K.','CMO, TechStart Inc','from-emerald-500 to-teal-600','SK','Went from 2.1× to 4.8× ROAS in 3 weeks. The AI killed 23 creatives our team was emotionally attached to and replaced them overnight. We now spend 80% less time on manual work.','4.8× ROAS in 3 weeks','Growth plan')}
      ${testimonial('James R.','Growth Lead, Fashion Brand','from-brand-500 to-purple-600','JR','Creative Killer saves us $15K/month. I set it up in 14 minutes, connected Facebook and Google, defined my ROAS floor at 3× and walked away. It just... works. Nothing else does this.','$15K saved/month','Enterprise plan')}
      ${testimonial('Amira T.','Founder, Digital Storm','from-pink-500 to-rose-600','AT','$10K to $200K ad spend in 8 weeks without hiring anyone new. The Auto-Scaling compounded every 72h. Our media buyer now just reviews the AI daily digest — she does strategy, not babysitting.','20× spend scale in 8 weeks','Growth plan')}
    </div>

    <div class="mt-8 flex flex-wrap items-center justify-center gap-4 fade-up">
      ${trustBadge('fa-shield-halved', 'SOC2 Type II')}
      ${trustBadge('fa-lock', 'GDPR Compliant')}
      ${trustBadge('fa-star', '4.9/5 on G2 (847 reviews)')}
      ${trustBadge('fa-award', 'Product Hunt #1')}
      ${trustBadge('fa-check-circle', '99.9% Uptime SLA')}
    </div>
  </div>
</section>

<div class="neon-line mx-auto max-w-4xl"></div>

<!-- ════════════════════════════════════════════════════════════
     PRICING
════════════════════════════════════════════════════════════ -->
<section class="py-16 relative overflow-hidden" id="pricing">
  <div class="absolute inset-0" style="background:radial-gradient(ellipse 80% 60% at 50% 80%,rgba(99,102,241,0.09),transparent)"></div>
  <div class="absolute inset-0 grid-lines-fine opacity-40"></div>
  <div class="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
    <div class="text-center mb-10 fade-up">
      <div class="section-label mb-4"><i class="fas fa-tags text-brand-400"></i> Transparent Pricing</div>
      <h2 class="font-black text-4xl md:text-6xl text-white mb-4" style="font-family:'Space Grotesk',sans-serif">
        Pay as you <span class="glow-text">grow</span>
      </h2>
      <p class="text-slate-500 text-base max-w-xl mx-auto">Full AI engine on every plan. No setup fees. No % of ad spend taken. No hidden costs.</p>
      <div class="inline-flex items-center gap-2 glass-neo px-4 py-3 rounded-2xl mt-4">
        <button id="btn-monthly" onclick="setFreq('monthly')" class="text-sm font-bold px-5 py-2 rounded-xl transition-all bg-brand-600/25 text-brand-300 border border-brand-500/20">Monthly</button>
        <button id="btn-annual" onclick="setFreq('annual')" class="text-sm font-bold px-5 py-2 rounded-xl transition-all text-slate-500 hover:text-slate-300">
          Annual <span class="text-xs text-emerald-400 font-black ml-1">-20%</span>
        </button>
      </div>
      <div class="mt-3 text-xs text-emerald-500/70 font-semibold">
        <i class="fas fa-tag mr-1"></i> Annual billing saves up to $1,918/year on Growth
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      ${pricingCard(PLANS[0])}
      ${pricingCard(PLANS[1])}
      ${pricingCard(PLANS[2])}
    </div>

    <div class="mt-8 text-center fade-up">
      <p class="text-slate-600 text-sm">All prices in USD. VAT may apply. <a href="#" class="text-brand-400 hover:text-brand-300 transition-colors ml-1">Full feature comparison →</a></p>
      <div class="flex flex-wrap items-center justify-center gap-4 mt-4">
        <span class="plan-perk"><i class="fas fa-shield-halved text-emerald-500 mr-1.5"></i> No credit card for trial</span>
        <span class="plan-perk"><i class="fas fa-rotate-left text-emerald-500 mr-1.5"></i> Cancel anytime</span>
        <span class="plan-perk"><i class="fas fa-bolt text-emerald-500 mr-1.5"></i> 14-day free trial</span>
        <span class="plan-perk"><i class="fas fa-headset text-emerald-500 mr-1.5"></i> 24/7 support</span>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     FAQ
════════════════════════════════════════════════════════════ -->
<section class="py-16 relative overflow-hidden" style="background:linear-gradient(180deg,rgba(4,7,22,0.72),rgba(3,5,18,0.82))">
  <div class="max-w-4xl mx-auto px-5 md:px-8">
    <div class="text-center mb-10 fade-up">
      <div class="section-label mb-4"><i class="fas fa-question-circle text-brand-400"></i> FAQ</div>
      <h2 class="font-black text-4xl md:text-5xl text-white" style="font-family:'Space Grotesk',sans-serif">
        Honest <span class="glow-text-2">answers</span>
      </h2>
    </div>
    <div class="space-y-3 fade-up" id="faq">
      ${faqItem('How fast will I see results?', 'Most clients see measurable ROAS improvement within 72 hours. The AI begins making autonomous decisions within the first 15 minutes after connection. Median time to first positive ROI on subscription cost: 11 days.')}
      ${faqItem('What exactly does "autonomous" mean?', 'The AI makes budget, bidding, creative, and audience decisions without requiring your approval for each action. You set the rules (ROAS floor, max spend, creative approval on/off), and the AI operates within them 24/7. You can pause any module instantly.')}
      ${faqItem('Does it work with small budgets?', 'Yes. The Starter plan is designed for $1K–$10K/month ad spend. The AI has fewer data points at low spend, so results are slightly slower — typically 2–4 weeks vs 72h for larger accounts. Most small accounts see +40–60% ROAS improvement in month 1.')}
      ${faqItem('How is this different from Meta Advantage+ or Google Performance Max?', 'Advantage+ and PMax are single-platform, single-campaign optimization tools. AdNova AI works across 9 platforms simultaneously, kills bad creatives before any platform&#39;s algorithm catches it, generates new creatives, and provides a unified view of all your ad spend in one place.')}
      ${faqItem('Is my ad account data secure?', 'We use OAuth — we never store your ad account passwords. Access tokens are encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC2 Type II certified and GDPR compliant. You can revoke access at any time from your ad platform.')}
      ${faqItem('What happens if the AI makes a bad decision?', 'Every AI action is logged with its reasoning. You can review and undo any decision within 24 hours. Our kill-switch pauses all autonomous actions globally in one click. In 18 months of production, 99.1% of AI decisions resulted in positive or neutral outcomes.')}
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     CTA FINAL
════════════════════════════════════════════════════════════ -->
<section class="py-16 relative overflow-hidden">
  <div class="absolute inset-0" style="background:radial-gradient(ellipse 100% 70% at 50% 50%,rgba(79,70,229,0.15),transparent 70%)"></div>
  <div class="absolute inset-0 grid-lines opacity-25"></div>
  <div class="absolute inset-x-0 top-0 h-px" style="background:linear-gradient(90deg,transparent,rgba(99,102,241,0.5),rgba(168,85,247,0.5),transparent)"></div>

  <div class="max-w-4xl mx-auto px-5 md:px-8 text-center relative z-10 fade-up">
    <div class="relative inline-block mb-5">
      <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-500 via-purple-600 to-pink-600 flex items-center justify-center mx-auto shadow-2xl spin-slow">
        <i class="fas fa-bolt text-white text-3xl"></i>
      </div>
      <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500 to-pink-600 blur-3xl opacity-50 w-24 h-24 mx-auto"></div>
    </div>

    <div class="section-label mb-4 mx-auto w-fit"><i class="fas fa-rocket text-brand-400"></i> Start today</div>
    <h2 class="font-black text-5xl md:text-7xl text-white mb-4" style="font-family:'Space Grotesk',sans-serif;line-height:1.0">
      Your competition<br/><span class="hero-text">is already using AI.</span>
    </h2>
    <p class="text-slate-400 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
      Join <strong class="text-white">2,412 brands</strong> using AdNova AI to outperform — with <strong class="text-white">zero</strong> extra headcount.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-5">
      <a href="/register" class="btn-primary text-white font-black px-14 rounded-2xl text-lg flex items-center gap-3 group w-full sm:w-auto justify-center relative overflow-hidden ripple-btn" style="padding-top:20px;padding-bottom:20px" onclick="trackEvent('footer_cta_primary')">
        <i class="fas fa-bolt group-hover:rotate-12 transition-transform"></i>
        Start Free — 14 Days
      </a>
      <a href="/login" class="btn-ghost text-slate-300 font-semibold px-10 py-5 rounded-2xl text-base w-full sm:w-auto text-center">
        Already have an account →
      </a>
    </div>
    <p class="text-slate-600 text-sm mt-5 flex items-center justify-center gap-5 flex-wrap">
      <span><i class="fas fa-shield-halved text-emerald-500 mr-1.5"></i> No credit card required</span>
      <span><i class="fas fa-xmark text-slate-500 mr-1.5"></i> Cancel anytime</span>
      <span><i class="fas fa-clock text-brand-500 mr-1.5"></i> Setup in 18 minutes</span>
      <span><i class="fas fa-lock text-slate-500 mr-1.5"></i> SOC2 + GDPR</span>
    </p>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     FOOTER
════════════════════════════════════════════════════════════ -->
<footer style="border-top:1px solid rgba(255,255,255,0.07);background:linear-gradient(180deg,rgba(3,5,18,0.95),rgba(2,3,12,0.98));backdrop-filter:blur(20px)">
  <div class="max-w-7xl mx-auto px-5 md:px-8 py-10">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div class="md:col-span-2">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg">
            <i class="fas fa-bolt text-white text-sm"></i>
          </div>
          <span class="font-black text-white text-xl">AdNova <span class="glow-text">AI</span></span>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed max-w-xs">Autonomous advertising intelligence. 9 platforms. 487K decisions/hour. Zero manual work.</p>
        <div class="flex items-center gap-3 mt-4">
          <div class="w-2 h-2 rounded-full bg-emerald-400 blink"></div>
          <span class="text-xs text-emerald-500 font-bold">All systems operational</span>
        </div>
        <div class="flex items-center gap-3 mt-4">
          ${footerSocial('fa-x-twitter', '#')}
          ${footerSocial('fa-linkedin-in', '#')}
          ${footerSocial('fa-github', '#')}
          ${footerSocial('fa-youtube', '#')}
        </div>
      </div>
      <div>
        <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Product</div>
        <div class="space-y-2.5">
          <a href="#features" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Features</a>
          <a href="#pricing" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Pricing</a>
          <a href="#use-cases" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Use Cases</a>
          <a href="#case-studies" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Case Studies</a>
          <a href="/login" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Dashboard</a>
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">API Docs</a>
        </div>
      </div>
      <div>
        <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Company</div>
        <div class="space-y-2.5">
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">About</a>
          <a href="#testimonials" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Customers</a>
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Blog</a>
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Careers</a>
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Press Kit</a>
        </div>
      </div>
      <div>
        <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Legal & Support</div>
        <div class="space-y-2.5">
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Privacy Policy</a>
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Terms of Service</a>
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Status Page</a>
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Security</a>
          <a href="/admin/login" class="block text-sm text-slate-700 hover:text-slate-500 transition-colors">Admin →</a>
        </div>
      </div>
    </div>
    <div class="divider mb-4"></div>
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-xs text-slate-700">© 2026 AdNova AI. All rights reserved. Powered by Cloudflare Workers.</p>
      <div class="flex items-center gap-4 text-xs text-slate-700">
        <span class="flex items-center gap-1.5"><i class="fas fa-shield-halved text-emerald-600"></i> SOC2 Type II</span>
        <span class="flex items-center gap-1.5"><i class="fas fa-lock text-blue-600"></i> GDPR</span>
        <span class="flex items-center gap-1.5"><i class="fas fa-globe text-brand-600"></i> 9 Platforms</span>
      </div>
    </div>
  </div>
</footer>

<!-- Toast notification — liquid glass -->
<div id="contact-toast" class="fixed bottom-6 right-6 hidden z-50 glass-neo px-5 py-4 rounded-2xl flex items-center gap-3 shadow-2xl max-w-xs" style="border-color:rgba(16,185,129,0.25);border-top-color:rgba(6,182,212,0.4)">
  <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.25);box-shadow:0 0 12px rgba(16,185,129,0.2)">
    <i class="fas fa-envelope text-emerald-400 text-sm"></i>
  </div>
  <div>
    <div class="text-sm font-bold text-white">Sales team notified!</div>
    <div class="text-xs text-slate-500">We will contact you within 2 hours.</div>
  </div>
</div>

<!-- Micro-feedback toast — liquid glass -->
<div id="mf-toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 hidden z-50 glass-neo px-5 py-3 rounded-2xl flex items-center gap-3 shadow-2xl" style="border-color:rgba(99,102,241,0.25);border-top-color:rgba(168,85,247,0.4)">
  <i id="mf-icon" class="fas fa-check-circle text-emerald-400 text-sm"></i>
  <span id="mf-msg" class="text-sm font-semibold text-white"></span>
</div>

<style>
  /* Use case tabs — liquid glass */
  .uc-tab{
    background:linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015));
    border:1px solid rgba(255,255,255,0.09);
    border-top-color:rgba(255,255,255,0.15);
    color:#64748b;transition:all .25s ease;
    backdrop-filter:blur(10px);
    box-shadow:0 2px 8px rgba(0,0,0,0.25),inset 0 1px 0 rgba(255,255,255,0.05);
  }
  .uc-tab:hover{
    background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(99,102,241,0.03));
    color:#cbd5e1;border-color:rgba(99,102,241,0.3);
    box-shadow:0 4px 12px rgba(99,102,241,0.12),inset 0 1px 0 rgba(255,255,255,0.06);
  }
  .uc-tab.active-tab{
    background:linear-gradient(135deg,rgba(99,102,241,0.18),rgba(168,85,247,0.08));
    border-color:rgba(99,102,241,0.4);border-top-color:rgba(168,85,247,0.5);
    color:#a5b4fc;
    box-shadow:0 4px 20px rgba(99,102,241,0.2),inset 0 1px 0 rgba(255,255,255,0.08);
  }

  /* Demo step indicators — liquid glass */
  .demo-step-indicator{
    padding:6px 14px;border-radius:999px;font-size:11px;font-weight:700;
    background:linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015));
    border:1px solid rgba(255,255,255,0.09);
    border-top-color:rgba(255,255,255,0.15);
    color:#475569;transition:all .3s ease;
    backdrop-filter:blur(8px);
  }
  .demo-step-indicator.active{
    background:linear-gradient(135deg,rgba(99,102,241,0.2),rgba(168,85,247,0.1));
    border-color:rgba(99,102,241,0.4);border-top-color:rgba(168,85,247,0.5);
    color:#a5b4fc;
    box-shadow:0 4px 16px rgba(99,102,241,0.2);
  }
  .demo-step-indicator.done{
    background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,182,212,0.07));
    border-color:rgba(16,185,129,0.3);border-top-color:rgba(6,182,212,0.4);
    color:#6ee7b7;
  }

  /* ROI preset buttons — liquid glass */
  .roi-preset{
    padding:4px 10px;border-radius:8px;font-size:11px;font-weight:700;
    background:linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015));
    border:1px solid rgba(255,255,255,0.09);
    border-top-color:rgba(255,255,255,0.15);
    color:#64748b;cursor:pointer;transition:all .2s ease;
    backdrop-filter:blur(6px);
  }
  .roi-preset:hover{
    background:linear-gradient(135deg,rgba(99,102,241,0.15),rgba(99,102,241,0.06));
    border-color:rgba(99,102,241,0.35);color:#a5b4fc;
  }
  .roi-preset.active{
    background:linear-gradient(135deg,rgba(99,102,241,0.22),rgba(168,85,247,0.1));
    border-color:rgba(99,102,241,0.5);border-top-color:rgba(168,85,247,0.6);
    color:#c7d2fe;
    box-shadow:0 2px 10px rgba(99,102,241,0.2);
  }
</style>

<script>
// ═══════════════════════════════════════════════════════════════
// TRACKING — Lightweight analytics event system
// ═══════════════════════════════════════════════════════════════
const _track = [];
let _sessionStart = Date.now();
let _scrollDepth = 0;

function trackEvent(name, props) {
  const ev = { event: name, ts: Date.now() - _sessionStart, ...props };
  _track.push(ev);
  // Send to analytics endpoint (non-blocking)
  if (typeof navigator.sendBeacon === 'function') {
    try { navigator.sendBeacon('/api/track', JSON.stringify(ev)); } catch(e) {}
  }
}

// Scroll depth tracking
window.addEventListener('scroll', () => {
  const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  if (pct > _scrollDepth) {
    _scrollDepth = pct;
    if ([25, 50, 75, 90].includes(pct)) trackEvent('scroll_depth', { pct });
  }
  // Scroll progress bar
  const bar = document.getElementById('scroll-progress');
  if (bar) bar.style.width = pct + '%';
}, { passive: true });

// Time on page tracking
window.addEventListener('beforeunload', () => {
  trackEvent('page_exit', { time_ms: Date.now() - _sessionStart, scroll_depth: _scrollDepth });
});

// ═══════════════════════════════════════════════════════════════
// INTERSECTION OBSERVER (fade-up + fade-in)
// ═══════════════════════════════════════════════════════════════
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: .07, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-up, .fade-in').forEach(el => observer.observe(el));

// ═══════════════════════════════════════════════════════════════
// NAVBAR scroll effect
// ═══════════════════════════════════════════════════════════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'linear-gradient(180deg,rgba(3,5,18,0.94) 0%,rgba(3,5,18,0.88) 100%)';
    navbar.style.boxShadow = '0 4px 40px rgba(0,0,0,0.6),0 1px 0 rgba(99,102,241,0.1),inset 0 -1px 0 rgba(99,102,241,0.06)';
    navbar.style.backdropFilter = 'saturate(2) blur(32px)';
  } else {
    navbar.style.background = 'linear-gradient(180deg,rgba(3,5,18,0.82) 0%,rgba(3,5,18,0.72) 100%)';
    navbar.style.boxShadow = 'none';
    navbar.style.backdropFilter = 'saturate(2) blur(30px)';
  }
}, { passive: true });

// ═══════════════════════════════════════════════════════════════
// MOBILE NAV
// ═══════════════════════════════════════════════════════════════
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const icon = document.getElementById('mobile-icon');
  nav.classList.toggle('open');
  icon.className = nav.classList.contains('open') ? 'fas fa-times text-slate-300 text-sm' : 'fas fa-bars text-slate-300 text-sm';
}

// ═══════════════════════════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ═══════════════════════════════════════════════════════════════
// LIVE COUNTER (hero)
// ═══════════════════════════════════════════════════════════════
let dec = 12847;
setInterval(() => {
  dec += Math.floor(Math.random() * 9) + 2;
  const el = document.getElementById('live-decisions');
  if (el) el.textContent = dec.toLocaleString();
}, 2200);

// ═══════════════════════════════════════════════════════════════
// PRICING TOGGLE
// ═══════════════════════════════════════════════════════════════
const prices = { starter: ${PLANS[0].price}, growth: ${PLANS[1].price} };
let freq = 'monthly';
function setFreq(f) {
  freq = f;
  const activeClass = 'text-sm font-bold px-5 py-2 rounded-xl transition-all bg-brand-600/25 text-brand-300 border border-brand-500/20';
  const inactiveClass = 'text-sm font-bold px-5 py-2 rounded-xl transition-all text-slate-500 hover:text-slate-300';
  document.getElementById('btn-monthly').className = f === 'monthly' ? activeClass : inactiveClass;
  document.getElementById('btn-annual').className = f === 'annual' ? activeClass + ' border border-brand-500/20' : inactiveClass;
  const mult = f === 'annual' ? 0.8 : 1;
  const starterEl = document.getElementById('price-starter');
  const growthEl = document.getElementById('price-growth');
  if (starterEl) starterEl.textContent = '$' + Math.round(prices.starter * mult);
  if (growthEl) growthEl.textContent = '$' + Math.round(prices.growth * mult);
  document.querySelectorAll('.plan-period').forEach(el => {
    el.textContent = f === 'annual' ? '/mo, billed annually' : '/month';
  });
  showMicroFeedback(f === 'annual' ? 'Saving $' + Math.round(prices.growth * 12 * 0.2) + '/year on Growth!' : 'Monthly billing selected');
}

// ═══════════════════════════════════════════════════════════════
// FAQ ACCORDION
// ═══════════════════════════════════════════════════════════════
document.querySelectorAll('.faq-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    const isOpen = !body.classList.contains('hidden');
    document.querySelectorAll('.faq-body').forEach(b => b.classList.add('hidden'));
    document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));
    if (!isOpen) { body.classList.remove('hidden'); icon.classList.add('rotate-180'); }
  });
});

// ═══════════════════════════════════════════════════════════════
// ACTIVE NAV ON SCROLL
// ═══════════════════════════════════════════════════════════════
const sections = ['use-cases', 'features', 'demo', 'pricing', 'case-studies'];
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const link = document.querySelector('a[href="#' + id + '"]');
    if (!link) return;
    if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { passive: true });

// ═══════════════════════════════════════════════════════════════
// USE CASE TABS
// ═══════════════════════════════════════════════════════════════
function setUCTab(tab) {
  document.querySelectorAll('.uc-panel').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.uc-tab').forEach(t => t.classList.remove('active-tab'));
  const panel = document.getElementById('uc-' + tab);
  if (panel) { panel.classList.remove('hidden'); panel.classList.remove('visible'); setTimeout(() => panel.classList.add('visible'), 10); }
  const activeBtn = document.querySelector('[data-tab="' + tab + '"]');
  if (activeBtn) activeBtn.classList.add('active-tab');
  trackEvent('uc_tab', { tab });
}
// Make first panel visible on load
document.getElementById('uc-scale').classList.add('visible');

// ═══════════════════════════════════════════════════════════════
// ROI CALCULATOR
// ═══════════════════════════════════════════════════════════════
const industryMultipliers = { ecom: 1.0, saas: 0.85, agency: 0.75, finance: 0.7, health: 0.9 };

function calcROI() {
  const spend = parseFloat(document.getElementById('roi-spend').value) || 10000;
  const roas = parseFloat(document.getElementById('roi-roas').value) || 2.5;
  const industry = document.getElementById('roi-industry').value;
  const mult = industryMultipliers[industry] || 1;

  // Projected ROAS: avg 89% improvement for ecom, adjusted by industry
  const roasImprovement = 0.89 * mult;
  const newRoas = Math.min(roas * (1 + roasImprovement), roas + 4.5);
  const currentRev = spend * roas;
  const newRev = spend * newRoas;
  const extraRev = newRev - currentRev;
  const savedWaste = spend * 0.21 * mult; // avg 21% wasted spend eliminated
  const subCost = 799; // growth plan
  const platformROI = ((extraRev + savedWaste - subCost) / subCost);

  animateNumber('roi-new-roas', newRoas.toFixed(1) + '×');
  animateNumber('roi-extra-rev', '+$' + formatNum(Math.round(extraRev)));
  animateNumber('roi-saved', '$' + formatNum(Math.round(savedWaste)));
  animateNumber('roi-roi', platformROI.toFixed(1) + '×');
}

function animateNumber(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.transform = 'scale(1.1)';
  el.style.color = '#a5b4fc';
  el.textContent = value;
  setTimeout(() => { el.style.transform = 'scale(1)'; el.style.color = ''; }, 300);
}

function formatNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n/1000).toFixed(1) + 'K';
  return n.toString();
}

function setROIPreset(field, value) {
  if (field === 'spend') {
    document.getElementById('roi-spend').value = value;
  } else {
    document.getElementById('roi-roas').value = value;
  }
  document.querySelectorAll('.roi-preset[data-field="' + field + '"]').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  calcROI();
}

// ═══════════════════════════════════════════════════════════════
// DEMO PLAYER — animated AI event log
// ═══════════════════════════════════════════════════════════════
const demoEvents = [
  { color: '#10b981', icon: 'fa-arrow-trend-up', msg: '→ [SCALE] "Summer Collection": ROAS 5.2x · budget +10% · $550→$605/day' },
  { color: '#ef4444', icon: 'fa-scissors', msg: '→ [KILL] Creative "hero-v1.jpg": CTR 0.2% after 12,400 imp. Paused.' },
  { color: '#a855f7', icon: 'fa-wand-magic-sparkles', msg: '→ [GEN] Generating 3 replacement creatives for "hero-v1.jpg"...' },
  { color: '#10b981', icon: 'fa-check', msg: '→ [GEN] "hero-v4.jpg" ready · predicted CTR: 4.2% · launching A/B test' },
  { color: '#06b6d4', icon: 'fa-users', msg: '→ [AUDIENCE] "Interest: Fashion" CPM +18% · building 3% lookalike' },
  { color: '#f97316', icon: 'fa-dollar-sign', msg: '→ [BUDGET] Reallocating $800 TikTok → LinkedIn (ROAS delta: +1.9x)' },
  { color: '#10b981', icon: 'fa-arrow-trend-up', msg: '→ [SCALE] "Product Launch Q3": ROAS 4.8x · budget +10% · $1,420→$1,562/day' },
  { color: '#ef4444', icon: 'fa-scissors', msg: '→ [KILL] 2 Snapchat creatives: CTR &lt;0.8% · $340 daily waste stopped' },
  { color: '#a855f7', icon: 'fa-brain', msg: '→ [PREDICT] "Brand Awareness" ROAS peak in 38h · pre-scaling budget' },
  { color: '#6366f1', icon: 'fa-chart-line', msg: '→ [REPORT] Daily digest ready: +$12,430 revenue vs yesterday' },
];

let demoRunning = false;
let demoIdx = 0;
let demoInterval = null;
const stepLabels = ['connect', 'analyze', 'scale', 'kill', 'generate', 'report'];

function startDemoWalkthrough() {
  if (demoRunning) return;
  demoRunning = true;
  const playBtn = document.getElementById('demo-play-btn');
  const playIcon = document.getElementById('demo-play-icon');
  if (playBtn) playBtn.style.display = 'none';
  const log = document.getElementById('demo-log');
  const steps = document.querySelectorAll('.demo-step-indicator');
  demoIdx = 0;
  if (log) log.innerHTML = '';

  demoInterval = setInterval(() => {
    if (demoIdx >= demoEvents.length) {
      clearInterval(demoInterval);
      demoRunning = false;
      if (playBtn) { playBtn.style.display = 'flex'; playIcon.className = 'fas fa-redo text-white text-lg'; }
      return;
    }
    const ev = demoEvents[demoIdx];
    if (log) {
      const line = document.createElement('div');
      line.className = 'slide-in-right';
      line.style.cssText = 'padding:3px 0;display:flex;align-items:center;gap:8px';
      line.innerHTML = '<i class="fas ' + ev.icon + ' text-xs flex-shrink-0" style="color:' + ev.color + '"></i><span style="color:#94a3b8;font-size:10px;line-height:1.4">' + ev.msg + '</span>';
      log.insertBefore(line, log.firstChild);
      if (log.children.length > 5) log.removeChild(log.lastChild);
    }
    // Update step indicators
    const stepMap = {0:1, 1:1, 2:2, 3:2, 4:3, 5:4, 6:3, 7:4, 8:5, 9:6};
    const stepIdx = stepMap[demoIdx] || 0;
    steps.forEach((s, i) => {
      if (i < stepIdx) s.className = 'demo-step-indicator done';
      else if (i === stepIdx) s.className = 'demo-step-indicator active';
      else s.className = 'demo-step-indicator';
    });
    demoIdx++;
  }, 1200);
  trackEvent('demo_started');
}

// ═══════════════════════════════════════════════════════════════
// SCALE SIM — animate steps progressively
// ═══════════════════════════════════════════════════════════════
setTimeout(() => {
  const steps = document.querySelectorAll('.scale-sim-step');
  steps.forEach((s, i) => {
    setTimeout(() => { s.classList.add('active'); }, i * 800 + 500);
  });
}, 1500);

// ═══════════════════════════════════════════════════════════════
// MICRO-FEEDBACK helper
// ═══════════════════════════════════════════════════════════════
function showMicroFeedback(msg, icon, color) {
  const toast = document.getElementById('mf-toast');
  const msgEl = document.getElementById('mf-msg');
  const iconEl = document.getElementById('mf-icon');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  if (iconEl) { iconEl.className = 'fas ' + (icon || 'fa-check-circle') + ' text-sm'; iconEl.style.color = color || '#10b981'; }
  toast.classList.remove('hidden');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.add('hidden'), 2500);
}

// ═══════════════════════════════════════════════════════════════
// COPY-TO-CLIPBOARD micro-interaction
// ═══════════════════════════════════════════════════════════════
document.addEventListener('click', e => {
  if (e.target.closest('[data-copy]')) {
    const text = e.target.closest('[data-copy]').dataset.copy;
    navigator.clipboard.writeText(text).then(() => {
      showMicroFeedback('Copied to clipboard!', 'fa-clipboard-check', '#6366f1');
    });
  }
});

// Init ROI on load
window.addEventListener('load', () => {
  calcROI();
  // Animate hero badge
  const badge = document.getElementById('hero-badge');
  if (badge) { badge.style.opacity = '0'; setTimeout(() => { badge.style.transition = 'opacity .8s ease'; badge.style.opacity = '1'; }, 200); }
});
</script>
</body>
</html>`)
}

// ── Helper components ────────────────────────────────────────────────────────

function heroKPI(val: string, label: string, change: string, icon: string, gradient: string, positive: boolean): string {
  return `<div class="rounded-xl p-3 border border-white/[0.06] relative overflow-hidden" style="background:rgba(255,255,255,0.025)">
    <div class="flex items-center justify-between mb-2">
      <div class="w-7 h-7 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0">
        <i class="fas ${icon} text-white text-xs"></i>
      </div>
      <span class="text-xs font-bold px-2 py-0.5 rounded-lg ${positive ? 'text-emerald-400' : 'text-slate-400'}" style="${positive ? 'background:rgba(16,185,129,0.12)' : 'background:rgba(148,163,184,0.1)'}">${change}</span>
    </div>
    <div class="text-xl font-black text-white leading-none">${val}</div>
    <div class="text-xs text-slate-500 mt-1">${label}</div>
  </div>`
}

function heroPlatformBar(name: string, color: string, pct: number, spend: string, roas: string): string {
  return `<div class="flex items-center gap-3">
    <div class="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style="background:${color}22">
      <i class="${getPlatformIcon(name + ' Ads')} text-xs" style="color:${color}"></i>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs text-slate-400 font-medium">${name}</span>
        <span class="text-xs font-black text-emerald-400">${roas}</span>
      </div>
      <div class="h-1.5 rounded-full" style="background:rgba(255,255,255,0.06)">
        <div class="h-1.5 rounded-full" style="width:${pct}%;background:${color}"></div>
      </div>
    </div>
    <span class="text-xs text-slate-500 w-12 text-right flex-shrink-0">${spend}</span>
  </div>`
}

function heroFeedItem(icon: string, color: string, text: string, time: string): string {
  return `<div class="flex items-center gap-3 py-1.5">
    <div class="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style="background:${color}20">
      <i class="fas fa-${icon} text-xs" style="color:${color}"></i>
    </div>
    <p class="flex-1 text-xs text-slate-400 truncate">${text}</p>
    <span class="text-xs text-slate-600 flex-shrink-0">${time}</span>
  </div>`
}

function getPlatformGrad(name: string): string {
  const m: Record<string,string> = {
    'Facebook Ads':'bg-blue-600','Google Ads':'bg-gradient-to-br from-blue-500 to-red-500',
    'Instagram Ads':'bg-gradient-to-br from-orange-500 to-pink-600','TikTok Ads':'bg-zinc-900 border border-white/10',
    'LinkedIn Ads':'bg-blue-700','YouTube Ads':'bg-red-600','Pinterest Ads':'bg-red-600',
    'X (Twitter) Ads':'bg-zinc-800 border border-white/10','Snapchat Ads':'bg-yellow-400',
  }
  return m[name] || 'bg-slate-700'
}

function getPlatformIcon(name: string): string {
  const m: Record<string,string> = {
    'Facebook Ads':'fab fa-facebook-f','Google Ads':'fab fa-google','Instagram Ads':'fab fa-instagram',
    'TikTok Ads':'fab fa-tiktok','LinkedIn Ads':'fab fa-linkedin-in','YouTube Ads':'fab fa-youtube',
    'Pinterest Ads':'fab fa-pinterest-p','X (Twitter) Ads':'fab fa-x-twitter','Snapchat Ads':'fab fa-snapchat',
    'Facebook':'fab fa-facebook-f','Google':'fab fa-google','Instagram':'fab fa-instagram',
    'TikTok':'fab fa-tiktok','LinkedIn':'fab fa-linkedin-in','YouTube':'fab fa-youtube',
    'Pinterest':'fab fa-pinterest-p','X/Twitter':'fab fa-x-twitter','Snapchat':'fab fa-snapchat',
  }
  return m[name] || 'fas fa-ad'
}

function bigStat(val: string, label: string, icon: string, gradient: string, sub: string): string {
  return `<div class="stat-card rounded-2xl p-5 text-center fade-up">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-4 shadow-xl">
      <i class="fas ${icon} text-white text-xl"></i>
    </div>
    <div class="text-4xl font-black text-white mb-2" style="font-family:'Space Grotesk',sans-serif">${val}</div>
    <div class="text-sm font-semibold text-slate-400 mb-2">${label}</div>
    <div class="text-xs text-slate-600 leading-relaxed">${sub}</div>
  </div>`
}

function miniMetric(val: string, label: string, icon: string, color: string): string {
  return `<div class="text-center fade-up">
    <div class="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style="background:${color}22;border:1px solid ${color}30">
      <i class="fas ${icon} text-sm" style="color:${color}"></i>
    </div>
    <div class="text-2xl font-black text-white" style="font-family:'Space Grotesk',sans-serif">${val}</div>
    <div class="text-xs text-slate-500 mt-1">${label}</div>
  </div>`
}

function featureCard(icon: string, gradient: string, glowColor: string, title: string, desc: string, metric: string, color: string): string {
  return `<div class="glass-card rounded-2xl p-5 fade-up group holo-card">
    <div class="feat-icon bg-gradient-to-br ${gradient} mb-4 relative">
      <div class="feat-icon-glow" style="background:${glowColor}"></div>
      <i class="fas ${icon} text-white text-xl relative z-10"></i>
    </div>
    <h3 class="font-black text-white text-base mb-3">${title}</h3>
    <p class="text-sm text-slate-500 leading-relaxed mb-4">${desc}</p>
    <div class="flex items-center gap-2">
      <span class="metric-badge" style="background:${glowColor.replace('0.45','0.12')};border:1px solid ${glowColor.replace('0.45','0.25')};color:${color}">
        <i class="fas fa-bolt text-xs"></i> ${metric}
      </span>
    </div>
  </div>`
}

function featureHighlight(icon: string, color: string, title: string, desc: string): string {
  return `<div class="glass-neo rounded-2xl p-4 fade-up flex items-start gap-4 group hover:scale-[1.02] transition-transform">
    <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background:${color}20;border:1px solid ${color}30">
      <i class="fas ${icon} text-sm" style="color:${color}"></i>
    </div>
    <div>
      <div class="font-bold text-white text-sm mb-1">${title}</div>
      <div class="text-xs text-slate-500 leading-relaxed">${desc}</div>
    </div>
  </div>`
}

function howStep(num: string, title: string, desc: string, icon: string, color: string, bg: string): string {
  return `<div class="text-center fade-up relative">
    <div class="relative inline-block mb-4">
      <div class="w-28 h-28 rounded-3xl flex items-center justify-center mx-auto" style="background:${bg};border:1px solid ${bg.replace('0.12','0.25')}">
        <i class="fas fa-${icon} text-${color}-400 text-4xl"></i>
      </div>
      <div class="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-xl border-2 border-[#020510]">${num}</div>
    </div>
    <h3 class="font-black text-white text-xl mb-3">${title}</h3>
    <p class="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">${desc}</p>
  </div>`
}

function testimonial(name: string, role: string, gradient: string, abbr: string, quote: string, metric: string, plan: string): string {
  return `<div class="testi-card rounded-2xl p-5 fade-up">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-sm font-black text-white flex-shrink-0 shadow-xl">${abbr}</div>
      <div class="flex-1">
        <div class="text-sm font-black text-white">${name}</div>
        <div class="text-xs text-slate-500 mt-0.5">${role}</div>
      </div>
      <div class="flex gap-0.5">${'<i class="fas fa-star text-amber-400 text-xs"></i>'.repeat(5)}</div>
    </div>
    <p class="text-sm text-slate-400 leading-relaxed mb-4">"${quote}"</p>
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-xs font-black text-emerald-400 px-3 py-1.5 rounded-xl" style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2)">${metric}</span>
      <span class="text-xs text-slate-600 px-2 py-1 rounded-lg glass">${plan}</span>
    </div>
  </div>`
}

function trustBadge(icon: string, label: string): string {
  return `<div class="flex items-center gap-2 text-xs text-slate-500 glass px-4 py-2 rounded-xl">
    <i class="fas ${icon} text-brand-400"></i> ${label}
  </div>`
}

function faqItem(question: string, answer: string): string {
  return `<div class="glass-neo rounded-xl overflow-hidden">
    <button class="faq-trigger w-full flex items-center justify-between p-5 text-left group">
      <span class="text-sm font-bold text-white group-hover:text-brand-300 transition-colors pr-4">${question}</span>
      <i class="fas fa-chevron-down text-slate-500 faq-icon transition-transform duration-300 flex-shrink-0 text-xs"></i>
    </button>
    <div class="faq-body hidden px-5 pb-5">
      <p class="text-sm text-slate-400 leading-relaxed">${answer}</p>
    </div>
  </div>`
}

function footerSocial(icon: string, href: string): string {
  return `<a href="${href}" class="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-slate-200 hover:border-brand-500/50 transition-all">
    <i class="fab ${icon} text-xs"></i>
  </a>`
}

// ── Use-case helpers ─────────────────────────────────────────────────────────
function ucProof(label: string, value: string, color: string): string {
  const colors: Record<string,string> = { emerald:'#10b981', red:'#ef4444', purple:'#a855f7', cyan:'#06b6d4' }
  const c = colors[color] || '#6366f1'
  return `<div class="flex items-start gap-3">
    <div class="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style="background:${c}20;border:1px solid ${c}30">
      <i class="fas fa-check text-xs" style="color:${c}"></i>
    </div>
    <div>
      <span class="text-xs font-bold text-slate-400">${label}: </span>
      <span class="text-xs text-white font-semibold">${value}</span>
    </div>
  </div>`
}

function scaleSimStep(day: string, budget: string, metrics: string, action: string, color: string, idx: number): string {
  const colors: Record<string,string> = { emerald:'#10b981', amber:'#f59e0b' }
  const c = colors[color] || '#6366f1'
  return `<div class="scale-sim-step sim-step flex items-start gap-3 p-3 rounded-xl" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);transition-delay:${idx*0.2}s">
    <div class="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 step-icon" style="background:${c}20;border:1px solid ${c}35">
      <i class="fas fa-arrow-trend-up text-xs" style="color:${c}"></i>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-xs font-black text-white">${day}</span>
        <span class="text-xs font-bold px-2 py-0.5 rounded-lg" style="background:${c}15;color:${c}">${budget}</span>
      </div>
      <div class="text-xs text-slate-500 mb-1">${metrics}</div>
      <div class="text-xs text-slate-600 italic">${action}</div>
    </div>
  </div>`
}

function creativeKillRow(name: string, ctr: string, impressions: number, status: string, color: string): string {
  const statusConfig: Record<string,{icon:string,color:string,label:string}> = {
    killed: {icon:'fa-circle-xmark', color:'#ef4444', label:'Killed'},
    scaling: {icon:'fa-arrow-trend-up', color:'#10b981', label:'Scaling'},
    active: {icon:'fa-circle-check', color:'#6366f1', label:'Active'}
  }
  const s = statusConfig[status] || statusConfig.active
  return `<div class="flex items-center gap-3 p-2.5 rounded-xl" style="background:rgba(255,255,255,0.02)">
    <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background:${color}15;border:1px solid ${color}25">
      <i class="fas fa-image text-xs" style="color:${color}"></i>
    </div>
    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold text-white truncate">${name}</div>
      <div class="text-xs text-slate-500">${impressions.toLocaleString()} impressions</div>
    </div>
    <div class="text-right flex-shrink-0">
      <div class="text-xs font-black" style="color:${color === '#ef4444' ? '#ef4444' : '#10b981'}">${ctr} CTR</div>
      <div class="text-xs flex items-center gap-1 justify-end mt-0.5" style="color:${s.color}">
        <i class="fas ${s.icon} text-xs"></i>${s.label}
      </div>
    </div>
  </div>`
}

function genLogRow(name: string, type: string, time: string, prediction: string, status: string, color: string): string {
  return `<div class="flex items-center gap-3 p-2.5 rounded-xl" style="background:rgba(255,255,255,0.02)">
    <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background:${color}15;border:1px solid ${color}25">
      <i class="fas fa-wand-magic-sparkles text-xs" style="color:${color}"></i>
    </div>
    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold text-white truncate">${name}</div>
      <div class="text-xs text-slate-500">${type} · Generated in ${time}</div>
    </div>
    <div class="text-right flex-shrink-0">
      <div class="text-xs font-bold text-emerald-400">${prediction}</div>
      <div class="text-xs px-2 py-0.5 rounded-full mt-0.5" style="background:${color}15;color:${color}">${status}</div>
    </div>
  </div>`
}

function audienceHealthRow(name: string, size: string, matchRate: number, cpm: string, status: string): string {
  const statusConfig: Record<string,{color:string,label:string}> = {
    healthy: {color:'#10b981', label:'Healthy'},
    saturated: {color:'#ef4444', label:'Saturated'},
    warning: {color:'#f59e0b', label:'Watch'},
    new: {color:'#6366f1', label:'New'}
  }
  const s = statusConfig[status] || statusConfig.healthy
  const barColor = matchRate > 70 ? '#10b981' : matchRate > 50 ? '#f59e0b' : '#ef4444'
  return `<div class="flex items-center gap-3">
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-semibold text-white truncate">${name}</span>
        <span class="text-xs px-2 py-0.5 rounded-full font-bold flex-shrink-0 ml-2" style="background:${s.color}15;color:${s.color}">${s.label}</span>
      </div>
      <div class="h-1.5 rounded-full mb-1" style="background:rgba(255,255,255,0.06)">
        <div class="h-1.5 rounded-full" style="width:${matchRate}%;background:${barColor}"></div>
      </div>
      <div class="flex items-center gap-3 text-xs text-slate-500">
        <span>${size} reach</span><span>CPM ${cpm}</span><span>${matchRate}% match</span>
      </div>
    </div>
  </div>`
}

function roiPreset(label: string, spend: number | null, roas?: number, isRoas?: boolean): string {
  const field = isRoas ? 'roas' : 'spend'
  const val = isRoas ? roas : spend
  return `<button class="roi-preset" data-field="${field}" onclick="setROIPreset('${field}', ${val})">${label}</button>`
}

function roiResultCard(id: string, label: string, defaultVal: string, icon: string, color: string, sub: string): string {
  return `<div class="rounded-2xl p-4 text-center roi-result" style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06)">
    <div class="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style="background:${color}20;border:1px solid ${color}30">
      <i class="fas ${icon} text-sm" style="color:${color}"></i>
    </div>
    <div class="text-2xl font-black text-white mb-1" id="${id}" style="transition:all .3s ease">${defaultVal}</div>
    <div class="text-xs font-bold text-slate-400 mb-1">${label}</div>
    <div class="text-xs text-slate-600">${sub}</div>
  </div>`
}

function demoStep(num: number, label: string, state: string): string {
  const stateClass = state === 'active' ? 'active' : state === 'done' ? 'done' : ''
  return `<div class="demo-step-indicator ${stateClass}" id="demo-step-${num}">
    <span class="font-black mr-1">${num}.</span>${label}
  </div>`
}

function caseStudyCard(industry: string, company: string, gradient: string, metrics: [string,string,string,string][], story: string, meta: string): string {
  return `<div class="case-card p-6 fade-up" style="--case-gradient:linear-gradient(90deg,${gradient.includes('brand') ? '#6366f1,#a855f7' : gradient.includes('emerald') ? '#10b981,#06b6d4' : '#ec4899,#ef4444'})">
    <div class="flex items-center gap-3 mb-5">
      <div class="w-10 h-10 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xs font-black text-white flex-shrink-0 shadow-lg">
        ${company.split(' ').map(w => w[0]).join('').slice(0,2)}
      </div>
      <div>
        <div class="text-xs font-black text-slate-500 uppercase tracking-wider">${industry}</div>
        <div class="text-sm font-black text-white">${company}</div>
      </div>
    </div>
    <div class="space-y-3 mb-5">
      ${metrics.map(([label, before, after, delta]) => `
      <div class="flex items-center justify-between py-2 border-b border-white/[0.04]">
        <span class="text-xs text-slate-500">${label}</span>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-600 line-through">${before}</span>
          <i class="fas fa-arrow-right text-xs text-slate-600"></i>
          <span class="text-sm font-black text-white">${after}</span>
          <span class="text-xs font-black px-2 py-0.5 rounded-lg" style="background:rgba(16,185,129,0.12);color:#10b981">${delta}</span>
        </div>
      </div>`).join('')}
    </div>
    <p class="text-xs text-slate-500 leading-relaxed mb-4">${story}</p>
    <div class="flex items-center gap-2">
      <div class="flex gap-0.5">${'<i class="fas fa-star text-amber-400 text-xs"></i>'.repeat(5)}</div>
      <span class="text-xs text-slate-600">${meta}</span>
    </div>
  </div>`
}

function compareRow(feature: string, adnova: boolean, manual: boolean | string, others: boolean | string): string {
  const check = (v: boolean | string) => {
    if (v === true) return '<i class="fas fa-check compare-check"></i>'
    if (v === false) return '<i class="fas fa-xmark compare-cross"></i>'
    return '<span class="text-xs text-amber-400 font-semibold">Partial</span>'
  }
  return `<tr class="compare-row transition-colors">
    <td class="px-5 py-3 text-sm text-slate-400">${feature}</td>
    <td class="px-5 py-3 text-center">${check(adnova)}</td>
    <td class="px-5 py-3 text-center">${check(manual)}</td>
    <td class="px-5 py-3 text-center">${check(others)}</td>
  </tr>`
}

// ── Pricing card ─────────────────────────────────────────────────────────────
function pricingCard(plan: typeof PLANS[0]): string {
  const isEnterprise = plan.id === 'enterprise'
  const priceDisplay = isEnterprise
    ? `<span class="text-4xl font-black text-white" style="font-family:'Space Grotesk',sans-serif">Custom</span>`
    : `<span class="text-5xl font-black text-white" id="price-${plan.id}" style="font-family:'Space Grotesk',sans-serif">$${plan.price}</span><span class="text-slate-500 ml-1 text-sm plan-period">/month</span>`

  return `<div class="plan-card rounded-2xl p-5 fade-up ${plan.popular ? 'popular' : ''}">
    ${plan.popular ? `<div class="absolute top-5 right-5 text-xs font-black px-3 py-1.5 rounded-full" style="background:linear-gradient(135deg,#f97316,#ef4444);color:#fff;box-shadow:0 4px 12px rgba(249,115,22,0.4)">⭐ Most Popular</div>` : ''}
    <div class="mb-4">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-3 h-3 rounded-full" style="background:${plan.color};box-shadow:0 0 10px ${plan.color}"></div>
        <span class="text-xs font-black uppercase tracking-widest" style="color:${plan.color}">${plan.name}</span>
      </div>
      <div class="flex items-end gap-2 mt-3">${priceDisplay}</div>
      <div class="text-xs text-slate-600 mt-1.5">${!isEnterprise ? `Up to ${plan.adSpend} ad spend/month` : 'Unlimited — tailored to you'}</div>
    </div>
    <div class="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05)">
      <div class="text-center"><div class="text-base font-black text-white">${plan.campaigns === 999 ? '∞' : plan.campaigns}</div><div class="text-xs text-slate-600">campaigns</div></div>
      <div class="text-center border-x border-white/5"><div class="text-base font-black text-white">${plan.platforms}</div><div class="text-xs text-slate-600">platforms</div></div>
      <div class="text-center"><div class="text-base font-black text-white">${plan.users === 999 ? '∞' : plan.users}</div><div class="text-xs text-slate-600">users</div></div>
    </div>
    <ul class="space-y-2.5 mb-4">
      ${plan.features.map(f => `<li class="flex items-start gap-2.5 text-sm text-slate-400">
        <i class="fas fa-check text-xs mt-0.5 flex-shrink-0" style="color:${plan.color}"></i>${f}
      </li>`).join('')}
    </ul>
    <a href="${isEnterprise ? '#' : '/register'}"
      class="block text-center text-sm font-black py-4 rounded-xl transition-all ripple-btn ${plan.popular ? 'btn-primary text-white' : 'btn-outline-brand'}"
      ${isEnterprise ? `onclick="document.getElementById('contact-toast').classList.remove('hidden');setTimeout(()=>document.getElementById('contact-toast').classList.add('hidden'),3500);trackEvent('pricing_enterprise_cta')"` : `onclick="trackEvent('pricing_${plan.id}_cta')"`}>
      ${plan.cta} ${!isEnterprise ? '<i class="fas fa-arrow-right text-xs ml-1.5"></i>' : '<i class="fas fa-phone text-xs ml-1.5"></i>'}
    </a>
  </div>`
}
