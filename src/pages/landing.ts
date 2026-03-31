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
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>AdNova AI — Autonomous Advertising Intelligence</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
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
      --glow-purple:rgba(99,102,241,0.5);
      --glow-pink:rgba(236,72,153,0.4);
      --glow-cyan:rgba(6,182,212,0.35);
      --bg-deep:#020510;
    }
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:var(--bg-deep)}
    ::-webkit-scrollbar-thumb{background:#1e1b4b;border-radius:3px}
    ::-webkit-scrollbar-thumb:hover{background:#6366f1}
    html{scroll-behavior:smooth}
    body{background:var(--bg-deep);font-family:'Inter',sans-serif;overflow-x:hidden;color:#e2e8f0}

    /* ── Noise texture overlay ── */
    body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:.4}

    /* ── Cyber grid background ── */
    .grid-lines{
      background-image:
        linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),
        linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px);
      background-size:60px 60px;
    }
    .grid-lines-fine{
      background-image:
        linear-gradient(rgba(99,102,241,0.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(99,102,241,0.03) 1px,transparent 1px);
      background-size:20px 20px;
    }

    /* ── Glass variants ── */
    .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.07)}
    .glass-xl{background:rgba(255,255,255,0.025);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.06)}
    .glass-card{background:rgba(255,255,255,0.02);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);transition:all .35s cubic-bezier(.25,.8,.25,1)}
    .glass-card:hover{background:rgba(255,255,255,0.04);border-color:rgba(99,102,241,0.4);transform:translateY(-6px);box-shadow:0 30px 60px rgba(0,0,0,.6),0 0 0 1px rgba(99,102,241,0.15),inset 0 1px 0 rgba(255,255,255,0.07)}
    .glass-neo{background:linear-gradient(135deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01));backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);box-shadow:inset 0 1px 0 rgba(255,255,255,0.06),0 20px 40px rgba(0,0,0,0.4)}

    /* ── Gradient text ── */
    .glow-text{background:linear-gradient(135deg,#818cf8 0%,#a855f7 40%,#ec4899 70%,#f59e0b 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .glow-text-2{background:linear-gradient(135deg,#06b6d4 0%,#818cf8 50%,#a855f7 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .glow-text-3{background:linear-gradient(135deg,#10b981,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .glow-text-orange{background:linear-gradient(135deg,#f97316 0%,#ef4444 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

    /* ── Radiant orbs ── */
    .orb{position:absolute;border-radius:50%;filter:blur(120px);pointer-events:none;will-change:transform}
    .orb-1{width:900px;height:900px;background:radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%);top:-250px;left:-350px;animation:orb-float 14s ease-in-out infinite}
    .orb-2{width:700px;height:700px;background:radial-gradient(circle,rgba(168,85,247,0.18) 0%,transparent 70%);top:350px;right:-250px;animation:orb-float 18s ease-in-out infinite reverse}
    .orb-3{width:600px;height:600px;background:radial-gradient(circle,rgba(6,182,212,0.12) 0%,transparent 70%);bottom:250px;left:30%;animation:orb-float 11s ease-in-out infinite 4s}
    .orb-4{width:400px;height:400px;background:radial-gradient(circle,rgba(236,72,153,0.14) 0%,transparent 70%);top:55%;right:12%;animation:orb-float 8s ease-in-out infinite 2s}
    .orb-5{width:350px;height:350px;background:radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 70%);bottom:100px;right:5%;animation:orb-float 15s ease-in-out infinite 7s}
    @keyframes orb-float{
      0%,100%{transform:translate(0,0) scale(1)}
      33%{transform:translate(50px,-40px) scale(1.08)}
      66%{transform:translate(-30px,50px) scale(.94)}
    }

    /* ── Animations ── */
    .fade-up{opacity:0;transform:translateY(40px);transition:opacity .9s cubic-bezier(.25,.8,.25,1),transform .9s cubic-bezier(.25,.8,.25,1)}
    .fade-up.visible{opacity:1;transform:translateY(0)}
    .fade-up:nth-child(2){transition-delay:.12s}
    .fade-up:nth-child(3){transition-delay:.24s}
    .fade-up:nth-child(4){transition-delay:.36s}
    .fade-up:nth-child(5){transition-delay:.48s}
    .fade-up:nth-child(6){transition-delay:.6s}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
    .float{animation:float 5.5s ease-in-out infinite}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    .ticker-inner{animation:ticker 35s linear infinite;white-space:nowrap;display:flex;align-items:center;gap:0}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}
    .blink{animation:blink 1.8s ease infinite}
    @keyframes gradient-x{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
    @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}
    @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    .spin-slow{animation:spin-slow 22s linear infinite}
    @keyframes count-up{from{opacity:0;transform:scale(.75)}to{opacity:1;transform:scale(1)}}
    .count-up{animation:count-up .7s ease forwards}
    @keyframes pulse-ring{0%{transform:scale(.85);opacity:.8}100%{transform:scale(2.5);opacity:0}}
    .pulse-ring{animation:pulse-ring 2.8s cubic-bezier(0,0,.2,1) infinite}
    @keyframes scanline{0%{top:-10%}100%{top:110%}}
    .scanline{animation:scanline 4s linear infinite}
    @keyframes data-stream{0%{opacity:0;transform:translateY(-100%)}50%{opacity:1}100%{opacity:0;transform:translateY(200%)}}
    @keyframes border-glow{0%,100%{box-shadow:0 0 10px rgba(99,102,241,0.3)}50%{box-shadow:0 0 25px rgba(99,102,241,0.6),0 0 50px rgba(99,102,241,0.2)}}
    .border-glow{animation:border-glow 3s ease-in-out infinite}
    @keyframes number-roll{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
    .number-roll{animation:number-roll 0.5s cubic-bezier(.25,.8,.25,1) forwards}
    @keyframes cyber-scan{0%{transform:translateY(-100%)}100%{transform:translateY(200vh)}}

    /* ── Navbar ── */
    .nav-blur{backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);background:rgba(2,5,16,0.8);border-bottom:1px solid rgba(255,255,255,0.05)}
    .nav-link{position:relative;transition:color .25s ease;color:#94a3b8}
    .nav-link::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1.5px;background:linear-gradient(90deg,#6366f1,#a855f7,#ec4899);transition:width .35s ease;border-radius:2px}
    .nav-link:hover::after,.nav-link.active::after{width:100%}
    .nav-link:hover{color:#c7d2fe}

    /* ── Buttons ── */
    .btn-primary{background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7);background-size:200% 200%;animation:gradient-x 3.5s ease infinite;transition:all .3s ease;box-shadow:0 4px 30px rgba(99,102,241,0.5),inset 0 1px 0 rgba(255,255,255,0.15)}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 40px rgba(99,102,241,0.7),inset 0 1px 0 rgba(255,255,255,0.2)}
    .btn-ghost{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);transition:all .3s ease}
    .btn-ghost:hover{background:rgba(255,255,255,0.08);border-color:rgba(99,102,241,0.5);transform:translateY(-1px)}
    .btn-outline-brand{border:1px solid rgba(99,102,241,0.5);color:#a5b4fc;background:transparent;transition:all .3s ease}
    .btn-outline-brand:hover{background:rgba(99,102,241,0.12);border-color:#6366f1;color:#c7d2fe}
    .btn-cyan{background:linear-gradient(135deg,#06b6d4,#0284c7);transition:all .3s ease;box-shadow:0 4px 20px rgba(6,182,212,0.4)}
    .btn-cyan:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(6,182,212,0.6)}

    /* ── Cards ── */
    .stat-card{background:rgba(255,255,255,0.018);border:1px solid rgba(255,255,255,0.055);transition:all .4s ease;position:relative;overflow:hidden}
    .stat-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent 60%,rgba(99,102,241,0.06));pointer-events:none}
    .stat-card:hover{background:rgba(99,102,241,0.08);border-color:rgba(99,102,241,0.3);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.5)}

    /* ── Feature icon ── */
    .feat-icon{width:54px;height:54px;border-radius:16px;display:flex;align-items:center;justify-content:center;position:relative}
    .feat-icon-glow{position:absolute;inset:-6px;border-radius:22px;opacity:0;filter:blur(12px);transition:opacity .35s ease}
    .glass-card:hover .feat-icon-glow{opacity:.65}

    /* ── Pricing ── */
    .plan-card{background:rgba(255,255,255,0.022);border:1px solid rgba(255,255,255,0.07);transition:all .4s cubic-bezier(.25,.8,.25,1);position:relative;overflow:hidden}
    .plan-card::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent);transition:left .7s ease;pointer-events:none}
    .plan-card:hover::after{left:160%}
    .plan-card:hover{transform:translateY(-10px);box-shadow:0 40px 80px rgba(0,0,0,.65)}
    .plan-card.popular{border-color:rgba(249,115,22,0.6);background:rgba(249,115,22,0.04)}
    .plan-card.popular::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#f97316,#ef4444,#a855f7)}

    /* ── Testimonials ── */
    .testi-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);transition:all .35s ease;position:relative;overflow:hidden}
    .testi-card:hover{background:rgba(255,255,255,0.04);border-color:rgba(99,102,241,0.28);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.5)}
    .testi-card::before{content:'\\201C';position:absolute;top:-10px;left:16px;font-size:120px;color:rgba(99,102,241,0.08);line-height:1;font-family:Georgia,serif;pointer-events:none}

    /* ── Demo screen ── */
    .demo-screen{background:linear-gradient(160deg,rgba(10,15,30,0.97),rgba(18,28,50,0.97));border:1px solid rgba(255,255,255,0.09);border-radius:20px;overflow:hidden;box-shadow:0 60px 120px rgba(0,0,0,.85),0 0 0 1px rgba(99,102,241,0.12),inset 0 1px 0 rgba(255,255,255,0.06)}
    .screen-shimmer{position:absolute;top:0;left:-100%;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.03),transparent);animation:shimmer 5s ease-in-out infinite}

    /* ── Section label ── */
    .section-label{display:inline-flex;align-items:center;gap:8px;padding:6px 18px;border-radius:24px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.25);font-size:11px;font-weight:700;color:#a5b4fc;text-transform:uppercase;letter-spacing:.12em}

    /* ── AI dot ── */
    .ai-dot{width:7px;height:7px;border-radius:50%;background:#10b981;display:inline-block;box-shadow:0 0 10px rgba(16,185,129,.9)}
    .ai-dot.blink{animation:blink 1.5s ease infinite}

    /* ── Divider line ── */
    .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)}

    /* ── Mobile ── */
    #mobile-nav{transition:all .35s cubic-bezier(.25,.8,.25,1);max-height:0;overflow:hidden;opacity:0}
    #mobile-nav.open{max-height:500px;opacity:1}

    /* ── AI orbit ring ── */
    .orbit-ring{position:absolute;border-radius:50%;border:1px dashed rgba(99,102,241,0.22)}

    /* ── Neon line separator ── */
    .neon-line{height:1px;background:linear-gradient(90deg,transparent 0%,rgba(99,102,241,0.7) 30%,rgba(168,85,247,0.7) 50%,rgba(236,72,153,0.7) 70%,transparent 100%)}

    /* ── Scroll indicator ── */
    .scroll-indicator{animation:float 2.5s ease-in-out infinite}

    /* ── Cyber border effect ── */
    .cyber-border{position:relative}
    .cyber-border::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(135deg,rgba(99,102,241,0.5),rgba(168,85,247,0.3),rgba(236,72,153,0.3),transparent);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}

    /* ── Holo card ── */
    .holo-card{position:relative;overflow:hidden}
    .holo-card::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.03) 50%,transparent 60%);pointer-events:none;transition:opacity .3s}
    .holo-card:hover::after{opacity:0}

    /* ── Ticker platform ── */
    .platform-chip{display:flex;align-items:center;gap:10px;padding:8px 18px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:999px;flex-shrink:0;cursor:default;transition:all .3s ease}
    .platform-chip:hover{background:rgba(99,102,241,0.08);border-color:rgba(99,102,241,0.3);transform:scale(1.04)}

    /* ── Counter digit ── */
    .counter{display:inline-block;transition:all .4s ease}

    /* ── Metric badge ── */
    .metric-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700}

    /* ── Hero gradient text large ── */
    .hero-text{background:linear-gradient(135deg,#fff 0%,#c7d2fe 30%,#a78bfa 60%,#ec4899 90%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

    /* ── Floating particles ── */
    .particle{position:absolute;border-radius:50%;pointer-events:none;opacity:0;animation:particle-float linear infinite}
    @keyframes particle-float{0%{opacity:0;transform:translateY(0) translateX(0) scale(0)}10%{opacity:.6}90%{opacity:.2}100%{opacity:0;transform:translateY(-120vh) translateX(var(--drift)) scale(1.5)}}

    /* ── AI typing cursor ── */
    .type-cursor::after{content:'|';animation:blink .8s ease infinite;color:#6366f1;margin-left:2px}

    /* ── Platform logo placeholder ── */
    .platform-logo{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:13px}

    /* ── Active campaign row ── */
    .campaign-row{transition:all .2s ease}
    .campaign-row:hover{background:rgba(255,255,255,0.03);border-radius:8px}
  </style>
</head>
<body>

<!-- ════════════════════════════════════════════════════════════
     NAVIGATION
════════════════════════════════════════════════════════════ -->
<nav class="nav-blur fixed top-0 left-0 right-0 z-50" id="navbar">
  <div class="max-w-7xl mx-auto px-5 md:px-8 h-[68px] flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-3 group">
      <div class="relative">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          <i class="fas fa-bolt text-white text-sm"></i>
        </div>
        <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-pink-600 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300"></div>
      </div>
      <span class="font-black text-white text-[18px] tracking-tight">AdNova <span class="glow-text">AI</span></span>
    </a>

    <!-- Desktop Links -->
    <div class="hidden md:flex items-center gap-5">
      <a href="#features" class="nav-link text-sm font-medium">Features</a>
      <a href="#platforms" class="nav-link text-sm font-medium">Platforms</a>
      <a href="#pricing" class="nav-link text-sm font-medium">Pricing</a>
      <a href="#testimonials" class="nav-link text-sm font-medium">Customers</a>
    </div>

    <!-- CTA Buttons -->
    <div class="hidden md:flex items-center gap-3">
      <a href="/login" class="btn-ghost text-sm text-slate-300 font-medium px-4 py-2 rounded-xl">Sign In</a>
      <a href="/register" class="btn-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2">
        <i class="fas fa-rocket text-xs"></i> Start Free Trial
      </a>
    </div>

    <!-- Mobile Burger -->
    <button onclick="toggleMobileNav()" class="md:hidden glass rounded-xl w-10 h-10 flex items-center justify-center transition-all hover:bg-white/10">
      <i class="fas fa-bars text-slate-300 text-sm" id="mobile-icon"></i>
    </button>
  </div>

  <!-- Mobile Nav -->
  <div id="mobile-nav" class="md:hidden border-t border-white/5 bg-black/85 backdrop-blur-2xl">
    <div class="px-5 py-4 space-y-1">
      <a href="#features" onclick="toggleMobileNav()" class="block text-sm text-slate-400 py-2.5 px-4 rounded-xl hover:bg-white/5 transition-all">Features</a>
      <a href="#platforms" onclick="toggleMobileNav()" class="block text-sm text-slate-400 py-2.5 px-4 rounded-xl hover:bg-white/5 transition-all">Platforms</a>
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
     HERO — ULTRA FUTURISTIC
════════════════════════════════════════════════════════════ -->
<section class="grid-lines min-h-screen flex items-center justify-center relative overflow-hidden pt-[68px]" id="hero">
  <!-- Ambient orbs -->
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
  <div class="orb orb-4"></div>
  <div class="orb orb-5"></div>

  <!-- Orbit rings (decorative) -->
  <div class="orbit-ring" style="width:700px;height:700px;top:50%;left:50%;transform:translate(-50%,-50%) rotate(15deg);opacity:0.25"></div>
  <div class="orbit-ring" style="width:1000px;height:1000px;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-8deg);opacity:0.12"></div>
  <div class="orbit-ring" style="width:1300px;height:1300px;top:50%;left:50%;transform:translate(-50%,-50%) rotate(25deg);opacity:0.06"></div>

  <!-- Scanline effect -->
  <div class="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent scanline pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-14 text-center relative z-10">

    <!-- Status badge — pulsing AI system -->
    <div class="inline-flex items-center gap-3 glass-neo px-6 py-3 rounded-full mb-2 fade-up cursor-default border-glow">
      <div class="relative">
        <div class="ai-dot blink"></div>
        <div class="absolute inset-0 rounded-full bg-emerald-400 pulse-ring opacity-50"></div>
      </div>
      <span class="text-xs font-bold text-slate-300 tracking-wide">AI Engine v2.0 — Fully Autonomous</span>
      <div class="h-3 w-px bg-white/15"></div>
      <span class="text-xs bg-gradient-to-r from-brand-500/30 to-purple-500/30 text-brand-300 px-3 py-1 rounded-full font-black border border-brand-500/25">94.2% accuracy</span>
    </div>

    <!-- Main headline — massive futuristic -->
    <div class="fade-up mb-3">
      <h1 class="font-black leading-[1.0] tracking-tight" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(52px,9vw,110px)">
        <span class="text-white block">Advertising that</span>
        <span class="hero-text block mt-2">thinks for itself.</span>
      </h1>
    </div>

    <!-- Sub headline -->
    <p class="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-2 leading-relaxed fade-up" style="font-weight:300">
      AdNova AI autonomously scales campaigns across <strong class="text-slate-200 font-semibold">9 platforms</strong>, kills underperformers, and generates winning creatives — <em class="text-slate-300 font-normal">while you sleep.</em>
    </p>

    <!-- CTA row -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3 fade-up">
      <a href="/register" class="btn-primary text-white font-black px-10 py-4.5 rounded-2xl text-base flex items-center gap-3 w-full sm:w-auto justify-center group relative overflow-hidden" style="padding-top:18px;padding-bottom:18px;min-width:240px">
        <span class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        <i class="fas fa-rocket text-sm group-hover:translate-x-1 transition-transform"></i>
        Start Free — No credit card
        <i class="fas fa-arrow-right text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"></i>
      </a>
      <a href="/login" class="btn-ghost text-slate-300 font-semibold px-8 py-4 rounded-2xl text-base flex items-center gap-3 w-full sm:w-auto justify-center group" style="min-width:200px">
        <div class="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/35 transition-colors">
          <i class="fas fa-play text-brand-400 text-xs"></i>
        </div>
        View Live Demo
      </a>
    </div>

    <!-- Live stats bar -->
    <div class="glass-neo inline-flex items-center gap-0 rounded-2xl py-4 px-6 mb-3 fade-up max-w-full overflow-hidden">
      <div class="flex items-center gap-2.5 flex-shrink-0 mr-6 border-r border-white/10 pr-6">
        <div class="relative">
          <div class="ai-dot blink"></div>
          <div class="absolute inset-0 rounded-full bg-emerald-400 pulse-ring opacity-40"></div>
        </div>
        <span class="text-xs font-black text-emerald-400 tracking-widest">LIVE</span>
      </div>
      <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="w-5 h-5 rounded-lg bg-brand-500/25 flex items-center justify-center">
            <i class="fas fa-brain text-brand-400 text-xs"></i>
          </div>
          <span class="font-black text-slate-200" id="live-decisions">12,847</span>
          <span class="text-slate-500">AI decisions today</span>
        </div>
        <span class="text-white/10 hidden sm:block">|</span>
        <div class="hidden sm:flex items-center gap-2 flex-shrink-0">
          <div class="w-5 h-5 rounded-lg bg-purple-500/25 flex items-center justify-center">
            <i class="fas fa-chart-line text-purple-400 text-xs"></i>
          </div>
          <span class="font-black text-purple-400">4.82x</span>
          <span class="text-slate-500">avg ROAS</span>
        </div>
        <span class="text-white/10 hidden md:block">|</span>
        <div class="hidden md:flex items-center gap-2 flex-shrink-0">
          <div class="w-5 h-5 rounded-lg bg-emerald-500/25 flex items-center justify-center">
            <i class="fas fa-dollar-sign text-emerald-400 text-xs"></i>
          </div>
          <span class="font-black text-emerald-400">$601K</span>
          <span class="text-slate-500">revenue today</span>
        </div>
        <span class="text-white/10 hidden lg:block">|</span>
        <div class="hidden lg:flex items-center gap-2 flex-shrink-0">
          <div class="w-5 h-5 rounded-lg bg-cyan-500/25 flex items-center justify-center">
            <i class="fas fa-users text-cyan-400 text-xs"></i>
          </div>
          <span class="font-black text-cyan-400">2,412</span>
          <span class="text-slate-500">active brands</span>
        </div>
      </div>
    </div>

    <!-- Hero dashboard mock -->
    <div class="demo-screen max-w-5xl mx-auto fade-up float relative">
      <div class="screen-shimmer"></div>
      <!-- Browser chrome -->
      <div class="px-5 py-4 flex items-center gap-3 border-b border-white/[0.06]" style="background:rgba(4,8,22,0.8)">
        <div class="flex gap-1.5">
          <div class="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer"></div>
          <div class="w-3 h-3 rounded-full bg-amber-500/70 hover:bg-amber-500 transition-colors cursor-pointer"></div>
          <div class="w-3 h-3 rounded-full bg-emerald-500/70 hover:bg-emerald-500 transition-colors cursor-pointer"></div>
        </div>
        <div class="flex-1 rounded-lg h-7 flex items-center px-3 gap-2 max-w-xs mx-auto" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06)">
          <i class="fas fa-lock text-emerald-500/60 text-xs"></i>
          <span class="text-xs text-slate-500">app.adnova.ai/dashboard</span>
          <span class="ml-auto text-xs text-emerald-400/80 font-bold">Secure</span>
        </div>
        <div class="hidden sm:flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-emerald-400 blink"></div>
          <span class="text-xs text-slate-600">AdNova AI — Live</span>
        </div>
      </div>
      <!-- Dashboard UI -->
      <div class="p-5 md:p-5" style="background:rgba(2,4,18,0.6)">
        <!-- Top KPIs -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          ${heroKPI('$124,850', 'Ad Spend', '+18.4%', 'fa-dollar-sign', 'from-brand-500 to-purple-600', true)}
          ${heroKPI('4.82x', 'Blended ROAS', '+0.6x', 'fa-chart-line', 'from-emerald-500 to-teal-600', true)}
          ${heroKPI('47', 'Active Campaigns', '12 scaling', 'fa-bullhorn', 'from-blue-500 to-cyan-600', false)}
          ${heroKPI('8,294', 'Conversions', '+22.1%', 'fa-check-circle', 'from-amber-500 to-orange-600', true)}
        </div>
        <!-- Platform row + AI feed -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Platform breakdown -->
          <div class="rounded-xl p-4 border border-white/[0.06]" style="background:rgba(255,255,255,0.02)">
            <div class="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-2">
              <i class="fas fa-plug text-brand-400"></i> Platform Performance
            </div>
            <div class="space-y-2.5">
              ${heroPlatformBar('Facebook', '#1877F2', 34, '$42.3K', '4.1x')}
              ${heroPlatformBar('Google', '#4285F4', 28, '$35.1K', '5.2x')}
              ${heroPlatformBar('TikTok', '#ff0050', 20, '$25.2K', '4.6x')}
              ${heroPlatformBar('Instagram', '#E1306C', 12, '$15.4K', '3.8x')}
              ${heroPlatformBar('LinkedIn', '#0077b5', 6, '$6.8K', '3.3x')}
            </div>
          </div>
          <!-- AI feed -->
          <div class="rounded-xl p-4 border border-white/[0.06]" style="background:rgba(255,255,255,0.02)">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-slate-500 flex items-center gap-2"><i class="fas fa-brain text-brand-400"></i> AI Activity</span>
              <span class="text-xs px-2 py-0.5 rounded-full font-black flex items-center gap-1.5" style="background:rgba(16,185,129,0.15);color:#10b981;border:1px solid rgba(16,185,129,0.2)">
                <span class="ai-dot blink" style="width:5px;height:5px"></span> LIVE
              </span>
            </div>
            <div class="space-y-2">
              ${heroFeedItem('arrow-trend-up', '#10b981', '"Summer Collection" scaled +10% — ROAS 5.2x', '2m ago')}
              ${heroFeedItem('scissors', '#ef4444', 'Killed 2 TikTok creatives — CTR 0.3%', '8m ago')}
              ${heroFeedItem('wand-magic-sparkles', '#a855f7', 'Generated 4 UGC variants for "Product Launch"', '15m ago')}
              ${heroFeedItem('users', '#06b6d4', 'Expanded lookalike audience — +1.8M reach', '31m ago')}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="mt-3 scroll-indicator flex flex-col items-center gap-2 opacity-35">
      <span class="text-xs text-slate-600 tracking-wider uppercase">Scroll to explore</span>
      <div class="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5">
        <div class="w-1 h-2 rounded-full bg-brand-400/60" style="animation:float 1.8s ease-in-out infinite"></div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     PLATFORM TICKER
════════════════════════════════════════════════════════════ -->
<div class="py-8 overflow-hidden relative" id="platforms" style="background:rgba(4,7,20,0.8);border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05)">
  <!-- Fade edges -->
  <div class="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style="background:linear-gradient(90deg,rgba(2,5,16,0.95),transparent)"></div>
  <div class="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style="background:linear-gradient(-90deg,rgba(2,5,16,0.95),transparent)"></div>
  <div class="ticker-inner gap-4">
    ${Array(2).fill(['Facebook Ads','Google Ads','Instagram Ads','TikTok Ads','LinkedIn Ads','YouTube Ads','Pinterest Ads','X (Twitter) Ads','Snapchat Ads']).flat().map(p => `
    <div class="platform-chip group">
      <div class="platform-logo ${getPlatformGrad(p)}">
        <i class="${getPlatformIcon(p)} text-white"></i>
      </div>
      <span class="text-sm font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">${p}</span>
    </div>`).join('')}
  </div>
</div>

<!-- ════════════════════════════════════════════════════════════
     STATS — IMPACT NUMBERS
════════════════════════════════════════════════════════════ -->
<section class="py-8 relative overflow-hidden">
  <div class="absolute inset-0 grid-lines-fine opacity-50"></div>
  <div class="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
    <div class="text-center mb-3 fade-up">
      <div class="section-label mb-2"><i class="fas fa-chart-bar text-brand-400"></i> Platform Impact</div>
      <h2 class="font-black text-4xl md:text-6xl text-white mb-2" style="font-family:'Space Grotesk',sans-serif">
        Numbers that<br/><span class="glow-text-2">speak volumes</span>
      </h2>
      <p class="text-slate-500 text-lg max-w-xl mx-auto">Real metrics from 2,412+ brands actively running on AdNova AI</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
      ${bigStat('$2.1B+', 'Ad Spend Managed', 'fa-dollar-sign', 'from-brand-500 to-purple-600', 'Every dollar tracked & optimized')}
      ${bigStat('47K+', 'Active Campaigns', 'fa-bullhorn', 'from-purple-500 to-pink-600', 'Across 9 major ad platforms')}
      ${bigStat('4.82x', 'Average ROAS', 'fa-chart-line', 'from-emerald-500 to-teal-600', 'vs 2.1x industry benchmark')}
      ${bigStat('2,412', 'Brands Worldwide', 'fa-globe', 'from-cyan-500 to-blue-600', 'Agencies, e-commerce & enterprises')}
    </div>

    <!-- Extra metrics bar -->
    <div class="mt-3 glass-neo rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 fade-up">
      ${miniMetric('94.2%', 'AI Prediction Accuracy', 'fa-bullseye', '#6366f1')}
      ${miniMetric('72h', 'Performance Forecasting', 'fa-clock', '#a855f7')}
      ${miniMetric('0.3%', 'Avg Wasted Spend', 'fa-trash', '#10b981')}
      ${miniMetric('3 min', 'Setup Time', 'fa-rocket', '#f97316')}
    </div>
  </div>
</section>

<div class="neon-line mx-auto max-w-4xl"></div>

<!-- ════════════════════════════════════════════════════════════
     FEATURES — AI MODULES
════════════════════════════════════════════════════════════ -->
<section class="py-8 relative" id="features">
  <div class="max-w-7xl mx-auto px-5 md:px-8">
    <!-- Header -->
    <div class="text-center mb-3 fade-up">
      <div class="section-label mb-2"><i class="fas fa-brain text-brand-400"></i> AI-Powered Features</div>
      <h2 class="font-black text-4xl md:text-6xl text-white mb-2" style="font-family:'Space Grotesk',sans-serif">
        The AI that never<br/><span class="glow-text">stops optimizing</span>
      </h2>
      <p class="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">6 autonomous AI modules working 24/7 to maximize your advertising ROI — zero manual effort required.</p>
    </div>

    <!-- Feature Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${featureCard('fa-arrow-trend-up','from-brand-500 to-purple-600','rgba(99,102,241,0.45)','Performance Predictor','Forecasts campaign performance 72h ahead using ML trained on 2B+ data points. Prevents budget waste before it happens.','94.2% accuracy','indigo')}
      ${featureCard('fa-wand-magic-sparkles','from-purple-500 to-pink-600','rgba(168,85,247,0.45)','Creative Generator','Produces images, copy, and UGC-style videos using generative AI. Continuously replaces underperformers with fresh content.','142 creatives/day','purple')}
      ${featureCard('fa-dollar-sign','from-emerald-500 to-teal-600','rgba(16,185,129,0.45)','Budget Optimizer','Auto-scales winners +10% every 72h when ROAS ≥ 3.5x. Instantly reallocates budget from low to high performers.','$847K managed','emerald')}
      ${featureCard('fa-users','from-blue-500 to-cyan-600','rgba(59,130,246,0.45)','Audience Intelligence','Detects audience saturation, builds lookalike segments, and expands reach predictively before performance drops.','2.3M reach avg','blue')}
      ${featureCard('fa-skull','from-red-500 to-rose-600','rgba(239,68,68,0.45)','Creative Killer','Automatically pauses creatives with CTR < 0.8% after 1,000 impressions. Stops budget drain before your team notices.','8,472 killed','red')}
      ${featureCard('fa-pen-nib','from-amber-500 to-orange-600','rgba(245,158,11,0.45)','Copy Engine','Generates 50+ headline variants per campaign, A/B tests them in real-time, and promotes winners automatically.','34% CTR lift','amber')}
    </div>

    <!-- Feature highlight row -->
    <div class="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 fade-up">
      ${featureHighlight('fa-shield-halved', '#10b981', 'Enterprise Security', 'SOC2 Type II, GDPR & CCPA compliant. All data encrypted at rest and in transit.')}
      ${featureHighlight('fa-code', '#6366f1', 'Open API', 'Full REST API access. Integrate AdNova AI into your existing marketing stack.')}
      ${featureHighlight('fa-headset', '#f97316', '24/7 Expert Support', 'Dedicated AI specialists, live chat, and video calls whenever you need them.')}
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     HOW IT WORKS — 3 STEPS
════════════════════════════════════════════════════════════ -->
<section class="py-8 relative overflow-hidden" style="background:rgba(4,7,20,0.6)">
  <div class="absolute inset-0 grid-lines opacity-40"></div>
  <div class="absolute inset-0" style="background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(99,102,241,0.06),transparent)"></div>
  <div class="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
    <div class="text-center mb-3 fade-up">
      <div class="section-label mb-2"><i class="fas fa-gears text-brand-400"></i> How It Works</div>
      <h2 class="font-black text-4xl md:text-6xl text-white" style="font-family:'Space Grotesk',sans-serif">
        Live in <span class="glow-text-2">3 minutes</span>
      </h2>
      <p class="text-slate-500 text-lg mt-2 max-w-xl mx-auto">No code, no complexity. Connect, configure, and watch the AI take over.</p>
    </div>
    <!-- Steps -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
      <!-- Connector line (desktop) -->
      <div class="hidden md:block absolute top-16 left-1/3 right-1/3 h-px" style="background:linear-gradient(90deg,rgba(99,102,241,0.6),rgba(168,85,247,0.6));box-shadow:0 0 8px rgba(99,102,241,0.4)"></div>
      ${howStep('01','Connect Platforms','Link Facebook, Google, TikTok and 6 more in one click. OAuth-based, no coding required.','fa-plug','brand','rgba(99,102,241,0.12)')}
      ${howStep('02','Set Your Goals','Define ROAS targets, budget caps, and brand guidelines. The AI adapts to your business.','fa-sliders','purple','rgba(168,85,247,0.12)')}
      ${howStep('03','Watch It Scale','AdNova handles optimization, scaling, killing, and creative generation — 24/7.','fa-rocket','emerald','rgba(16,185,129,0.12)')}
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     TESTIMONIALS
════════════════════════════════════════════════════════════ -->
<section class="py-8" id="testimonials">
  <div class="max-w-7xl mx-auto px-5 md:px-8">
    <div class="text-center mb-3 fade-up">
      <div class="section-label mb-2"><i class="fas fa-star text-brand-400"></i> Customer Stories</div>
      <h2 class="font-black text-4xl md:text-6xl text-white" style="font-family:'Space Grotesk',sans-serif">
        Brands that <span class="glow-text">outperform</span>
      </h2>
      <p class="text-slate-500 text-lg mt-2">Real results from real customers. No cherry-picking.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${testimonial('Sarah K.','CMO, TechStart Inc','from-emerald-500 to-teal-600','SK','AdNova AI took our ROAS from 2.1x to 4.8x in just 3 weeks. We now spend 80% less time on manual bid adjustments. It feels like having a genius media buyer on 24/7 autopilot.','4.8x ROAS in 3 weeks','Growth plan')}
      ${testimonial('James R.','Growth Lead, Fashion Brand','from-brand-500 to-purple-600','JR','The Creative Killer alone saves us $15K/month in wasted spend. It\'s like having a senior media buyer on autopilot — one that never sleeps and never misses a thing.','$15K saved/month','Enterprise plan')}
      ${testimonial('Amira T.','Founder, Digital Storm','from-pink-500 to-rose-600','AT','We scaled from $10K to $200K monthly ad spend in 2 months. The AI handles audiences, creatives, and bidding simultaneously. Nothing on the market compares.','20x spend scale','Growth plan')}
    </div>

    <!-- Trust badges -->
    <div class="mt-3 flex flex-wrap items-center justify-center gap-4 fade-up">
      ${trustBadge('fa-shield-halved', 'SOC2 Type II')}
      ${trustBadge('fa-lock', 'GDPR Compliant')}
      ${trustBadge('fa-star', '4.9/5 G2 Rating')}
      ${trustBadge('fa-award', 'Product Hunt #1')}
      ${trustBadge('fa-check-circle', '99.9% Uptime SLA')}
    </div>
  </div>
</section>

<div class="neon-line mx-auto max-w-4xl"></div>

<!-- ════════════════════════════════════════════════════════════
     PRICING — SYNCED WITH SUPER ADMIN PLANS
════════════════════════════════════════════════════════════ -->
<section class="py-8 relative overflow-hidden" id="pricing">
  <div class="absolute inset-0" style="background:radial-gradient(ellipse 80% 60% at 50% 80%,rgba(99,102,241,0.09),transparent)"></div>
  <div class="absolute inset-0 grid-lines-fine opacity-40"></div>
  <div class="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
    <div class="text-center mb-3 fade-up">
      <div class="section-label mb-2"><i class="fas fa-tags text-brand-400"></i> Transparent Pricing</div>
      <h2 class="font-black text-4xl md:text-6xl text-white mb-3" style="font-family:'Space Grotesk',sans-serif">
        Pay as you <span class="glow-text">grow</span>
      </h2>
      <p class="text-slate-500 text-base max-w-xl mx-auto">Full AI engine on every plan. No hidden fees. Cancel anytime.</p>
      <!-- Toggle annual/monthly -->
      <div class="inline-flex items-center gap-2 glass-neo px-4 py-3 rounded-2xl mt-3">
        <button id="btn-monthly" onclick="setFreq('monthly')" class="text-sm font-bold px-5 py-2 rounded-xl transition-all bg-brand-600/25 text-brand-300 border border-brand-500/20">Monthly</button>
        <button id="btn-annual" onclick="setFreq('annual')" class="text-sm font-bold px-5 py-2 rounded-xl transition-all text-slate-500 hover:text-slate-300">
          Annual <span class="text-xs text-emerald-400 font-black ml-1">-20%</span>
        </button>
      </div>
      <div class="mt-3 text-xs text-emerald-500/70 font-semibold">
        <i class="fas fa-tag mr-1"></i> Annual plan saves up to $1,918/year on Growth
      </div>
    </div>

    <!-- Plans grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      ${pricingCard(PLANS[0])}
      ${pricingCard(PLANS[1])}
      ${pricingCard(PLANS[2])}
    </div>

    <!-- FAQ teaser -->
    <div class="mt-3 text-center fade-up">
      <p class="text-slate-600 text-sm">
        All prices in USD. Annual billing saves 20%. VAT may apply.
        <a href="#" class="text-brand-400 hover:text-brand-300 transition-colors ml-2">View full feature comparison →</a>
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3 mt-3">
        ${planPerk('fa-shield-halved', 'No credit card required')}
        ${planPerk('fa-rotate-left', 'Cancel anytime')}
        ${planPerk('fa-bolt', '14-day free trial')}
        ${planPerk('fa-headset', '24/7 support')}
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     FAQ SECTION
════════════════════════════════════════════════════════════ -->
<section class="py-8 relative overflow-hidden" style="background:rgba(4,7,20,0.6)">
  <div class="max-w-4xl mx-auto px-5 md:px-8">
    <div class="text-center mb-3 fade-up">
      <div class="section-label mb-2"><i class="fas fa-question-circle text-brand-400"></i> FAQ</div>
      <h2 class="font-black text-4xl md:text-5xl text-white" style="font-family:'Space Grotesk',sans-serif">
        Common <span class="glow-text-2">questions</span>
      </h2>
    </div>
    <div class="space-y-2 fade-up" id="faq">
      ${faqItem('How long does it take to see results?', 'Most brands see measurable improvements within 72 hours. The AI starts learning your campaigns immediately after connection, and begins making autonomous decisions within the first hour.')}
      ${faqItem('Do I need to know coding to use AdNova AI?', 'Zero coding required. Everything is done through our intuitive dashboard. Connect your ad accounts with OAuth in one click, set your goals, and the AI handles everything else.')}
      ${faqItem('What platforms does AdNova AI support?', 'All 9 major platforms: Facebook Ads, Google Ads, Instagram Ads, TikTok Ads, LinkedIn Ads, YouTube Ads, Pinterest Ads, X (Twitter) Ads, and Snapchat Ads.')}
      ${faqItem('Can I control what the AI does?', 'Yes. You set the guardrails — ROAS targets, budget caps, creative approval workflows. The AI operates within your defined parameters. You can pause autonomous actions at any time.')}
      ${faqItem('Is my data secure?', 'Absolutely. We are SOC2 Type II certified, GDPR & CCPA compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never share your data with third parties.')}
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     CTA FINAL
════════════════════════════════════════════════════════════ -->
<section class="py-10 relative overflow-hidden">
  <!-- Background layers -->
  <div class="absolute inset-0" style="background:radial-gradient(ellipse 100% 70% at 50% 50%,rgba(79,70,229,0.15),transparent 70%)"></div>
  <div class="absolute inset-0 grid-lines opacity-25"></div>
  <div class="absolute inset-x-0 top-0 h-px" style="background:linear-gradient(90deg,transparent,rgba(99,102,241,0.5),rgba(168,85,247,0.5),transparent)"></div>
  <div class="absolute inset-x-0 bottom-0 h-px" style="background:linear-gradient(90deg,transparent,rgba(99,102,241,0.3),transparent)"></div>

  <div class="max-w-4xl mx-auto px-5 md:px-8 text-center relative z-10 fade-up">
    <!-- Icon -->
    <div class="relative inline-block mb-2">
      <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-500 via-purple-600 to-pink-600 flex items-center justify-center mx-auto shadow-2xl spin-slow">
        <i class="fas fa-bolt text-white text-3xl"></i>
      </div>
      <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500 to-pink-600 blur-3xl opacity-50 w-24 h-24 mx-auto"></div>
    </div>

    <div class="section-label mb-2 mx-auto w-fit"><i class="fas fa-rocket text-brand-400"></i> Ready to dominate?</div>
    <h2 class="font-black text-5xl md:text-7xl text-white mb-2" style="font-family:'Space Grotesk',sans-serif;line-height:1.0">
      Your ads deserve<br/><span class="hero-text">better intelligence</span>
    </h2>
    <p class="text-slate-400 text-xl mb-6 max-w-2xl mx-auto leading-relaxed">
      Join <strong class="text-white">2,412 brands</strong> using AdNova AI to outperform their competition — with zero manual effort.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-5">
      <a href="/register" class="btn-primary text-white font-black px-14 rounded-2xl text-lg flex items-center gap-3 group w-full sm:w-auto justify-center relative overflow-hidden" style="padding-top:20px;padding-bottom:20px">
        <i class="fas fa-bolt group-hover:rotate-12 transition-transform"></i>
        Start Free — 14 Days
        <span class="absolute right-4 text-xs opacity-0 group-hover:opacity-60 transition-opacity">→</span>
      </a>
      <a href="/login" class="btn-ghost text-slate-300 font-semibold px-10 py-5 rounded-2xl text-base w-full sm:w-auto text-center">
        Already have an account →
      </a>
    </div>
    <p class="text-slate-600 text-sm mt-3 flex items-center justify-center gap-5 flex-wrap">
      <span><i class="fas fa-shield-halved text-emerald-500 mr-1.5"></i> No credit card required</span>
      <span><i class="fas fa-xmark text-slate-500 mr-1.5"></i> Cancel anytime</span>
      <span><i class="fas fa-clock text-brand-500 mr-1.5"></i> Setup in 3 minutes</span>
      <span><i class="fas fa-lock text-slate-500 mr-1.5"></i> 256-bit encryption</span>
    </p>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     FOOTER
════════════════════════════════════════════════════════════ -->
<footer style="border-top:1px solid rgba(255,255,255,0.05);background:rgba(2,5,16,0.9)">
  <div class="max-w-7xl mx-auto px-5 md:px-8 py-8">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-3">
      <!-- Brand -->
      <div class="md:col-span-2">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg">
            <i class="fas fa-bolt text-white text-sm"></i>
          </div>
          <span class="font-black text-white text-xl">AdNova <span class="glow-text">AI</span></span>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed max-w-xs">Autonomous advertising intelligence for modern growth teams. Powered by cutting-edge AI.</p>
        <div class="flex items-center gap-3 mt-3">
          <div class="w-2 h-2 rounded-full bg-emerald-400 blink"></div>
          <span class="text-xs text-emerald-500 font-bold">All systems operational</span>
        </div>
        <div class="flex items-center gap-3 mt-3">
          ${footerSocial('fa-x-twitter', '#')}
          ${footerSocial('fa-linkedin-in', '#')}
          ${footerSocial('fa-github', '#')}
          ${footerSocial('fa-youtube', '#')}
        </div>
      </div>
      <!-- Product -->
      <div>
        <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Product</div>
        <div class="space-y-2">
          <a href="#features" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Features</a>
          <a href="#pricing" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Pricing</a>
          <a href="#platforms" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Platforms</a>
          <a href="/login" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Dashboard</a>
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">API Docs</a>
        </div>
      </div>
      <!-- Company -->
      <div>
        <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Company</div>
        <div class="space-y-2">
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">About</a>
          <a href="#testimonials" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Customers</a>
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Blog</a>
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Careers</a>
        </div>
      </div>
      <!-- Legal -->
      <div>
        <div class="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Legal & Support</div>
        <div class="space-y-2">
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Privacy Policy</a>
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Terms of Service</a>
          <a href="#" class="block text-sm text-slate-500 hover:text-slate-200 transition-colors">Status Page</a>
          <a href="/admin/login" class="block text-sm text-slate-700 hover:text-slate-500 transition-colors">Admin →</a>
        </div>
      </div>
    </div>
    <div class="divider mb-2"></div>
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-xs text-slate-700">© 2026 AdNova AI. All rights reserved. Powered by Cloudflare Workers.</p>
      <div class="flex items-center gap-4 text-xs text-slate-700">
        <span class="flex items-center gap-1.5"><i class="fas fa-shield-halved text-emerald-600"></i> SOC2 Certified</span>
        <span class="flex items-center gap-1.5"><i class="fas fa-lock text-blue-600"></i> GDPR</span>
        <span class="flex items-center gap-1.5"><i class="fas fa-globe text-brand-600"></i> 9 Platforms</span>
      </div>
    </div>
  </div>
</footer>

<!-- Toast notification -->
<div id="contact-toast" class="fixed bottom-6 right-6 hidden z-50 glass-neo px-5 py-4 rounded-2xl flex items-center gap-3 shadow-2xl max-w-xs">
  <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
    <i class="fas fa-envelope text-emerald-400 text-sm"></i>
  </div>
  <div>
    <div class="text-sm font-bold text-white">Sales team notified!</div>
    <div class="text-xs text-slate-500">We'll contact you within 2 hours.</div>
  </div>
</div>

<script>
  // ── Intersection observer (fade-up) ─────────────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: .08, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── Navbar scroll effect ────────────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
      navbar.style.background = 'rgba(2,5,16,0.96)';
      navbar.style.boxShadow = '0 4px 40px rgba(0,0,0,0.6),0 1px 0 rgba(99,102,241,0.08)';
    } else {
      navbar.style.background = 'rgba(2,5,16,0.8)';
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });

  // ── Mobile nav ──────────────────────────────────────────────────────────────
  function toggleMobileNav() {
    const nav = document.getElementById('mobile-nav');
    const icon = document.getElementById('mobile-icon');
    nav.classList.toggle('open');
    icon.className = nav.classList.contains('open') ? 'fas fa-times text-slate-300 text-sm' : 'fas fa-bars text-slate-300 text-sm';
  }

  // ── Smooth scroll ───────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if(!id) return;
      const el = document.getElementById(id);
      if(el) { e.preventDefault(); el.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });

  // ── Live decisions counter ──────────────────────────────────────────────────
  let dec = 12847;
  setInterval(() => {
    dec += Math.floor(Math.random() * 9) + 2;
    const el = document.getElementById('live-decisions');
    if(el) el.textContent = dec.toLocaleString();
  }, 2200);

  // ── Pricing toggle (monthly / annual) ──────────────────────────────────────
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
    if(starterEl) starterEl.textContent = '$' + Math.round(prices.starter * mult);
    if(growthEl) growthEl.textContent = '$' + Math.round(prices.growth * mult);
    document.querySelectorAll('.plan-period').forEach(el => {
      el.textContent = f === 'annual' ? '/mo, billed annually' : '/month';
    });
  }

  // ── FAQ accordion ───────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = !body.classList.contains('hidden');
      // close all
      document.querySelectorAll('.faq-body').forEach(b => b.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => { i.classList.remove('rotate-180'); });
      // open clicked if was closed
      if(!isOpen) { body.classList.remove('hidden'); icon.classList.add('rotate-180'); }
    });
  });

  // ── Active nav links on scroll ──────────────────────────────────────────────
  const sections = ['features','platforms','pricing','testimonials'];
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(id => {
      const el = document.getElementById(id);
      if(!el) return;
      const link = document.querySelector('a[href="#' + id + '"]');
      if(!link) return;
      if(scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { passive: true });
</script>
</body>
</html>`)
}

// ── Helper components ────────────────────────────────────────────────────────

function heroKPI(val: string, label: string, change: string, icon: string, gradient: string, positive: boolean): string {
  return `<div class="rounded-xl p-3.5 border border-white/[0.06] relative overflow-hidden" style="background:rgba(255,255,255,0.025)">
    <div class="flex items-center justify-between mb-2.5">
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
        <div class="h-1.5 rounded-full transition-all" style="width:${pct}%;background:${color}"></div>
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
  const m: Record<string, string> = {
    'Facebook Ads':'bg-blue-600','Google Ads':'bg-gradient-to-br from-blue-500 to-red-500',
    'Instagram Ads':'bg-gradient-to-br from-orange-500 to-pink-600','TikTok Ads':'bg-zinc-900 border border-white/10',
    'LinkedIn Ads':'bg-blue-700','YouTube Ads':'bg-red-600','Pinterest Ads':'bg-red-600',
    'X (Twitter) Ads':'bg-zinc-800 border border-white/10','Snapchat Ads':'bg-yellow-400',
  }
  return m[name] || 'bg-slate-700'
}

function getPlatformIcon(name: string): string {
  const m: Record<string, string> = {
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
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-3 shadow-xl">
      <i class="fas ${icon} text-white text-xl"></i>
    </div>
    <div class="text-4xl font-black text-white mb-2" style="font-family:'Space Grotesk',sans-serif">${val}</div>
    <div class="text-sm font-semibold text-slate-400 mb-2">${label}</div>
    <div class="text-xs text-slate-600">${sub}</div>
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

function featureCard(icon: string, gradient: string, glowColor: string, title: string, desc: string, metric: string, mColor: string): string {
  return `<div class="glass-card rounded-2xl p-5 fade-up group holo-card">
    <div class="feat-icon bg-gradient-to-br ${gradient} mb-2 relative">
      <div class="feat-icon-glow" style="background:${glowColor}"></div>
      <i class="fas ${icon} text-white text-xl relative z-10"></i>
    </div>
    <h3 class="font-black text-white text-base mb-3">${title}</h3>
    <p class="text-sm text-slate-500 leading-relaxed mb-2">${desc}</p>
    <div class="flex items-center gap-2">
      <span class="metric-badge" style="background:${glowColor.replace('0.45','0.12')};border:1px solid ${glowColor.replace('0.45','0.25')};color:var(--tw-${mColor}-400, #818cf8)">
        <i class="fas fa-bolt text-xs"></i>${metric}
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
    <div class="relative inline-block mb-2">
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
    <div class="flex items-center gap-3 mb-3">
      <div class="w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-sm font-black text-white flex-shrink-0 shadow-xl">${abbr}</div>
      <div class="flex-1">
        <div class="text-sm font-black text-white">${name}</div>
        <div class="text-xs text-slate-500 mt-0.5">${role}</div>
      </div>
      <div class="flex gap-0.5">
        ${'<i class="fas fa-star text-amber-400 text-xs"></i>'.repeat(5)}
      </div>
    </div>
    <p class="text-sm text-slate-400 leading-relaxed mb-2">"${quote}"</p>
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

function planPerk(icon: string, label: string): string {
  return `<div class="flex items-center gap-2 text-sm text-slate-500">
    <i class="fas ${icon} text-emerald-500"></i> ${label}
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

// ── Pricing card (synced with PLANS const) ───────────────────────────────────
function pricingCard(plan: typeof PLANS[0]): string {
  const isEnterprise = plan.id === 'enterprise'
  const priceDisplay = isEnterprise
    ? `<span class="text-4xl font-black text-white" style="font-family:'Space Grotesk',sans-serif">Custom</span>`
    : `<span class="text-5xl font-black text-white" id="price-${plan.id}" style="font-family:'Space Grotesk',sans-serif">$${plan.price}</span><span class="text-slate-500 ml-1 text-sm plan-period">/month</span>`

  return `<div class="plan-card rounded-2xl p-5 fade-up ${plan.popular ? 'popular' : ''}">
    ${plan.popular ? `<div class="absolute top-5 right-5 text-xs font-black px-3 py-1.5 rounded-full" style="background:linear-gradient(135deg,#f97316,#ef4444);color:#fff;box-shadow:0 4px 12px rgba(249,115,22,0.4)">⭐ Most Popular</div>` : ''}

    <!-- Plan header -->
    <div class="mb-2">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-3 h-3 rounded-full" style="background:${plan.color};box-shadow:0 0 10px ${plan.color}"></div>
        <span class="text-xs font-black uppercase tracking-widest" style="color:${plan.color}">${plan.name}</span>
      </div>
      <div class="flex items-end gap-2 mt-3">
        ${priceDisplay}
      </div>
      <div class="text-xs text-slate-600 mt-1.5">${!isEnterprise ? `Up to ${plan.adSpend} ad spend/month` : 'Unlimited ad spend — tailored to you'}</div>
    </div>

    <!-- Quick specs -->
    <div class="grid grid-cols-3 gap-2 mb-2 p-3 rounded-xl" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05)">
      <div class="text-center">
        <div class="text-base font-black text-white">${plan.campaigns === 999 ? '∞' : plan.campaigns}</div>
        <div class="text-xs text-slate-600">campaigns</div>
      </div>
      <div class="text-center border-x border-white/5">
        <div class="text-base font-black text-white">${plan.platforms}</div>
        <div class="text-xs text-slate-600">platforms</div>
      </div>
      <div class="text-center">
        <div class="text-base font-black text-white">${plan.users === 999 ? '∞' : plan.users}</div>
        <div class="text-xs text-slate-600">users</div>
      </div>
    </div>

    <!-- Features list -->
    <ul class="space-y-2 mb-3">
      ${plan.features.map(f => `<li class="flex items-start gap-2.5 text-sm text-slate-400">
        <i class="fas fa-check text-xs mt-0.5 flex-shrink-0" style="color:${plan.color}"></i>
        ${f}
      </li>`).join('')}
    </ul>

    <!-- CTA -->
    <a href="${isEnterprise ? '#' : '/register'}"
      class="block text-center text-sm font-black py-4 rounded-xl transition-all ${plan.popular ? 'btn-primary text-white' : 'btn-outline-brand'}"
      ${isEnterprise ? 'onclick="document.getElementById(\'contact-toast\').classList.remove(\'hidden\');setTimeout(()=>document.getElementById(\'contact-toast\').classList.add(\'hidden\'),3500)"' : ''}>
      ${plan.cta} ${!isEnterprise ? '<i class="fas fa-arrow-right text-xs ml-1.5"></i>' : '<i class="fas fa-phone text-xs ml-1.5"></i>'}
    </a>
  </div>`
}
