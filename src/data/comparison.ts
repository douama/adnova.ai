// Comparison rows, use cases, and FAQ shown on /vs-smartly.
// Verbatim content extracted from legacy Hono SSR (branch: legacy-hono-ssr-snapshot).
// `note` strings in FAQ answers contain inline <strong> HTML — render with
// dangerouslySetInnerHTML on the answer field.

export type ComparisonStatus = "yes" | "no" | "partial";

export type ComparisonRow = {
  feat: string;
  sub?: string;
  smartly: ComparisonStatus;
  smartlyNote?: string;
  adnova: ComparisonStatus;
  adnovaNote?: string;
};

export type UseCase = {
  who: string;
  adnova: string;
  smartly: string;
};

export type FaqItem = {
  q: string;
  a: string; // may contain HTML (e.g. <strong>)
};

export const COMPARISON_SCORE = { adnova: 9.2, smartly: 7.8 };

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feat: "Multi-canal (Meta, Google, TikTok, LinkedIn…)", smartly: "yes", smartlyNote: "9+ plateformes", adnova: "yes", adnovaNote: "9 plateformes" },
  { feat: "Automation média-buying", smartly: "yes", smartlyNote: "Rules-based", adnova: "yes", adnovaNote: "Autonomous reasoning" },
  { feat: "Génération créatifs (DCO)", smartly: "yes", smartlyNote: "Templates + DCO", adnova: "yes", adnovaNote: "AdNova Creative Engine" },
  { feat: "Attribution multi-touch · CAPI", smartly: "partial", smartlyNote: "Via partenaires", adnova: "yes", adnovaNote: "Natif inclus" },
  { feat: "AI chat conversationnel (raisonnement)", smartly: "no", adnova: "yes", adnovaNote: "Built on AdNova AI" },
  { feat: "Decision log auditable + Replay", sub: "Chaque action IA tracée et rejouable", smartly: "no", adnova: "yes", adnovaNote: "Audit-ready · rollback 1-clic" },
  { feat: "Pricing transparent affiché", smartly: "no", smartlyNote: "Sales-led only", adnova: "yes", adnovaNote: "$299 / $799 / Enterprise" },
  { feat: "Essai gratuit sans CB", smartly: "no", smartlyNote: "Demo + RFP", adnova: "yes", adnovaNote: "14 jours · self-serve" },
  { feat: "Engagement minimum", smartly: "no", smartlyNote: "12 mois annuel", adnova: "yes", adnovaNote: "Mensuel · sans engagement" },
  { feat: "Setup time", smartly: "no", smartlyNote: "4-8 semaines", adnova: "yes", adnovaNote: "24-72h" },
  { feat: "Self-serve onboarding", smartly: "no", smartlyNote: "AM obligatoire", adnova: "yes", adnovaNote: "Sign-up → live" },
  { feat: "Plan pour < $1M ARR", smartly: "no", smartlyNote: "Trop cher", adnova: "yes", adnovaNote: "Starter $299/m" },
  { feat: "Hébergement EU · GDPR-native", sub: "Serveurs Paris/Francfort, DPA inclus", smartly: "partial", smartlyNote: "Bureau Helsinki, infra mixte", adnova: "yes" },
  { feat: "Multilingue (FR/EN/ES/DE/IT)", smartly: "partial", smartlyNote: "EN-first", adnova: "yes" },
  { feat: "Sub-processeurs listés + auditables", smartly: "no", adnova: "yes" },
  { feat: "Modes IA paramétrables (Advisory/Guardrails/Autonomous)", smartly: "partial", smartlyNote: "Rules manuelles", adnova: "yes", adnovaNote: "3 niveaux switchables" },
  { feat: "Account manager dédié", smartly: "yes", smartlyNote: "Inclus (lourd)", adnova: "partial", adnovaNote: "Plan Enterprise uniquement" },
  { feat: "Programme partenaire 20% à vie", smartly: "no", adnova: "yes", adnovaNote: "Sans plafond" },
];

