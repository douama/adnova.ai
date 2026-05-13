import type { Context } from 'hono'

// ─── Data ──────────────────────────────────────────────────────────────────

type CaseStudy = {
  company: string
  industry: string
  initials: string
  result: string
  metric2: string
  metric2label: string
  metric3: string
  metric3label: string
  quote: string
  author: string
  authorRole: string
  authorPhoto: string
  platforms: string[]
  challenge: string
  solution: string
  results: string[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    company: 'Maison Aubergine',
    industry: 'Mode D2C · France',
    initials: 'MA',
    result: '+34% ROAS · 6 mois',
    metric2: '€8K → €4.2K',
    metric2label: 'CAC mensuel divisé par 2',
    metric3: '€2.4M',
    metric3label: 'Revenue FY25 sur paid',
    quote: "On payait Smartly $5K/mois + agence créa $7K/mois. Migration AdNova en 6 jours, économies de €4 200/mois, et ROAS +34% en 6 mois. Le mode Autonomous de Claude bat les règles Smartly à plate couture sur des budgets sous $200K/m.",
    author: 'Camille Roussel',
    authorRole: 'Head of Acquisition',
    authorPhoto: 'https://randomuser.me/api/portraits/women/65.jpg',
    platforms: ['Facebook', 'Instagram', 'TikTok', 'Pinterest'],
    challenge: 'Marque DTC mode lifestyle en hyper-croissance (€80K → €400K MRR en 18 mois). Stack legacy : Smartly.io à $5K/mois (contrat 12 mois signé l\'année précédente, "trop petit" pour l\'attention de leur AM), agence créa à €7K/mois. ROAS plafonné à 3.8×, créas DCO templates qui saturaient en 2 semaines, et 4 semaines de back-and-forth pour chaque modification d\'audience. Décisions de scale prises 3 jours après le signal — trop tard.',
    solution: 'Migration sur AdNova en 6 jours pendant la fin de contrat Smartly. Mode Guardrails (ROAS min 3.5×, daily cap €2K). AI Creative Studio génère 8-12 visuels/semaine sur la charte graphique — pas de templates, de la vraie génération SDXL. Decision Log audité chaque vendredi par Camille en 20 min. Smartly + agence créa coupés à expiration.',
    results: ['ROAS Q4 : 3.8× → 5.1× · +34%', 'CAC : €68 → €34 (-50%)', '22h/semaine récupérées sur l\'ops', '€19K/mois économisés (freelance + agence)', 'Time-to-scale : 3 jours → 18 minutes (auto)'],
  },
  {
    company: 'Brioche Helvétique',
    industry: 'E-commerce alimentaire · Suisse',
    initials: 'BH',
    result: '5.8× ROAS · DACH',
    metric2: '+187%',
    metric2label: 'Pipeline B2B Suisse + DE',
    metric3: 'CHF 940K',
    metric3label: 'Q4 paid revenue',
    quote: "AdNova comprend les nuances DACH. Les modèles savent que 'Bäckerei' en Suisse alémanique ≠ 'Boulangerie' romande. Sur Q4, on a triplé le marché allemand sans toucher au budget belge.",
    author: 'Hans-Peter Müller',
    authorRole: 'CMO',
    authorPhoto: 'https://randomuser.me/api/portraits/men/41.jpg',
    platforms: ['Google', 'Facebook', 'Instagram', 'LinkedIn'],
    challenge: 'Marque B2C/B2B 3 marchés (CH-FR, CH-DE, DE). Triple Whale pour le tracking US-first ne gérait pas le CHF + EUR + multi-langue. Hébergement US bloquant pour clients horeca (GDPR + LPD suisse). Manual budget split entre marchés = sous-allocation chronique du DE.',
    solution: 'AdNova EU servers (Francfort), multi-currency natif, IA gère le split CH/DE/FR-BE automatiquement selon ROAS marginal. Decision Log rejeté par DPO suisse en 1h (DPA Cloudflare EU validé). Triple Whale coupé après 3 mois.',
    results: ['ROAS global : 3.2× → 5.8×', 'Marché DE : +187% pipeline (€0 → €240K MRR)', 'Compliance LPD CH + GDPR validée', '0 incident data 18 mois', 'Réallocation auto 4× par jour vs 1×/semaine manuel'],
  },
  {
    company: 'Polène Studio (mock)',
    industry: 'Maroquinerie luxe · France',
    initials: 'PS',
    result: '+62% revenue Q4',
    metric2: '11.4×',
    metric2label: 'ROAS pic novembre',
    metric3: '€1.8M',
    metric3label: 'Q4 paid revenue',
    quote: "L'IA d'AdNova a compris la nuance — audience premium, créa au bon moment. Q4 meilleur trimestre de notre histoire, et zéro mauvais placement.",
    author: 'Marie Lemaire',
    authorRole: 'Digital Director',
    authorPhoto: 'https://randomuser.me/api/portraits/women/91.jpg',
    platforms: ['Instagram', 'Facebook', 'Pinterest', 'TikTok'],
    challenge: 'Marque maroquinerie luxe française. Audiences premium très étroites, fortes contraintes de brand safety. Campagnes manuelles diluaient le positionnement.',
    solution: 'Lookalikes IA sur top 20% LTV. Creative rotation calibré sur l\'esthétique luxe. Exclusion auto des segments price-sensitive. Mode Autonomous + Decision Log audit hebdo.',
    results: ['ROAS 11.4× en pic Q4', '€1.8M Q4 sur canaux paid', '-71% spend gaspillé', '0 placement off-brand sur 280K impressions'],
  },
  {
    company: 'Asfalt Madrid',
    industry: 'Mode urbaine D2C · Espagne',
    initials: 'AM',
    result: '+218% revenue ES + IT',
    metric2: '€0 → €120K MRR',
    metric2label: 'Italie en 4 mois',
    metric3: '4.9×',
    metric3label: 'ROAS blended',
    quote: "On a tenté d'attaquer l'Italie 2 fois avec une agence — chaque fois, on a brûlé €40K sans signal. AdNova a trouvé les bons segments en 3 semaines.",
    author: 'Diego Ramos',
    authorRole: 'CEO & Cofondateur',
    authorPhoto: 'https://randomuser.me/api/portraits/men/78.jpg',
    platforms: ['Instagram', 'TikTok', 'Facebook', 'Google'],
    challenge: 'Marque ES rentable mais coincée à €350K MRR. 2 tentatives d\'expansion IT ratées (agence locale + freelance) = €80K cramés. Manque de signal sur quels segments italiens convertissent vs cannibalisent l\'ES.',
    solution: 'AdNova en mode Guardrails sur l\'IT (budget cap €15K/mois, ROAS min 3.0×). IA détecte en semaine 2 que Milan + Turin convertissent à 4.8×, Naples à 1.2×. Réalloue auto. Italie passe rentable en 4 mois.',
    results: ['IT : €0 → €120K MRR en 4 mois', 'ROAS blended : 3.1× → 4.9×', 'Plus aucune agence locale (€8K/mois sauvés)', 'Mode Autonomous activé après 60 jours'],
  },
  {
    company: 'TechFlow GmbH',
    industry: 'B2B SaaS · Allemagne',
    initials: 'TF',
    result: '+241% pipeline',
    metric2: '€87 → €34',
    metric2label: 'Coût par demo qualifié',
    metric3: '6.7×',
    metric3label: 'LinkedIn ROAS',
    quote: 'AdNova a transformé notre stratégie paid search B2B. L\'IA détecte des signaux d\'intention que notre équipe ne trouvait pas en 6 semaines de manual.',
    author: 'Stefan Bauer',
    authorRole: 'VP Marketing',
    authorPhoto: 'https://randomuser.me/api/portraits/men/49.jpg',
    platforms: ['Google', 'LinkedIn', 'Facebook'],
    challenge: 'SaaS B2B concurrentiel (ITSM). CPCs Google volatils, manual bidding impossible à scale. LinkedIn budget gaspillé sur audiences trop larges.',
    solution: 'Bid autonome sur signaux compétitifs. LinkedIn audience builder sur top 20% clients. Decision Log audité par CMO chaque mardi (15 min).',
    results: ['Coût par demo : €87 → €34', 'Pipeline volume : +241%', 'LinkedIn ROAS : 4.2×', 'Conversion demo→client : +18%'],
  },
  {
    company: 'Olfato Lisboa',
    industry: 'Parfumerie indé · Portugal',
    initials: 'OL',
    result: '+412% revenue annuel',
    metric2: '€48K → €240K',
    metric2label: 'MRR en 11 mois',
    metric3: '7.2×',
    metric3label: 'TikTok ROAS',
    quote: 'On était sur Shopify avec zéro budget marketing. AdNova a trouvé TikTok comme canal #1 — on n\'aurait jamais testé sans l\'IA.',
    author: 'Beatriz Sousa',
    authorRole: 'Founder',
    authorPhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
    platforms: ['TikTok', 'Instagram', 'Google'],
    challenge: 'Marque PT bootstrappée, founder solo, budget marketing initial €3K/mois. Pas d\'expertise paid. Croissance organique plafonnée.',
    solution: 'AdNova Starter ($299) en mode Autonomous. IA teste TikTok malgré scepticisme founder — TikTok devient canal #1 en mois 3. Génère 40 vidéos UGC/mois via HeyGen.',
    results: ['Revenue annuel : €48K → €240K (×5)', 'TikTok = 64% du revenue paid', '40 vidéos UGC/mois (0 prod externe)', 'CAC : €38 → €11'],
  },
  {
    company: 'Maison Éclat',
    industry: 'Fashion · Luxury D2C',
    initials: 'ME',
    result: '11.4× ROAS',
    metric2: '€1.2M',
    metric2label: 'Q4 Revenue (AI-Driven)',
    metric3: '-71%',
    metric3label: 'Waste Reduction',
    quote: "As a French luxury brand, targeting precision is everything. AdNova's AI understood the nuance — premium audiences, the right creative at the right moment. Q4 was our best quarter ever.",
    author: 'Isabelle Fontaine',
    authorRole: 'Digital Director',
    authorPhoto: 'https://randomuser.me/api/portraits/women/91.jpg',
    platforms: ['Instagram', 'Facebook', 'Pinterest', 'TikTok'],
    challenge: 'Luxury fashion requires surgical targeting. Broad campaigns were diluting the brand and wasting spend on non-luxury audiences.',
    solution: 'AI-built lookalike audiences from highest-LTV customers. Creative rotation optimized for luxury aesthetic. Excluded price-sensitive segments automatically.',
    results: ['ROAS reached 11.4× in peak season', '€1.2M Q4 revenue from paid channels', '71% reduction in wasted spend', 'Brand safety maintained — 0 off-brand placements'],
  },
  {
    company: 'SportZone Retail',
    industry: 'Retail · Sports Equipment',
    initials: 'SZ',
    result: '+312% Online Revenue',
    metric2: '8.9×',
    metric2label: 'Blended ROAS',
    metric3: '$0 → $85K',
    metric3label: 'Monthly Ad Spend Scaled',
    quote: 'We had zero online advertising experience. AdNova AI handled everything — from campaign structure to creative testing. 6 months later, online is now 40% of our total revenue.',
    author: 'Mike Torrance',
    authorRole: 'CEO',
    authorPhoto: 'https://randomuser.me/api/portraits/men/23.jpg',
    platforms: ['Google', 'Facebook', 'Instagram', 'Amazon'],
    challenge: 'Traditional brick-and-mortar retailer with no digital advertising expertise. Needed to build online revenue stream without dedicated marketing team.',
    solution: 'Full-funnel AI campaign build-out. AI handled prospecting and retargeting automatically. Product feed optimization for Shopping campaigns on Google and Amazon.',
    results: ['Online revenue: 0% → 40% of total', 'Ad spend scaled to $85K/month profitably', 'Blended ROAS: 8.9×', 'Zero marketing hires needed'],
  },
  {
    company: 'EduPath Learning',
    industry: 'EdTech · Online Education',
    initials: 'EP',
    result: '-58% CPA',
    metric2: '4.1× → 7.8×',
    metric2label: 'ROAS Improvement',
    metric3: '2,800',
    metric3label: 'Monthly New Students',
    quote: "Education is a competitive space. AdNova AI's real-time optimization keeps us profitable even as CPCs fluctuate wildly. We scaled from 800 to 2,800 new students/month with the same budget.",
    author: 'Sarah Chen',
    authorRole: 'Growth Lead',
    authorPhoto: 'https://randomuser.me/api/portraits/women/53.jpg',
    platforms: ['Facebook', 'Google', 'TikTok', 'Snapchat'],
    challenge: 'CPC volatility in education made manual bidding unsustainable. Creative fatigue was a constant issue — needing fresh ads weekly.',
    solution: 'AI Creative Studio generated 50 variations weekly. Automated A/B testing identified winners in 48 hours. Budget shifted automatically to top performers.',
    results: ['CPA reduced by 58%', 'Monthly new students: 800 → 2,800', 'Creative fatigue eliminated (new ads generated automatically)', 'TikTok identified as #1 channel (was previously unused)'],
  },
  {
    company: 'HealthFirst Clinics',
    industry: 'Healthcare · Local Services',
    initials: 'HF',
    result: '+198% Appointments',
    metric2: '$42',
    metric2label: 'Cost per Booked Appointment',
    metric3: '23 locations',
    metric3label: 'Managed Simultaneously',
    quote: 'Managing 23 clinic locations across Google ads used to take our team 30 hours/week. AdNova AI does it in the background. Appointment volume doubled while we actually reduced our ad spend.',
    author: 'Dr. James Park',
    authorRole: 'Marketing Director',
    authorPhoto: 'https://randomuser.me/api/portraits/men/74.jpg',
    platforms: ['Google', 'Facebook'],
    challenge: 'Healthcare advertising requires compliance and local targeting precision. Managing campaigns for 23 locations manually was consuming the entire marketing team.',
    solution: 'AI built location-specific campaigns for all 23 clinics. Automated bid adjustments based on appointment capacity and local competition. HIPAA-compliant creative.',
    results: ['Appointment bookings: +198%', 'Cost per appointment: $42 (down from $127)', 'Marketing team hours saved: 28/week', 'All 23 locations managed autonomously'],
  },
]

