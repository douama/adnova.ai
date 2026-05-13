import { publicHead } from '../lib/pageLayout'

export function renderAbout(): string {
  const head = publicHead({
    title: 'About AdNova AI — Autonomous Advertising Intelligence',
    description: 'Meet the team behind AdNova AI. Our mission: democratize AI-powered advertising for every business. Founded 2023, trusted by 2,412+ brands worldwide.',
    canonical: '/about',
  })

  const team = [
    { name: 'Marcus Chen', role: 'CEO & Co-Founder', bio: 'Former VP Engineering at Meta Ads. Built AI bidding systems managing $2B+ in annual ad spend. Stanford CS PhD.', avatar: 'MC', color: 'slate', twitter: '@marcuschen', linkedin: 'linkedin.com/in/marcuschen' },
    { name: 'Priya Nair', role: 'CTO & Co-Founder', bio: 'Ex-Google Brain researcher. Led ML infrastructure for Google Smart Campaigns. 12 patents in ad optimization. MIT PhD.', avatar: 'PN', color: 'brand', twitter: '@priyanair', linkedin: 'linkedin.com/in/priyanair' },
    { name: 'Sofia Rossi', role: 'CPO', bio: 'Previously Head of Product at HubSpot Marketing Hub. Scaled product from 0 to 10M users. Forbes 30 Under 30.', avatar: 'SR', color: 'brand', twitter: '@sofiarossi', linkedin: 'linkedin.com/in/sofiarossi' },
    { name: 'James Okafor', role: 'VP Sales', bio: '15 years in adtech sales. Built revenue teams at The Trade Desk and Criteo. $50M+ ARR closed in career.', avatar: 'JO', color: 'slate', twitter: '@jamesokafor', linkedin: 'linkedin.com/in/jamesokafor' },
    { name: 'Aisha Yamamoto', role: 'Head of AI Research', bio: 'PhD in Reinforcement Learning from Carnegie Mellon. Published 23 papers on multi-armed bandits and dynamic pricing.', avatar: 'AY', color: 'brand', twitter: '@aishayamamoto', linkedin: 'linkedin.com/in/aishayamamoto' },
    { name: 'Luca Ferretti', role: 'VP Engineering', bio: 'Former Staff Engineer at Stripe. Built distributed systems handling 10M+ API calls/second. Open source contributor.', avatar: 'LF', color: 'brand', twitter: '@lucaferretti', linkedin: 'linkedin.com/in/lucaferretti' },
  ]

  const values = [
    { icon: 'fa-brain', color: 'slate', title: 'AI-First', desc: 'Every decision, feature, and workflow is designed with artificial intelligence at its core. We don\'t just add AI — it\'s in our DNA.' },
    { icon: 'fa-handshake', color: 'brand', title: 'Customer Obsession', desc: 'Our customers\' growth is our growth. We measure our success by the ROAS improvements and time savings we deliver.' },
    { icon: 'fa-chart-line', color: 'slate', title: 'Radical Transparency', desc: 'We show exactly what our AI is doing and why. No black boxes. Full audit trails. You always know what\'s happening with your budget.' },
    { icon: 'fa-shield-alt', color: 'brand', title: 'Security & Privacy', desc: 'Advertising data is sensitive. We treat your data like it\'s our own — with enterprise-grade security and strict privacy controls.' },
    { icon: 'fa-globe', color: 'brand', title: 'Global Mindset', desc: 'Built for businesses everywhere. Our platform works across 9 platforms, 150+ countries, and 6 languages natively.' },
    { icon: 'fa-rocket', color: 'brand', title: 'Move Fast, Ship Quality', desc: 'We deploy improvements daily. But never at the expense of quality or stability — your campaigns are always running.' },
  ]

  const milestones = [
    { year: '2023 Q1', event: 'AdNova AI founded by Marcus Chen and Priya Nair in San Francisco.' },
    { year: '2023 Q2', event: 'Seed round of $4.2M led by Sequoia Capital. Team grows to 8.' },
    { year: '2023 Q3', event: 'Private beta launched with 50 brands. Average ROAS improvement: +67%.' },
    { year: '2023 Q4', event: 'Public launch. 500 customers in first month. Series A: $18M.' },
    { year: '2024 Q1', event: 'Reached 1,000 active brands. Launched TikTok & LinkedIn integrations.' },
    { year: '2024 Q2', event: 'AI Creative Studio launched. 1M creatives generated in first week.' },
    { year: '2024 Q3', event: 'Series B: $45M. Opened offices in London and Singapore.' },
    { year: '2024 Q4', event: 'SOC 2 Type II certified. Reached $10M ARR milestone.' },
    { year: '2025 Q1', event: 'Launched Enterprise tier. First Fortune 500 customer onboarded.' },
    { year: '2025 Q2', event: '2,000 brands milestone. Expanded to Amazon & Pinterest.' },
    { year: '2025 Q4', event: 'AdNova 2.0 launched with autonomous campaign management & UGC video AI.' },
    { year: '2026 Q1', event: '2,412+ active brands. $601K average revenue generated daily across platform.' },
  ]

  return `${head}
<body class="dark">
<div class="about-orb about-orb-1"></div>
<div class="about-orb about-orb-2"></div>
<div class="about-orb about-orb-3"></div>

<!-- NAV -->
<nav class="nav-blur fixed top-0 left-0 right-0 z-50" style="height:64px">
  <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF4D00"/><stop offset="50%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg)"/><path d="M16 7 L9 23 L16 18 L23 23 Z" fill="white" opacity="0.95"/><path d="M16 7 L16 18 L23 23 Z" fill="white" opacity="0.5"/></svg>
      <span class="font-bold text-white text-lg" style="font-family:'Space Grotesk',sans-serif">AdNova AI</span>
    </a>
    <div class="hidden md:flex items-center gap-6">
      <a href="/about" class="text-white text-sm font-medium">About</a>
      <a href="/customers" class="text-slate-400 hover:text-white text-sm transition-colors">Customers</a>
      <a href="/blog" class="text-slate-400 hover:text-white text-sm transition-colors">Blog</a>
      <a href="/careers" class="text-slate-400 hover:text-white text-sm transition-colors">Careers</a>
    </div>
    <div class="flex items-center gap-3">
      <a href="/login" class="text-slate-400 hover:text-white text-sm transition-colors">Sign In</a>
      <a href="/register" class="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold">Start Free Trial</a>
    </div>
  </div>
</nav>

<!-- HERO -->
<section class="pt-32 pb-20 px-6 text-center relative overflow-hidden">
  <div class="max-w-4xl mx-auto">
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-slate-300 border border-slate-500/20 mb-8">
      <i class="fas fa-building text-slate-400"></i>
      Founded 2023 · San Francisco, CA
    </div>
    <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style="font-family:'Space Grotesk',sans-serif">
      We're building the<br>
      <span class="glow-text">AI brain for advertising</span>
    </h1>
    <p class="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
      AdNova AI was born from a simple belief: every business deserves access to the same AI-powered advertising tools that the biggest brands use. We're making that a reality.
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="/register" class="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2"><i class="fas fa-rocket"></i> Start Free Trial</a>
      <a href="/careers" class="btn-ghost px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2"><i class="fas fa-users"></i> Join Our Team</a>
    </div>
  </div>
</section>

<!-- STATS -->
<section class="py-12 px-6 border-y border-white/5">
  <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
    ${[
      ['2,412+', 'Active Brands'],
      ['$601K', 'Revenue Generated Daily'],
      ['4.82×', 'Average ROAS'],
      ['9', 'Ad Platforms'],
    ].map(([val, label]) => `
    <div class="text-center">
      <div class="text-3xl md:text-4xl font-bold glow-text mb-1" style="font-family:'Space Grotesk',sans-serif">${val}</div>
      <div class="text-slate-400 text-sm">${label}</div>
    </div>`).join('')}
  </div>
</section>

<!-- MISSION -->
<section class="py-20 px-6">
  <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    <div>
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-brand-300 border border-brand-500/20 mb-6">
        <i class="fas fa-bullseye text-brand-400"></i>
        Our Mission
      </div>
      <h2 class="text-4xl font-bold text-white mb-6 leading-tight" style="font-family:'Space Grotesk',sans-serif">
        Democratize AI advertising intelligence for every business
      </h2>
      <p class="text-slate-400 leading-relaxed mb-6">
        Large brands spend millions on proprietary AI systems and armies of specialists to optimize their ads. Small and medium businesses are left behind, bleeding budget on manual campaigns that underperform.
      </p>
      <p class="text-slate-300 leading-relaxed mb-6">
        We built AdNova AI to level the playing field. Our platform brings enterprise-grade AI to businesses of all sizes — from the $1,000/month startup to the $100K/month enterprise — at a fraction of the cost of hiring an in-house team.
      </p>
      <div class="glass p-4 rounded-xl border border-slate-500/20">
        <p class="text-slate-300 italic text-sm">"The AI that was previously only available to companies with $10M+ marketing budgets is now accessible to any business willing to compete."</p>
        <p class="text-slate-500 text-xs mt-2">— Marcus Chen, CEO & Co-Founder</p>
      </div>
    </div>
    <div class="space-y-4">
      ${[
        ['fa-clock', 'slate', '18 hours/week saved', 'Our customers reclaim an average of 18 hours per week previously spent on manual campaign management.'],
        ['fa-chart-bar', 'slate', '+128% ROAS improvement', 'Customers see an average ROAS boost of 128% in the first 90 days — often measurable within 72 hours.'],
        ['fa-trash-alt', 'brand', '73% less wasted spend', 'AI eliminates the guesswork that causes budget waste on underperforming placements and audiences.'],
        ['fa-expand-arrows-alt', 'brand', '9 platforms, one dashboard', 'Manage your entire advertising ecosystem from a single, unified intelligence platform.'],
      ].map(([icon, color, title, desc]) => `
      <div class="glass-card rounded-2xl p-5 flex gap-4">
        <div class="w-10 h-10 rounded-xl bg-${color}-500/15 flex items-center justify-center flex-shrink-0">
          <i class="fas ${icon} text-${color}-400"></i>
        </div>
        <div>
          <div class="text-white font-semibold mb-1">${title}</div>
          <p class="text-slate-400 text-sm">${desc}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- VALUES -->
<section class="py-20 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-14">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-slate-300 border border-slate-500/20 mb-6">
        <i class="fas fa-heart text-slate-400"></i>
        Our Values
      </div>
      <h2 class="text-4xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">What we believe in</h2>
      <p class="text-slate-400 max-w-xl mx-auto">These aren't just words on a wall. They shape every product decision, every hire, and every interaction.</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${values.map(v => `
      <div class="glass-card rounded-2xl p-6">
        <div class="w-12 h-12 rounded-xl bg-${v.color}-500/15 flex items-center justify-center mb-4">
          <i class="fas ${v.icon} text-${v.color}-400 text-lg"></i>
        </div>
        <h3 class="text-white font-bold text-lg mb-2">${v.title}</h3>
        <p class="text-slate-400 text-sm leading-relaxed">${v.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- TEAM -->
<section class="py-20 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-14">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-brand-300 border border-brand-500/20 mb-6">
        <i class="fas fa-users text-brand-400"></i>
        The Team
      </div>
      <h2 class="text-4xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">Built by adtech veterans</h2>
      <p class="text-slate-400 max-w-xl mx-auto">Our team has spent decades at Meta, Google, Stripe, The Trade Desk, and Criteo — building exactly the systems we're now making available to everyone.</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${team.map(m => `
      <div class="glass-card rounded-2xl p-6 group">
        <div class="flex items-start gap-4 mb-4">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-${m.color}-500 to-brand-600 flex items-center justify-center flex-shrink-0">
            <span class="text-white font-bold text-lg">${m.avatar}</span>
          </div>
          <div>
            <div class="text-white font-bold">${m.name}</div>
            <div class="text-${m.color}-400 text-sm font-medium">${m.role}</div>
          </div>
        </div>
        <p class="text-slate-400 text-sm leading-relaxed mb-4">${m.bio}</p>
        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="text-xs text-slate-500">${m.twitter}</span>
        </div>
      </div>`).join('')}
    </div>
    <div class="text-center mt-10">
      <p class="text-slate-400 mb-4">Plus 80+ engineers, designers, data scientists, and customer success managers worldwide.</p>
      <a href="/careers" class="btn-ghost px-6 py-3 rounded-xl text-white font-semibold inline-flex items-center gap-2"><i class="fas fa-briefcase"></i> See Open Positions</a>
    </div>
  </div>
</section>

<!-- TIMELINE -->
<section class="py-20 px-6 border-t border-white/5">
  <div class="max-w-3xl mx-auto">
    <div class="text-center mb-14">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-brand-300 border border-brand-500/20 mb-6">
        <i class="fas fa-history text-brand-400"></i>
        Our Journey
      </div>
      <h2 class="text-4xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">From idea to industry leader</h2>
    </div>
    <div class="relative">
      <div class="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-slate-500/50 via-brand-500/30 to-transparent"></div>
      <div class="space-y-6">
        ${milestones.map((m, i) => `
        <div class="flex gap-6 group">
          <div class="w-14 flex-shrink-0 text-right">
            <span class="text-xs font-medium ${i < 4 ? 'text-slate-500' : i < 8 ? 'text-slate-400' : 'text-slate-400'} whitespace-nowrap">${m.year}</span>
          </div>
          <div class="w-4 h-4 rounded-full ${i < 4 ? 'bg-slate-600' : i < 8 ? 'bg-brand-500' : 'bg-slate-400'} border-2 border-slate-900 flex-shrink-0 mt-0.5 transition-transform group-hover:scale-125"></div>
          <p class="text-slate-300 text-sm leading-relaxed pb-4">${m.event}</p>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- INVESTORS -->
<section class="py-20 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto text-center">
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-brand-300 border border-brand-500/20 mb-6">
      <i class="fas fa-dollar-sign text-brand-400"></i>
      Backed By The Best
    </div>
    <h2 class="text-4xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">$67.2M raised to date</h2>
    <p class="text-slate-400 mb-12 max-w-xl mx-auto">Backed by world-class investors who share our vision of AI-democratized advertising.</p>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      ${[
        ['Sequoia Capital', 'Seed Lead', 'slate'],
        ['Andreessen Horowitz', 'Series A', 'brand'],
        ['Bessemer Venture', 'Series A', 'slate'],
        ['Tiger Global', 'Series B Lead', 'brand'],
      ].map(([name, round, color]) => `
      <div class="glass-card rounded-xl p-5 text-center">
        <div class="w-10 h-10 rounded-lg bg-${color}-500/15 flex items-center justify-center mx-auto mb-3">
          <i class="fas fa-building text-${color}-400"></i>
        </div>
        <div class="text-white font-semibold text-sm">${name}</div>
        <div class="text-slate-500 text-xs mt-1">${round}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-20 px-6 border-t border-white/5">
  <div class="max-w-3xl mx-auto text-center glass-neo rounded-3xl p-12">
    <h2 class="text-4xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">Ready to see what AI can do for your ads?</h2>
    <p class="text-slate-400 mb-8 text-lg">Join 2,412+ brands already growing with AdNova AI. No credit card required.</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="/register" class="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center gap-2"><i class="fas fa-rocket"></i> Start Free Trial</a>
      <a href="/customers" class="btn-ghost px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center gap-2"><i class="fas fa-star"></i> See Customer Stories</a>
    </div>
    <p class="text-slate-500 text-sm mt-4">14-day free trial · No credit card · Cancel anytime</p>
  </div>
</section>

<!-- FOOTER -->
<footer class="border-t border-white/10 py-8 text-center text-slate-500 text-sm">
  <p>© 2026 AdNova AI, Inc. All rights reserved. · <a href="/privacy" class="hover:text-slate-400 transition-colors">Privacy</a> · <a href="/terms" class="hover:text-slate-400 transition-colors">Terms</a> · <a href="/press-kit" class="hover:text-slate-400 transition-colors">Press Kit</a></p>
</footer>

<style>
.about-orb{position:fixed;border-radius:50%;pointer-events:none;z-index:-1}
.about-orb-1{width:700px;height:700px;top:-250px;right:-200px;background:radial-gradient(circle,rgba(99,102,241,0.1),transparent 70%)}
.about-orb-2{width:500px;height:500px;bottom:-100px;left:-150px;background:radial-gradient(circle,rgba(168,85,247,0.08),transparent 70%)}
.about-orb-3{width:300px;height:300px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(6,182,212,0.04),transparent 70%)}
</style>
</body>
</html>`
}
