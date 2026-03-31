import type { Context } from 'hono'
import { shell } from '../lib/layout'

export const renderLanding = (c: Context) => {
  return c.html(`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>AdNova AI — Autonomous Advertising Intelligence</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: { extend: { fontFamily: { sans: ['Inter','system-ui','sans-serif'] } } }
    }
  </script>
  <style>
    body { background: #040812; font-family: 'Inter', sans-serif; }
    .gradient-text { background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .gradient-text-gold { background: linear-gradient(135deg, #f59e0b, #fbbf24, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
    .hero-glow { background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%); }
    .feature-card:hover { transform: translateY(-4px); border-color: rgba(99,102,241,0.4); }
    .feature-card { transition: all 0.3s ease; }
    .platform-pill { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); }
    @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-15px)} }
    .float { animation: float 6s ease-in-out infinite; }
    @keyframes pulse-glow { 0%,100%{box-shadow:0 0 30px rgba(99,102,241,0.3)} 50%{box-shadow:0 0 60px rgba(99,102,241,0.6)} }
    .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .blink { animation: blink 1.5s ease infinite; }
    .stat-counter { font-variant-numeric: tabular-nums; }
    .grid-bg { background-image: linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px); background-size: 50px 50px; }
  </style>
</head>
<body class="text-slate-200 min-h-screen grid-bg">

  <!-- Nav -->
  <nav class="glass border-b border-white/5 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <i class="fas fa-bolt text-white"></i>
        </div>
        <span class="font-black text-white text-xl tracking-tight">AdNova AI</span>
      </div>
      <div class="hidden md:flex items-center gap-8 text-sm text-slate-400">
        <a href="#features" class="hover:text-white transition-colors">Features</a>
        <a href="#platforms" class="hover:text-white transition-colors">Platforms</a>
        <a href="#pricing" class="hover:text-white transition-colors">Pricing</a>
        <a href="#ai-engine" class="hover:text-white transition-colors">AI Engine</a>
      </div>
      <div class="flex items-center gap-3">
        <a href="/login" class="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2">Sign In</a>
        <a href="/register" class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg pulse-glow">
          Start Free Trial
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="hero-glow relative overflow-hidden py-28 px-6">
    <div class="max-w-6xl mx-auto text-center">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm">
        <span class="w-2 h-2 rounded-full bg-emerald-400 blink"></span>
        <span class="text-emerald-400 font-semibold">AI Engine v2.0</span>
        <span class="text-slate-400">— Now with autonomous creative generation</span>
      </div>
      <!-- Headline -->
      <h1 class="text-6xl md:text-7xl font-black text-white leading-tight mb-6">
        The World's First<br/>
        <span class="gradient-text">Fully Autonomous</span><br/>
        Ad Platform
      </h1>
      <p class="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
        AdNova AI creates campaigns, generates AI images & UGC videos, A/B tests creatives, kills weak ads, 
        and scales winning campaigns automatically — across all major platforms.
      </p>
      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <a href="/register" class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-2xl pulse-glow flex items-center gap-2">
          <i class="fas fa-rocket"></i>
          Start Free — No Credit Card
        </a>
        <a href="/dashboard" class="glass hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all flex items-center gap-2">
          <i class="fas fa-play-circle text-brand-400"></i>
          Live Demo Dashboard
        </a>
      </div>
      <!-- Social Proof -->
      <div class="flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm">
        <span class="flex items-center gap-2"><i class="fas fa-check-circle text-emerald-400"></i> 2,400+ active advertisers</span>
        <span class="flex items-center gap-2"><i class="fas fa-check-circle text-emerald-400"></i> $847M in ad spend managed</span>
        <span class="flex items-center gap-2"><i class="fas fa-check-circle text-emerald-400"></i> Average 4.8x ROAS improvement</span>
      </div>
    </div>
  </section>

  <!-- Stats Bar -->
  <div class="border-y border-white/5 py-10 px-6">
    <div class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
      ${landingStat('$847M+', 'Ad Spend Managed', 'fa-dollar-sign', 'indigo')}
      ${landingStat('4.8x', 'Average ROAS', 'fa-chart-line', 'purple')}
      ${landingStat('2,400+', 'Active Advertisers', 'fa-users', 'emerald')}
      ${landingStat('12M+', 'Creatives Generated', 'fa-image', 'pink')}
      ${landingStat('99.9%', 'Platform Uptime', 'fa-server', 'amber')}
    </div>
  </div>

  <!-- Platform Support -->
  <section id="platforms" class="py-20 px-6">
    <div class="max-w-6xl mx-auto text-center">
      <div class="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Platform Integrations</div>
      <h2 class="text-4xl font-black text-white mb-4">Run Ads Everywhere <span class="gradient-text">Simultaneously</span></h2>
      <p class="text-slate-400 mb-12 max-w-2xl mx-auto">One AI brain managing all your advertising channels. Automatic creative adaptation, budget optimization, and performance scaling across every platform.</p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        ${platformBadge('fab fa-facebook', '#1877F2', 'Facebook Ads', '2.9B users')}
        ${platformBadge('fab fa-instagram', '#E1306C', 'Instagram Ads', '2B users')}
        ${platformBadge('fab fa-tiktok', '#010101', 'TikTok Ads', '1B users')}
        ${platformBadge('fab fa-snapchat', '#FFFC00', 'Snapchat Ads', '750M users', '#000')}
        ${platformBadge('fab fa-google', '#4285F4', 'Google Ads', '8.5B searches/day')}
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section id="features" class="py-20 px-6 bg-gradient-to-b from-transparent to-indigo-950/10">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <div class="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Core Features</div>
        <h2 class="text-4xl font-black text-white">Everything Runs on <span class="gradient-text">Autopilot</span></h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${featureCard('fa-brain', 'from-indigo-500 to-purple-600', 'Autonomous AI Engine', 'Constantly learns, optimizes, and scales your campaigns without human intervention. Predicts performance before spending a dollar.')}
        ${featureCard('fa-wand-magic-sparkles', 'from-purple-500 to-pink-600', 'AI Creative Generation', 'Generates scroll-stopping images, UGC-style videos, and copy variations. Auto-tests and scales winners automatically.')}
        ${featureCard('fa-scissors', 'from-red-500 to-orange-600', 'Auto Kill Weak Ads', 'AI identifies underperforming creatives with CTR < threshold and automatically pauses them, reallocating budget to winners.')}
        ${featureCard('fa-arrow-trend-up', 'from-emerald-500 to-teal-600', 'Auto-Scale Winners', 'Every 72 hours, winning campaigns receive a +10% budget increase. Compound growth on autopilot.')}
        ${featureCard('fa-users', 'from-blue-500 to-cyan-600', 'Predictive Audiences', 'AI builds and targets lookalike audiences from your best customers. Continuous learning from conversion data.')}
        ${featureCard('fa-chart-bar', 'from-amber-500 to-yellow-600', 'Real-Time Analytics', 'Live ROAS, CPA, CTR, and revenue tracking across all platforms in a single unified dashboard.')}
        ${featureCard('fa-building-columns', 'from-slate-500 to-slate-600', 'Multi-Tenant SaaS', 'Built for agencies and enterprises. Manage unlimited client accounts with role-based access control.')}
        ${featureCard('fa-gears', 'from-cyan-500 to-blue-600', 'Smart Automation Rules', 'Create complex if-this-then-that automation workflows. AI suggests optimizations based on performance patterns.')}
        ${featureCard('fa-shield-halved', 'from-green-500 to-emerald-600', 'Policy Compliance AI', 'Automatically scans creatives for platform policy violations before publishing. Zero ad disapprovals.')}
      </div>
    </div>
  </section>

  <!-- AI Engine Section -->
  <section id="ai-engine" class="py-20 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="glass rounded-3xl p-12 neon-border text-center" style="border:1px solid rgba(99,102,241,0.3)">
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl pulse-glow">
          <i class="fas fa-brain text-white text-3xl"></i>
        </div>
        <h2 class="text-4xl font-black text-white mb-4">The AdNova <span class="gradient-text">AI Brain</span></h2>
        <p class="text-slate-400 max-w-3xl mx-auto mb-10">Powered by advanced ML models trained on $1B+ in historical ad spend. Our AI makes 10,000+ micro-decisions per hour to maximize your ROAS.</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          ${aiCapabilityItem('Performance Prediction', '94.2%', 'accuracy')}
          ${aiCapabilityItem('Creative Scoring', '< 2s', 'response time')}
          ${aiCapabilityItem('Budget Allocation', 'Real-time', 'optimization')}
          ${aiCapabilityItem('Audience Matching', '3.2x', 'better CTR')}
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section id="pricing" class="py-20 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <div class="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Pricing</div>
        <h2 class="text-4xl font-black text-white">Simple, <span class="gradient-text">Performance-Based</span> Pricing</h2>
        <p class="text-slate-400 mt-4">Pay based on ad spend managed. The more you scale, the more you save.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${pricingCard('Starter', '$299', '/month', ['Up to $50K ad spend', '5 campaigns', 'All platforms', 'AI creative gen', 'Basic automation'], false)}
        ${pricingCard('Growth', '$799', '/month', ['Up to $200K ad spend', 'Unlimited campaigns', 'All platforms', 'Advanced AI engine', 'Full automation suite', 'Priority support', 'White-label reports'], true)}
        ${pricingCard('Enterprise', 'Custom', '', ['Unlimited ad spend', 'Unlimited campaigns', 'Dedicated AI instance', 'Custom integrations', 'SLA guarantee', 'Dedicated CSM', 'API access'], false)}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 px-6 text-center">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-5xl font-black text-white mb-6">Ready to Scale on <span class="gradient-text">Autopilot?</span></h2>
      <p class="text-xl text-slate-400 mb-10">Join 2,400+ advertisers who've handed their ads to AI — and never looked back.</p>
      <a href="/register" class="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-10 py-5 rounded-2xl text-xl transition-all shadow-2xl pulse-glow">
        <i class="fas fa-rocket"></i>
        Get Started Free — 14 Day Trial
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-white/5 py-10 px-6">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <i class="fas fa-bolt text-white text-xs"></i>
        </div>
        <span class="font-bold text-white">AdNova AI</span>
        <span class="text-slate-600 text-sm">© 2026 All rights reserved</span>
      </div>
      <div class="flex items-center gap-6 text-sm text-slate-500">
        <a href="#" class="hover:text-slate-300">Privacy</a>
        <a href="#" class="hover:text-slate-300">Terms</a>
        <a href="#" class="hover:text-slate-300">API Docs</a>
        <a href="#" class="hover:text-slate-300">Status</a>
      </div>
    </div>
  </footer>

  <style>
    .neon-border { box-shadow: 0 0 40px rgba(99,102,241,0.2); }
  </style>
</body>
</html>`)
}