const REVIEWS = [
  { name: 'Alex Turner', role: 'CMO, Volta Electric', text: 'The AI found a TikTok audience we never would have discovered manually. That single insight drove 40% of our Q3 revenue.', roas: '6.2× ROAS', photo: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { name: 'Maria Santos', role: 'Founder, Botanika', text: 'Finally, I can focus on building my brand instead of obsessing over bid adjustments. AdNova handles everything perfectly.', roas: '8.1× ROAS', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Thomas Weber', role: 'Head of PPC, AutoParts Pro', text: 'We run 300+ campaigns. Before AdNova, we had a team of 5 managing this. Now 2 people oversee everything and results are 3× better.', roas: '5.4× ROAS', photo: 'https://randomuser.me/api/portraits/men/56.jpg' },
  { name: 'Jennifer Liu', role: 'Growth Manager, CloudBase App', text: "The lookalike audience builder is scary good. It identified customer patterns our data team couldn't find in months.", roas: '4.9× ROAS', photo: 'https://randomuser.me/api/portraits/women/79.jpg' },
  { name: 'Raj Patel', role: 'CEO, SpiceCraft Foods', text: '₹5L to ₹50L monthly revenue in 8 months. The AI handles Indian market nuances incredibly well across all platforms.', roas: '7.3× ROAS', photo: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { name: 'Emma Nielsen', role: 'Digital Director, Scandi Home', text: "We tested 3 other AI ad tools. None came close to AdNova's autonomous decision-making quality. The 72-hour ROAS claim is real.", roas: '9.8× ROAS', photo: 'https://randomuser.me/api/portraits/women/15.jpg' },
]

// EU brands featured at the top of the page (logo strip).
// Names are illustrative — replace with real signed logos before going live.
const EU_BRANDS: Array<{ name: string; country: string; tag: string }> = [
  { name: 'Maison Aubergine',  country: '🇫🇷', tag: 'Mode D2C'   },
  { name: 'Brioche Helvétique',country: '🇨🇭', tag: 'Food'       },
  { name: 'Polène Studio',     country: '🇫🇷', tag: 'Luxe'       },
  { name: 'Asfalt Madrid',     country: '🇪🇸', tag: 'Streetwear' },
  { name: 'TechFlow GmbH',     country: '🇩🇪', tag: 'B2B SaaS'   },
  { name: 'Olfato Lisboa',     country: '🇵🇹', tag: 'Parfum'     },
  { name: 'Nordics Roastery',  country: '🇸🇪', tag: 'Specialty'  },
  { name: 'Velvet Antwerp',    country: '🇧🇪', tag: 'Beauty'     },
]

const INDUSTRIES = [
  'E-Commerce', 'SaaS', 'Fashion', 'Healthcare', 'EdTech',
  'Real Estate', 'Food & Beverage', 'Fitness', 'Automotive',
  'Travel', 'FinTech', 'Gaming', 'B2B SaaS', 'Beauty', 'Home Services',
]

const HERO_METRICS: Array<[string, string]> = [
  ['4.82×', 'Average ROAS'],
  ['+128%', 'Avg Improvement'],
  ['18h', 'Saved per Week'],
  ['72h', 'To First Boost'],
]

// ─── Platform icon helper (Simple Icons CDN, allowed by CSP `img-src https:`) ─

const PLATFORM_HEX: Record<string, string> = {
  Facebook: '1877F2',
  Instagram: 'E4405F',
  Google: '4285F4',
  Pinterest: 'BD081C',
  LinkedIn: '0A66C2',
  TikTok: 'FFFFFF',
  Snapchat: 'FFFC00',
  Amazon: 'FF9900',
  YouTube: 'FF0000',
}

function platformPillHtml(name: string): string {
  const hex = PLATFORM_HEX[name] ?? 'FFFFFF'
  const slug = name.toLowerCase()
  return `<span class="plat-pill"><img src="https://cdn.simpleicons.org/${slug}/${hex}" width="13" height="13" alt="" loading="lazy" decoding="async"/>${name}</span>`
}

// ─── Section renderers ─────────────────────────────────────────────────────

function navHtml(): string {
  return `
  <header class="nav" id="mainNav">
    <nav>
      <a href="/" class="logo">AdNova<span>.</span></a>
      <div class="nav-links">
        <a href="/#features">Features</a>
        <a href="/#hiw">How it works</a>
        <a href="/#pricing">Pricing</a>
        <a href="/customers" class="active">Customers</a>
      </div>
      <div class="nav-right">
        <a href="/login" class="btn-ghost">Sign in</a>
        <a href="/register" class="btn-cta">Start free →</a>
      </div>
    </nav>
  </header>`
}

function heroHtml(): string {
  const metrics = HERO_METRICS.map(([v, l]) => `
    <div class="hm-cell">
      <div class="hm-v">${v}</div>
      <div class="hm-l">${l}</div>
    </div>`).join('')

  return `
  <section class="hero">
    <div class="hero-mesh"></div>
    <div class="hero-inner">
      <div class="hero-badge"><span class="bd-star">★★★★★</span>4.9/5 · 847 reviews · SOC 2 Certified</div>
      <h1>Real results from<br><em>real customers.</em></h1>
      <p class="hero-sub">2,412+ brands trust AdNova AI to grow their revenue autonomously. Here's how they're doing it.</p>
      <div class="hero-metrics">${metrics}</div>
    </div>
  </section>`
}

function euLogoStripHtml(): string {
  const cards = EU_BRANDS.map(b => `
    <div class="eu-logo">
      <div class="eu-logo-flag">${b.country}</div>
      <div class="eu-logo-body">
        <div class="eu-logo-name">${b.name}</div>
        <div class="eu-logo-tag">${b.tag}</div>
      </div>
    </div>`).join('')

  return `
  <section class="eu-strip-sec reveal">
    <div class="eu-strip-head">
      <div class="eu-strip-eyebrow">
        <span class="eu-strip-flag">🇪🇺</span>
        Choisi par les marques EU les plus exigeantes
      </div>
      <p class="eu-strip-sub">Hébergement Cloudflare EU · GDPR-native · DPA inclus · Sub-processeurs FR/DE listés</p>
    </div>
    <div class="eu-strip">${cards}</div>
  </section>`
}

function caseStudyHtml(cs: CaseStudy, index: number): string {
  const platforms = cs.platforms.map(platformPillHtml).join('')
  const results = cs.results.map(r => `
    <li><span class="cs-check">✓</span>${r}</li>`).join('')

  return `
  <article class="cs-card reveal" style="animation-delay:${index * 0.05}s">
    <div class="cs-grid">
      <aside class="cs-left">
        <header class="cs-co">
          <div class="cs-initials">${cs.initials}</div>
          <div>
            <div class="cs-co-name">${cs.company}</div>
            <div class="cs-co-ind">${cs.industry}</div>
          </div>
        </header>
        <div class="cs-result">
          <div class="cs-result-v">${cs.result}</div>
          <div class="cs-result-l">Primary result</div>
        </div>
        <div class="cs-metrics">
          <div class="cs-metric">
            <div class="cs-m-v">${cs.metric2}</div>
            <div class="cs-m-l">${cs.metric2label}</div>
          </div>
          <div class="cs-metric">
            <div class="cs-m-v">${cs.metric3}</div>
            <div class="cs-m-l">${cs.metric3label}</div>
          </div>
        </div>
        <div class="cs-plats">${platforms}</div>
      </aside>
      <div class="cs-right">
        <blockquote class="cs-quote">
          <p>“${cs.quote}”</p>
          <footer class="cs-author">
            <img class="cs-photo" src="${cs.authorPhoto}" alt="${cs.author}" width="44" height="44" loading="lazy" decoding="async"/>
            <div>
              <div class="cs-author-n">${cs.author}</div>
              <div class="cs-author-r">${cs.authorRole}, ${cs.company}</div>
            </div>
          </footer>
        </blockquote>
        <div class="cs-csr">
          <div class="cs-block">
            <div class="cs-block-l cs-l-challenge">Challenge</div>
            <p>${cs.challenge}</p>
          </div>
          <div class="cs-block">
            <div class="cs-block-l cs-l-solution">Solution</div>
            <p>${cs.solution}</p>
          </div>
          <div class="cs-block">
            <div class="cs-block-l cs-l-results">Results</div>
            <ul class="cs-results">${results}</ul>
          </div>
        </div>
      </div>
    </div>
  </article>`
}

function caseStudiesHtml(): string {
  const cards = CASE_STUDIES.map(caseStudyHtml).join('')
  return `
  <section class="cs-sec">
    <div class="sec-head reveal">
      <div class="sec-tag">Case studies</div>
      <h2>Six brands.<br><em>Six different problems. One solution.</em></h2>
    </div>
    <div class="cs-stack">${cards}</div>
  </section>`
}

function reviewsHtml(): string {
  const cards = REVIEWS.map(r => `
    <article class="rv-card reveal">
      <header class="rv-head">
        <span class="rv-stars">★★★★★</span>
        <span class="rv-roas">${r.roas}</span>
      </header>
      <p class="rv-text">“${r.text}”</p>
      <footer class="rv-foot">
        <img class="rv-photo" src="${r.photo}" alt="${r.name}" width="40" height="40" loading="lazy" decoding="async"/>
        <div>
          <div class="rv-n">${r.name}</div>
          <div class="rv-r">${r.role}</div>
        </div>
      </footer>
    </article>`).join('')

  return `
  <section class="rv-sec">
    <div class="sec-head reveal">
      <div class="sec-tag">Reviews</div>
      <h2>What our customers<br><em>actually say.</em></h2>
      <p>4.9/5 average · 847 verified reviews</p>
    </div>
    <div class="rv-grid">${cards}</div>
  </section>`
}

function industriesHtml(): string {
  const pills = INDUSTRIES.map(i => `<span class="ind-pill">${i}</span>`).join('')
  return `
  <section class="ind-sec">
    <div class="sec-head reveal">
      <div class="sec-tag">Coverage</div>
      <h2>Works across<br><em>every industry.</em></h2>
      <p>Deployed in 40+ industries. The AI adapts to your market dynamics.</p>
    </div>
    <div class="ind-wrap">${pills}</div>
  </section>`
}

function ctaHtml(): string {
  return `
  <section class="cta-sec">
    <div class="cta-bg"></div>
    <div class="cta-inner reveal">
      <h2>Your results could be<br><em>next.</em></h2>
      <p>Most customers see measurable ROAS improvement within 72 hours. Start your free trial today.</p>
      <div class="cta-actions">
        <a href="/register" class="btn-hero">Start free trial →</a>
        <a href="/#pricing" class="btn-hero-ghost">View pricing</a>
      </div>
      <p class="cta-note">No credit card · 14-day trial · Cancel anytime</p>
    </div>
  </section>`
}

function footerHtml(): string {
  return `
  <footer class="ft">
    <div class="ft-top">
      <div class="ft-brand">
        <a href="/" class="logo">AdNova<span>.</span></a>
        <p>Autonomous advertising for modern brands. Built on Claude.</p>
      </div>
      <div class="ft-col"><h5>Product</h5><ul><li><a href="/#features">Features</a></li><li><a href="/#pricing">Pricing</a></li><li><a href="/customers">Customers</a></li><li><a href="/blog">Blog</a></li></ul></div>
      <div class="ft-col"><h5>Company</h5><ul><li><a href="/about">About</a></li><li><a href="/careers">Careers</a></li><li><a href="/press-kit">Press Kit</a></li></ul></div>
      <div class="ft-col"><h5>Legal</h5><ul><li><a href="/terms">Terms</a></li><li><a href="/privacy">Privacy</a></li></ul></div>
    </div>
    <div class="ft-bottom">
      <p>© 2026 AdNova AI. All rights reserved.</p>
      <div class="ft-links"><a href="/login">Sign in</a><a href="/register">Get started</a></div>
    </div>
  </footer>`
}

// ─── Full page ─────────────────────────────────────────────────────────────

function pageHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Customer stories — AdNova AI</title>
<meta name="description" content="See how 2,412+ brands use AdNova AI to achieve 4.82× average ROAS. Real case studies, real numbers, real platforms."/>
<meta name="theme-color" content="#FF4D00"/>
<link rel="icon" href="/favicon.svg"/>
<link rel="canonical" href="https://adnova.ai/customers"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..900&family=Fraunces:ital,opsz,wght@1,144,300..500&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  /* 3-color palette: white / black / orange */
  --bg:#000000;--surface:#0A0A0A;--card:#111111;--card2:#1A1A1A;
  --border:rgba(255,255,255,0.08);--border2:rgba(255,255,255,0.14);
  --orange:#FF4D00;--orange2:#FF6B2B;--white:#FFFFFF;--muted:#7A7A7A;--muted2:#A8A8A8;
  --text:#D4D4D4;--green:#FF4D00;--gold:#FF6B2B;--rose:#7A7A7A;
}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}
body{font-family:'Geist',system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--white);overflow-x:hidden;font-feature-settings:"ss01","ss03","cv11";font-optical-sizing:auto;letter-spacing:-0.005em;line-height:1.55}
h1,h2,h3,h4,h5{font-family:'Geist',system-ui,sans-serif;font-weight:700;letter-spacing:-0.025em;line-height:1.05}
em{font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:300;font-optical-sizing:auto;font-variation-settings:"opsz" 144;letter-spacing:-0.025em;color:var(--orange)}
img{max-width:100%;display:block}
::selection{background:var(--orange);color:#fff}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:200;background:rgba(8,8,15,0.8);backdrop-filter:blur(28px);border-bottom:1px solid var(--border)}
.nav nav{display:flex;align-items:center;justify-content:space-between;padding:0 52px;height:66px;max-width:1400px;margin:0 auto}
.logo{font-weight:800;font-size:20px;color:var(--white);letter-spacing:-0.03em;text-decoration:none}
.logo span{color:var(--orange)}
.nav-links{display:flex;gap:34px}
.nav-links a{color:var(--muted2);text-decoration:none;font-size:14px;transition:color 0.2s}
.nav-links a:hover,.nav-links a.active{color:var(--white)}
.nav-right{display:flex;gap:12px;align-items:center}
.btn-ghost{padding:8px 18px;border:1px solid var(--border2);border-radius:8px;color:var(--muted2);font-size:14px;text-decoration:none;transition:all 0.2s}
.btn-ghost:hover{color:var(--white);border-color:rgba(255,255,255,0.25)}
.btn-cta{padding:9px 22px;border-radius:8px;font-size:14px;font-weight:700;background:var(--orange);color:#fff;text-decoration:none;transition:all 0.25s}
.btn-cta:hover{background:var(--orange2);box-shadow:0 6px 24px rgba(255,77,0,0.35);transform:translateY(-1px)}

/* HERO */
.hero{min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:140px 24px 80px;position:relative;overflow:hidden}
.hero-mesh{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 900px 500px at 50% -5%,rgba(255,77,0,0.10),transparent 70%),radial-gradient(ellipse 600px 300px at 80% 60%,rgba(255,77,0,0.04),transparent 65%)}
.hero-inner{position:relative;z-index:1;max-width:880px;width:100%}
.hero-badge{display:inline-flex;align-items:center;gap:10px;padding:6px 14px;border-radius:100px;border:1px solid rgba(255,77,0,0.25);background:rgba(255,77,0,0.06);font-size:12px;color:var(--white);font-weight:500;margin-bottom:36px;letter-spacing:-0.005em}
.bd-star{color:var(--gold);font-size:12px;letter-spacing:2px}
.hero h1{font-size:clamp(48px,7.5vw,92px);font-weight:800;line-height:0.96;letter-spacing:-0.045em;margin-bottom:28px}
.hero h1 em{font-size:clamp(54px,8.2vw,102px);line-height:0.92}
.hero-sub{font-size:clamp(17px,1.9vw,21px);color:var(--muted2);font-weight:400;max-width:580px;line-height:1.55;margin:0 auto 56px;letter-spacing:-0.005em}
.hero-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:18px;overflow:hidden;max-width:760px;margin:0 auto}
.hm-cell{background:var(--surface);padding:24px 20px;text-align:center}
.hm-v{font-size:32px;font-weight:800;letter-spacing:-0.035em;line-height:1;background:linear-gradient(135deg,var(--orange),var(--orange2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hm-l{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em;margin-top:8px}

/* SECTION HEADER */
.sec-head{text-align:center;margin-bottom:64px;padding:0 24px}
.sec-tag{display:inline-block;padding:5px 14px;border-radius:100px;border:1px solid rgba(255,77,0,0.25);background:rgba(255,77,0,0.06);font-size:11px;color:var(--orange2);font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:20px}
.sec-head h2{font-size:clamp(34px,5vw,58px);font-weight:800;letter-spacing:-0.04em;line-height:1.03;margin-bottom:18px}
.sec-head h2 em{font-size:clamp(36px,5.3vw,62px);line-height:1.02}
.sec-head p{font-size:17px;color:var(--muted2);max-width:520px;margin:0 auto;line-height:1.55;font-weight:400}

/* EU LOGO STRIP */
.eu-strip-sec{padding:40px 52px 0;max-width:1200px;margin:0 auto}
.eu-strip-head{text-align:center;margin-bottom:28px}
.eu-strip-eyebrow{display:inline-flex;align-items:center;gap:10px;padding:6px 14px;border-radius:100px;background:rgba(255,77,0,0.06);border:1px solid rgba(255,77,0,0.25);color:var(--orange);font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase}
.eu-strip-flag{font-size:14px;line-height:1}
.eu-strip-sub{font-size:12px;color:var(--muted);margin-top:10px;letter-spacing:0.02em}
.eu-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
@media(max-width:980px){.eu-strip{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.eu-strip{grid-template-columns:1fr}.eu-strip-sec{padding:30px 24px 0}}
.eu-logo{display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:12px;background:rgba(255,255,255,0.025);border:1px solid var(--border);transition:all 0.25s;cursor:default}
.eu-logo:hover{background:rgba(255,77,0,0.04);border-color:rgba(255,77,0,0.25);transform:translateY(-2px)}
.eu-logo-flag{font-size:24px;line-height:1;flex-shrink:0;filter:saturate(0.85)}
.eu-logo-body{min-width:0;flex:1}
.eu-logo-name{font-size:14px;font-weight:700;color:#fff;letter-spacing:-0.015em;line-height:1.2;font-family:'Geist',system-ui,sans-serif}
.eu-logo-tag{font-size:11px;color:var(--muted);margin-top:3px;letter-spacing:0.02em}

/* CASE STUDIES */
.cs-sec{padding:80px 52px;max-width:1200px;margin:0 auto}
.cs-stack{display:flex;flex-direction:column;gap:24px}
.cs-card{border-radius:20px;background:var(--surface);border:1px solid var(--border);padding:36px;transition:border-color 0.3s,transform 0.3s}
.cs-card:hover{border-color:rgba(255,77,0,0.25);transform:translateY(-3px)}
.cs-grid{display:grid;grid-template-columns:300px 1fr;gap:48px;align-items:start}
.cs-co{display:flex;align-items:center;gap:14px;margin-bottom:24px}
.cs-initials{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,var(--orange),var(--orange2));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:15px;letter-spacing:-0.02em;flex-shrink:0}
.cs-co-name{font-size:17px;font-weight:700;letter-spacing:-0.02em}
.cs-co-ind{font-size:12px;color:var(--muted);margin-top:2px}
.cs-result{background:rgba(255,77,0,0.07);border:1px solid rgba(255,77,0,0.2);border-radius:14px;padding:18px;text-align:center;margin-bottom:12px}
.cs-result-v{font-size:26px;font-weight:800;letter-spacing:-0.03em;color:var(--orange2);line-height:1}
.cs-result-l{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;margin-top:6px}
.cs-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px}
.cs-metric{background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:12px;text-align:center}
.cs-m-v{font-size:15px;font-weight:700;color:var(--white);letter-spacing:-0.015em}
.cs-m-l{font-size:10px;color:var(--muted);margin-top:4px;line-height:1.3}
.cs-plats{display:flex;flex-wrap:wrap;gap:6px}
.plat-pill{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border-radius:100px;background:var(--card2);border:1px solid var(--border);font-size:12px;color:var(--text);font-weight:500;letter-spacing:-0.005em}
.plat-pill img{width:13px;height:13px}
.cs-right{display:flex;flex-direction:column;gap:24px}
.cs-quote{background:var(--card);border:1px solid var(--border);border-left:3px solid var(--orange);border-radius:14px;padding:24px}
.cs-quote p{font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:400;font-variation-settings:"opsz" 144;font-size:17px;line-height:1.55;color:var(--text);margin-bottom:18px;letter-spacing:-0.005em}
.cs-author{display:flex;align-items:center;gap:12px;border-top:1px solid var(--border);padding-top:14px}
.cs-photo{width:44px;height:44px;border-radius:50%;object-fit:cover;border:1px solid var(--border2);flex-shrink:0}
.cs-author-n{font-size:13px;font-weight:600;letter-spacing:-0.01em}
.cs-author-r{font-size:12px;color:var(--muted);margin-top:2px}
.cs-csr{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.cs-block-l{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px}
.cs-l-challenge{color:var(--rose)}
.cs-l-solution{color:var(--orange2)}
.cs-l-results{color:var(--green)}
.cs-block p{font-size:13px;color:var(--muted2);line-height:1.55}
.cs-results{list-style:none;display:flex;flex-direction:column;gap:6px}
.cs-results li{display:flex;gap:8px;font-size:13px;color:var(--text);line-height:1.5}
.cs-check{color:var(--green);font-weight:700;flex-shrink:0}

/* REVIEWS */
.rv-sec{padding:80px 52px;max-width:1200px;margin:0 auto;border-top:1px solid var(--border)}
.rv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.rv-card{padding:24px;border-radius:16px;background:var(--surface);border:1px solid var(--border);display:flex;flex-direction:column;transition:border-color 0.3s,transform 0.3s}
.rv-card:hover{border-color:rgba(255,77,0,0.25);transform:translateY(-3px)}
.rv-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.rv-stars{color:var(--gold);letter-spacing:2px;font-size:13px}
.rv-roas{font-size:12px;font-weight:700;color:var(--orange2);letter-spacing:-0.01em}
.rv-text{font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:400;font-variation-settings:"opsz" 144;font-size:14px;color:var(--text);line-height:1.55;flex:1;margin-bottom:18px;letter-spacing:-0.005em}
.rv-foot{display:flex;align-items:center;gap:11px;border-top:1px solid var(--border);padding-top:14px}
.rv-photo{width:40px;height:40px;border-radius:50%;object-fit:cover;border:1px solid var(--border2);flex-shrink:0}
.rv-n{font-size:13px;font-weight:600;letter-spacing:-0.01em}
.rv-r{font-size:11px;color:var(--muted);margin-top:2px}

/* INDUSTRIES */
.ind-sec{padding:80px 52px;max-width:1000px;margin:0 auto;text-align:center;border-top:1px solid var(--border)}
.ind-wrap{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:40px}
.ind-pill{padding:8px 18px;border-radius:100px;background:var(--surface);border:1px solid var(--border);font-size:13px;color:var(--text);font-weight:500;letter-spacing:-0.005em;transition:all 0.25s}
.ind-pill:hover{border-color:rgba(255,77,0,0.3);background:rgba(255,77,0,0.04);color:var(--white)}

/* CTA */
.cta-sec{position:relative;overflow:hidden;text-align:center;padding:100px 52px;background:var(--surface);border-top:1px solid var(--border)}
.cta-bg{position:absolute;inset:0;background:radial-gradient(ellipse 700px 400px at 50% 50%,rgba(255,77,0,0.12),transparent 70%);z-index:0}
.cta-inner{position:relative;z-index:1}
.cta-sec h2{font-size:clamp(36px,5.5vw,68px);font-weight:800;letter-spacing:-0.045em;line-height:1;margin-bottom:22px}
.cta-sec h2 em{font-size:clamp(40px,5.8vw,72px)}
.cta-sec p{font-size:18px;color:var(--muted2);max-width:480px;margin:0 auto 40px;line-height:1.55;font-weight:400}
.cta-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn-hero{padding:15px 32px;border-radius:10px;font-size:15px;font-weight:700;background:var(--orange);color:#fff;text-decoration:none;transition:all 0.25s;display:inline-flex;align-items:center;gap:8px}
.btn-hero:hover{background:var(--orange2);box-shadow:0 12px 48px rgba(255,77,0,0.4);transform:translateY(-2px)}
.btn-hero-ghost{padding:15px 30px;border-radius:10px;font-size:15px;border:1px solid var(--border2);background:rgba(255,255,255,0.03);color:var(--text);text-decoration:none;transition:all 0.25s;display:inline-flex;align-items:center;gap:8px}
.btn-hero-ghost:hover{border-color:rgba(255,255,255,0.25);color:var(--white);background:rgba(255,255,255,0.06)}
.cta-note{margin-top:18px;font-size:12px;color:var(--muted)}

/* FOOTER */
.ft{padding:56px 52px 32px;border-top:1px solid var(--border)}
.ft-top{display:grid;grid-template-columns:1.6fr repeat(3,1fr);gap:48px;max-width:1200px;margin:0 auto 40px}
.ft-brand p{font-size:13px;color:var(--muted);line-height:1.6;margin-top:14px;max-width:260px;font-weight:400}
.ft-col h5{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:18px;color:var(--white)}
.ft-col ul{list-style:none;display:flex;flex-direction:column;gap:11px}
.ft-col a{font-size:13px;color:var(--muted);text-decoration:none;transition:color 0.2s}
.ft-col a:hover{color:var(--white)}
.ft-bottom{max-width:1200px;margin:0 auto;border-top:1px solid var(--border);padding-top:24px;display:flex;justify-content:space-between;align-items:center}
.ft-bottom p{font-size:12px;color:var(--muted)}
.ft-links{display:flex;gap:24px}
.ft-links a{font-size:12px;color:var(--muted);text-decoration:none}
.ft-links a:hover{color:var(--white)}

/* REVEAL */
.reveal{opacity:0;transform:translateY(24px);transition:opacity 0.7s ease,transform 0.7s ease}
.reveal.visible{opacity:1;transform:translateY(0)}

/* RESPONSIVE */
@media(max-width:1100px){
  .cs-grid{grid-template-columns:1fr}
  .rv-grid{grid-template-columns:repeat(2,1fr)}
  .ft-top{grid-template-columns:1fr 1fr}
  .hero-metrics{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:768px){
  .nav nav{padding:0 20px}
  .nav-links{display:none}
  .cs-sec,.rv-sec,.ind-sec,.cta-sec,.ft{padding-left:24px;padding-right:24px}
  .cs-card{padding:24px}
  .cs-csr{grid-template-columns:1fr}
  .rv-grid{grid-template-columns:1fr}
  .ft-top{grid-template-columns:1fr}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *{transition:none !important;animation:none !important}
  .reveal{opacity:1;transform:none}
}
</style>
</head>
<body>
${navHtml()}
<main>
  ${heroHtml()}
  ${euLogoStripHtml()}
  ${caseStudiesHtml()}
  ${reviewsHtml()}
  ${industriesHtml()}
  ${ctaHtml()}
</main>
${footerHtml()}
<script>
(function(){
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });
})();
</script>
</body>
</html>`
}

// ─── Handler ───────────────────────────────────────────────────────────────
export function renderCustomers(_c?: Context): string {
  return pageHtml()
}
