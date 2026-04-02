import { publicHead } from '../lib/pageLayout'

export function renderCustomers(): string {
  const head = publicHead({
    title: 'Customer Stories — AdNova AI',
    description: 'See how 2,412+ brands use AdNova AI to achieve 4.82x average ROAS. Real results from real customers across e-commerce, SaaS, D2C, and retail.',
    canonical: '/customers',
  })

  const caseStudies = [
    {
      company: 'BrightLeaf Organics',
      industry: 'E-Commerce · Health & Wellness',
      logo: 'BL',
      color: 'emerald',
      result: '+187% ROAS',
      metric2: '3.2× → 9.1×',
      metric2label: 'ROAS (6 months)',
      metric3: '$280K',
      metric3label: 'Monthly Revenue Lift',
      quote: 'We went from struggling with Facebook ads to having AdNova\'s AI manage $45K/month across 6 platforms. Our ROAS tripled in 3 months. It\'s like having a team of 10 specialists working 24/7.',
      author: 'Rachel Kim',
      authorRole: 'Head of Growth',
      authorPhoto: 'https://sspark.genspark.ai/cfimages?u1=Hqi%2FSZRsgMbWQ%2BUtzeILNT4w0T%2FwcjUyW1k98CMI5%2BtLiDneLrLuE8o5SodVgKuTFIyzyLiXm4FvI38x%2B05vCJbQXEDytO7LpmjAp8qPSYBPwJtSWL%2B7AF0QHXYpMVLkEQn%2B4g9yUi3R8JwEThL8rw%3D%3D&u2=RTWQkdbVNoA3E0hp&width=2000',
      platforms: ['Facebook', 'Instagram', 'Google', 'Pinterest'],
      challenge: 'BrightLeaf was spending 25 hours/week managing campaigns manually with inconsistent results. High customer acquisition costs were limiting growth.',
      solution: 'Deployed AdNova AI across all platforms, enabling autonomous bid management and creative rotation. AI identified TikTok as an underutilized channel.',
      results: ['ROAS improved from 3.2× to 9.1× in 6 months', 'CAC reduced by 62%', '$280K additional monthly revenue', '18 hours/week saved on manual work'],
    },
    {
      company: 'NexaFlow SaaS',
      industry: 'B2B SaaS · Project Management',
      logo: 'NF',
      color: 'indigo',
      result: '+241% Pipeline',
      metric2: '$12 → $4.80',
      metric2label: 'Cost per Trial Signup',
      metric3: '6.7×',
      metric3label: 'Google ROAS',
      quote: 'AdNova AI transformed our B2B paid search strategy. The AI discovered intent signals we never would have found manually, cutting our cost per trial by 60% while tripling pipeline volume.',
      author: 'David Osei',
      authorRole: 'VP Marketing',
      authorPhoto: 'https://sspark.genspark.ai/cfimages?u1=bZUTvtgumvMsNoPSa7UGz0pd12t7rDoyoFrqkPLl9zL%2B%2BJ6RK1nHgATkuPQpYnYVL9qa6NVt%2B6c8eNzbkNhrkMHLE4UaScF2z9QJu%2FZHkY6pO0CuSBjTgl%2F8ESCOe0Nt&u2=fSpXzKjiigJ2uSbm&width=2048',
      platforms: ['Google', 'LinkedIn', 'Facebook'],
      challenge: 'High competition in B2B SaaS space drove CPCs up. Manual bidding couldn\'t keep pace with competitor bidding changes in real time.',
      solution: 'AI autonomous bidding with competitive signal detection. LinkedIn audience builder found perfect lookalike audiences from their top 20% customers.',
      results: ['Cost per trial signup: $12 → $4.80', 'Pipeline volume: +241%', 'LinkedIn ROAS: 4.2×', 'Trial-to-paid conversion rate: +18%'],
    },
    {
      company: 'Maison Éclat',
      industry: 'Fashion · Luxury D2C',
      logo: 'ME',
      color: 'rose',
      result: '11.4× ROAS',
      metric2: '€1.2M',
      metric2label: 'Q4 Revenue (AI-Driven)',
      metric3: '-71%',
      metric3label: 'Waste Reduction',
      quote: 'As a French luxury brand, targeting precision is everything. AdNova\'s AI understood the nuance — premium audiences, the right creative at the right moment. Q4 was our best quarter ever.',
      author: 'Isabelle Fontaine',
      authorRole: 'Digital Director',
      authorPhoto: 'https://sspark.genspark.ai/cfimages?u1=c5iQ%2FWl%2FefjHAQT%2Fi3dAkhhLEdkl7o%2B%2BtNoOTJgn0S4eH2UlfLkJRTahqhHK%2FZQUm3eI0xk4tuijaZNMEfSVCzC6uQeo0rLpBB7KE2XHGn3ZxrVC6ZEanIR44ysjrYua3RleTy5XmkgjeJfV0wCOYgmB3mwoA3skGnhKT2qr46ZmP835VSrm8Pk0NbjTay7pZyduXu%2BB5Pqopo1sZk6nI9eRynmUOmhEJSrJTGBlR8eycckq4O1Eg3zkX8vLl8iT&u2=5gvo1MoGlEcI0EXA&width=383',
      platforms: ['Instagram', 'Facebook', 'Pinterest', 'TikTok'],
      challenge: 'Luxury fashion requires surgical targeting. Broad campaigns were diluting the brand and wasting spend on non-luxury audiences.',
      solution: 'AI-built lookalike audiences from highest-LTV customers. Creative rotation optimized for luxury aesthetic. Excluded price-sensitive segments automatically.',
      results: ['ROAS reached 11.4× in peak season', '€1.2M Q4 revenue from paid channels', '71% reduction in wasted spend', 'Brand safety maintained — 0 off-brand placements'],
    },
    {
      company: 'SportZone Retail',
      industry: 'Retail · Sports Equipment',
      logo: 'SZ',
      color: 'cyan',
      result: '+312% Online Revenue',
      metric2: '8.9×',
      metric2label: 'Blended ROAS',
      metric3: '$0→$85K',
      metric3label: 'Monthly Ad Spend Scaled',
      quote: 'We had zero online advertising experience. AdNova AI handled everything — from campaign structure to creative testing. 6 months later, online is now 40% of our total revenue.',
      author: 'Mike Torrance',
      authorRole: 'CEO',
      authorPhoto: 'https://sspark.genspark.ai/cfimages?u1=VuV0ipWF83Hy2eLYc6CjCoxSy22W5vk0IXOrhz0LpDuICX0aOyV1XdW7rB8jOFTlCS1pmFyF%2F%2Brt7lacg0Cy7uKts0XizaoZ4EAMA1HhSPhWQluSfwp7JhK2Sx%2FSY%2FJu&u2=dFe7CSIFgEPDx7EG&width=2048',
      platforms: ['Google', 'Facebook', 'Instagram', 'Amazon'],
      challenge: 'Traditional brick-and-mortar retailer with no digital advertising expertise. Needed to build online revenue stream without dedicated marketing team.',
      solution: 'Full-funnel AI campaign build-out. AI handled prospecting and retargeting automatically. Product feed optimization for Shopping campaigns on Google and Amazon.',
      results: ['Online revenue: 0% → 40% of total', 'Ad spend scaled to $85K/month profitably', 'Blended ROAS: 8.9×', 'Zero marketing hires needed'],
    },
    {
      company: 'EduPath Learning',
      industry: 'EdTech · Online Education',
      logo: 'EP',
      color: 'amber',
      result: '-58% CPA',
      metric2: '4.1× → 7.8×',
      metric2label: 'ROAS Improvement',
      metric3: '2,800',
      metric3label: 'Monthly New Students',
      quote: 'Education is a competitive space. AdNova AI\'s real-time optimization keeps us profitable even as CPCs fluctuate wildly. We scaled from 800 to 2,800 new students/month with the same budget.',
      author: 'Sarah Chen',
      authorRole: 'Growth Lead',
      authorPhoto: 'https://sspark.genspark.ai/cfimages?u1=zZ%2FIUSj6OTpX2OXvw0TiuF8%2F%2BTN3tbu%2B%2FRFMIRz1exSPk2CH2pK18q6jObMtNfr0HKMG2pyK0gbo%2FPXDLUn%2BZzOXLWQXoLhSPcKjE3aPgqLWvjB1mwEzXJXP3njClw%3D%3D&u2=1efxJo7Az702%2Fb7V&width=1920',
      platforms: ['Facebook', 'Google', 'TikTok', 'Snapchat'],
      challenge: 'CPC volatility in education made manual bidding unsustainable. Creative fatigue was a constant issue — needing fresh ads weekly.',
      solution: 'AI Creative Studio generated 50 variations weekly. Automated A/B testing identified winners in 48 hours. Budget shifted automatically to top performers.',
      results: ['CPA reduced by 58%', 'Monthly new students: 800 → 2,800', 'Creative fatigue eliminated (new ads generated automatically)', 'TikTok identified as #1 channel (was previously unused)'],
    },
    {
      company: 'HealthFirst Clinics',
      industry: 'Healthcare · Local Services',
      logo: 'HF',
      color: 'purple',
      result: '+198% Appointments',
      metric2: '$42',
      metric2label: 'Cost per Booked Appointment',
      metric3: '23 locations',
      metric3label: 'Managed Simultaneously',
      quote: 'Managing 23 clinic locations across Google ads used to take our team 30 hours/week. AdNova AI does it in the background. Appointment volume doubled while we actually reduced our ad spend.',
      author: 'Dr. James Park',
      authorRole: 'Marketing Director',
      authorPhoto: 'https://sspark.genspark.ai/cfimages?u1=4EQLd1LXOFwFFKCB%2FNGndiBd42TtyMCDoS6WJMP4VFYKxmGVC1RGpNz1w%2BRNfi78vTc%2BAgfuTTw0GwK4zDo9aeCFZq76bjl25BDSab6aeTBjW%2FnFreiIh%2ByirpYopf23XyA4VZTJIPqPuz04Tyn9h0xj%2Fn0fBKKeZFNid4rqxjtBTEZlIaDj&u2=jAieaqTihMIRdAnv&width=1707',
      platforms: ['Google', 'Facebook'],
      challenge: 'Healthcare advertising requires compliance and local targeting precision. Managing campaigns for 23 locations manually was consuming the entire marketing team.',
      solution: 'AI built location-specific campaigns for all 23 clinics. Automated bid adjustments based on appointment capacity and local competition. HIPAA-compliant creative.',
      results: ['Appointment bookings: +198%', 'Cost per appointment: $42 (down from $127)', 'Marketing team hours saved: 28/week', 'All 23 locations managed autonomously'],
    },
  ]

  const testimonials = [
    {
      name: 'Alex Turner', role: 'CMO', company: 'Volta Electric',
      text: 'The AI found a TikTok audience we never would have discovered manually. That single insight drove 40% of our Q3 revenue.',
      roas: '6.2×', avatar: 'AT',
      photo: 'https://sspark.genspark.ai/cfimages?u1=NsKzGYFrgQ6MANpA6rKStvfubO1RHS5WlmKKcc7yrERzQI6%2BE36TqjGMywzn7WlsQnCQmFCvccF3TXwrvU6MezYWXZwOn3DIe35b3x8GU2pFeRVZePwpfIQNLluQlly4&u2=YePKoutZxOZ2HjQr&width=768'
    },
    {
      name: 'Maria Santos', role: 'Founder', company: 'Botanika',
      text: 'Finally, I can focus on building my brand instead of obsessing over bid adjustments. AdNova handles everything perfectly.',
      roas: '8.1×', avatar: 'MS',
      photo: 'https://sspark.genspark.ai/cfimages?u1=6mOxsm26vGwoZQfVsBOVBS4pWOn5dQOrx%2BpLPWGbDZnrGIg%2BVk7zWzlEUu9XnleQDGxDp2VwLKj7WGe8qPET0Krnji3n6rfOGBhmG35qevAxP0eKnXKd9aZQ6jdJiKmvaPHDOV6%2FVTk%3D&u2=9HwoXI2cfybKYzz2&width=2560'
    },
    {
      name: 'Thomas Weber', role: 'Head of PPC', company: 'AutoParts Pro',
      text: 'We run 300+ campaigns. Before AdNova, we had a team of 5 managing this. Now 2 people oversee everything and results are 3× better.',
      roas: '5.4×', avatar: 'TW',
      photo: 'https://sspark.genspark.ai/cfimages?u1=hL1ickNS%2FpdC8%2FbmNC2SD6yUquQiMfSFHNX5pRcea%2Bxz0YHAxHa7mtCU8UqpKGPgg7LJzRKDXgZmwS6r9MBCpb4DqOirHVFueW2S4G71XSNHiSeO4WPQBEIl3U7DXqum&u2=xfnlEoDATrntVP%2Fu&width=768'
    },
    {
      name: 'Jennifer Liu', role: 'Growth Manager', company: 'CloudBase App',
      text: 'The lookalike audience builder is scary good. It identified customer patterns our data team couldn\'t find in months.',
      roas: '4.9×', avatar: 'JL',
      photo: 'https://sspark.genspark.ai/cfimages?u1=yVR%2FncT3vuhS7j8dYaExtk24SUVWQ3EAULyxU%2FgC51lo7dt84WwI%2BZD%2FE%2FpJKwChOSVlBKoqZHFsMnUXmFPWEYC0eHaaXIgzlmP09Bb4DhyquGIeV%2FMZ1zIFCJmJM%2FLIHLJM4wjl9q4Qo7%2B5QC3lhQtsskFa%2B2djAYBRbk%2B%2Fi0zavlLqe0Y2Be%2B6Xx1202k02cBqo60clMSHE2vfpzG5fe2WyQG2cPagSGOzH%2F0Zn35GEK0UuelFjmPz1YcbRkXgHmRZjlXX%2FPsu0SIa%2BLaycHOoCiyeud6XR2fu1CV9iK2SLvr5Lyauhlsi8pmdKH3BgilEogk2jEJqOjBLFsfK9PnPm7Dv&u2=BXrCQB1uFNi5XH28&width=1129'
    },
    {
      name: 'Raj Patel', role: 'CEO', company: 'SpiceCraft Foods',
      text: 'From ₹5L to ₹50L monthly revenue in 8 months. The AI handles Indian market nuances incredibly well across all platforms.',
      roas: '7.3×', avatar: 'RP',
      photo: 'https://sspark.genspark.ai/cfimages?u1=UcnG92rMDyyENTsdQbxYgX7QxJAKCxjp00h%2FW39IQbG2e0GlQ0rbFxpoXvp2glvWQvT7LhwUeG13wVaE3NESDQ0O%2FsBAwJki7lx7G8FGKk%2FPr7jUrGLO9qn9Qk%2BI1LjW&u2=1sBDm5%2B7%2FdoTCvap&width=2048'
    },
    {
      name: 'Emma Nielsen', role: 'Digital Director', company: 'Scandi Home',
      text: 'We tested 3 other AI ad tools. None came close to AdNova\'s autonomous decision-making quality. The 72-hour ROAS improvement claim is real.',
      roas: '9.8×', avatar: 'EN',
      photo: 'https://sspark.genspark.ai/cfimages?u1=bjVlNl7La3dm7Dt19qBjt78dwKYpNR5PjSSrJOvmwEZJbn0XNrsG5n%2B%2BcyOLN9U1ZWFiMscCy9ge010uCmefZaZPg1qGBCMgh58aT9BoagKIYwxK8CGWHxxmdgBce3GZJY3sYU%2FO5BGMdJ2Or2rN70JA1UYEYCQX0D650kEXeYXV4A7Era7lajGLN8e0D70qHOwMxApheDrFVuopihzN%2FidiVGWB5IPNPsJrlQwK0miCVl%2BetrBo419Mdvw9QlsOooass%2BoCcZNNjtrv%2FGt9RAX1%2BAkS6tfmBH8vRg%3D%3D&u2=oU11jZl5GXuyaEQM&width=2000'
    },
  ]

  return `${head}
<body class="dark">
<div class="cust-orb cust-orb-1"></div>
<div class="cust-orb cust-orb-2"></div>

<!-- NAV -->
<nav class="nav-blur fixed top-0 left-0 right-0 z-50" style="height:64px">
  <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6366f1"/><stop offset="50%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#lg)"/><path d="M16 7 L9 23 L16 18 L23 23 Z" fill="white" opacity="0.95"/><path d="M16 7 L16 18 L23 23 Z" fill="white" opacity="0.5"/></svg>
      <span class="font-bold text-white text-lg" style="font-family:'Space Grotesk',sans-serif">AdNova AI</span>
    </a>
    <div class="hidden md:flex items-center gap-6">
      <a href="/about" class="text-slate-400 hover:text-white text-sm transition-colors">About</a>
      <a href="/customers" class="text-white text-sm font-medium">Customers</a>
      <a href="/blog" class="text-slate-400 hover:text-white text-sm transition-colors">Blog</a>
    </div>
    <div class="flex items-center gap-3">
      <a href="/login" class="text-slate-400 hover:text-white text-sm transition-colors">Sign In</a>
      <a href="/register" class="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold">Start Free Trial</a>
    </div>
  </div>
</nav>

<!-- HERO -->
<section class="pt-32 pb-16 px-6 text-center">
  <div class="max-w-4xl mx-auto">
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-amber-300 border border-amber-500/20 mb-8">
      <i class="fas fa-star text-amber-400"></i>
      4.9/5 stars · 847 reviews · SOC 2 Certified
    </div>
    <h1 class="text-5xl md:text-6xl font-bold text-white mb-6" style="font-family:'Space Grotesk',sans-serif">
      Real results from<br><span class="glow-text">real customers</span>
    </h1>
    <p class="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">2,412+ brands trust AdNova AI to grow their revenue autonomously. Here's how they're doing it.</p>
    <div class="flex flex-wrap justify-center gap-6 text-center">
      ${[
        ['4.82×', 'Average ROAS'],
        ['+128%', 'Avg ROAS Improvement'],
        ['18h', 'Saved per Week'],
        ['72h', 'To First ROAS Boost'],
      ].map(([v, l]) => `<div><div class="text-2xl font-bold glow-text">${v}</div><div class="text-slate-500 text-xs">${l}</div></div>`).join('')}
    </div>
  </div>
</section>

<!-- CASE STUDIES -->
<section class="py-16 px-6">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-white mb-10 text-center" style="font-family:'Space Grotesk',sans-serif">Featured Case Studies</h2>
    <div class="space-y-8">
      ${caseStudies.map((cs, i) => `
      <div class="glass-card rounded-3xl p-8 ${i % 2 === 1 ? 'border-indigo-500/20' : ''}">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Left: Company Info -->
          <div class="md:col-span-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-${cs.color}-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">${cs.logo}</div>
              <div>
                <div class="text-white font-bold text-lg">${cs.company}</div>
                <div class="text-slate-500 text-xs">${cs.industry}</div>
              </div>
            </div>
            <!-- Key Metrics -->
            <div class="space-y-3 mb-6">
              <div class="glass rounded-xl p-3 text-center">
                <div class="text-2xl font-bold text-${cs.color}-400 glow-text-2">${cs.result}</div>
                <div class="text-xs text-slate-500">Primary Result</div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="glass rounded-xl p-2.5 text-center">
                  <div class="text-sm font-bold text-white">${cs.metric2}</div>
                  <div class="text-xs text-slate-500 leading-tight">${cs.metric2label}</div>
                </div>
                <div class="glass rounded-xl p-2.5 text-center">
                  <div class="text-sm font-bold text-white">${cs.metric3}</div>
                  <div class="text-xs text-slate-500 leading-tight">${cs.metric3label}</div>
                </div>
              </div>
            </div>
            <!-- Platforms -->
            <div class="flex flex-wrap gap-1.5">
              ${cs.platforms.map(p => `<span class="px-2 py-0.5 rounded-full bg-white/5 text-slate-400 text-xs border border-white/10">${p}</span>`).join('')}
            </div>
          </div>
          <!-- Right: Story -->
          <div class="md:col-span-2 space-y-5">
            <!-- Quote -->
            <blockquote class="glass p-5 rounded-2xl border-l-4 border-${cs.color}-500">
              <p class="text-slate-200 italic leading-relaxed mb-3">"${cs.quote}"</p>
              <div class="flex items-center gap-2">
                <div class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-${cs.color}-500/30">
                  ${(cs as any).authorPhoto ? `<img src="${(cs as any).authorPhoto}" alt="${cs.author}" class="w-full h-full object-cover" loading="lazy" onerror="this.style.display='none';this.parentElement.innerHTML='<div class=\'flex items-center justify-center w-full h-full text-xs font-bold text-${cs.color}-400\'>${cs.author.split(' ').map((n: string) => n[0]).join('')}</div>'">` : `<div class="flex items-center justify-center w-full h-full text-xs font-bold text-${cs.color}-400">${cs.author.split(' ').map((n: string) => n[0]).join('')}</div>`}
                </div>
                <div><div class="text-white text-sm font-medium">${cs.author}</div><div class="text-slate-500 text-xs">${cs.authorRole}, ${cs.company}</div></div>
              </div>
            </blockquote>
            <!-- Challenge / Solution / Results -->
            <div class="grid md:grid-cols-3 gap-4">
              <div>
                <div class="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2"><i class="fas fa-exclamation-triangle mr-1"></i>Challenge</div>
                <p class="text-slate-400 text-sm">${cs.challenge}</p>
              </div>
              <div>
                <div class="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2"><i class="fas fa-brain mr-1"></i>Solution</div>
                <p class="text-slate-400 text-sm">${cs.solution}</p>
              </div>
              <div>
                <div class="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2"><i class="fas fa-chart-line mr-1"></i>Results</div>
                <ul class="text-slate-400 text-sm space-y-1">
                  ${cs.results.map(r => `<li class="flex gap-1.5"><i class="fas fa-check text-emerald-500 mt-0.5 text-xs flex-shrink-0"></i>${r}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- TESTIMONIALS GRID -->
<section class="py-16 px-6 border-t border-white/5">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">What our customers say</h2>
      <div class="flex items-center justify-center gap-1 mb-2">
        ${Array(5).fill('<i class="fas fa-star text-amber-400 text-lg"></i>').join('')}
      </div>
      <p class="text-slate-400">4.9/5 average · 847 verified reviews</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${testimonials.map(t => `
      <div class="glass-card rounded-2xl p-5 flex flex-col">
        <div class="flex items-center gap-1 mb-3">
          ${Array(5).fill('<i class="fas fa-star text-amber-400 text-xs"></i>').join('')}
          <span class="ml-auto text-indigo-400 font-bold text-sm">${t.roas} ROAS</span>
        </div>
        <p class="text-slate-300 text-sm leading-relaxed mb-4 flex-grow">"${t.text}"</p>
        <div class="flex items-center gap-3 pt-3 border-t border-white/5">
          <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600">
            ${(t as any).photo ? `<img src="${(t as any).photo}" alt="${t.name}" class="w-full h-full object-cover" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('flex','items-center','justify-center');this.parentElement.innerHTML='<span class=\'text-white text-xs font-bold\'>${t.avatar}</span>'">` : `<div class="w-full h-full flex items-center justify-center text-white text-xs font-bold">${t.avatar}</div>`}
          </div>
          <div>
            <div class="text-white font-medium text-sm">${t.name}</div>
            <div class="text-slate-500 text-xs">${t.role}, ${t.company}</div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- INDUSTRY COVERAGE -->
<section class="py-16 px-6 border-t border-white/5">
  <div class="max-w-5xl mx-auto text-center">
    <h2 class="text-3xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">Works across every industry</h2>
    <p class="text-slate-400 mb-10">AdNova AI has been deployed in 40+ industries. Our AI adapts to your specific market dynamics.</p>
    <div class="flex flex-wrap justify-center gap-3">
      ${[
        ['fa-shopping-cart', 'E-Commerce'],['fa-laptop-code', 'SaaS'],['fa-tshirt', 'Fashion'],
        ['fa-heartbeat', 'Healthcare'],['fa-graduation-cap', 'EdTech'],['fa-home', 'Real Estate'],
        ['fa-utensils', 'Food & Beverage'],['fa-dumbbell', 'Fitness'],['fa-car', 'Automotive'],
        ['fa-plane', 'Travel'],['fa-coins', 'FinTech'],['fa-gamepad', 'Gaming'],
        ['fa-building', 'B2B SaaS'],['fa-paint-brush', 'Beauty'],['fa-tools', 'Home Services'],
      ].map(([icon, label]) => `
      <div class="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm text-slate-300 border border-white/10 hover:border-indigo-500/30 transition-colors">
        <i class="fas ${icon} text-indigo-400 text-xs"></i>${label}
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-20 px-6">
  <div class="max-w-3xl mx-auto text-center glass-neo rounded-3xl p-12">
    <h2 class="text-4xl font-bold text-white mb-4" style="font-family:'Space Grotesk',sans-serif">Your results could be next</h2>
    <p class="text-slate-400 mb-8 text-lg">Most customers see measurable ROAS improvement within 72 hours. Start your free trial today.</p>
    <a href="/register" class="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center gap-2"><i class="fas fa-rocket"></i> Start Free Trial — No Credit Card</a>
    <p class="text-slate-500 text-sm mt-4">14-day free trial · Cancel anytime · Setup takes 5 minutes</p>
  </div>
</section>

<footer class="border-t border-white/10 py-8 text-center text-slate-500 text-sm">
  <p>© 2026 AdNova AI, Inc. · <a href="/privacy" class="hover:text-indigo-400 transition-colors">Privacy</a> · <a href="/terms" class="hover:text-indigo-400 transition-colors">Terms</a> · <a href="/about" class="hover:text-indigo-400 transition-colors">About</a></p>
</footer>

<style>
.cust-orb{position:fixed;border-radius:50%;pointer-events:none;z-index:-1}
.cust-orb-1{width:600px;height:600px;top:-150px;right:-150px;background:radial-gradient(circle,rgba(99,102,241,0.1),transparent 70%)}
.cust-orb-2{width:400px;height:400px;bottom:0;left:-100px;background:radial-gradient(circle,rgba(168,85,247,0.07),transparent 70%)}
</style>
</body>
</html>`
}
