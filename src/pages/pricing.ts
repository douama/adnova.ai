import { publicHead } from '../lib/pageLayout'

// ─── /pricing — transparent pricing + ROI calculator ───────────────────────
// Anti-Smartly play: pricing affiché en clair, ROI calculé en direct par le
// visiteur. Pas de "Talk to sales" obligatoire pour voir un chiffre.
export function renderPricing(): string {
  const head = publicHead({
    title: 'Pricing transparent — AdNova AI',
    description: 'Pricing affiché en clair. 3 plans : Starter $299/m · Growth $799/m · Enterprise. Pas de démo obligatoire, pas de devis caché. Calculez votre ROI en 30 secondes.',
    canonical: '/pricing',
  })

  const plans = [
    {
      key: 'starter', name: 'Starter',
      tagline: 'Pour valider le concept · marques en early-stage',
      priceM: 299, priceA: 239, badge: '',
      cta: 'Démarrer l\'essai', ctaHref: '/register',
      includes: [
        ['1 plateforme pub', 'Au choix : Meta, Google, TikTok, LinkedIn'],
        ['5 campagnes actives', 'Plus possible en réservé sur demande'],
        ['IA mode Advisory', 'L\'IA recommande, vous validez chaque action'],
        ['Multi-touch attribution', 'Server-side CAPI inclus'],
        ['Génération créatifs · 30 /mois', 'SDXL + copy AI'],
        ['Reports Slack hebdo', 'Format markdown · livraison auto'],
        ['Decision Log', '30 jours d\'historique audit'],
        ['Support email', 'Réponse sous 24h ouvrées'],
      ],
      excludes: [
        'Génération vidéo (Runway, HeyGen)',
        'Mode Autonomous (l\'IA agit seule)',
        'Multi-tenants',
      ],
    },
    {
      key: 'growth', name: 'Growth', tagline: 'Le plus populaire · marques $500K-$10M MRR',
      priceM: 799, priceA: 639, badge: 'Most popular',
      cta: 'Démarrer l\'essai', ctaHref: '/register',
      includes: [
        ['9 plateformes pub', 'Meta, Google, TikTok, LinkedIn, Snapchat, Pinterest, X, YouTube, Amazon'],
        ['Campagnes illimitées', 'Pas de cap'],
        ['IA mode Autonomous + Guardrails', 'Vous fixez les bornes, l\'IA exécute'],
        ['Génération créatifs · illimitée', 'SDXL + Runway + HeyGen + Claude copy'],
        ['Decision Log complet', '12 mois d\'historique · Replay · Rollback'],
        ['A/B testing auto', 'L\'IA déclare le gagnant en 48-72h'],
        ['Reports Slack temps réel', 'Channel dédié + résumés quotidiens'],
        ['Reallocation budget cross-plateforme', 'Auto · 4× par jour'],
        ['Audience expansion auto', 'Lookalike 1% → 10% dynamique'],
        ['Support prioritaire · Slack Connect', 'Réponse sous 2h en jour ouvré'],
      ],
      excludes: [
        'Multi-tenants (agences)',
        'White-label',
        'SSO / SAML',
      ],
    },
    {
      key: 'enterprise', name: 'Enterprise', tagline: 'Agences · groupes · marques EU régulées',
      priceM: 0, priceA: 0, badge: 'Custom',
      cta: 'Parler à l\'équipe', ctaHref: 'mailto:sales@adnova.ai?subject=Demande%20Enterprise',
      includes: [
        ['Tout Growth +'],
        ['Multi-tenants illimité', 'Idéal pour agences (10 → 1 000 clients)'],
        ['White-label complet', 'Votre domaine, votre marque, vos couleurs'],
        ['SSO / SAML / SCIM', 'Okta, Azure AD, Google Workspace'],
        ['DPA + sub-processeurs custom', 'Hébergement EU dédié possible'],
        ['SOC 2 Type II + ISO 27001', 'Audits en cours · livrables sur demande'],
        ['Account manager dédié', 'Onboarding 1:1 · QBR trimestriels'],
        ['Custom kill-rules + ML training', 'Modèles fine-tunés sur votre data'],
        ['SLA 99.95% + uptime credits', 'Pénalités contractuelles incluses'],
        ['Support 24/7 · téléphone direct', 'Astreinte production'],
      ],
      excludes: [],
    },
  ]

  const faqs = [
    { q: 'Pourquoi pas de "Contact us for pricing" comme Smartly.io ?', a: 'Parce qu\'on respecte votre temps. Vous devez pouvoir évaluer si AdNova est dans votre budget en 30 secondes, sans appel commercial, sans RFP, sans 4 semaines de négo. Smartly facture $3-10K/mois — chez eux le sales-led se justifie par l\'account manager dédié inclus. Nous, on n\'a rien à cacher.' },
    { q: 'L\'essai gratuit demande-t-il une carte bancaire ?', a: 'Non. 14 jours, fonctionnalités complètes du plan Growth, aucune CB requise. À J+14 si vous ne souscrivez pas, votre compte passe en lecture seule (vos données restent 30 jours, exportables).' },
    { q: 'Que veulent dire "Advisory", "Guardrails", "Autonomous" ?', a: '<strong>Advisory</strong> : l\'IA recommande chaque action, vous cliquez "Appliquer". <strong>Guardrails</strong> : vous fixez des bornes (ROAS min 3.5×, budget max $5K/jour, scale max 15%/24h…) et l\'IA agit librement dans ces bornes. <strong>Autonomous</strong> : l\'IA décide seule, vous auditez via le Decision Log. Vous switchez à tout moment depuis le dashboard.' },
    { q: 'Quel ROI vs un media-buyer freelance ?', a: 'En moyenne 4× la 1ère année. Un media-buyer senior coûte $3-8K/mois et gère 1 à 3 marques. AdNova coûte $299-799/mois, gère sans plafond et tourne 24/7. Cas réel (Maison Aubergine) : €19K/mois économisés (freelance + agence) après migration, ROAS +34%.' },
    { q: 'Que se passe-t-il si je dépasse le plan Starter ?', a: 'Vous recevez un email à 80% d\'usage (campagnes ou créatifs). Vous pouvez upgrade en 1 clic vers Growth. Aucune surfacturation cachée — si vous restez sur Starter et dépassez, vos campagnes au-delà du cap sont mises en pause, pas re-tarifées.' },
    { q: 'Engagement minimum ?', a: 'Aucun. Tout est mensuel sans engagement. L\'annuel donne -20% si vous voulez verrouiller le prix. Annulation en 1 clic depuis le dashboard, accès jusqu\'à la fin de la période payée.' },
    { q: 'Hébergement EU et GDPR ?', a: 'Cloudflare Workers EU (Paris + Francfort). Vos données ne quittent pas l\'UE sauf sous-processeur Anthropic (Claude, sous SCC). DPA inclus dans le contrat, sub-processeurs listés sur /privacy. Compliance LPD suisse OK aussi.' },
  ]

  return `${head}
<body>
<style>
  .pr-orb{position:fixed;pointer-events:none;z-index:-1;border-radius:50%;filter:blur(90px);opacity:0.35}
  .pr-orb-1{top:-200px;right:-150px;width:540px;height:540px;background:radial-gradient(circle,rgba(255,77,0,0.45) 0%,transparent 70%)}
  .pr-orb-2{bottom:-200px;left:-220px;width:520px;height:520px;background:radial-gradient(circle,rgba(255,107,43,0.30) 0%,transparent 70%)}

  /* Hero */
  .pr-hero{padding:120px 24px 40px;max-width:1100px;margin:0 auto;text-align:center}
  .pr-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:100px;background:rgba(255,77,0,0.08);border:1px solid rgba(255,77,0,0.28);color:var(--orange);font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:22px}
  .pr-eyebrow::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 10px var(--green);animation:prB 1.6s ease infinite}
  @keyframes prB{0%,100%{opacity:1}50%{opacity:0.3}}
  .pr-h1{font-size:clamp(40px,6vw,72px);font-weight:800;line-height:1.05;letter-spacing:-0.04em;color:#fff;margin-bottom:18px}
  .pr-h1 em{font-style:italic;color:var(--orange);font-family:'Fraunces',Georgia,serif;font-weight:300}
  .pr-sub{font-size:18px;color:var(--muted2);max-width:680px;margin:0 auto 36px;line-height:1.65}
  .pr-sub strong{color:#fff;font-weight:600}

  /* Billing toggle */
  .pr-toggle-wrap{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:36px}
  .pr-toggle-label{font-size:13px;color:var(--muted2);font-weight:600;letter-spacing:-0.005em}
  .pr-toggle-label.active{color:#fff}
  .pr-toggle{position:relative;width:52px;height:28px;border-radius:100px;background:rgba(255,255,255,0.06);border:1px solid var(--border2);cursor:pointer;transition:background 0.2s}
  .pr-toggle.on{background:rgba(255,77,0,0.20);border-color:rgba(255,77,0,0.40)}
  .pr-toggle-knob{position:absolute;top:2px;left:2px;width:22px;height:22px;border-radius:50%;background:#fff;transition:transform 0.25s;box-shadow:0 2px 8px rgba(0,0,0,0.4)}
  .pr-toggle.on .pr-toggle-knob{transform:translateX(24px);background:var(--orange)}
  .pr-save-pill{display:inline-flex;align-items:center;padding:2px 8px;border-radius:100px;background:rgba(255,77,0,0.14);color:var(--green);font-size:11px;font-weight:700;letter-spacing:0.04em;margin-left:6px}

  /* Plans grid */
  .pr-plans-sec{padding:0 24px 60px;max-width:1280px;margin:0 auto}
  .pr-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  @media(max-width:980px){.pr-plans{grid-template-columns:1fr}}
  .pr-plan{padding:30px;border-radius:20px;background:rgba(255,255,255,0.022);border:1px solid var(--border);position:relative;display:flex;flex-direction:column;transition:all 0.3s}
  .pr-plan:hover{border-color:rgba(255,77,0,0.25);transform:translateY(-4px)}
  .pr-plan.featured{background:linear-gradient(135deg,rgba(255,77,0,0.10),rgba(255,107,43,0.02));border-color:rgba(255,77,0,0.35);box-shadow:0 0 30px rgba(255,77,0,0.10)}
  .pr-plan-badge{position:absolute;top:18px;right:18px;background:var(--orange);color:#fff;font-size:10px;font-weight:700;padding:3px 9px;border-radius:100px;text-transform:uppercase;letter-spacing:0.08em}
  .pr-plan-name{font-size:13px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.12em}
  .pr-plan.featured .pr-plan-name{color:var(--orange)}
  .pr-plan-tag{font-size:13px;color:var(--muted2);margin-top:6px;line-height:1.5;min-height:38px}
  .pr-plan-price{display:flex;align-items:baseline;gap:6px;margin:24px 0 4px}
  .pr-plan-amount{font-size:56px;font-weight:900;letter-spacing:-0.04em;color:#fff;line-height:1}
  .pr-plan.featured .pr-plan-amount{background:linear-gradient(135deg,var(--orange),var(--orange2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .pr-plan-period{font-size:14px;color:var(--muted);font-weight:500}
  .pr-plan-billed{font-size:12px;color:var(--muted);margin-bottom:24px;letter-spacing:0.02em}
  .pr-plan-cta{display:block;text-align:center;padding:14px 20px;border-radius:11px;font-size:14px;font-weight:700;text-decoration:none;transition:all 0.25s;letter-spacing:-0.005em;margin-bottom:24px}
  .pr-plan:not(.featured) .pr-plan-cta{background:rgba(255,255,255,0.04);color:#fff;border:1px solid var(--border2)}
  .pr-plan:not(.featured) .pr-plan-cta:hover{background:rgba(255,77,0,0.08);border-color:rgba(255,77,0,0.40);color:var(--orange)}
  .pr-plan.featured .pr-plan-cta{background:var(--orange);color:#fff}
  .pr-plan.featured .pr-plan-cta:hover{background:var(--orange2);box-shadow:0 12px 36px rgba(255,77,0,0.40);transform:translateY(-2px)}
  .pr-plan-divider{height:1px;background:var(--border);margin-bottom:18px}
  .pr-plan-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:11px;flex:1}
  .pr-plan-feat{display:flex;gap:10px;align-items:start;font-size:13px;color:var(--text);line-height:1.5}
  .pr-plan-feat i{color:var(--green);font-size:11px;margin-top:5px;flex-shrink:0}
  .pr-plan.featured .pr-plan-feat i{color:var(--orange)}
  .pr-plan-feat strong{color:#fff;font-weight:600;display:block}
  .pr-plan-feat span{color:var(--muted);font-size:12px;display:block;margin-top:2px;font-weight:400}
  .pr-plan-excl{margin-top:18px;padding-top:18px;border-top:1px solid var(--border)}
  .pr-plan-excl-h{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:10px}
  .pr-plan-excl-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:7px}
  .pr-plan-excl-list li{font-size:12px;color:var(--muted);display:flex;gap:9px;align-items:center}
  .pr-plan-excl-list li::before{content:'×';color:var(--muted);font-size:14px}

  /* ROI calculator */
  .pr-roi-sec{padding:60px 24px;max-width:1100px;margin:0 auto;border-top:1px solid var(--border)}
  .pr-roi-card{padding:36px;border-radius:24px;background:linear-gradient(135deg,rgba(255,77,0,0.10),rgba(8,8,15,0.4));border:1px solid rgba(255,77,0,0.28);position:relative;overflow:hidden}
  .pr-roi-card::before{content:'';position:absolute;top:0;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,77,0,0.6) 50%,transparent);filter:blur(0.5px)}
  .pr-roi-head{margin-bottom:28px;text-align:center}
  .pr-roi-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:5px 12px;border-radius:100px;background:rgba(255,77,0,0.10);border:1px solid rgba(255,77,0,0.30);color:var(--orange);font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;margin-bottom:14px}
  .pr-roi-card h2{font-size:clamp(26px,4vw,38px);font-weight:800;color:#fff;letter-spacing:-0.025em;margin-bottom:8px}
  .pr-roi-card h2 em{font-style:italic;color:var(--orange);font-family:'Fraunces',Georgia,serif;font-weight:300}
  .pr-roi-card p{color:var(--muted2);font-size:14px;max-width:560px;margin:0 auto;line-height:1.6}

  .pr-roi-form{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin:32px 0}
  @media(max-width:780px){.pr-roi-form{grid-template-columns:1fr}}
  .pr-roi-field label{display:block;font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.10em;margin-bottom:8px;font-weight:600}
  .pr-roi-field input,.pr-roi-field select{width:100%;padding:13px 14px;border-radius:11px;background:var(--card);border:1px solid var(--border);color:#fff;font-size:14px;outline:none;transition:border-color 0.15s,box-shadow 0.15s;color-scheme:dark;font-family:'Geist',system-ui,sans-serif}
  .pr-roi-field input:focus,.pr-roi-field select:focus{border-color:var(--orange);box-shadow:0 0 0 3px rgba(255,77,0,0.12)}
  .pr-roi-field-meta{font-size:11px;color:var(--muted);margin-top:5px;letter-spacing:0.02em}

  .pr-roi-out{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:8px}
  @media(max-width:780px){.pr-roi-out{grid-template-columns:1fr}}
  .pr-roi-stat{padding:18px;border-radius:14px;background:rgba(8,8,15,0.5);border:1px solid var(--border);text-align:center}
  .pr-roi-stat.hero{background:linear-gradient(135deg,rgba(255,77,0,0.14),rgba(255,107,43,0.04));border-color:rgba(255,77,0,0.35)}
  .pr-roi-stat-l{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.10em;font-weight:600;margin-bottom:8px}
  .pr-roi-stat.hero .pr-roi-stat-l{color:var(--orange)}
  .pr-roi-stat-v{font-size:36px;font-weight:900;letter-spacing:-0.03em;color:#fff;line-height:1}
  .pr-roi-stat.hero .pr-roi-stat-v{background:linear-gradient(135deg,var(--orange),var(--orange2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .pr-roi-stat-sub{font-size:11px;color:var(--muted);margin-top:5px;letter-spacing:0.02em}

  .pr-roi-breakdown{margin-top:24px;padding-top:24px;border-top:1px solid var(--border)}
  .pr-roi-bk-h{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-bottom:14px;text-align:center}
  .pr-roi-bk-list{display:flex;flex-direction:column;gap:9px;max-width:520px;margin:0 auto}
  .pr-roi-bk-row{display:flex;justify-content:space-between;align-items:center;padding:9px 13px;border-radius:9px;background:rgba(255,255,255,0.02);border:1px solid var(--border);font-size:13px}
  .pr-roi-bk-row.save{background:rgba(255,77,0,0.06);border-color:rgba(255,77,0,0.25)}
  .pr-roi-bk-row.save .pr-roi-bk-val{color:var(--green);font-weight:700}
  .pr-roi-bk-lbl{color:var(--text)}
  .pr-roi-bk-val{font-weight:600;color:#fff;font-variant-numeric:tabular-nums}

  /* Replaces stack */
  .pr-stack-sec{padding:60px 24px;max-width:1100px;margin:0 auto}
  .pr-stack-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
  @media(max-width:780px){.pr-stack-grid{grid-template-columns:1fr}}
  .pr-stack-col{padding:24px;border-radius:18px;background:rgba(255,255,255,0.02);border:1px solid var(--border)}
  .pr-stack-col.adn{background:linear-gradient(135deg,rgba(255,77,0,0.06),rgba(255,107,43,0.02));border-color:rgba(255,77,0,0.30)}
  .pr-stack-col h3{font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin-bottom:14px;display:flex;align-items:center;gap:9px}
  .pr-stack-col.adn h3{color:var(--orange)}
  .pr-stack-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px}
  .pr-stack-row:last-of-type{border-bottom:none}
  .pr-stack-row .lbl{color:var(--text)}
  .pr-stack-row .price{color:var(--muted2);font-weight:600;font-variant-numeric:tabular-nums}
  .pr-stack-col .total{margin-top:14px;padding-top:14px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;font-size:14px;font-weight:700;color:#fff}
  .pr-stack-col .total .price{color:var(--white);font-size:22px}
  .pr-stack-col.adn .total .price{color:var(--orange);font-size:22px}

  /* FAQ */
  .pr-faq-sec{padding:60px 24px;max-width:820px;margin:0 auto}
  .pr-faq{border:1px solid var(--border);border-radius:14px;background:rgba(255,255,255,0.015);overflow:hidden;margin-bottom:8px}
  .pr-faq summary{padding:18px 22px;cursor:pointer;font-weight:600;color:#fff;display:flex;align-items:center;justify-content:space-between;font-size:14px;letter-spacing:-0.005em}
  .pr-faq summary::-webkit-details-marker{display:none}
  .pr-faq summary::after{content:'+';font-size:22px;color:var(--orange);font-weight:300;line-height:1}
  .pr-faq[open] summary::after{content:'−'}
  .pr-faq[open]{border-color:rgba(255,77,0,0.25);background:rgba(255,77,0,0.04)}
  .pr-faq .a{padding:0 22px 18px;color:var(--muted2);font-size:13px;line-height:1.7}
  .pr-faq .a strong{color:#fff;font-weight:600}

  /* CTA */
  .pr-cta{padding:80px 24px;text-align:center;border-top:1px solid var(--border)}
  .pr-cta h2{font-size:clamp(28px,4vw,42px);font-weight:800;color:#fff;letter-spacing:-0.03em;margin-bottom:14px}
  .pr-cta h2 em{font-style:italic;color:var(--orange);font-family:'Fraunces',Georgia,serif;font-weight:300}
  .pr-cta p{color:var(--muted2);font-size:15px;max-width:520px;margin:0 auto 26px;line-height:1.6}
</style>

<div class="pr-orb pr-orb-1"></div>
<div class="pr-orb pr-orb-2"></div>

<!-- NAV -->
<header class="th-nav" id="thNav">
  <nav style="display:flex;align-items:center;justify-content:space-between;padding:0 52px;height:66px;max-width:1400px;margin:0 auto">
    <a href="/" class="logo">AdNova<span>.</span></a>
    <div class="th-nav-links">
      <a href="/#features">Features</a>
      <a href="/pricing" class="active">Pricing</a>
      <a href="/customers">Clients</a>
      <a href="/vs-smartly">vs Smartly</a>
    </div>
    <div class="th-nav-right">
      <a href="/login" class="th-nav-link">Sign in</a>
      <a href="/register" class="th-nav-cta">Démarrer l'essai →</a>
    </div>
  </nav>
</header>

<!-- HERO -->
<section class="pr-hero">
  <div class="pr-eyebrow">Pricing transparent · pas de démo obligatoire</div>
  <h1 class="pr-h1">Le prix, en clair.<br><em>Direct.</em></h1>
  <p class="pr-sub">Pas de "Talk to sales" obligatoire. Pas de devis caché. <strong>3 plans, 3 prix, tout l'inclus en clair.</strong> Décidez en 30 secondes si AdNova est dans votre budget.</p>

  <div class="pr-toggle-wrap">
    <span class="pr-toggle-label active" id="lbl-m">Mensuel</span>
    <div class="pr-toggle" id="billingToggle" onclick="toggleBilling()">
      <div class="pr-toggle-knob"></div>
    </div>
    <span class="pr-toggle-label" id="lbl-a">Annuel <span class="pr-save-pill">-20%</span></span>
  </div>
</section>

<!-- PLANS -->
<section class="pr-plans-sec">
  <div class="pr-plans">
    ${plans.map(p => `
      <div class="pr-plan ${p.key === 'growth' ? 'featured' : ''}">
        ${p.badge ? `<div class="pr-plan-badge">${p.badge}</div>` : ''}
        <div class="pr-plan-name">${p.name}</div>
        <div class="pr-plan-tag">${p.tagline}</div>
        <div class="pr-plan-price">
          ${p.priceM === 0
            ? '<span class="pr-plan-amount" style="font-size:36px">Sur devis</span>'
            : `<span class="pr-plan-amount" data-m="${p.priceM}" data-a="${p.priceA}">$${p.priceM}</span><span class="pr-plan-period">/mois</span>`}
        </div>
        <div class="pr-plan-billed" data-m="Facturé mensuellement" data-a="Facturé annuellement · ${p.priceA ? `$${p.priceA*12} /an` : ''}">${p.priceM === 0 ? 'Tarif personnalisé · contractuel' : 'Facturé mensuellement'}</div>
        <a href="${p.ctaHref}" class="pr-plan-cta">${p.cta} →</a>
        <div class="pr-plan-divider"></div>
        <ul class="pr-plan-list">
          ${p.includes.map(([h, s]) => `<li class="pr-plan-feat"><i class="fas fa-check"></i><div><strong>${h}</strong>${s ? `<span>${s}</span>` : ''}</div></li>`).join('')}
        </ul>
        ${p.excludes.length > 0 ? `
          <div class="pr-plan-excl">
            <div class="pr-plan-excl-h">Pas inclus</div>
            <ul class="pr-plan-excl-list">${p.excludes.map(e => `<li>${e}</li>`).join('')}</ul>
          </div>
        ` : ''}
      </div>
    `).join('')}
  </div>
</section>

<!-- ROI CALCULATOR -->
<section class="pr-roi-sec" id="roi">
  <div class="pr-roi-card">
    <div class="pr-roi-head">
      <div class="pr-roi-eyebrow"><i class="fas fa-calculator"></i> Calculateur ROI</div>
      <h2>Combien AdNova vous fait <em>économiser ?</em></h2>
      <p>Comparez votre stack actuel (Smartly.io / media-buyer / agence créa) au coût AdNova. Calcul en direct.</p>
    </div>

    <div class="pr-roi-form">
      <div class="pr-roi-field">
        <label>Budget pub mensuel</label>
        <input id="roi-budget" type="number" min="1000" step="500" value="50000" oninput="updateROI()"/>
        <div class="pr-roi-field-meta">$ · ad spend sur toutes plateformes</div>
      </div>
      <div class="pr-roi-field">
        <label>ROAS actuel</label>
        <input id="roi-roas" type="number" min="0.5" max="20" step="0.1" value="3.2" oninput="updateROI()"/>
        <div class="pr-roi-field-meta">× · ratio revenue / spend</div>
      </div>
      <div class="pr-roi-field">
        <label>Stack actuel</label>
        <select id="roi-stack" onchange="updateROI()">
          <option value="basic">Media-buyer freelance seul ($5K/m)</option>
          <option value="standard" selected>Smartly.io plan d'entrée ($3K/m + AM inclus)</option>
          <option value="advanced">Smartly.io + agence créa ($3K + $8K/m)</option>
          <option value="enterprise">Smartly.io enterprise + 2 agences ($10K + $12K/m)</option>
        </select>
        <div class="pr-roi-field-meta">Configuration legacy typique</div>
      </div>
    </div>

    <div class="pr-roi-out">
      <div class="pr-roi-stat">
        <div class="pr-roi-stat-l">Coût stack actuel</div>
        <div class="pr-roi-stat-v" id="roi-current">$13,499</div>
        <div class="pr-roi-stat-sub">par mois</div>
      </div>
      <div class="pr-roi-stat">
        <div class="pr-roi-stat-l">Coût AdNova Growth</div>
        <div class="pr-roi-stat-v" id="roi-adnova">$799</div>
        <div class="pr-roi-stat-sub">par mois · -94%</div>
      </div>
      <div class="pr-roi-stat hero">
        <div class="pr-roi-stat-l">Économie totale (12 mois)</div>
        <div class="pr-roi-stat-v" id="roi-saved">$152,400</div>
        <div class="pr-roi-stat-sub">+ uplift ROAS</div>
      </div>
    </div>

    <div class="pr-roi-breakdown">
      <div class="pr-roi-bk-h">Détail · économies & uplift annuels</div>
      <div class="pr-roi-bk-list">
        <div class="pr-roi-bk-row save"><span class="pr-roi-bk-lbl">Économie tooling (Smartly.io / DCO platform)</span><span class="pr-roi-bk-val" id="bk-tool">+$5,988</span></div>
        <div class="pr-roi-bk-row save"><span class="pr-roi-bk-lbl">Économie media-buyer freelance</span><span class="pr-roi-bk-val" id="bk-mb">+$60,000</span></div>
        <div class="pr-roi-bk-row save"><span class="pr-roi-bk-lbl">Économie agence créative</span><span class="pr-roi-bk-val" id="bk-ag">+$96,000</span></div>
        <div class="pr-roi-bk-row save"><span class="pr-roi-bk-lbl">Uplift revenue (ROAS +30% moyen)</span><span class="pr-roi-bk-val" id="bk-uplift">+$180,000</span></div>
        <div class="pr-roi-bk-row"><span class="pr-roi-bk-lbl">Coût AdNova Growth</span><span class="pr-roi-bk-val" id="bk-adn" style="color:#7A7A7A">−$9,588</span></div>
      </div>
      <div style="text-align:center;margin-top:18px">
        <a href="/register" class="btn-primary"><i class="fas fa-rocket"></i> Démarrer · calculer votre vrai ROI</a>
      </div>
    </div>
  </div>
</section>

<!-- WHAT IT REPLACES -->
<section class="pr-stack-sec">
  <div style="text-align:center;margin-bottom:30px">
    <div class="section-label">Ce qu'AdNova remplace</div>
    <h2 style="font-size:clamp(26px,3.8vw,38px);font-weight:800;color:#fff;letter-spacing:-0.025em;margin-top:14px">Une seule facture. <em style="font-family:'Fraunces',Georgia,serif;font-style:italic;color:var(--orange);font-weight:300">Pas dix.</em></h2>
  </div>
  <div class="pr-stack-grid">
    <div class="pr-stack-col">
      <h3><i class="fas fa-building" style="color:var(--muted2)"></i> Smartly + add-ons</h3>
      <div class="pr-stack-row"><span class="lbl">Smartly.io · plan mid-market</span><span class="price">$5,000/m</span></div>
      <div class="pr-stack-row"><span class="lbl">Setup engineering (1er trimestre)</span><span class="price">$3,000/m</span></div>
      <div class="pr-stack-row"><span class="lbl">Agence créative (templates DCO)</span><span class="price">$6,000/m</span></div>
      <div class="pr-stack-row"><span class="lbl">Outil A/B testing (VWO)</span><span class="price">$399/m</span></div>
      <div class="pr-stack-row"><span class="lbl">Plugin reporting (Whatagraph)</span><span class="price">$199/m</span></div>
      <div class="total"><span>Total mensuel · contrat 12 mois</span><span class="price">$14,598</span></div>
    </div>
    <div class="pr-stack-col adn">
      <h3><i class="fas fa-bolt" style="color:var(--orange)"></i> AdNova Growth</h3>
      <div class="pr-stack-row"><span class="lbl">Attribution multi-touch</span><span class="price" style="color:var(--green)">inclus</span></div>
      <div class="pr-stack-row"><span class="lbl">Media-buyer IA · 24/7</span><span class="price" style="color:var(--green)">inclus</span></div>
      <div class="pr-stack-row"><span class="lbl">Génération créatifs illimitée</span><span class="price" style="color:var(--green)">inclus</span></div>
      <div class="pr-stack-row"><span class="lbl">A/B testing auto</span><span class="price" style="color:var(--green)">inclus</span></div>
      <div class="pr-stack-row"><span class="lbl">Reports auto Slack/email</span><span class="price" style="color:var(--green)">inclus</span></div>
      <div class="total"><span>Total mensuel</span><span class="price">$799</span></div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="pr-faq-sec">
  <div style="text-align:center;margin-bottom:28px">
    <div class="section-label">FAQ Pricing</div>
    <h2 style="font-size:clamp(24px,3.4vw,34px);font-weight:800;color:#fff;letter-spacing:-0.025em;margin-top:14px">Vos questions</h2>
  </div>
  ${faqs.map(f => `<details class="pr-faq"><summary>${f.q}</summary><div class="a">${f.a}</div></details>`).join('')}
</section>

<!-- CTA -->
<section class="pr-cta">
  <h2>Pas de carte bancaire.<br>Pas d'engagement. <em>14 jours.</em></h2>
  <p>Migration depuis Smartly.io incluse en 7 jours. Annulable à tout moment depuis le dashboard.</p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
    <a href="/register" class="btn-primary"><i class="fas fa-bolt"></i> Démarrer l'essai</a>
    <a href="/vs-smartly" class="btn-ghost">Comparatif vs Smartly</a>
  </div>
</section>

<!-- FOOTER -->
<footer style="padding:48px 24px 32px;border-top:1px solid var(--border);text-align:center">
  <a href="/" class="logo">AdNova<span>.</span></a>
  <p style="color:var(--muted);font-size:13px;margin-top:14px">Autonomous advertising for modern brands. Built on Claude.</p>
  <div style="display:flex;justify-content:center;gap:24px;margin-top:20px;font-size:13px;flex-wrap:wrap">
    <a href="/" style="color:var(--muted)">Accueil</a>
    <a href="/#features" style="color:var(--muted)">Features</a>
    <a href="/customers" style="color:var(--muted)">Clients</a>
    <a href="/partners" style="color:var(--muted)">Partenaires</a>
    <a href="/vs-smartly" style="color:var(--muted)">vs Smartly</a>
    <a href="/terms" style="color:var(--muted)">CGU</a>
  </div>
  <p style="margin-top:24px;color:var(--muted);font-size:12px">© 2026 AdNova AI · Pricing à jour mai 2026</p>
</footer>

<script>
function toggleBilling(){
  var t = document.getElementById('billingToggle');
  t.classList.toggle('on');
  var annual = t.classList.contains('on');
  document.getElementById('lbl-m').classList.toggle('active', !annual);
  document.getElementById('lbl-a').classList.toggle('active', annual);
  document.querySelectorAll('.pr-plan-amount[data-m]').forEach(function(el){
    var v = annual ? el.getAttribute('data-a') : el.getAttribute('data-m');
    if (v) el.textContent = '$' + v;
  });
  document.querySelectorAll('.pr-plan-billed[data-m]').forEach(function(el){
    el.textContent = annual ? el.getAttribute('data-a') : el.getAttribute('data-m');
  });
}

function fmtMoney(n){
  return '$' + Math.round(n).toLocaleString();
}

function updateROI(){
  var budget = parseFloat(document.getElementById('roi-budget').value) || 0;
  var roas   = parseFloat(document.getElementById('roi-roas').value)   || 1;
  var stack  = document.getElementById('roi-stack').value;

  // Stack monthly cost mapping (Smartly.io pricing model)
  //   basic       = media-buyer freelance seul ($5K/m)
  //   standard    = Smartly plan d'entrée ($3K/m, AM inclus)
  //   advanced    = Smartly + agence créa ($3K + $8K/m)
  //   enterprise  = Smartly enterprise + 2 agences ($10K + $12K/m)
  var stackCost     = { basic:  5000, standard:  3000, advanced: 11000, enterprise: 22000 }[stack];
  var toolCost      = { basic:     0, standard:  3000, advanced:  3000, enterprise: 10000 }[stack];
  var freelanceCost = { basic:  5000, standard:     0, advanced:     0, enterprise:     0 }[stack];
  var agencyCost    = { basic:     0, standard:     0, advanced:  8000, enterprise: 12000 }[stack];

  var adnovaCost = 799;
  var monthlyDiff = stackCost - adnovaCost;

  // ROAS uplift: average +30% within 6 months
  var monthlyRevenue = budget * roas;
  var upliftedRevenue = budget * (roas * 1.30);
  var uplift = (upliftedRevenue - monthlyRevenue);

  var yearSaving = monthlyDiff * 12 + uplift * 12 * 0.5; // half year of uplift to be conservative

  document.getElementById('roi-current').textContent = fmtMoney(stackCost);
  document.getElementById('roi-adnova').textContent  = fmtMoney(adnovaCost);
  document.getElementById('roi-saved').textContent   = fmtMoney(yearSaving);

  document.getElementById('bk-tool').textContent     = '+' + fmtMoney(toolCost * 12);
  document.getElementById('bk-mb').textContent       = '+' + fmtMoney(freelanceCost * 12);
  document.getElementById('bk-ag').textContent       = '+' + fmtMoney(agencyCost * 12);
  document.getElementById('bk-uplift').textContent   = '+' + fmtMoney(uplift * 6);
  document.getElementById('bk-adn').textContent      = '−' + fmtMoney(adnovaCost * 12);
}
updateROI();
</script>
</body>
</html>`
}
