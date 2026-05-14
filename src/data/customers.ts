// Case studies featured on the /customers page.
// Verbatim content extracted from legacy Hono SSR (branch: legacy-hono-ssr-snapshot).
// Photos are absolute URLs (randomuser.me) — replace with signed brand assets before launch.

export type CaseStudy = {
  company: string;
  industry: string;
  initials: string;
  result: string;
  metric2: string;
  metric2label: string;
  metric3: string;
  metric3label: string;
  quote: string;
  author: string;
  authorRole: string;
  authorPhoto: string;
  platforms: string[];
  challenge: string;
  solution: string;
  results: string[];
};

export const CUSTOMERS: CaseStudy[] = [
  {
    company: "Maison Aubergine",
    industry: "Mode D2C · France",
    initials: "MA",
    result: "+34% ROAS · 6 mois",
    metric2: "€8K → €4.2K",
    metric2label: "CAC mensuel divisé par 2",
    metric3: "€2.4M",
    metric3label: "Revenue FY25 sur paid",
    quote:
      "On payait Smartly $5K/mois + agence créa $7K/mois. Migration AdNova en 6 jours, économies de €4 200/mois, et ROAS +34% en 6 mois. Le mode Autonomous bat les règles Smartly à plate couture sur des budgets sous $200K/m.",
    author: "Camille Roussel",
    authorRole: "Head of Acquisition",
    authorPhoto: "https://randomuser.me/api/portraits/women/65.jpg",
    platforms: ["Facebook", "Instagram", "TikTok", "Pinterest"],
    challenge:
      "Marque DTC mode lifestyle en hyper-croissance (€80K → €400K MRR en 18 mois). Stack legacy : Smartly.io à $5K/mois (contrat 12 mois signé l'année précédente, \"trop petit\" pour l'attention de leur AM), agence créa à €7K/mois. ROAS plafonné à 3.8×, créas DCO templates qui saturaient en 2 semaines, et 4 semaines de back-and-forth pour chaque modification d'audience. Décisions de scale prises 3 jours après le signal — trop tard.",
    solution:
      "Migration sur AdNova en 6 jours pendant la fin de contrat Smartly. Mode Guardrails (ROAS min 3.5×, daily cap €2K). AI Creative Studio génère 8-12 visuels/semaine sur la charte graphique — pas de templates, de la vraie génération SDXL. Decision Log audité chaque vendredi par Camille en 20 min. Smartly + agence créa coupés à expiration.",
    results: [
      "ROAS Q4 : 3.8× → 5.1× · +34%",
      "CAC : €68 → €34 (-50%)",
      "22h/semaine récupérées sur l'ops",
      "€19K/mois économisés (freelance + agence)",
      "Time-to-scale : 3 jours → 18 minutes (auto)",
    ],
  },
  {
    company: "Brioche Helvétique",
    industry: "E-commerce alimentaire · Suisse",
    initials: "BH",
    result: "5.8× ROAS · DACH",
    metric2: "+187%",
    metric2label: "Pipeline B2B Suisse + DE",
    metric3: "CHF 940K",
    metric3label: "Q4 paid revenue",
    quote:
      "AdNova comprend les nuances DACH. Les modèles savent que 'Bäckerei' en Suisse alémanique ≠ 'Boulangerie' romande. Sur Q4, on a triplé le marché allemand sans toucher au budget belge.",
    author: "Hans-Peter Müller",
    authorRole: "CMO",
    authorPhoto: "https://randomuser.me/api/portraits/men/41.jpg",
    platforms: ["Google", "Facebook", "Instagram", "LinkedIn"],
    challenge:
      "Marque B2C/B2B 3 marchés (CH-FR, CH-DE, DE). Triple Whale pour le tracking US-first ne gérait pas le CHF + EUR + multi-langue. Hébergement US bloquant pour clients horeca (GDPR + LPD suisse). Manual budget split entre marchés = sous-allocation chronique du DE.",
    solution:
      "AdNova EU servers (Francfort), multi-currency natif, IA gère le split CH/DE/FR-BE automatiquement selon ROAS marginal. Decision Log rejeté par DPO suisse en 1h (DPA Cloudflare EU validé). Triple Whale coupé après 3 mois.",
    results: [
      "ROAS global : 3.2× → 5.8×",
      "Marché DE : +187% pipeline (€0 → €240K MRR)",
      "Compliance LPD CH + GDPR validée",
      "0 incident data 18 mois",
      "Réallocation auto 4× par jour vs 1×/semaine manuel",
    ],
  },
  {
    company: "Polène Studio (mock)",
    industry: "Maroquinerie luxe · France",
    initials: "PS",
    result: "+62% revenue Q4",
    metric2: "11.4×",
    metric2label: "ROAS pic novembre",
    metric3: "€1.8M",
    metric3label: "Q4 paid revenue",
    quote:
      "L'IA d'AdNova a compris la nuance — audience premium, créa au bon moment. Q4 meilleur trimestre de notre histoire, et zéro mauvais placement.",
    author: "Marie Lemaire",
    authorRole: "Digital Director",
    authorPhoto: "https://randomuser.me/api/portraits/women/91.jpg",
    platforms: ["Instagram", "Facebook", "Pinterest", "TikTok"],
    challenge:
      "Marque maroquinerie luxe française. Audiences premium très étroites, fortes contraintes de brand safety. Campagnes manuelles diluaient le positionnement.",
    solution:
      "Lookalikes IA sur top 20% LTV. Creative rotation calibré sur l'esthétique luxe. Exclusion auto des segments price-sensitive. Mode Autonomous + Decision Log audit hebdo.",
    results: [
      "ROAS 11.4× en pic Q4",
      "€1.8M Q4 sur canaux paid",
      "-71% spend gaspillé",
      "0 placement off-brand sur 280K impressions",
    ],
  },
  {
    company: "Asfalt Madrid",
    industry: "Mode urbaine D2C · Espagne",
    initials: "AM",
    result: "+218% revenue ES + IT",
    metric2: "€0 → €120K MRR",
    metric2label: "Italie en 4 mois",
    metric3: "4.9×",
    metric3label: "ROAS blended",
    quote:
      "On a tenté d'attaquer l'Italie 2 fois avec une agence — chaque fois, on a brûlé €40K sans signal. AdNova a trouvé les bons segments en 3 semaines.",
    author: "Diego Ramos",
    authorRole: "CEO & Cofondateur",
    authorPhoto: "https://randomuser.me/api/portraits/men/78.jpg",
    platforms: ["Instagram", "TikTok", "Facebook", "Google"],
    challenge:
      "Marque ES rentable mais coincée à €350K MRR. 2 tentatives d'expansion IT ratées (agence locale + freelance) = €80K cramés. Manque de signal sur quels segments italiens convertissent vs cannibalisent l'ES.",
    solution:
      "AdNova en mode Guardrails sur l'IT (budget cap €15K/mois, ROAS min 3.0×). IA détecte en semaine 2 que Milan + Turin convertissent à 4.8×, Naples à 1.2×. Réalloue auto. Italie passe rentable en 4 mois.",
    results: [
      "IT : €0 → €120K MRR en 4 mois",
      "ROAS blended : 3.1× → 4.9×",
      "Plus aucune agence locale (€8K/mois sauvés)",
      "Mode Autonomous activé après 60 jours",
    ],
  },
  {
    company: "TechFlow GmbH",
    industry: "B2B SaaS · Allemagne",
    initials: "TF",
    result: "+241% pipeline",
    metric2: "€87 → €34",
    metric2label: "Coût par demo qualifié",
    metric3: "6.7×",
    metric3label: "LinkedIn ROAS",
    quote:
      "AdNova a transformé notre stratégie paid search B2B. L'IA détecte des signaux d'intention que notre équipe ne trouvait pas en 6 semaines de manual.",
    author: "Stefan Bauer",
    authorRole: "VP Marketing",
    authorPhoto: "https://randomuser.me/api/portraits/men/49.jpg",
    platforms: ["Google", "LinkedIn", "Facebook"],
    challenge:
      "SaaS B2B concurrentiel (ITSM). CPCs Google volatils, manual bidding impossible à scale. LinkedIn budget gaspillé sur audiences trop larges.",
    solution:
      "Bid autonome sur signaux compétitifs. LinkedIn audience builder sur top 20% clients. Decision Log audité par CMO chaque mardi (15 min).",
    results: [
      "Coût par demo : €87 → €34",
      "Pipeline volume : +241%",
      "LinkedIn ROAS : 4.2×",
      "Conversion demo→client : +18%",
    ],
  },
  {
    company: "Olfato Lisboa",
    industry: "Parfumerie indé · Portugal",
    initials: "OL",
    result: "+412% revenue annuel",
    metric2: "€48K → €240K",
    metric2label: "MRR en 11 mois",
    metric3: "7.2×",
    metric3label: "TikTok ROAS",
    quote:
      "On était sur Shopify avec zéro budget marketing. AdNova a trouvé TikTok comme canal #1 — on n'aurait jamais testé sans l'IA.",
    author: "Beatriz Sousa",
    authorRole: "Founder",
    authorPhoto: "https://randomuser.me/api/portraits/women/44.jpg",
    platforms: ["TikTok", "Instagram", "Google"],
    challenge:
      "Marque PT bootstrappée, founder solo, budget marketing initial €3K/mois. Pas d'expertise paid. Croissance organique plafonnée.",
    solution:
      "AdNova Starter ($299) en mode Autonomous. IA teste TikTok malgré scepticisme founder — TikTok devient canal #1 en mois 3. Génère 40 vidéos UGC/mois via Avatar Studio.",
    results: [
      "Revenue annuel : €48K → €240K (×5)",
      "TikTok = 64% du revenue paid",
      "40 vidéos UGC/mois (0 prod externe)",
      "CAC : €38 → €11",
    ],
  },
  {
    company: "Maison Éclat",
    industry: "Fashion · Luxury D2C",
    initials: "ME",
    result: "11.4× ROAS",
    metric2: "€1.2M",
    metric2label: "Q4 Revenue (AI-Driven)",
    metric3: "-71%",
    metric3label: "Waste Reduction",
    quote:
      "As a French luxury brand, targeting precision is everything. AdNova's AI understood the nuance — premium audiences, the right creative at the right moment. Q4 was our best quarter ever.",
    author: "Isabelle Fontaine",
    authorRole: "Digital Director",
    authorPhoto: "https://randomuser.me/api/portraits/women/91.jpg",
    platforms: ["Instagram", "Facebook", "Pinterest", "TikTok"],
    challenge:
      "Luxury fashion requires surgical targeting. Broad campaigns were diluting the brand and wasting spend on non-luxury audiences.",
    solution:
      "AI-built lookalike audiences from highest-LTV customers. Creative rotation optimized for luxury aesthetic. Excluded price-sensitive segments automatically.",
    results: [
      "ROAS reached 11.4× in peak season",
      "€1.2M Q4 revenue from paid channels",
      "71% reduction in wasted spend",
      "Brand safety maintained — 0 off-brand placements",
    ],
  },
  {
    company: "SportZone Retail",
    industry: "Retail · Sports Equipment",
    initials: "SZ",
    result: "+312% Online Revenue",
    metric2: "8.9×",
    metric2label: "Blended ROAS",
    metric3: "$0 → $85K",
    metric3label: "Monthly Ad Spend Scaled",
    quote:
      "We had zero online advertising experience. AdNova AI handled everything — from campaign structure to creative testing. 6 months later, online is now 40% of our total revenue.",
    author: "Mike Torrance",
    authorRole: "CEO",
    authorPhoto: "https://randomuser.me/api/portraits/men/23.jpg",
    platforms: ["Google", "Facebook", "Instagram", "Amazon"],
    challenge:
      "Traditional brick-and-mortar retailer with no digital advertising expertise. Needed to build online revenue stream without dedicated marketing team.",
    solution:
      "Full-funnel AI campaign build-out. AI handled prospecting and retargeting automatically. Product feed optimization for Shopping campaigns on Google and Amazon.",
    results: [
      "Online revenue: 0% → 40% of total",
      "Ad spend scaled to $85K/month profitably",
      "Blended ROAS: 8.9×",
      "Zero marketing hires needed",
    ],
  },
  {
    company: "EduPath Learning",
    industry: "EdTech · Online Education",
    initials: "EP",
    result: "-58% CPA",
    metric2: "4.1× → 7.8×",
    metric2label: "ROAS Improvement",
    metric3: "2,800",
    metric3label: "Monthly New Students",
    quote:
      "Education is a competitive space. AdNova AI's real-time optimization keeps us profitable even as CPCs fluctuate wildly. We scaled from 800 to 2,800 new students/month with the same budget.",
    author: "Sarah Chen",
    authorRole: "Growth Lead",
    authorPhoto: "https://randomuser.me/api/portraits/women/53.jpg",
    platforms: ["Facebook", "Google", "TikTok", "Snapchat"],
    challenge:
      "CPC volatility in education made manual bidding unsustainable. Creative fatigue was a constant issue — needing fresh ads weekly.",
    solution:
      "AI Creative Studio generated 50 variations weekly. Automated A/B testing identified winners in 48 hours. Budget shifted automatically to top performers.",
    results: [
      "CPA reduced by 58%",
      "Monthly new students: 800 → 2,800",
      "Creative fatigue eliminated (new ads generated automatically)",
      "TikTok identified as #1 channel (was previously unused)",
    ],
  },
  {
    company: "HealthFirst Clinics",
    industry: "Healthcare · Local Services",
    initials: "HF",
    result: "+198% Appointments",
    metric2: "$42",
    metric2label: "Cost per Booked Appointment",
    metric3: "23 locations",
    metric3label: "Managed Simultaneously",
    quote:
      "Managing 23 clinic locations across Google ads used to take our team 30 hours/week. AdNova AI does it in the background. Appointment volume doubled while we actually reduced our ad spend.",
    author: "Dr. James Park",
    authorRole: "Marketing Director",
    authorPhoto: "https://randomuser.me/api/portraits/men/74.jpg",
    platforms: ["Google", "Facebook"],
    challenge:
      "Healthcare advertising requires compliance and local targeting precision. Managing campaigns for 23 locations manually was consuming the entire marketing team.",
    solution:
      "AI built location-specific campaigns for all 23 clinics. Automated bid adjustments based on appointment capacity and local competition. HIPAA-compliant creative.",
    results: [
      "Appointment bookings: +198%",
      "Cost per appointment: $42 (down from $127)",
      "Marketing team hours saved: 28/week",
      "All 23 locations managed autonomously",
    ],
  },
];
