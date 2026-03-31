import type { Context } from 'hono'

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
      --glow-purple:rgba(99,102,241,0.4);
      --glow-pink:rgba(236,72,153,0.3);
      --glow-cyan:rgba(6,182,212,0.3);
    }
    ::-webkit-scrollbar{width:6px}
    ::-webkit-scrollbar-track{background:#030712}
    ::-webkit-scrollbar-thumb{background:#1e1b4b;border-radius:3px}
    ::-webkit-scrollbar-thumb:hover{background:#6366f1}
    html{scroll-behavior:smooth}
    body{background:#030712;font-family:'Inter',sans-serif;overflow-x:hidden;color:#e2e8f0}

    /* ── Animated background ── */
    .hero-bg{
      background:radial-gradient(ellipse 80% 60% at 50% -10%,rgba(99,102,241,0.18) 0%,transparent 70%),
               radial-gradient(ellipse 40% 40% at 80% 30%,rgba(168,85,247,0.12) 0%,transparent 60%),
               radial-gradient(ellipse 40% 40% at 10% 60%,rgba(6,182,212,0.10) 0%,transparent 60%),
               #030712;
    }
    .grid-bg{
      background-image:linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),
                       linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px);
      background-size:60px 60px;
    }

    /* ── Glass ── */
    .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.07)}
    .glass-card{background:rgba(255,255,255,0.02);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);transition:all .3s ease}
    .glass-card:hover{background:rgba(255,255,255,0.05);border-color:rgba(99,102,241,0.3);transform:translateY(-4px);box-shadow:0 24px 48px rgba(0,0,0,.5),0 0 0 1px rgba(99,102,241,0.1)}

    /* ── Glow effects ── */
    .glow-purple{box-shadow:0 0 40px var(--glow-purple),0 0 80px rgba(99,102,241,0.1)}
    .glow-text{background:linear-gradient(135deg,#6366f1 0%,#a855f7 40%,#ec4899 70%,#f59e0b 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .glow-text-cyan{background:linear-gradient(135deg,#06b6d4,#6366f1,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

    /* ── Orbs ── */
    .orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
    .orb-1{width:600px;height:600px;background:radial-gradient(circle,rgba(99,102,241,0.15),transparent);top:-100px;left:-200px;animation:orb-float 12s ease-in-out infinite}
    .orb-2{width:500px;height:500px;background:radial-gradient(circle,rgba(168,85,247,0.12),transparent);top:200px;right:-150px;animation:orb-float 15s ease-in-out infinite reverse}
    .orb-3{width:400px;height:400px;background:radial-gradient(circle,rgba(6,182,212,0.10),transparent);bottom:100px;left:30%;animation:orb-float 10s ease-in-out infinite 3s}
    @keyframes orb-float{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-20px) scale(1.05)}66%{transform:translate(-20px,30px) scale(.95)}}

    /* ── Animations ── */
    .fade-up{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}
    .fade-up.visible{opacity:1;transform:translateY(0)}
    @keyframes pulse-ring{0%{transform:scale(.8);opacity:.8}100%{transform:scale(2);opacity:0}}
    .pulse-ring{animation:pulse-ring 2.5s cubic-bezier(0,0,.2,1) infinite}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
    .float{animation:float 4s ease-in-out infinite}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    .ticker-inner{animation:ticker 25s linear infinite;white-space:nowrap}
    @keyframes counter{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}
    .counter-anim{animation:counter .5s ease forwards}
    @keyframes gradient-x{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
    .gradient-animated{background-size:200% 200%;animation:gradient-x 4s ease infinite}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
    .blink{animation:blink 1.5s ease infinite}

    /* ── Nav ── */
    .nav-blur{backdrop-filter:blur(20px);background:rgba(3,7,18,0.8);border-bottom:1px solid rgba(255,255,255,0.05)}
    .nav-link{position:relative;transition:color .2s ease}
    .nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:linear-gradient(90deg,#6366f1,#a855f7);transition:width .3s ease}
    .nav-link:hover::after{width:100%}
    .nav-link:hover{color:#a5b4fc}

    /* ── Buttons ── */
    .btn-primary{background:linear-gradient(135deg,#6366f1,#8b5cf6,#a855f7);background-size:200% 200%;animation:gradient-x 3s ease infinite;border:none;transition:all .3s ease;box-shadow:0 4px 20px rgba(99,102,241,0.4)}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(99,102,241,0.6)}
    .btn-ghost{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);transition:all .3s ease}
    .btn-ghost:hover{background:rgba(255,255,255,0.08);border-color:rgba(99,102,241,0.4)}

    /* ── Stats counter ── */
    .stat-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);transition:all .4s ease}
    .stat-card:hover{background:rgba(99,102,241,0.08);border-color:rgba(99,102,241,0.25)}

    /* ── Feature cards ── */
    .feature-icon{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
    .feature-icon::before{content:'';position:absolute;inset:0;opacity:.15;border-radius:14px}

    /* ── Platform logos ticker ── */
    .platform-logo{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}

    /* ── Pricing ── */
    .pricing-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);transition:all .4s ease;position:relative;overflow:hidden}
    .pricing-card:hover{transform:translateY(-6px);box-shadow:0 30px 60px rgba(0,0,0,.5)}
    .pricing-card.popular{border-color:rgba(99,102,241,0.5);background:rgba(99,102,241,0.06)}
    .pricing-card.popular::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#6366f1,#a855f7,#ec4899)}

    /* ── Testimonials ── */
    .testimonial-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);transition:all .3s ease}
    .testimonial-card:hover{background:rgba(255,255,255,0.04);border-color:rgba(99,102,241,0.2)}

    /* ── Demo screen ── */
    .demo-screen{background:linear-gradient(135deg,rgba(15,23,42,0.9),rgba(30,41,59,0.9));border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.7),0 0 0 1px rgba(99,102,241,0.1),inset 0 1px 0 rgba(255,255,255,0.05)}

    /* ── Section labels ── */
    .section-label{display:inline-flex;align-items:center;gap:6px;padding:4px 14px;border-radius:20px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);font-size:11px;font-weight:600;color:#a5b4fc;text-transform:uppercase;letter-spacing:.08em}

    /* ── AI dots ── */
    .ai-dot{width:6px;height:6px;border-radius:50%;background:#10b981;display:inline-block;animation:blink 1.2s ease infinite}

    /* Mobile nav */
    #mobile-nav{transition:all .3s ease;max-height:0;overflow:hidden}
    #mobile-nav.open{max-height:400px}
  </style>
</head>
<body>

<!-- ════════════════════════════════════════════════════════════
     NAVIGATION
════════════════════════════════════════════════════════════ -->
<nav class="nav-blur fixed top-0 left-0 right-0 z-50">
  <div class="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-3 group">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
        <i class="fas fa-bolt text-white text-sm"></i>
      </div>
      <span class="font-black text-white text-lg tracking-tight">AdNova <span class="glow-text">AI</span></span>
    </a>

    <!-- Desktop Links -->
    <div class="hidden md:flex items-center gap-8">
      <a href="#features" class="nav-link text-sm text-slate-400 font-medium">Features</a>
      <a href="#platforms" class="nav-link text-sm text-slate-400 font-medium">Platforms</a>
      <a href="#pricing" class="nav-link text-sm text-slate-400 font-medium">Pricing</a>
      <a href="#testimonials" class="nav-link text-sm text-slate-400 font-medium">Customers</a>
    </div>

    <!-- CTA -->
    <div class="hidden md:flex items-center gap-3">
      <a href="/login" class="btn-ghost text-sm text-slate-300 font-medium px-4 py-2 rounded-lg">Sign In</a>
      <a href="/register" class="btn-primary text-white text-sm font-bold px-5 py-2 rounded-xl">Start Free Trial</a>
    </div>

    <!-- Mobile burger -->
    <button onclick="toggleMobileNav()" class="md:hidden glass rounded-lg w-9 h-9 flex items-center justify-center">
      <i class="fas fa-bars text-slate-400 text-sm" id="mobile-icon"></i>
    </button>
  </div>

  <!-- Mobile Nav -->
  <div id="mobile-nav" class="md:hidden border-t border-white/5">
    <div class="px-4 py-4 space-y-2">
      <a href="#features" class="block text-sm text-slate-400 py-2 px-3 rounded-lg hover:bg-white/5">Features</a>
      <a href="#platforms" class="block text-sm text-slate-400 py-2 px-3 rounded-lg hover:bg-white/5">Platforms</a>
      <a href="#pricing" class="block text-sm text-slate-400 py-2 px-3 rounded-lg hover:bg-white/5">Pricing</a>
      <div class="pt-2 flex flex-col gap-2">
        <a href="/login" class="btn-ghost text-sm text-center text-slate-300 font-medium px-4 py-2 rounded-lg">Sign In</a>
        <a href="/register" class="btn-primary text-white text-sm font-bold px-4 py-2 rounded-xl text-center">Start Free Trial</a>
      </div>
    </div>
  </div>
</nav>

<!-- ════════════════════════════════════════════════════════════
     HERO
════════════════════════════════════════════════════════════ -->
<section class="hero-bg grid-bg min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
  <!-- Orbs -->
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>

  <div class="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center relative z-10">
    <!-- Badge -->
    <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 fade-up">
      <span class="ai-dot"></span>
      <span class="text-xs font-semibold text-slate-300">AI Engine v2.0 — 94.2% prediction accuracy</span>
      <span class="text-xs bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-full font-bold">NEW</span>
    </div>

    <!-- Headline -->
    <h1 class="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight mb-6 fade-up" style="font-family:'Space Grotesk',sans-serif">
      Advertising that<br/>
      <span class="glow-text">thinks for itself</span>
    </h1>

    <!-- Sub -->
    <p class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed fade-up">
      AdNova AI autonomously scales your ad campaigns across 9 platforms, kills underperformers, and generates winning creatives — all while you sleep.
    </p>

    <!-- CTAs -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 fade-up">
      <a href="/register" class="btn-primary text-white font-bold px-8 py-4 rounded-2xl text-base flex items-center gap-3 w-full sm:w-auto justify-center">
        <i class="fas fa-rocket text-sm"></i>
        Start Free Trial — No credit card
      </a>
      <a href="/login" class="btn-ghost text-slate-300 font-semibold px-8 py-4 rounded-2xl text-base flex items-center gap-3 w-full sm:w-auto justify-center">
        <i class="fas fa-play-circle text-brand-400 text-sm"></i>
        View Live Demo
      </a>
    </div>

    <!-- Live stats ticker -->
    <div class="glass rounded-2xl py-3 px-4 inline-flex items-center gap-6 mb-16 fade-up">
      <div class="flex items-center gap-2">
        <span class="ai-dot"></span>
        <span class="text-xs text-slate-400">Live AI Engine</span>
      </div>
      <div class="hidden sm:flex items-center gap-6 text-xs">
        <span class="text-slate-500">|</span>
        <span class="text-emerald-400 font-bold" id="live-decisions">12,847</span><span class="text-slate-500">decisions today</span>
        <span class="text-slate-500">|</span>
        <span class="text-brand-400 font-bold">4.82x</span><span class="text-slate-500">avg ROAS</span>
        <span class="text-slate-500">|</span>
        <span class="text-purple-400 font-bold">$601K</span><span class="text-slate-500">revenue generated</span>
      </div>
    </div>

    <!-- Hero Dashboard Preview -->
    <div class="demo-screen max-w-5xl mx-auto fade-up float">
      <!-- Browser chrome -->
      <div class="bg-slate-900/80 px-4 py-3 flex items-center gap-3 border-b border-white/5">
        <div class="flex gap-1.5"><div class="w-3 h-3 rounded-full bg-red-500/70"></div><div class="w-3 h-3 rounded-full bg-amber-500/70"></div><div class="w-3 h-3 rounded-full bg-emerald-500/70"></div></div>
        <div class="flex-1 bg-slate-800/60 rounded-md h-6 flex items-center px-3 gap-2 max-w-sm mx-auto">
          <i class="fas fa-lock text-slate-600 text-xs"></i>
          <span class="text-xs text-slate-500">app.adnova.ai/dashboard</span>
        </div>
      </div>
      <!-- Dashboard mini -->
      <div class="p-4 md:p-6">
        <!-- KPIs row -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          ${heroKPI('$124,850', 'Ad Spend', '+18.4%', 'fa-dollar-sign', 'from-brand-500 to-purple-600')}
          ${heroKPI('4.82x', 'Blended ROAS', '+0.6x', 'fa-chart-line', 'from-emerald-500 to-teal-600')}
          ${heroKPI('47', 'Campaigns', '12 scaling', 'fa-bullhorn', 'from-blue-500 to-cyan-600')}
          ${heroKPI('8,294', 'Conversions', '+22.1%', 'fa-check-circle', 'from-amber-500 to-orange-600')}
        </div>
        <!-- AI feed -->
        <div class="bg-white/[0.02] rounded-xl p-4 border border-white/5">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold text-slate-400">AI Activity — Live</span>
            <span class="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"><span class="ai-dot" style="width:5px;height:5px"></span>LIVE</span>
          </div>
          <div class="space-y-2">
            ${heroFeedItem('arrow-trend-up', 'emerald', '"Summer Collection" scaled +10% — ROAS 5.2x', '2m')}
            ${heroFeedItem('scissors', 'red', 'Killed 2 TikTok creatives — CTR 0.3% (threshold 0.8%)', '8m')}
            ${heroFeedItem('wand-magic-sparkles', 'purple', 'Generated 4 new UGC variants for "Product Launch"', '15m')}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     TICKER / PLATFORMS
════════════════════════════════════════════════════════════ -->
<div class="py-8 border-y border-white/5 bg-slate-950/50 overflow-hidden" id="platforms">
  <div class="ticker-inner flex items-center gap-8">
    ${['Facebook Ads','Google Ads','Instagram Ads','TikTok Ads','LinkedIn Ads','YouTube Ads','Pinterest Ads','X (Twitter) Ads','Snapchat Ads','Facebook Ads','Google Ads','Instagram Ads','TikTok Ads','LinkedIn Ads','YouTube Ads','Pinterest Ads','X (Twitter) Ads','Snapchat Ads'].map(p => `
    <div class="flex items-center gap-3 flex-shrink-0">
      <div class="w-8 h-8 rounded-lg ${getPlatformGrad(p)} flex items-center justify-center">
        <i class="${getPlatformIcon(p)} text-white text-sm"></i>
      </div>
      <span class="text-sm font-semibold text-slate-400">${p}</span>
    </div>`).join('')}
  </div>
</div>

<!-- ════════════════════════════════════════════════════════════
     STATS
════════════════════════════════════════════════════════════ -->
<section class="py-20 relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 md:px-6">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      ${bigStat('$2.1B+', 'Ad Spend Managed', 'fa-dollar-sign', 'brand')}
      ${bigStat('47K+', 'Active Campaigns', 'fa-bullhorn', 'purple')}
      ${bigStat('4.8x', 'Average ROAS', 'fa-chart-line', 'emerald')}
      ${bigStat('2,412', 'Clients Worldwide', 'fa-building', 'cyan')}
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     FEATURES
════════════════════════════════════════════════════════════ -->
<section class="py-24 relative" id="features">
  <div class="max-w-7xl mx-auto px-4 md:px-6">
    <!-- Header -->
    <div class="text-center mb-16 fade-up">
      <div class="section-label mb-4"><i class="fas fa-brain text-brand-400"></i> AI-Powered Features</div>
      <h2 class="font-display font-black text-4xl md:text-5xl text-white mb-4" style="font-family:'Space Grotesk',sans-serif">
        The AI that never stops<br/><span class="glow-text">optimizing</span>
      </h2>
      <p class="text-slate-400 text-lg max-w-xl mx-auto">6 intelligent modules working 24/7 to maximize your advertising ROI</p>
    </div>

    <!-- Feature Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${featureCard('fa-arrow-trend-up','from-brand-500 to-purple-600','Performance Predictor','Predicts campaign performance 72h in advance using ML models trained on 2B+ data points.','94.2% accuracy','emerald')}
      ${featureCard('fa-wand-magic-sparkles','from-purple-500 to-pink-600','Creative Generator','Generates ad creatives, copy, and UGC-style videos automatically using generative AI.','142 creatives/day','purple')}
      ${featureCard('fa-dollar-sign','from-emerald-500 to-teal-600','Budget Optimizer','Auto-scales winning campaigns +10% every 72h when ROAS ≥ 3.5x. Kills losers instantly.','$847K managed','teal')}
      ${featureCard('fa-users','from-blue-500 to-cyan-600','Audience Intelligence','Builds lookalike audiences, detects saturation, and expands reach predictively.','2.3M reach avg','blue')}
      ${featureCard('fa-skull','from-red-500 to-orange-600','Creative Killer','Automatically pauses creatives with CTR < 0.8% before they drain your budget.','8,472 killed','red')}
      ${featureCard('fa-pen-nib','from-amber-500 to-yellow-600','Copy Engine','Writes 50+ ad copy variants per campaign, A/B tests them, and keeps the winner.','34% CTR lift','amber')}
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     HOW IT WORKS
════════════════════════════════════════════════════════════ -->
<section class="py-24 bg-slate-950/40 relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 md:px-6">
    <div class="text-center mb-16 fade-up">
      <div class="section-label mb-4"><i class="fas fa-gears text-brand-400"></i> How It Works</div>
      <h2 class="font-display font-black text-4xl md:text-5xl text-white" style="font-family:'Space Grotesk',sans-serif">
        Launch in <span class="glow-text-cyan">3 minutes</span>
      </h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${howStep('01','Connect Platforms','Link your Facebook, Google, TikTok and 6 other ad accounts in one click. No coding required.','fa-plug','brand')}
      ${howStep('02','Configure Your AI','Set your ROAS targets, budget rules, and creative guidelines. The AI does the rest.','fa-sliders','purple')}
      ${howStep('03','Watch It Scale','AdNova AI optimizes, scales, kills, and generates — autonomously, 24/7.','fa-rocket','emerald')}
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     TESTIMONIALS
════════════════════════════════════════════════════════════ -->
<section class="py-24" id="testimonials">
  <div class="max-w-7xl mx-auto px-4 md:px-6">
    <div class="text-center mb-16 fade-up">
      <div class="section-label mb-4"><i class="fas fa-star text-brand-400"></i> Customer Stories</div>
      <h2 class="font-display font-black text-4xl md:text-5xl text-white" style="font-family:'Space Grotesk',sans-serif">
        Brands that <span class="glow-text">outperform</span>
      </h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${testimonial('Sarah K.','CMO, TechStart Inc','from-emerald-500 to-teal-600','SK','AdNova AI took our ROAS from 2.1x to 4.8x in 3 weeks. We now spend 80% less time on manual optimization.','4.8x ROAS achieved')}
      ${testimonial('James R.','Growth Lead, Fashion Brand','from-brand-500 to-purple-600','JR','"The Creative Killer feature alone saves us $15K/month in wasted ad spend. It\'s like having a full-time media buyer on autopilot."','$15K saved/month')}
      ${testimonial('Amira T.','Founder, Digital Storm','from-pink-500 to-rose-600','AT','We scaled from $10K to $200K monthly ad spend in 2 months. The AI handles everything — audiences, creatives, bidding.','20x spend scale')}
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     PRICING
════════════════════════════════════════════════════════════ -->
<section class="py-24 bg-slate-950/40" id="pricing">
  <div class="max-w-7xl mx-auto px-4 md:px-6">
    <div class="text-center mb-16 fade-up">
      <div class="section-label mb-4"><i class="fas fa-tags text-brand-400"></i> Simple Pricing</div>
      <h2 class="font-display font-black text-4xl md:text-5xl text-white mb-4" style="font-family:'Space Grotesk',sans-serif">
        Pay as you <span class="glow-text">grow</span>
      </h2>
      <p class="text-slate-400 text-lg">All plans include full AI engine access. No hidden fees.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      ${pricingCard('Starter','$49','month',['Up to $10K ad spend','3 ad platforms','AI Auto-optimization','Creative Generator','Email support'],false,'Get Started')}
      ${pricingCard('Growth','$149','month',['Up to $100K ad spend','All 9 ad platforms','Advanced AI modules','Unlimited creatives','Priority support','White-label reports'],true,'Start Free Trial')}
      ${pricingCard('Enterprise','Custom','',['Unlimited spend','Custom AI models','Dedicated CSM','SLA guarantee','API access','Custom integrations'],false,'Contact Sales')}
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     CTA
════════════════════════════════════════════════════════════ -->
<section class="py-24 relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-brand-900/30 via-purple-900/20 to-transparent"></div>
  <div class="orb-1 orb" style="opacity:.5"></div>
  <div class="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10 fade-up">
    <div class="section-label mb-6"><i class="fas fa-rocket text-brand-400"></i> Ready to scale?</div>
    <h2 class="font-display font-black text-4xl md:text-6xl text-white mb-6" style="font-family:'Space Grotesk',sans-serif">
      Your ads deserve<br/><span class="glow-text">better intelligence</span>
    </h2>
    <p class="text-slate-400 text-xl mb-10">Join 2,412 brands using AdNova AI to outperform their competition.</p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a href="/register" class="btn-primary text-white font-bold px-10 py-4 rounded-2xl text-lg flex items-center gap-3">
        <i class="fas fa-bolt"></i> Start Free — 14 Days Trial
      </a>
      <a href="/login" class="btn-ghost text-slate-300 font-semibold px-8 py-4 rounded-2xl text-base">
        Already have an account →
      </a>
    </div>
    <p class="text-slate-600 text-sm mt-6">No credit card required · Cancel anytime · 14-day free trial</p>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     FOOTER
════════════════════════════════════════════════════════════ -->
<footer class="border-t border-white/5 py-12">
  <div class="max-w-7xl mx-auto px-4 md:px-6">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
          <i class="fas fa-bolt text-white text-sm"></i>
        </div>
        <span class="font-black text-white">AdNova <span class="glow-text">AI</span></span>
        <span class="text-slate-600 text-sm">© 2026</span>
      </div>
      <div class="flex items-center gap-6 text-sm text-slate-500">
        <a href="#" class="hover:text-slate-300 transition-colors">Privacy</a>
        <a href="#" class="hover:text-slate-300 transition-colors">Terms</a>
        <a href="#" class="hover:text-slate-300 transition-colors">API Docs</a>
        <a href="#" class="hover:text-slate-300 transition-colors">Status</a>
        <a href="/admin/login" class="hover:text-orange-400 transition-colors text-xs opacity-40 hover:opacity-100">⚙ Admin</a>
      </div>
    </div>
  </div>
</footer>

<script>
  // ── Scroll animations ─────────────────────────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: .15 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── Mobile nav ────────────────────────────────────────────────────────────
  function toggleMobileNav() {
    const nav = document.getElementById('mobile-nav');
    const icon = document.getElementById('mobile-icon');
    nav.classList.toggle('open');
    icon.className = nav.classList.contains('open') ? 'fas fa-times text-slate-400 text-sm' : 'fas fa-bars text-slate-400 text-sm';
  }

  // ── Smooth scroll for nav links ───────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
    });
  });

  // ── Live counter animation ────────────────────────────────────────────────
  let dec = 12847;
  setInterval(() => {
    dec += Math.floor(Math.random() * 5) + 1;
    const el = document.getElementById('live-decisions');
    if(el) el.textContent = dec.toLocaleString();
  }, 3000);