export const USE_CASES: UseCase[] = [
  {
    who: "Marque DTC $500K-$5M MRR",
    adnova:
      "$799/mois, setup 24h, Mode Autonomous. Vous payez pour le produit, pas pour 4 semaines de calls onboarding.",
    smartly:
      "$3-10K/mois minimum. Smartly considère que vous êtes trop petits — votre rep commercial vous explique poliment qu'il faut \"scaler avant\".",
  },
  {
    who: "B2B SaaS $1M-$20M ARR",
    adnova:
      "LinkedIn + Google + Meta unifiés, lead scoring → bid auto. Plan Growth couvre tout. ROI moyen 6× la 1ère année.",
    smartly:
      "Capable techniquement, mais le pricing absorbe votre budget acquisition à lui seul. Smartly est calibré pour des budgets pub > $500K/mois.",
  },
  {
    who: "Agence (10-200 clients)",
    adnova:
      "Multi-tenants natif sur plan Enterprise, white-label, dashboard par client. Onboarding 1 nouveau client = 1 journée.",
    smartly:
      "Très puissant en multi-account, mais chaque client = un nouveau projet onboarding 4-6 semaines. Idéal si vos clients sont Fortune 500.",
  },
  {
    who: "Marque EU sensible GDPR",
    adnova:
      "Hébergement Cloudflare EU (Paris + Francfort). DPA inclus. Sub-processeurs limités et listés. Compliance DPO en 1h.",
    smartly:
      "Smartly est finlandais (Helsinki) donc OK théoriquement, mais infra hybride US/EU et sub-processeurs nombreux. DPO doit creuser.",
  },
  {
    who: "Marque Fortune 500 / global enterprise",
    adnova:
      "Plan Enterprise possible mais nous sommes plus jeunes. Pas encore le track record de Smartly sur les top 100 mondiaux.",
    smartly:
      "Smartly EST la référence sur le segment. L'Oréal, Uber, eBay, Vans… si vous êtes à ce niveau, Smartly reste un choix défendable.",
  },
];

export const FAQ: FaqItem[] = [
  {
    q: "AdNova remplace-t-il complètement Smartly.io ?",
    a: "Pour 95% des marques sous $100M ARR, oui — et avec un meilleur rapport prix/résultat. Pour les 5% restants (Fortune 500, budgets pub > $5M/mois, besoins de DCO templates très spécifiques), Smartly reste défendable. Notre cible : les marques que Smartly trouve \"trop petites\" mais qui veulent quand même la puissance d'un outil enterprise.",
  },
  {
    q: "Pourquoi Smartly coûte 10× plus cher qu'AdNova ?",
    a: "Smartly est sales-led et inclut un account manager dédié + setup engineering custom. Ces coûts humains sont répercutés sur votre facture. AdNova est self-serve, automatisé, et utilise notre moteur IA propriétaire pour les décisions — donc nos coûts marginaux sont proches de zéro. Économies → vous.",
  },
  {
    q: "Combien de temps prend la migration depuis Smartly ?",
    a: "5 à 7 jours typiquement. Vos campagnes existantes sont importées via les APIs natives Meta/Google/TikTok. Vos templates créatifs Smartly se réimportent dans notre Creative Studio. Pas de downtime sur vos campagnes actives. Différence majeure : pas de SOW à négocier, pas de meeting d'onboarding obligatoire — vous migrez à votre rythme.",
  },
  {
    q: "Quelle est la différence entre \"rules-based\" et le moteur AdNova ?",
    a: "Smartly automatise via des règles que vous écrivez (<strong>\"Si CTR < 0.8% et impressions > 500 → pause\"</strong>). AdNova utilise un moteur IA propriétaire pour <strong>raisonner</strong> sur chaque décision : pourquoi cette créa baisse, quel segment est saturé, quel canal a le ROAS marginal le plus élevé maintenant. Résultat : les règles ne capturent que ce que vous avez prévu ; le raisonnement capture les patterns que vous n'aviez pas vus.",
  },
  {
    q: "Smartly a-t-il du Decision Log auditable ?",
    a: "Smartly propose des reports d'activité et des logs de règles déclenchées. Mais pas un Decision Log avec <strong>raison expliquée</strong>, <strong>data context</strong>, <strong>replay simulation</strong> et <strong>rollback 1-clic</strong>. C'est la différence entre \"qu'est-ce qui s'est passé ?\" et \"qu'est-ce qui se serait passé sans l'IA ?\".",
  },
  {
    q: "Mes données restent-elles confidentielles ?",
    a: "Oui. Hébergement Cloudflare EU (Paris + Francfort), chiffrement at-rest, vos données ne servent jamais à entraîner les modèles, DPA inclus, sub-processeurs limités et listés. SOC 2 Type II audit en cours (Q3 2026). Smartly est compliant aussi — mais leur infra mixte US/EU demande une analyse plus poussée côté DPO.",
  },
  {
    q: "Quel ROI typique vs Smartly ?",
    a: "Cas réel (Maison Aubergine, FR) : économie de €4,200/mois sur le tooling après migration depuis Smartly + agence (vs $7,500/m avant). ROAS amélioré de 3.8× à 5.1× sur 6 mois grâce au mode Autonomous (Smartly était rules-based). Décisions IA prises en 18 minutes vs 3 jours en revue manuelle.",
  },
];
