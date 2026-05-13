import { publicHead } from '../lib/pageLayout'

export function renderCareers(): string {
  const head = publicHead({
    title: 'Careers — Join AdNova AI',
    description: 'Join the team building the future of AI-powered advertising. Open roles in Engineering, AI Research, Product, Sales, and Customer Success. Remote-friendly.',
    canonical: '/careers',
  })

  const jobs = [
    { title: 'Senior ML Engineer — Ad Bidding', dept: 'Engineering', loc: 'San Francisco / Remote', type: 'Full-time', level: 'Senior', desc: 'Build and scale our core bidding algorithms that manage $2B+ in annual ad spend across 9 platforms.' },
    { title: 'Staff Engineer — Data Infrastructure', dept: 'Engineering', loc: 'San Francisco / Remote', type: 'Full-time', level: 'Staff', desc: 'Design and own the data pipeline that processes 100M+ events per day powering our AI optimization engine.' },
    { title: 'Frontend Engineer — Dashboard', dept: 'Engineering', loc: 'Remote', type: 'Full-time', level: 'Senior', desc: 'Build beautiful, performant dashboard experiences for 2,400+ brands using React and TypeScript.' },
    { title: 'Research Scientist — LLM & Creative AI', dept: 'AI Research', loc: 'San Francisco', type: 'Full-time', level: 'Senior', desc: 'Push the frontier of AI-generated advertising creative. Work with LLMs, diffusion models, and video generation.' },
    { title: 'Product Manager — AI Engine', dept: 'Product', loc: 'San Francisco / Remote', type: 'Full-time', level: 'Senior', desc: 'Own the roadmap for our core AI optimization engine — the technology that drives 4.82× average ROAS for our customers.' },
    { title: 'Product Designer — Platform UX', dept: 'Design', loc: 'Remote', type: 'Full-time', level: 'Mid-Senior', desc: 'Design the interfaces that 2,400+ growth marketers use daily to manage their ad campaigns.' },
    { title: 'Enterprise Account Executive', dept: 'Sales', loc: 'New York / Remote', type: 'Full-time', level: 'Senior', desc: 'Close $500K-$2M+ enterprise deals with CMOs, VPs Marketing, and Director-level buyers at Fortune 500 companies.' },
    { title: 'Solutions Engineer — Pre-Sales', dept: 'Sales', loc: 'Remote', type: 'Full-time', level: 'Mid', desc: 'Technical advisor to our sales team, helping enterprise prospects understand and evaluate AdNova AI\'s capabilities.' },
    { title: 'Customer Success Manager — Strategic', dept: 'Customer Success', loc: 'Remote', type: 'Full-time', level: 'Senior', desc: 'Own outcomes for our 50 largest customers. Be the trusted advisor that turns good results into exceptional ones.' },
    { title: 'Head of EMEA Marketing', dept: 'Marketing', loc: 'London', type: 'Full-time', level: 'Director', desc: 'Build and lead our European marketing strategy. Manage localization, demand generation, and partnerships across EU markets.' },
    { title: 'Security Engineer', dept: 'Engineering', loc: 'Remote', type: 'Full-time', level: 'Senior', desc: 'Own our security posture across infrastructure, application, and data layers. Lead SOC 2 and GDPR compliance programs.' },
    { title: 'DevRel & API Ecosystem Lead', dept: 'Engineering', loc: 'Remote', type: 'Full-time', level: 'Senior', desc: 'Build our developer community and partner ecosystem. Create documentation, SDKs, and integrations that make AdNova easy to connect.' },
  ]

  const depts = [...new Set(jobs.map(j => j.dept))]

  const perks = [
    { icon: 'fa-laptop-house', title: 'Remote-First', desc: 'Work from anywhere. We have offices in SF, London, and Singapore, but 70% of the team is fully remote.' },
    { icon: 'fa-dollar-sign', title: 'Competitive Comp', desc: 'Top-of-market salary + meaningful equity. We believe everyone who builds AdNova should share in its success.' },
    { icon: 'fa-heartbeat', title: 'Full Health Benefits', desc: 'Comprehensive medical, dental, vision, and mental health coverage for you and your dependents.' },
    { icon: 'fa-rocket', title: '$5K Learning Budget', desc: 'Annual budget for courses, conferences, books, or any learning that helps you grow professionally.' },
    { icon: 'fa-umbrella-beach', title: 'Unlimited PTO', desc: 'We trust you to take the time you need to recharge. Minimum 15 days encouraged. Company-wide breaks in December.' },
    { icon: 'fa-baby', title: '16-Week Parental Leave', desc: 'Fully paid parental leave for all parents — birth, adoption, or fostering. No distinction.' },
    { icon: 'fa-chair', title: '$1K Home Office Setup', desc: 'One-time budget to create an ergonomic, productive home workspace.' },
    { icon: 'fa-dumbbell', title: 'Wellness Stipend', desc: '$100/month for gym membership, fitness apps, meditation, or any wellness activity that works for you.' },
  ]

  return `${head}
<body class="dark">
<div class="careers-orb careers-orb-1"></div>
<div class="careers-orb careers-orb-2"></div>

<!-- NAV -->
<nav class="nav-blur fixed top-0 left-0 right-0 z-50" style="height:64px">
  <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF4D00"/><stop offset="50%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg)"/><path d="M16 7 L9 23 L16 18 L23 23 Z" fill="white" opacity="0.95"/><path d="M16 7 L16 18 L23 23 Z" fill="white" opacity="0.5"/></svg>
      <span class="font-bold text-white text-lg" style="font-family:'Space Grotesk',sans-serif">AdNova AI</span>
    </a>
    <div class="hidden md:flex items-center gap-6">
      <a href="/about" class="text-slate-400 hover:text-white text-sm transition-colors">About</a>
      <a href="/blog" class="text-slate-400 hover:text-white text-sm transition-colors">Blog</a>
      <a href="/careers" class="text-white text-sm font-medium">Careers</a>
    </div>
    <div class="flex items-center gap-3">
      <a href="/login" class="text-slate-400 hover:text-white text-sm transition-colors">Sign In</a>
      <a href="/register" class="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold">Start Free Trial</a>
    </div>
  </div>
</nav>

<!-- HERO -->
<section class="pt-32 pb-16 px-6 text-center relative overflow-hidden">
  <div class="max-w-4xl mx-auto">
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-brand-300 border border-brand-500/20 mb-8">
      <span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
      ${jobs.length} Open Positions · Hiring Globally
    </div>
    <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style="font-family:'Space Grotesk',sans-serif">
      Build the future of<br>
      <span class="glow-text">AI advertising</span>
    </h1>
    <p class="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
      Join a team of adtech veterans, ML researchers, and product builders who are democratizing AI advertising for every business on earth.
    </p>
    <div class="flex flex-wrap justify-center gap-8 text-center">
      <div><div class="text-2xl font-bold text-white">90+</div><div class="text-slate-500 text-sm">Team Members</div></div>
      <div><div class="text-2xl font-bold text-white">12</div><div class="text-slate-500 text-sm">Countries</div></div>
      <div><div class="text-2xl font-bold text-white">70%</div><div class="text-slate-500 text-sm">Remote</div></div>
      <div><div class="text-2xl font-bold text-white">4.8★</div><div class="text-slate-500 text-sm">Glassdoor</div></div>
    </div>
  </div>
</section>

<!-- WHY JOIN -->
<section class="py-16 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">Why AdNova AI?</h2>
      <p class="text-slate-400 max-w-xl mx-auto">We're not just another adtech startup. We're building AI that genuinely helps businesses grow — and we're doing it as a team that actually enjoys working together.</p>
    </div>
    <div class="grid md:grid-cols-3 gap-6 mb-12">
      <div class="glass-card rounded-2xl p-6 text-center">
        <i class="fas fa-chart-line text-3xl text-slate-400 mb-3"></i>
        <h3 class="text-white font-bold text-lg mb-2">Massive Impact</h3>
        <p class="text-slate-400 text-sm">Every engineer on our team directly impacts $600M+ in annual ad revenue for our customers. Your work matters at scale.</p>
      </div>
      <div class="glass-card rounded-2xl p-6 text-center">
        <i class="fas fa-flask text-3xl text-brand-400 mb-3"></i>
        <h3 class="text-white font-bold text-lg mb-2">Cutting-Edge AI</h3>
        <p class="text-slate-400 text-sm">Work with the latest in reinforcement learning, LLMs, computer vision, and multi-armed bandits on real production systems.</p>
      </div>
      <div class="glass-card rounded-2xl p-6 text-center">
        <i class="fas fa-seedling text-3xl text-brand-400 mb-3"></i>
        <h3 class="text-white font-bold text-lg mb-2">Grow Fast</h3>
        <p class="text-slate-400 text-sm">We're growing 3× year-over-year. Exceptional performers advance quickly. We promote from within and build leadership from our own team.</p>
      </div>
    </div>
  </div>
</section>

<!-- PERKS -->
<section class="py-16 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">Benefits & Perks</h2>
      <p class="text-slate-400">We invest in the whole person — your career, health, and life outside work.</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      ${perks.map(p => `
      <div class="glass p-5 rounded-2xl">
        <div class="w-10 h-10 rounded-xl bg-slate-500/15 flex items-center justify-center mb-3">
          <i class="fas ${p.icon} text-slate-400"></i>
        </div>
        <h3 class="text-white font-semibold text-sm mb-1">${p.title}</h3>
        <p class="text-slate-500 text-xs leading-relaxed">${p.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- OPEN ROLES -->
<section class="py-16 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
      <div>
        <h2 class="text-3xl font-bold text-white mb-1" style="font-family:'Space Grotesk',sans-serif">Open Positions</h2>
        <p class="text-slate-400">${jobs.length} roles · Multiple locations & remote</p>
      </div>
      <!-- Dept filter -->
      <div class="flex flex-wrap gap-2">
        <button class="dept-btn active px-3 py-1.5 rounded-full text-xs font-medium" data-dept="all">All Depts</button>
        ${depts.map(d => `<button class="dept-btn px-3 py-1.5 rounded-full text-xs font-medium" data-dept="${d}">${d}</button>`).join('')}
      </div>
    </div>
    <div class="space-y-3" id="jobs-list">
      ${jobs.map(j => `
      <div class="glass-card rounded-2xl p-5 job-item" data-dept="${j.dept}">
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
              <h3 class="text-white font-semibold">${j.title}</h3>
              <span class="px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-400 text-xs">${j.level}</span>
            </div>
            <p class="text-slate-400 text-sm mb-2">${j.desc}</p>
            <div class="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
              <span><i class="fas fa-building mr-1"></i>${j.dept}</span>
              <span><i class="fas fa-map-marker-alt mr-1"></i>${j.loc}</span>
              <span><i class="fas fa-clock mr-1"></i>${j.type}</span>
            </div>
          </div>
          <a href="mailto:jobs@adnova.ai?subject=Application: ${encodeURIComponent(j.title)}" class="btn-primary px-4 py-2 rounded-lg text-white text-sm font-medium whitespace-nowrap flex-shrink-0">Apply Now</a>
        </div>
      </div>`).join('')}
    </div>

    <!-- Open Application -->
    <div class="mt-8 glass-card rounded-2xl p-6 border border-dashed border-white/15 text-center">
      <i class="fas fa-envelope text-2xl text-slate-400 mb-3"></i>
      <h3 class="text-white font-semibold mb-2">Don't see your role?</h3>
      <p class="text-slate-400 text-sm mb-4">We're always open to exceptional talent. Send us your story and tell us how you'd contribute.</p>
      <a href="mailto:jobs@adnova.ai" class="btn-ghost px-5 py-2 rounded-lg text-white text-sm font-medium inline-flex items-center gap-2"><i class="fas fa-paper-plane"></i> Send Open Application</a>
    </div>
  </div>
</section>

<!-- CULTURE -->
<section class="py-16 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto">
    <div class="glass-neo rounded-3xl p-8 md:p-12 text-center">
      <h2 class="text-3xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">Our Hiring Process</h2>
      <p class="text-slate-400 mb-10 max-w-xl mx-auto">We move fast and respect your time. Our process takes 2-3 weeks from application to offer.</p>
      <div class="flex flex-wrap justify-center gap-4 text-sm">
        ${[
          ['1', 'Application Review', '2-3 days', 'slate'],
          ['2', 'Recruiter Screen', '30 min', 'brand'],
          ['3', 'Technical / Skills Interview', '1 hour', 'slate'],
          ['4', 'Team Interview', '1.5 hours', 'brand'],
          ['5', 'Offer', '24-48 hours', 'brand'],
        ].map(([n, step, time, color]) => `
        <div class="glass p-4 rounded-xl min-w-32 text-center">
          <div class="w-8 h-8 rounded-full bg-${color}-500/20 text-${color}-400 font-bold mx-auto mb-2 flex items-center justify-center text-sm">${n}</div>
          <div class="text-white font-medium text-xs mb-1">${step}</div>
          <div class="text-slate-500 text-xs">${time}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<footer class="border-t border-white/10 py-8 text-center text-slate-500 text-sm">
  <p>© 2026 AdNova AI, Inc. · <a href="/about" class="hover:text-slate-400 transition-colors">About</a> · <a href="/privacy" class="hover:text-slate-400 transition-colors">Privacy</a> · <a href="/terms" class="hover:text-slate-400 transition-colors">Terms</a></p>
</footer>

<style>
.careers-orb{position:fixed;border-radius:50%;pointer-events:none;z-index:-1}
.careers-orb-1{width:600px;height:600px;top:-200px;right:-200px;background:radial-gradient(circle,rgba(99,102,241,0.1),transparent 70%)}
.careers-orb-2{width:400px;height:400px;bottom:0;left:-100px;background:radial-gradient(circle,rgba(255,77,0,0.07),transparent 70%)}
.dept-btn{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:#7A7A7A;cursor:pointer}
.dept-btn:hover,.dept-btn.active{background:rgba(99,102,241,0.2);border-color:rgba(99,102,241,0.4);color:#a5b4fc}
</style>
<script>
document.querySelectorAll('.dept-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.dept-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const dept = btn.dataset.dept;
    document.querySelectorAll('.job-item').forEach(item => {
      item.style.display = (dept === 'all' || item.dataset.dept === dept) ? '' : 'none';
    });
  });
});
</script>
</body>
</html>`
}