</script>
</body>
</html>`)
}

// ── Helper components ────────────────────────────────────────────────────────

function heroKPI(val: string, label: string, change: string, icon: string, gradient: string): string {
  return `<div class="bg-white/[0.03] rounded-xl p-3 border border-white/5">
    <div class="flex items-center justify-between mb-2">
      <div class="w-7 h-7 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center">
        <i class="fas ${icon} text-white text-xs"></i>
      </div>
      <span class="text-xs text-emerald-400 font-bold">${change}</span>
    </div>
    <div class="text-xl font-black text-white">${val}</div>
    <div class="text-xs text-slate-500 mt-0.5">${label}</div>
  </div>`
}

function heroFeedItem(icon: string, color: string, text: string, time: string): string {
  return `<div class="flex items-center gap-3 py-1.5">
    <div class="w-6 h-6 rounded-lg bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
      <i class="fas fa-${icon} text-${color}-400 text-xs"></i>
    </div>
    <p class="flex-1 text-xs text-slate-400 truncate">${text}</p>
    <span class="text-xs text-slate-600 flex-shrink-0">${time}</span>
  </div>`
}

function getPlatformGrad(name: string): string {
  const m: Record<string, string> = {
    'Facebook Ads': 'bg-blue-600', 'Google Ads': 'bg-gradient-to-br from-blue-500 to-red-500',
    'Instagram Ads': 'bg-gradient-to-br from-orange-500 to-pink-600', 'TikTok Ads': 'bg-black border border-white/10',
    'LinkedIn Ads': 'bg-blue-700', 'YouTube Ads': 'bg-red-600',
    'Pinterest Ads': 'bg-red-600', 'X (Twitter) Ads': 'bg-slate-900 border border-white/10',
    'Snapchat Ads': 'bg-yellow-400',
  }
  return m[name] || 'bg-slate-700'
}

function getPlatformIcon(name: string): string {
  const m: Record<string, string> = {
    'Facebook Ads': 'fab fa-facebook-f', 'Google Ads': 'fab fa-google',
    'Instagram Ads': 'fab fa-instagram', 'TikTok Ads': 'fab fa-tiktok',
    'LinkedIn Ads': 'fab fa-linkedin-in', 'YouTube Ads': 'fab fa-youtube',
    'Pinterest Ads': 'fab fa-pinterest-p', 'X (Twitter) Ads': 'fab fa-x-twitter',
    'Snapchat Ads': 'fab fa-snapchat',
  }
  return m[name] || 'fas fa-ad'
}

function bigStat(val: string, label: string, icon: string, color: string): string {
  return `<div class="stat-card rounded-2xl p-6 text-center card-hover fade-up">
    <div class="w-12 h-12 rounded-2xl bg-${color}-500/15 flex items-center justify-center mx-auto mb-4">
      <i class="fas ${icon} text-${color}-400 text-xl"></i>
    </div>
    <div class="text-4xl font-black text-white mb-1" style="font-family:'Space Grotesk',sans-serif">${val}</div>
    <div class="text-sm text-slate-500 font-medium">${label}</div>
  </div>`
}

function featureCard(icon: string, gradient: string, title: string, desc: string, metric: string, mColor: string): string {
  return `<div class="glass-card rounded-2xl p-6 fade-up">
    <div class="feature-icon bg-gradient-to-br ${gradient} mb-4">
      <i class="fas ${icon} text-white text-lg"></i>
    </div>
    <h3 class="font-bold text-white text-base mb-2">${title}</h3>
    <p class="text-sm text-slate-500 leading-relaxed mb-4">${desc}</p>
    <div class="flex items-center gap-2">
      <span class="text-xs font-bold text-${mColor}-400 bg-${mColor}-500/10 px-2 py-1 rounded-lg">${metric}</span>
    </div>
  </div>`
}

function howStep(num: string, title: string, desc: string, icon: string, color: string): string {
  return `<div class="text-center fade-up">
    <div class="relative inline-block mb-6">
      <div class="w-20 h-20 rounded-2xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center mx-auto">
        <i class="fas ${icon} text-${color}-400 text-2xl"></i>
      </div>
      <div class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white text-xs font-black">${num}</div>
    </div>
    <h3 class="font-bold text-white text-lg mb-3">${title}</h3>
    <p class="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">${desc}</p>
  </div>`
}

function testimonial(name: string, role: string, gradient: string, abbr: string, quote: string, metric: string): string {
  return `<div class="testimonial-card rounded-2xl p-6 fade-up">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0">${abbr}</div>
      <div>
        <div class="text-sm font-bold text-white">${name}</div>
        <div class="text-xs text-slate-500">${role}</div>
      </div>
      <div class="ml-auto flex text-amber-400 text-xs gap-0.5">
        ${'<i class="fas fa-star"></i>'.repeat(5)}
      </div>
    </div>
    <p class="text-sm text-slate-400 leading-relaxed mb-4">"${quote}"</p>
    <div class="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg inline-block">${metric}</div>
  </div>`
}

function pricingCard(name: string, price: string, period: string, features: string[], popular: boolean, cta: string): string {
  return `<div class="pricing-card rounded-2xl p-6 fade-up ${popular ? 'popular' : ''}">
    ${popular ? '<div class="absolute top-4 right-4 text-xs font-bold bg-gradient-to-r from-brand-500 to-purple-600 text-white px-3 py-1 rounded-full">Most Popular</div>' : ''}
    <div class="mb-6">
      <div class="text-sm font-bold text-slate-400 mb-1">${name}</div>
      <div class="flex items-end gap-1">
        <span class="text-4xl font-black text-white" style="font-family:'Space Grotesk',sans-serif">${price}</span>
        ${period ? `<span class="text-slate-500 mb-1">/${period}</span>` : ''}
      </div>
    </div>
    <ul class="space-y-3 mb-6">
      ${features.map(f => `<li class="flex items-center gap-2 text-sm text-slate-400"><i class="fas fa-check text-emerald-400 text-xs flex-shrink-0"></i>${f}</li>`).join('')}
    </ul>
    <a href="${name === 'Enterprise' ? '#' : '/register'}" class="${popular ? 'btn-primary' : 'btn-ghost'} block text-center text-sm font-bold text-white px-4 py-3 rounded-xl transition-all">
      ${cta}
    </a>
  </div>`
}