function landingStat(value: string, label: string, icon: string, color: string): string {
  return `<div class="text-center">
    <div class="text-3xl font-black text-white mb-1">${value}</div>
    <div class="text-sm text-slate-500 flex items-center justify-center gap-1">
      <i class="fas ${icon} text-${color}-400 text-xs"></i> ${label}
    </div>
  </div>`
}

function platformBadge(icon: string, color: string, name: string, reach: string, textColor: string = '#fff'): string {
  return `<div class="platform-pill rounded-2xl px-6 py-4 flex items-center gap-3 hover:bg-white/10 transition-all cursor-pointer">
    <i class="${icon} text-2xl" style="color:${color}"></i>
    <div>
      <div class="font-semibold text-white text-sm">${name}</div>
      <div class="text-xs text-slate-500">${reach}</div>
    </div>
  </div>`
}

function featureCard(icon: string, gradient: string, title: string, desc: string): string {
  return `<div class="feature-card glass rounded-2xl p-6">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg">
      <i class="fas ${icon} text-white text-lg"></i>
    </div>
    <h3 class="font-bold text-white text-lg mb-2">${title}</h3>
    <p class="text-sm text-slate-400 leading-relaxed">${desc}</p>
  </div>`
}

function aiCapabilityItem(label: string, value: string, sub: string): string {
  return `<div class="glass rounded-xl p-6">
    <div class="text-3xl font-black text-white mb-1">${value}</div>
    <div class="font-semibold text-indigo-400 text-sm">${label}</div>
    <div class="text-xs text-slate-500 mt-1">${sub}</div>
  </div>`
}

function pricingCard(plan: string, price: string, period: string, features: string[], highlighted: boolean): string {
  return `<div class="glass rounded-2xl p-8 ${highlighted ? 'border border-indigo-500/50 shadow-2xl relative' : ''}">
    ${highlighted ? '<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">MOST POPULAR</div>' : ''}
    <h3 class="text-xl font-bold text-white mb-2">${plan}</h3>
    <div class="flex items-baseline gap-1 mb-6">
      <span class="text-4xl font-black text-white">${price}</span>
      <span class="text-slate-400">${period}</span>
    </div>
    <ul class="space-y-3 mb-8">
      ${features.map(f => `<li class="flex items-center gap-2 text-sm text-slate-300">
        <i class="fas fa-check text-indigo-400 text-xs"></i> ${f}
      </li>`).join('')}
    </ul>
    <a href="/register" class="block text-center py-3 rounded-xl font-semibold text-sm transition-all ${highlighted ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-lg' : 'glass hover:bg-white/10 text-white'}">
      Get Started
    </a>
  </div>`
}
