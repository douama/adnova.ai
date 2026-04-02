import { publicHead } from '../lib/pageLayout'

export function renderPressKit(): string {
  const head = publicHead({
    title: 'Press Kit — AdNova AI',
    description: 'AdNova AI press kit. Download logos, brand assets, company facts, executive bios, and media contacts for journalists and publishers.',
    canonical: '/press-kit',
  })

  const pressReleases = [
    { date: '2026-03-15', title: 'AdNova AI Surpasses 2,400 Active Brands, Reports $601K Daily Revenue Generation', tag: 'Growth' },
    { date: '2026-02-28', title: 'AdNova AI Launches Version 2.0 with Autonomous Campaign Management and UGC Video AI', tag: 'Product' },
    { date: '2026-01-20', title: 'AdNova AI Expands European Operations with New London Office', tag: 'Expansion' },
    { date: '2025-11-08', title: 'AdNova AI Achieves SOC 2 Type II Certification, Reinforcing Enterprise Security Standards', tag: 'Security' },
    { date: '2025-09-15', title: 'AdNova AI Raises $45M Series B Led by Tiger Global to Accelerate Global Expansion', tag: 'Funding' },
    { date: '2025-06-22', title: 'AdNova AI Launches Enterprise Tier, Onboards First Fortune 500 Customer', tag: 'Product' },
    { date: '2024-12-05', title: 'AdNova AI Reaches $10M ARR Milestone, Doubles Team to 90+ Employees', tag: 'Milestone' },
    { date: '2024-09-18', title: 'AdNova AI Launches AI Creative Studio — 1 Million Creatives Generated in First Week', tag: 'Product' },
  ]

  const awards = [
    { year: '2026', award: 'Best AI Marketing Platform', org: 'MarTech Breakthrough Awards' },
    { year: '2026', award: 'Top 50 AI Companies', org: 'Forbes AI 50' },
    { year: '2025', award: 'Product Hunt #1 Product of the Day', org: 'Product Hunt' },
    { year: '2025', award: 'Best AdTech Startup', org: 'Digiday Technology Awards' },
    { year: '2025', award: 'Innovation Award — Autonomous AI', org: 'Advertising Week' },
    { year: '2024', award: 'Startup to Watch', org: 'TechCrunch' },
  ]

  const executives = [
    { name: 'Marcus Chen', role: 'CEO & Co-Founder', bio: 'Former VP Engineering at Meta Ads. Built AI bidding systems managing $2B+ in annual ad spend. Stanford CS PhD. Previously at Google and LinkedIn. Forbes 40 Under 40.' },
    { name: 'Priya Nair', role: 'CTO & Co-Founder', bio: 'Ex-Google Brain researcher. Led ML infrastructure for Google Smart Campaigns. 12 patents in ad optimization. MIT PhD in Machine Learning. Previously at DeepMind.' },
    { name: 'Sofia Rossi', role: 'Chief Product Officer', bio: 'Previously Head of Product at HubSpot Marketing Hub. Scaled product from 0 to 10M users. Forbes 30 Under 30. Angel investor in 15+ startups.' },
    { name: 'James Okafor', role: 'VP Sales', bio: '15 years in adtech sales. Built revenue teams at The Trade Desk and Criteo. $50M+ ARR closed in career. MBA from Wharton.' },
  ]

  const mediaContacts = [
    { name: 'Jordan Taylor', role: 'Head of Communications', email: 'press@adnova.ai', focus: 'General Press & Media' },
    { name: 'Emma Wilson', role: 'PR Manager — EMEA', email: 'press-eu@adnova.ai', focus: 'European Media' },
  ]

  return `${head}
<body class="dark">
<div class="pk-orb pk-orb-1"></div>
<div class="pk-orb pk-orb-2"></div>

<!-- NAV -->
<nav class="nav-blur fixed top-0 left-0 right-0 z-50" style="height:64px">
  <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6366f1"/><stop offset="50%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg)"/><path d="M16 7 L9 23 L16 18 L23 23 Z" fill="white" opacity="0.95"/><path d="M16 7 L16 18 L23 23 Z" fill="white" opacity="0.5"/></svg>
      <span class="font-bold text-white text-lg" style="font-family:'Space Grotesk',sans-serif">AdNova AI</span>
    </a>
    <div class="flex items-center gap-4">
      <a href="/" class="text-slate-400 hover:text-white text-sm transition-colors">← Home</a>
      <a href="/register" class="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold">Start Free Trial</a>
    </div>
  </div>
</nav>

<!-- HERO -->
<section class="pt-32 pb-16 px-6 text-center">
  <div class="max-w-4xl mx-auto">
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-indigo-300 border border-indigo-500/20 mb-6">
      <i class="fas fa-newspaper text-indigo-400"></i>
      Press & Media Resources
    </div>
    <h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">
      AdNova AI <span class="glow-text">Press Kit</span>
    </h1>
    <p class="text-xl text-slate-400 mb-8">Everything journalists and publishers need to cover AdNova AI accurately and compellingly.</p>
    <div class="flex flex-wrap justify-center gap-3">
      <a href="mailto:press@adnova.ai" class="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2"><i class="fas fa-envelope"></i> Contact Press Team</a>
      <a href="#assets" class="btn-ghost px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2"><i class="fas fa-download"></i> Download Assets</a>
    </div>
  </div>
</section>

<!-- COMPANY FACTS -->
<section class="py-12 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-white mb-8 flex items-center gap-3"><i class="fas fa-info-circle text-indigo-400"></i> Company Facts</h2>
    <div class="grid md:grid-cols-2 gap-4">
      ${[
        ['Full Name', 'AdNova AI, Inc.'],
        ['Founded', 'January 2023'],
        ['Headquarters', 'San Francisco, CA, USA'],
        ['Offices', 'San Francisco, London, Singapore'],
        ['Team Size', '90+ employees across 12 countries'],
        ['Funding', '$67.2M total (Seed + Series A + Series B)'],
        ['Investors', 'Sequoia, a16z, Bessemer Venture, Tiger Global'],
        ['Customers', '2,412+ active brands globally'],
        ['Revenue Managed', '$601K+ daily across customer base'],
        ['Average ROAS', '4.82× (customer average)'],
        ['Ad Platforms', '9 (Facebook, Google, TikTok, Instagram, LinkedIn, Pinterest, Snapchat, Amazon, Twitter/X)'],
        ['Certifications', 'SOC 2 Type II, GDPR, CCPA Compliant'],
        ['Website', 'https://adnova.ai'],
        ['Press Email', 'press@adnova.ai'],
      ].map(([k, v]) => `
      <div class="flex gap-4 py-3 border-b border-white/5">
        <div class="text-slate-500 text-sm min-w-36 flex-shrink-0">${k}</div>
        <div class="text-white text-sm font-medium">${v}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- COMPANY DESCRIPTION -->
<section class="py-12 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3"><i class="fas fa-file-alt text-purple-400"></i> Company Description</h2>
    <div class="space-y-4">
      <div class="glass-card rounded-2xl p-6">
        <div class="text-xs text-slate-500 mb-2 uppercase tracking-wider">One Sentence (25 words)</div>
        <p class="text-white font-medium">AdNova AI is an autonomous advertising intelligence platform that manages digital ad campaigns across 9 platforms using AI, delivering an average 4.82× ROAS for 2,412+ brands.</p>
      </div>
      <div class="glass-card rounded-2xl p-6">
        <div class="text-xs text-slate-500 mb-2 uppercase tracking-wider">Short Description (50 words)</div>
        <p class="text-slate-300">AdNova AI automates the full advertising management lifecycle — from campaign creation and creative generation to real-time bidding optimization and budget allocation — across 9 major ad platforms including Facebook, Google, and TikTok. Founded in 2023 and trusted by 2,412+ brands, AdNova AI delivers an average 4.82× ROAS while saving marketing teams 18 hours per week.</p>
      </div>
      <div class="glass-card rounded-2xl p-6">
        <div class="text-xs text-slate-500 mb-2 uppercase tracking-wider">Full Description (150 words)</div>
        <p class="text-slate-300">AdNova AI is an autonomous advertising intelligence platform that uses advanced machine learning to manage and optimize digital advertising campaigns across Facebook, Google, TikTok, Instagram, LinkedIn, Pinterest, Snapchat, Amazon, and Twitter/X. Founded in January 2023 by Marcus Chen (former Meta VP Engineering) and Priya Nair (former Google Brain researcher), AdNova AI has raised $67.2M from Sequoia, a16z, Bessemer, and Tiger Global.</p>
        <p class="text-slate-300 mt-3">The platform autonomously handles bid management (with adjustments every 15 minutes), creative rotation, budget allocation, audience targeting, and A/B testing — without requiring specialized advertising expertise from the user. AdNova AI's AI monitors campaigns continuously and acts on performance signals in real time. The result: customers achieve an average 4.82× return on ad spend, reduce wasted spend by 73%, and reclaim 18 hours per week previously spent on manual campaign management. The platform serves 2,412+ active brands across 40+ industries worldwide.</p>
      </div>
    </div>
  </div>
</section>

<!-- BRAND ASSETS -->
<section id="assets" class="py-12 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3"><i class="fas fa-palette text-cyan-400"></i> Brand Assets</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-8">
      <!-- Logo Preview -->
      <div class="glass-card rounded-2xl p-6">
        <div class="text-xs text-slate-500 mb-4 uppercase tracking-wider">Primary Logo — Dark Background</div>
        <div class="bg-slate-950 rounded-xl p-8 flex items-center justify-center mb-4" style="height:120px">
          <div class="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none"><defs><linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6366f1"/><stop offset="50%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg2)"/><path d="M16 7 L9 23 L16 18 L23 23 Z" fill="white" opacity="0.95"/><path d="M16 7 L16 18 L23 23 Z" fill="white" opacity="0.5"/></svg>
            <span class="text-white font-bold text-2xl" style="font-family:'Space Grotesk',sans-serif">AdNova AI</span>
          </div>
        </div>
        <div class="text-xs text-slate-500">SVG format available · Minimum size: 120px wide</div>
      </div>
      <!-- Logo Preview Light -->
      <div class="glass-card rounded-2xl p-6">
        <div class="text-xs text-slate-500 mb-4 uppercase tracking-wider">Logo — White Background</div>
        <div class="bg-white rounded-xl p-8 flex items-center justify-center mb-4" style="height:120px">
          <div class="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none"><defs><linearGradient id="lg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4f46e5"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg3)"/><path d="M16 7 L9 23 L16 18 L23 23 Z" fill="white" opacity="0.95"/><path d="M16 7 L16 18 L23 23 Z" fill="white" opacity="0.5"/></svg>
            <span class="font-bold text-2xl" style="color:#030512;font-family:'Space Grotesk',sans-serif">AdNova AI</span>
          </div>
        </div>
        <div class="text-xs text-slate-500">Use on light backgrounds only</div>
      </div>
    </div>

    <!-- Brand Colors -->
    <div class="glass-card rounded-2xl p-6 mb-6">
      <div class="text-xs text-slate-500 mb-4 uppercase tracking-wider">Brand Colors</div>
      <div class="flex flex-wrap gap-4">
        ${[
          ['#6366F1', 'Primary Purple', 'Indigo 500'],
          ['#8B5CF6', 'Secondary', 'Violet 500'],
          ['#A855F7', 'Accent', 'Purple 500'],
          ['#06B6D4', 'Neon Cyan', 'Cyan 500'],
          ['#030512', 'Deep Background', 'Brand Black'],
          ['#E2E8F0', 'Text Primary', 'Slate 200'],
        ].map(([hex, name, variant]) => `
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg border border-white/10" style="background:${hex}"></div>
          <div>
            <div class="text-white text-sm font-medium">${hex}</div>
            <div class="text-slate-500 text-xs">${name}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Typography -->
    <div class="glass-card rounded-2xl p-6 mb-6">
      <div class="text-xs text-slate-500 mb-4 uppercase tracking-wider">Typography</div>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <div class="text-3xl font-bold text-white mb-1" style="font-family:'Space Grotesk',sans-serif">Space Grotesk</div>
          <div class="text-slate-400 text-sm">Display & Headings · Weights: 600, 700, 800</div>
          <div class="mt-2 text-slate-500 text-xs">Google Fonts: Space Grotesk</div>
        </div>
        <div>
          <div class="text-3xl text-white mb-1" style="font-family:'Inter',sans-serif">Inter</div>
          <div class="text-slate-400 text-sm">Body & UI Text · Weights: 400, 500, 600, 700</div>
          <div class="mt-2 text-slate-500 text-xs">Google Fonts: Inter</div>
        </div>
      </div>
    </div>

    <!-- Usage Guidelines -->
    <div class="glass p-5 rounded-xl">
      <h3 class="text-white font-semibold mb-3 flex items-center gap-2"><i class="fas fa-exclamation-triangle text-amber-400"></i> Usage Guidelines</h3>
      <div class="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <div class="text-emerald-400 font-medium mb-2">✓ Permitted</div>
          <ul class="text-slate-400 space-y-1">
            <li>Editorial coverage of AdNova AI</li>
            <li>Screenshots of public AdNova AI pages</li>
            <li>Reproducing approved quotes from leadership</li>
            <li>Using logo for factual reporting</li>
          </ul>
        </div>
        <div>
          <div class="text-rose-400 font-medium mb-2">✗ Not Permitted</div>
          <ul class="text-slate-400 space-y-1">
            <li>Modifying logo colors or proportions</li>
            <li>Using logo to imply endorsement</li>
            <li>Reproducing dashboard without permission</li>
            <li>Using brand assets in competing contexts</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-6 text-center">
      <a href="mailto:press@adnova.ai?subject=Brand Asset Request" class="btn-primary px-6 py-3 rounded-xl text-white font-semibold inline-flex items-center gap-2"><i class="fas fa-download"></i> Request Full Brand Package (.zip)</a>
      <p class="text-slate-500 text-xs mt-2">Full package includes SVG, PNG, WebP logos + guidelines PDF</p>
    </div>
  </div>
</section>

<!-- EXECUTIVES -->
<section class="py-12 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3"><i class="fas fa-users text-amber-400"></i> Executive Bios</h2>
    <div class="grid md:grid-cols-2 gap-5">
      ${executives.map(exec => `
      <div class="glass-card rounded-2xl p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">${exec.name.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <div class="text-white font-bold">${exec.name}</div>
            <div class="text-indigo-400 text-sm">${exec.role}</div>
          </div>
        </div>
        <p class="text-slate-400 text-sm leading-relaxed mb-3">${exec.bio}</p>
        <a href="mailto:press@adnova.ai?subject=Interview Request: ${encodeURIComponent(exec.name)}" class="text-indigo-400 hover:underline text-xs">Request interview →</a>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- PRESS RELEASES -->
<section class="py-12 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3"><i class="fas fa-bullhorn text-emerald-400"></i> Recent Press Releases</h2>
    <div class="space-y-3">
      ${pressReleases.map(pr => `
      <div class="glass-card rounded-xl p-5 flex items-center justify-between gap-4">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium">${pr.tag}</span>
            <span class="text-slate-500 text-xs">${pr.date}</span>
          </div>
          <h3 class="text-white font-medium text-sm leading-snug">${pr.title}</h3>
        </div>
        <a href="mailto:press@adnova.ai?subject=Press Release Request: ${encodeURIComponent(pr.date)}" class="text-indigo-400 hover:text-white text-xs whitespace-nowrap transition-colors flex items-center gap-1"><i class="fas fa-download text-xs"></i> PDF</a>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- AWARDS -->
<section class="py-12 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3"><i class="fas fa-trophy text-amber-400"></i> Awards & Recognition</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${awards.map(a => `
      <div class="glass p-4 rounded-xl flex gap-3">
        <i class="fas fa-medal text-amber-400 mt-0.5 flex-shrink-0"></i>
        <div>
          <div class="text-white font-medium text-sm">${a.award}</div>
          <div class="text-slate-400 text-xs">${a.org} · ${a.year}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- MEDIA CONTACTS -->
<section class="py-12 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3"><i class="fas fa-headset text-rose-400"></i> Media Contacts</h2>
    <div class="grid md:grid-cols-2 gap-5 mb-6">
      ${mediaContacts.map(mc => `
      <div class="glass-card rounded-2xl p-6">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-sm">${mc.name.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <div class="text-white font-semibold">${mc.name}</div>
            <div class="text-slate-400 text-xs">${mc.role}</div>
          </div>
        </div>
        <div class="text-slate-500 text-xs mb-1">Focus: ${mc.focus}</div>
        <a href="mailto:${mc.email}" class="text-indigo-400 hover:underline text-sm">${mc.email}</a>
      </div>`).join('')}
    </div>
    <div class="glass p-5 rounded-xl text-sm text-slate-400">
      <strong class="text-white">Response Time:</strong> We typically respond to press inquiries within 4 business hours. For urgent requests, include "URGENT" in the subject line.
    </div>
  </div>
</section>

<footer class="border-t border-white/10 py-8 text-center text-slate-500 text-sm">
  <p>© 2026 AdNova AI, Inc. · <a href="/about" class="hover:text-indigo-400 transition-colors">About</a> · <a href="/privacy" class="hover:text-indigo-400 transition-colors">Privacy</a> · <a href="/terms" class="hover:text-indigo-400 transition-colors">Terms</a></p>
</footer>

<style>
.pk-orb{position:fixed;border-radius:50%;pointer-events:none;z-index:-1}
.pk-orb-1{width:600px;height:600px;top:-200px;right:-200px;background:radial-gradient(circle,rgba(99,102,241,0.1),transparent 70%)}
.pk-orb-2{width:400px;height:400px;bottom:0;left:-100px;background:radial-gradient(circle,rgba(168,85,247,0.07),transparent 70%)}
</style>
</body>
</html>`
}
