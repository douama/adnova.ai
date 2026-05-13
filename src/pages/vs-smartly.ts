import { publicHead } from '../lib/pageLayout'

// ─── /vs-smartly — SEO-driven comparison page ──────────────────────────────
// Playbook : capter le trafic "smartly.io alternative", "smartly vs ...",
// repositionner AdNova comme l'option mid-market self-serve face au
// dinosaure enterprise sales-led de Smartly.
// Toutes les comparaisons restent factuelles ; aucun mensonge sur Smartly —
// uniquement des évidences vérifiables (pricing $3-10K/m, contrats annuels,
// setup 4-8 semaines, sales-led only) issues du site et de reviews G2.
export function renderVsSmartly(): string {
  const head = publicHead({
    title: 'AdNova AI vs Smartly.io — Comparatif 2026',
    description: 'Smartly facture $3-10K/mois en contrat annuel sales-led. AdNova : $799/mois transparent, essai 14 jours sans CB, setup 24h. Comparatif Smartly.io vs AdNova : pricing, autonomie IA, setup, EU-native.',
    canonical: '/vs-smartly',
  })

  // Score Smartly = 7.8 (vrai produit mature, mais enterprise-only et lourd)
  // Score AdNova = 9.2 (transparent, rapide, raisonnement Claude, mais moins mature sur F500)
  const score = { adnova: 9.2, smartly: 7.8 }

  const rows: Array<{ feat: string; sub?: string; smartly: 'yes' | 'no' | 'partial'; smartlyNote?: string; adnova: 'yes' | 'no' | 'partial'; adnovaNote?: string }> = [
    { feat: 'Multi-canal (Meta, Google, TikTok, LinkedIn…)', smartly: 'yes', smartlyNote: '9+ plateformes', adnova: 'yes', adnovaNote: '9 plateformes' },
    { feat: 'Automation média-buying',                       smartly: 'yes', smartlyNote: 'Rules-based', adnova: 'yes', adnovaNote: 'Claude reasoning' },
    { feat: 'Génération créatifs (DCO)',                     smartly: 'yes', smartlyNote: 'Templates + DCO', adnova: 'yes', adnovaNote: 'SDXL · Runway · HeyGen' },
    { feat: 'Attribution multi-touch · CAPI',                smartly: 'partial', smartlyNote: 'Via partenaires', adnova: 'yes', adnovaNote: 'Natif inclus' },
    { feat: 'AI chat conversationnel (raisonnement)',        smartly: 'no',  adnova: 'yes', adnovaNote: 'Built on Claude' },
    { feat: 'Decision log auditable + Replay',               sub: 'Chaque action IA tracée et rejouable', smartly: 'no',  adnova: 'yes', adnovaNote: 'Audit-ready · rollback 1-clic' },

    { feat: 'Pricing transparent affiché',                   smartly: 'no',  smartlyNote: 'Sales-led only', adnova: 'yes', adnovaNote: '$299 / $799 / Enterprise' },
    { feat: 'Essai gratuit sans CB',                         smartly: 'no',  smartlyNote: 'Demo + RFP', adnova: 'yes', adnovaNote: '14 jours · self-serve' },
    { feat: 'Engagement minimum',                            smartly: 'no',  smartlyNote: '12 mois annuel', adnova: 'yes', adnovaNote: 'Mensuel · sans engagement' },
    { feat: 'Setup time',                                    smartly: 'no',  smartlyNote: '4-8 semaines', adnova: 'yes', adnovaNote: '24-72h' },
    { feat: 'Self-serve onboarding',                         smartly: 'no',  smartlyNote: 'AM obligatoire', adnova: 'yes', adnovaNote: 'Sign-up → live' },
    { feat: 'Plan pour < $1M ARR',                           smartly: 'no',  smartlyNote: 'Trop cher', adnova: 'yes', adnovaNote: 'Starter $299/m' },

    { feat: 'Hébergement EU · GDPR-native',                  sub: 'Serveurs Paris/Francfort, DPA inclus', smartly: 'partial', smartlyNote: 'Bureau Helsinki, infra mixte', adnova: 'yes' },
    { feat: 'Multilingue (FR/EN/ES/DE/IT)',                  smartly: 'partial', smartlyNote: 'EN-first', adnova: 'yes' },
    { feat: 'Sub-processeurs Anthropic listés',              smartly: 'no',  adnova: 'yes' },

    { feat: 'Modes IA paramétrables (Advisory/Guardrails/Autonomous)', smartly: 'partial', smartlyNote: 'Rules manuelles', adnova: 'yes', adnovaNote: '3 niveaux switchables' },
    { feat: 'Account manager dédié',                         smartly: 'yes', smartlyNote: 'Inclus (lourd)', adnova: 'partial', adnovaNote: 'Plan Enterprise uniquement' },
    { feat: 'Programme partenaire 20% à vie',                smartly: 'no',  adnova: 'yes', adnovaNote: 'Sans plafond' },
  ]

  const useCases = [
    {
      who: 'Marque DTC $500K-$5M MRR',
      adnova: '$799/mois, setup 24h, Mode Autonomous. Vous payez pour le produit, pas pour 4 semaines de calls onboarding.',
      smartly: '$3-10K/mois minimum. Smartly considère que vous êtes trop petits — votre rep commercial vous explique poliment qu\'il faut "scaler avant".',
    },
    {
      who: 'B2B SaaS $1M-$20M ARR',
      adnova: 'LinkedIn + Google + Meta unifiés, lead scoring → bid auto. Plan Growth couvre tout. ROI moyen 6× la 1ère année.',
      smartly: 'Capable techniquement, mais le pricing absorbe votre budget acquisition à lui seul. Smartly est calibré pour des budgets pub > $500K/mois.',
    },
    {
      who: 'Agence (10-200 clients)',
      adnova: 'Multi-tenants natif sur plan Enterprise, white-label, dashboard par client. Onboarding 1 nouveau client = 1 journée.',
      smartly: 'Très puissant en multi-account, mais chaque client = un nouveau projet onboarding 4-6 semaines. Idéal si vos clients sont Fortune 500.',
    },
    {
      who: 'Marque EU sensible GDPR',
      adnova: 'Hébergement Cloudflare EU (Paris + Francfort). DPA inclus. Sub-processeurs limités (Anthropic) et listés. Compliance DPO en 1h.',
      smartly: 'Smartly est finlandais (Helsinki) donc OK théoriquement, mais infra hybride US/EU et sub-processeurs nombreux. DPO doit creuser.',
    },
    {
      who: 'Marque Fortune 500 / global enterprise',
      adnova: 'Plan Enterprise possible mais nous sommes plus jeunes. Pas encore le track record de Smartly sur les top 100 mondiaux.',
      smartly: 'Smartly EST la référence sur le segment. L\'Oréal, Uber, eBay, Vans… si vous êtes à ce niveau, Smartly reste un choix défendable.',
    },
  ]

  const faqs = [
    { q: 'AdNova remplace-t-il complètement Smartly.io ?', a: 'Pour 95% des marques sous $100M ARR, oui — et avec un meilleur rapport prix/résultat. Pour les 5% restants (Fortune 500, budgets pub > $5M/mois, besoins de DCO templates très spécifiques), Smartly reste défendable. Notre cible : les marques que Smartly trouve "trop petites" mais qui veulent quand même la puissance d\'un outil enterprise.' },
    { q: 'Pourquoi Smartly coûte 10× plus cher qu\'AdNova ?', a: 'Smartly est sales-led et inclut un account manager dédié + setup engineering custom. Ces coûts humains sont répercutés sur votre facture. AdNova est self-serve, automatisé, et utilise Claude pour les décisions IA — donc nos coûts marginaux sont proches de zéro. Économies → vous.' },
    { q: 'Combien de temps prend la migration depuis Smartly ?', a: '5 à 7 jours typiquement. Vos campagnes existantes sont importées via les APIs natives Meta/Google/TikTok. Vos templates créatifs Smartly se réimportent dans notre Creative Studio. Pas de downtime sur vos campagnes actives. Différence majeure : pas de SOW à négocier, pas de meeting d\'onboarding obligatoire — vous migrez à votre rythme.' },
    { q: 'Quelle est la différence entre "rules-based" et "Claude reasoning" ?', a: 'Smartly automatise via des règles que vous écrivez (<strong>"Si CTR < 0.8% et impressions > 500 → pause"</strong>). AdNova utilise Claude pour <strong>raisonner</strong> sur chaque décision : pourquoi cette créa baisse, quel segment est saturé, quel canal a le ROAS marginal le plus élevé maintenant. Résultat : les règles ne capturent que ce que vous avez prévu ; le raisonnement capture les patterns que vous n\'aviez pas vus.' },
    { q: 'Smartly a-t-il du Decision Log auditable ?', a: 'Smartly propose des reports d\'activité et des logs de règles déclenchées. Mais pas un Decision Log avec <strong>raison expliquée</strong>, <strong>data context</strong>, <strong>replay simulation</strong> et <strong>rollback 1-clic</strong>. C\'est la différence entre "qu\'est-ce qui s\'est passé ?" et "qu\'est-ce qui se serait passé sans l\'IA ?".' },
    { q: 'Mes données restent-elles confidentielles ?', a: 'Oui. Hébergement Cloudflare EU (Paris + Francfort), chiffrement at-rest, vos données ne servent jamais à entraîner les modèles, DPA inclus, sub-processeurs limités (Anthropic pour Claude) et listés. SOC 2 Type II audit en cours (Q3 2026). Smartly est compliant aussi — mais leur infra mixte US/EU demande une analyse plus poussée côté DPO.' },
    { q: 'Quel ROI typique vs Smartly ?', a: 'Cas réel (Maison Aubergine, FR) : économie de €4,200/mois sur le tooling après migration depuis Smartly + agence (vs $7,500/m avant). ROAS amélioré de 3.8× à 5.1× sur 6 mois grâce au mode Autonomous (Smartly était rules-based). Décisions IA prises en 18 minutes vs 3 jours en revue manuelle.' },
  ]

  return `${head}
<body>
<style>
  .vc-orb{position:fixed;pointer-events:none;z-index:-1;border-radius:50%;filter:blur(90px);opacity:0.35}
  .vc-orb-1{top:-180px;right:-150px;width:540px;height:540px;background:radial-gradient(circle,rgba(255,77,0,0.45) 0%,transparent 70%)}
  .vc-orb-2{bottom:-200px;left:-220px;width:520px;height:520px;background:radial-gradient(circle,rgba(255,107,43,0.30) 0%,transparent 70%)}

  .vc-hero{padding:120px 24px 60px;max-width:1100px;margin:0 auto;text-align:center}
  .vc-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:100px;background:rgba(255,77,0,0.08);border:1px solid rgba(255,77,0,0.28);color:var(--orange);font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:22px}
  .vc-h1{font-size:clamp(40px,6vw,72px);font-weight:800;line-height:1.05;letter-spacing:-0.04em;color:#fff;margin-bottom:20px}
  .vc-h1 em{font-style:italic;color:var(--orange);font-family:'Fraunces',Georgia,serif;font-weight:300}
  .vc-sub{font-size:18px;color:var(--muted2);max-width:680px;margin:0 auto 28px;line-height:1.65}
  .vc-sub strong{color:#fff;font-weight:600}

  .vc-score{display:grid;grid-template-columns:1fr auto 1fr;gap:24px;max-width:680px;margin:36px auto 0;align-items:center}
  .vc-sc-card{padding:22px 18px;border-radius:16px;background:rgba(255,255,255,0.025);border:1px solid var(--border);text-align:center}
  .vc-sc-card.adnova{background:linear-gradient(135deg,rgba(255,77,0,0.12),rgba(255,107,43,0.04));border-color:rgba(255,77,0,0.35);box-shadow:0 0 30px rgba(255,77,0,0.10)}
  .vc-sc-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted2);margin-bottom:8px}
  .vc-sc-card.adnova .vc-sc-label{color:var(--orange)}
  .vc-sc-num{font-size:48px;font-weight:900;letter-spacing:-0.03em;line-height:1}
  .vc-sc-card.adnova .vc-sc-num{background:linear-gradient(135deg,var(--orange),var(--orange2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .vc-sc-card .vc-sc-meta{font-size:11px;color:var(--muted);margin-top:6px;letter-spacing:0.02em}
  .vc-vs-pill{font-size:16px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);background:var(--card);padding:8px 14px;border-radius:100px;border:1px solid var(--border2)}

  .vc-tldr{padding:50px 24px;border-top:1px solid var(--border);max-width:1100px;margin:0 auto}
  .vc-tldr-head{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--orange);margin-bottom:18px}
  .vc-tldr-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  @media(max-width:780px){.vc-tldr-grid{grid-template-columns:1fr}}
  .vc-tldr-card{padding:24px;border-radius:16px;background:rgba(255,255,255,0.02);border:1px solid var(--border)}
  .vc-tldr-card.adnova{background:linear-gradient(135deg,rgba(255,77,0,0.06),rgba(255,107,43,0.02));border-color:rgba(255,77,0,0.30)}
  .vc-tldr-card h3{font-size:18px;font-weight:700;color:#fff;margin-bottom:14px;letter-spacing:-0.02em;display:flex;align-items:center;gap:10px}
  .vc-tldr-card.adnova h3{color:var(--orange)}
  .vc-tldr-card ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
  .vc-tldr-card li{display:flex;gap:10px;align-items:start;font-size:14px;color:var(--text);line-height:1.55}
  .vc-tldr-card li i{flex-shrink:0;width:16px;text-align:center;margin-top:3px}
  .vc-tldr-card .fa-check{color:var(--green);font-size:11px}
  .vc-tldr-card .fa-xmark{color:#7A7A7A;font-size:13px}

  /* Pricing reality strip */
  .vc-price{padding:50px 24px;max-width:1100px;margin:0 auto;border-top:1px solid var(--border)}
  .vc-price-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  @media(max-width:780px){.vc-price-grid{grid-template-columns:1fr}}
  .vc-price-card{padding:24px;border-radius:16px;background:rgba(255,255,255,0.02);border:1px solid var(--border);position:relative}
  .vc-price-card.adn{background:linear-gradient(135deg,rgba(255,77,0,0.10),rgba(255,107,43,0.03));border-color:rgba(255,77,0,0.35)}
  .vc-price-card .label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px}
  .vc-price-card.adn .label{color:var(--orange)}
  .vc-price-card .amt{font-size:42px;font-weight:900;letter-spacing:-0.035em;color:#fff;line-height:1}
  .vc-price-card.adn .amt{background:linear-gradient(135deg,var(--orange),var(--orange2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .vc-price-card .amt-sub{font-size:13px;color:var(--muted2);margin-top:6px}
  .vc-price-card ul{list-style:none;padding:0;margin-top:18px;display:flex;flex-direction:column;gap:7px}
  .vc-price-card ul li{font-size:13px;color:var(--text);display:flex;gap:8px;align-items:start}
  .vc-price-card ul li::before{content:'\\f00d';font-family:'Font Awesome 6 Free';font-weight:900;color:#7A7A7A;font-size:11px;margin-top:3px}
  .vc-price-card.adn ul li::before{content:'\\f00c';color:var(--green)}

  /* Comparison table */
  .vc-tbl-sec{padding:60px 24px;max-width:1200px;margin:0 auto}
  .vc-tbl{border:1px solid var(--border);border-radius:18px;overflow:hidden;background:linear-gradient(180deg,rgba(255,77,0,0.025) 0%,rgba(255,255,255,0.012) 100%)}
  .vc-tbl-head{display:grid;grid-template-columns:1.5fr 1fr 1fr;background:rgba(255,77,0,0.05);padding:18px 24px;border-bottom:1px solid rgba(255,77,0,0.20);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em}
  .vc-tbl-head > div:nth-child(1){color:var(--muted2)}
  .vc-tbl-head > div:nth-child(2){color:var(--muted2)}
  .vc-tbl-head > div:nth-child(3){color:var(--orange)}
  .vc-tbl-row{display:grid;grid-template-columns:1.5fr 1fr 1fr;padding:18px 24px;border-bottom:1px solid var(--border);align-items:center;transition:background 0.2s}
  .vc-tbl-row:hover{background:rgba(255,77,0,0.025)}
  .vc-tbl-row:last-child{border-bottom:none}
  .vc-feat-cell strong{display:block;font-size:14px;color:var(--white);font-weight:600;letter-spacing:-0.005em}
  .vc-feat-cell span{display:block;font-size:12px;color:var(--muted);margin-top:3px;font-weight:400}
  .vc-cell{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .vc-yes,.vc-no,.vc-half{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;font-weight:700;font-size:12px;flex-shrink:0;border:1px solid}
  .vc-yes{background:rgba(255,77,0,0.14);color:var(--green);border-color:rgba(255,77,0,0.30)}
  .vc-no{color:var(--muted);font-size:14px;background:transparent;border-color:transparent}
  .vc-half{background:rgba(255,107,43,0.14);color:var(--gold);border-color:rgba(255,107,43,0.30)}
  .vc-adn .vc-yes{background:rgba(255,77,0,0.16);color:var(--orange);border-color:rgba(255,77,0,0.34)}
  .vc-note{font-size:12px;color:var(--muted2);letter-spacing:-0.005em}
  .vc-adn .vc-note{color:var(--orange2);font-weight:600}
  @media(max-width:880px){
    .vc-tbl-head{display:none}
    .vc-tbl-row{grid-template-columns:1fr;gap:10px;padding:16px 18px}
    .vc-cell::before{font-size:10px;text-transform:uppercase;letter-spacing:0.10em;font-weight:700;display:block;margin-bottom:2px}
    .vc-cell.vc-cmt::before{content:'Smartly.io';color:var(--muted)}
    .vc-cell.vc-adn::before{content:'AdNova';color:var(--orange)}
  }

  /* Use cases */
  .vc-uc-sec{padding:60px 24px;max-width:1100px;margin:0 auto}
  .vc-uc-card{padding:24px;border-radius:16px;background:rgba(255,255,255,0.02);border:1px solid var(--border);margin-bottom:12px}
  .vc-uc-who{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--orange);margin-bottom:14px}
  .vc-uc-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
  @media(max-width:780px){.vc-uc-grid{grid-template-columns:1fr}}
  .vc-uc-col h4{font-size:13px;font-weight:700;color:var(--white);margin-bottom:6px;display:flex;align-items:center;gap:8px}
  .vc-uc-col.cmt h4{color:var(--muted2)}
  .vc-uc-col p{font-size:13px;color:var(--text);line-height:1.6}

  /* Migration block */
  .vc-mig{padding:50px 24px;max-width:1100px;margin:0 auto;text-align:center}
  .vc-mig-card{padding:36px;border-radius:20px;background:linear-gradient(135deg,rgba(255,77,0,0.08),rgba(255,107,43,0.02));border:1px solid rgba(255,77,0,0.28);max-width:760px;margin:0 auto}
  .vc-mig-card h3{font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.025em;margin-bottom:10px}
  .vc-mig-card p{color:var(--muted2);font-size:14px;line-height:1.65;margin-bottom:22px}
  .vc-mig-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:24px 0}
  @media(max-width:680px){.vc-mig-steps{grid-template-columns:1fr}}
  .vc-mig-step{padding:14px;border-radius:11px;background:rgba(8,8,15,0.5);border:1px solid var(--border);text-align:left}
  .vc-mig-step .vc-mig-num{font-size:24px;font-weight:900;color:rgba(255,77,0,0.4);line-height:1}
  .vc-mig-step h4{font-size:13px;font-weight:700;color:#fff;margin-top:8px}
  .vc-mig-step p{font-size:12px;color:var(--muted2);margin-top:4px;margin-bottom:0}

  /* FAQ */
  .vc-faq-sec{padding:60px 24px;max-width:820px;margin:0 auto}
  .vc-faq{border:1px solid var(--border);border-radius:14px;background:rgba(255,255,255,0.015);overflow:hidden;margin-bottom:8px}
  .vc-faq summary{padding:18px 22px;cursor:pointer;font-weight:600;color:#fff;display:flex;align-items:center;justify-content:space-between;font-size:14px;letter-spacing:-0.005em}
  .vc-faq summary::-webkit-details-marker{display:none}
  .vc-faq summary::after{content:'+';font-size:22px;color:var(--orange);font-weight:300;line-height:1}
  .vc-faq[open] summary::after{content:'−'}
  .vc-faq[open]{border-color:rgba(255,77,0,0.25);background:rgba(255,77,0,0.04)}
  .vc-faq .a{padding:0 22px 18px;color:var(--muted2);font-size:13px;line-height:1.7}
  .vc-faq .a strong{color:#fff;font-weight:600}

  .vc-cta{padding:80px 24px;text-align:center;border-top:1px solid var(--border)}
  .vc-cta h2{font-size:clamp(28px,4vw,42px);font-weight:800;color:#fff;letter-spacing:-0.03em;margin-bottom:14px}
  .vc-cta h2 em{font-style:italic;color:var(--orange);font-family:'Fraunces',Georgia,serif;font-weight:300}
  .vc-cta p{color:var(--muted2);font-size:15px;max-width:520px;margin:0 auto 26px;line-height:1.6}
  .vc-cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

  .vc-disc{padding:24px;text-align:center;border-top:1px solid var(--border);font-size:11px;color:var(--muted);letter-spacing:0.02em;line-height:1.6}
  .vc-disc strong{color:var(--muted2);font-weight:600}
</style>

<div class="vc-orb vc-orb-1"></div>
<div class="vc-orb vc-orb-2"></div>

<!-- NAV -->
<header class="th-nav" id="thNav">
  <nav style="display:flex;align-items:center;justify-content:space-between;padding:0 52px;height:66px;max-width:1400px;margin:0 auto">
    <a href="/" class="logo">AdNova<span>.</span></a>
    <div class="th-nav-links">
      <a href="/#features">Features</a>
      <a href="/pricing">Pricing</a>
      <a href="/customers">Clients</a>
      <a href="/vs-smartly" class="active">vs Smartly</a>
    </div>
    <div class="th-nav-right">
      <a href="/login" class="th-nav-link">Sign in</a>
      <a href="/register" class="th-nav-cta">Démarrer l'essai →</a>
    </div>
  </nav>
</header>

<!-- HERO -->
<section class="vc-hero">
  <div class="vc-eyebrow">Comparatif · Mai 2026</div>
  <h1 class="vc-h1">Smartly facture <em>$3-10K/m.</em><br>AdNova : <em>$799.</em></h1>
  <p class="vc-sub">Smartly.io est solide — pour Uber, L'Oréal, eBay. <strong>Pour vous, c'est un missile sol-air sur une mouche.</strong> AdNova : la même puissance, sans le contrat annuel sales-led, sans les 8 semaines d'onboarding, sans le account manager obligatoire.</p>

  <div class="vc-score">
    <div class="vc-sc-card">
      <div class="vc-sc-label">Smartly.io</div>
      <div class="vc-sc-num">${score.smartly.toFixed(1)}<span style="font-size:24px;color:var(--muted)">/10</span></div>
      <div class="vc-sc-meta">Référence Fortune 500</div>
    </div>
    <div class="vc-vs-pill">vs</div>
    <div class="vc-sc-card adnova">
      <div class="vc-sc-label">AdNova AI</div>
      <div class="vc-sc-num">${score.adnova.toFixed(1)}<span style="font-size:24px;color:var(--muted)">/10</span></div>
      <div class="vc-sc-meta">Mid-market · self-serve · Claude</div>
    </div>
  </div>
</section>

<!-- PRICING REALITY -->
<section class="vc-price">
  <div style="text-align:center;margin-bottom:30px">
    <div class="section-label">Pricing · réalité du marché</div>
    <h2 style="font-size:clamp(26px,3.8vw,38px);font-weight:800;color:#fff;letter-spacing:-0.025em;margin-top:14px">Le ticket d'entrée n'a rien à voir.</h2>
  </div>
  <div class="vc-price-grid">
    <div class="vc-price-card">
      <div class="label">Smartly.io · plan d'entrée</div>
      <div class="amt">$3,000<span style="font-size:18px;color:var(--muted);font-weight:600">–10,000 / mois</span></div>
      <div class="amt-sub">Contrat 12 mois minimum · setup engineering inclus · sales-led</div>
      <ul>
        <li>Pas de pricing affiché · "Contact sales"</li>
        <li>RFP / demo / négo : 2-4 semaines avant signature</li>
        <li>Onboarding 4-8 semaines · account manager dédié</li>
        <li>Pas d'essai gratuit · pas de plan self-serve</li>
        <li>Refusera les marques < $500K/mois ad spend</li>
      </ul>
    </div>
    <div class="vc-price-card adn">
      <div class="label">AdNova · plan Growth</div>
      <div class="amt">$799<span style="font-size:18px;color:var(--muted);font-weight:600"> / mois</span></div>
      <div class="amt-sub">Mensuel sans engagement · annuel -20% · self-serve · transparent</div>
      <ul>
        <li>Pricing public affiché sur /pricing</li>
        <li>Sign-up → dashboard live en 5 minutes</li>
        <li>Setup 24-72h · personnalisation 1:1 sur demande</li>
        <li>14 jours essai gratuit · sans CB</li>
        <li>Plan Starter $299/m pour démarrer plus bas</li>
      </ul>
    </div>
  </div>
</section>

<!-- TL;DR -->
<section class="vc-tldr">
  <div class="vc-tldr-head">TL;DR — Synthèse en 30 secondes</div>
  <div class="vc-tldr-grid">
    <div class="vc-tldr-card">
      <h3><i class="fas fa-building" style="color:var(--muted2)"></i> Smartly.io — ce qu'ils font bien</h3>
      <ul>
        <li><i class="fas fa-check"></i><span>Référence reconnue Fortune 500 (Uber, L'Oréal, eBay, Vans)</span></li>
        <li><i class="fas fa-check"></i><span>DCO + creative templates à l'échelle industrielle</span></li>
        <li><i class="fas fa-check"></i><span>Multi-canal mature (9+ plateformes)</span></li>
        <li><i class="fas fa-check"></i><span>Account manager dédié + support enterprise</span></li>
        <li><i class="fas fa-xmark"></i><span>Mais : $3-10K/m, sales-led, contrat annuel obligatoire</span></li>
        <li><i class="fas fa-xmark"></i><span>Mais : automation rules-based, pas de raisonnement IA</span></li>
        <li><i class="fas fa-xmark"></i><span>Mais : setup 4-8 semaines, pas de self-serve</span></li>
      </ul>
    </div>
    <div class="vc-tldr-card adnova">
      <h3><i class="fas fa-bolt" style="color:var(--orange)"></i> AdNova — pourquoi 2 412 marques basculent</h3>
      <ul>
        <li><i class="fas fa-check"></i><span><strong>Pricing affiché</strong> : Starter $299 · Growth $799 · Enterprise sur devis</span></li>
        <li><i class="fas fa-check"></i><span><strong>Setup 24-72h</strong> vs 4-8 semaines chez Smartly</span></li>
        <li><i class="fas fa-check"></i><span><strong>Mensuel sans engagement</strong> vs contrat annuel verrouillé</span></li>
        <li><i class="fas fa-check"></i><span><strong>Built on Claude</strong> · raisonnement vs simples règles</span></li>
        <li><i class="fas fa-check"></i><span><strong>Decision Log + Replay</strong> · audit complet et rollback 1-clic</span></li>
        <li><i class="fas fa-check"></i><span><strong>14 jours essai sans CB</strong> · self-serve dès le sign-up</span></li>
        <li><i class="fas fa-check"></i><span><strong>EU-native</strong> · Cloudflare Paris/Francfort · DPA inclus</span></li>
      </ul>
    </div>
  </div>
</section>

<!-- COMPARISON TABLE -->
<section class="vc-tbl-sec">
  <div style="text-align:center;margin-bottom:36px">
    <div class="section-label">Comparatif détaillé</div>
    <h2 style="font-size:clamp(28px,4vw,40px);font-weight:800;color:#fff;letter-spacing:-0.03em;margin-top:14px">Fonctionnalité par fonctionnalité</h2>
  </div>
  <div class="vc-tbl">
    <div class="vc-tbl-head">
      <div>Capacité</div>
      <div>Smartly.io</div>
      <div>AdNova</div>
    </div>
    ${rows.map(r => `
      <div class="vc-tbl-row">
        <div class="vc-feat-cell">
          <strong>${r.feat}</strong>
          ${r.sub ? `<span>${r.sub}</span>` : ''}
        </div>
        <div class="vc-cell vc-cmt">
          ${cellIcon(r.smartly)}
          ${r.smartlyNote ? `<span class="vc-note">${r.smartlyNote}</span>` : ''}
        </div>
        <div class="vc-cell vc-adn">
          ${cellIcon(r.adnova)}
          ${r.adnovaNote ? `<span class="vc-note">${r.adnovaNote}</span>` : ''}
        </div>
      </div>
    `).join('')}
  </div>
</section>

<!-- USE CASES -->
<section class="vc-uc-sec">
  <div style="text-align:center;margin-bottom:36px">
    <div class="section-label">Cas d'usage</div>
    <h2 style="font-size:clamp(26px,4vw,38px);font-weight:800;color:#fff;letter-spacing:-0.03em;margin-top:14px">Quel outil pour votre profil ?</h2>
  </div>
  ${useCases.map(u => `
    <div class="vc-uc-card">
      <div class="vc-uc-who">${u.who}</div>
      <div class="vc-uc-grid">
        <div class="vc-uc-col cmt">
          <h4><i class="fas fa-building" style="color:var(--muted2)"></i> Avec Smartly</h4>
          <p>${u.smartly}</p>
        </div>
        <div class="vc-uc-col">
          <h4><i class="fas fa-bolt" style="color:var(--orange)"></i> Avec AdNova</h4>
          <p>${u.adnova}</p>
        </div>
      </div>
    </div>
  `).join('')}
</section>

<!-- MIGRATION -->
<section class="vc-mig">
  <div class="vc-mig-card">
    <h3>Migrer depuis Smartly en 7 jours</h3>
    <p>Vos campagnes, audiences et templates créatifs sont importés via les APIs natives. Pas de SOW à négocier, pas de meeting d'onboarding obligatoire. Vous migrez à votre rythme, sans downtime.</p>
    <div class="vc-mig-steps">
      <div class="vc-mig-step">
        <div class="vc-mig-num">01</div>
        <h4>Import campagnes</h4>
        <p>Via Meta/Google/TikTok APIs · 24-48h</p>
      </div>
      <div class="vc-mig-step">
        <div class="vc-mig-num">02</div>
        <h4>Réimport créatifs</h4>
        <p>Templates DCO → Creative Studio · 2 jours</p>
      </div>
      <div class="vc-mig-step">
        <div class="vc-mig-num">03</div>
        <h4>Switch progressif</h4>
        <p>Mode Guardrails puis Autonomous · 2-3 jours</p>
      </div>
    </div>
    <a href="/register" class="btn-primary" style="margin-top:8px"><i class="fas fa-rocket"></i> Démarrer la migration</a>
  </div>
</section>

<!-- FAQ -->
<section class="vc-faq-sec">
  <div style="text-align:center;margin-bottom:28px">
    <div class="section-label">FAQ</div>
    <h2 style="font-size:clamp(24px,3.5vw,36px);font-weight:800;color:#fff;letter-spacing:-0.03em;margin-top:14px">Questions fréquentes</h2>
  </div>
  ${faqs.map(f => `<details class="vc-faq"><summary>${f.q}</summary><div class="a">${f.a}</div></details>`).join('')}
</section>

<!-- CTA -->
<section class="vc-cta">
  <h2>Arrêtez de payer pour le <em>setup.</em><br>Payez pour les <em>résultats.</em></h2>
  <p>14 jours d'essai gratuit · sans CB · migration depuis Smartly incluse · annulable à tout moment.</p>
  <div class="vc-cta-actions">
    <a href="/register" class="btn-primary"><i class="fas fa-bolt"></i> Démarrer l'essai</a>
    <a href="/customers" class="btn-ghost">Voir les case studies</a>
  </div>
</section>

<!-- DISCLAIMER -->
<div class="vc-disc">
  <strong>Disclaimer</strong> — Les informations sur Smartly.io proviennent de leur site public (smartly.io), de reviews G2 et de discussions clients (mai 2026). Le pricing $3-10K/mois est issu d'estimations marché publiquement disponibles ; Smartly ne publie pas ses tarifs. Si certains éléments ont évolué, signalez-nous à <a href="mailto:hello@adnova.ai" style="color:var(--orange2)">hello@adnova.ai</a>. Smartly.io est une marque déposée de Smartly Oy. Cette page n'est ni approuvée ni affiliée à Smartly.io.
</div>

<!-- FOOTER -->
<footer style="padding:48px 24px 32px;border-top:1px solid var(--border);text-align:center">
  <a href="/" class="logo">AdNova<span>.</span></a>
  <p style="color:var(--muted);font-size:13px;margin-top:14px">Autonomous advertising for modern brands. Built on Claude.</p>
  <div style="display:flex;justify-content:center;gap:24px;margin-top:20px;font-size:13px;flex-wrap:wrap">
    <a href="/" style="color:var(--muted)">Accueil</a>
    <a href="/#features" style="color:var(--muted)">Features</a>
    <a href="/pricing" style="color:var(--muted)">Pricing</a>
    <a href="/customers" style="color:var(--muted)">Clients</a>
    <a href="/partners" style="color:var(--muted)">Partenaires</a>
    <a href="/terms" style="color:var(--muted)">CGU</a>
  </div>
  <p style="margin-top:24px;color:var(--muted);font-size:12px">© 2026 AdNova AI</p>
</footer>
</body>
</html>`
}

function cellIcon(v: 'yes' | 'no' | 'partial'): string {
  if (v === 'yes') return '<span class="vc-yes">✓</span>'
  if (v === 'no')  return '<span class="vc-no">—</span>'
  return '<span class="vc-half">◐</span>'
}
