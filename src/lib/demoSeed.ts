// ─── Demo data seeder ──────────────────────────────────────────────────────
// Insère 6 campagnes + 8 décisions IA fictives dans le tenant courant.
// Utile pour les nouveaux signups qui veulent explorer l'app sans connecter
// de vraie plateforme. À retirer dès qu'on a les vrais syncs Meta/Google
// (Phase 5+).
import { supabase } from "./supabase";
import type { Database } from "./database.types";

type Json = Database["public"]["Tables"]["ai_decisions"]["Insert"]["action"];

export async function seedDemoData(tenantId: string): Promise<void> {
  // 1) Campagnes — mix de plateformes + statuts + chiffres réalistes
  const campaignSeeds: Array<{
    name: string;
    platform: "meta" | "google" | "tiktok" | "linkedin";
    status: "live" | "scaling" | "paused";
    spend: number;
    revenue: number;
    impressions: number;
    clicks: number;
    conversions: number;
  }> = [
    { name: "Summer Collection 2026",  platform: "meta",     status: "scaling", spend: 18420, revenue: 96805, impressions: 542300, clicks: 22815, conversions: 1140 },
    { name: "Product Launch Q3",       platform: "google",   status: "scaling", spend: 14200, revenue: 68160, impressions: 380120, clicks: 14478, conversions: 824 },
    { name: "Brand Awareness Wave",    platform: "meta",     status: "live",    spend:  9800, revenue: 41160, impressions: 823144, clicks: 23862, conversions: 542 },
    { name: "Retargeting Pro",         platform: "google",   status: "live",    spend:  7350, revenue: 29400, impressions: 120433, clicks:  7345, conversions: 388 },
    { name: "Holiday Flash Sale",      platform: "tiktok",   status: "live",    spend:  5200, revenue: 17680, impressions: 287422, clicks: 15511, conversions: 220 },
    { name: "LinkedIn B2B Q4",         platform: "linkedin", status: "paused",  spend:  4460, revenue: 14718, impressions:  98044, clicks:  1764, conversions:  92 },
  ];

  const inserts = campaignSeeds.map((c) => ({
    tenant_id: tenantId,
    platform: c.platform,
    name: c.name,
    status: c.status,
    objective: "conversions",
    daily_budget_usd: Math.round(c.spend / 30),
    spend_total: c.spend,
    revenue_total: c.revenue,
    impressions_total: c.impressions,
    clicks_total: c.clicks,
    conversions_total: c.conversions,
    roas: c.revenue / c.spend,
    ctr: c.clicks / c.impressions,
    cpa: c.spend / c.conversions,
    ai_managed: true,
  }));

  const { data: created, error: campErr } = await supabase
    .from("campaigns")
    .insert(inserts)
    .select("id, name");

  if (campErr) throw campErr;
  if (!created?.length) return;

  // 2) Décisions IA — mix de types pour démontrer le Decision Log
  const decisionSeeds: Array<{
    campaignIndex: number;
    type: "scale" | "kill" | "create" | "budget_realloc" | "audience_expand";
    action: Record<string, unknown>;
    reason: string;
    confidence: number;
    tags: string[];
    revenue_uplift_usd?: number;
    budget_saved_usd?: number;
  }> = [
    {
      campaignIndex: 0,
      type: "scale",
      action: { op: "scale", pct: 10, new_budget: 924 },
      reason: "ROAS sur les 72 dernières heures à 5.26× (cible 3.5×). CTR stable à 4.2%. Audience pas saturée (frequency 1.8). Conditions de scale remplies.",
      confidence: 0.94,
      tags: ["rule:auto-scale", "guardrail:roas-min-3.5", "confidence:94%"],
      revenue_uplift_usd: 2340,
    },
    {
      campaignIndex: 4,
      type: "kill",
      action: { op: "kill_creatives", count: 3 },
      reason: "CTR moyen 0.31% sur 5 423 impressions, sous le seuil 0.8%. Aucune conversion en 24h. 92% de probabilité que la dépense restante brûle sans retour.",
      confidence: 0.97,
      tags: ["rule:auto-kill", "guardrail:ctr-min-0.8%", "confidence:97%"],
      budget_saved_usd: 840,
    },
    {
      campaignIndex: 1,
      type: "create",
      action: { op: "generate_variants", count: 4, format: "video" },
      reason: 'Hook actuel "Découvrez notre nouveauté" performe à 1.2% CTR (médiane catégorie 2.8%). 4 hooks alternatifs générés via AdNova Creative Engine pour A/B test.',
      confidence: 0.81,
      tags: ["rule:creative-refresh", "engine:adnova-creative"],
    },
    {
      campaignIndex: 3,
      type: "budget_realloc",
      action: { op: "realloc", from: "tiktok", to: "google", amount_usd: 1200 },
      reason: "Google Search ROAS 6.8× (saturation 67%). TikTok ROAS 2.1× (sous cible 3.5×). Modèle prédit +23% ROAS global après réallocation.",
      confidence: 0.88,
      tags: ["rule:budget-optim", "engine:claude"],
      revenue_uplift_usd: 1850,
    },
    {
      campaignIndex: 2,
      type: "audience_expand",
      action: { op: "lookalike_expand", from_pct: 1, to_pct: 3 },
      reason: "Audience source saturée (frequency 4.2, cap 4.0). Lookalike 1% épuisée. Élargissement à 3% pour maintenir le scale sans rogner sur la qualité.",
      confidence: 0.91,
      tags: ["rule:audience-expand", "guardrail:frequency-cap-4"],
    },
    {
      campaignIndex: 0,
      type: "scale",
      action: { op: "scale", pct: 12, new_budget: 1035 },
      reason: "Re-évaluation 48h après scale précédent — performance maintenue. Nouveau push +12% validé.",
      confidence: 0.89,
      tags: ["rule:auto-scale"],
      revenue_uplift_usd: 1240,
    },
    {
      campaignIndex: 5,
      type: "kill",
      action: { op: "pause_campaign" },
      reason: "Pause manuelle confirmée par l'IA — performance en chute (CTR 0.45%, CPA $48 vs cible $25). Recommandation de relancer après refresh créatif.",
      confidence: 0.85,
      tags: ["rule:auto-pause"],
      budget_saved_usd: 580,
    },
    {
      campaignIndex: 1,
      type: "scale",
      action: { op: "scale", pct: 8, new_budget: 510 },
      reason: "Performance stable depuis 7 jours. Scale modéré +8% pour tester l'élasticité du canal sans risque.",
      confidence: 0.86,
      tags: ["rule:auto-scale", "confidence:86%"],
      revenue_uplift_usd: 720,
    },
  ];

  const decisionInserts = decisionSeeds.flatMap((d) => {
    const target = created[d.campaignIndex];
    if (!target) return [];
    return [{
      tenant_id: tenantId,
      campaign_id: target.id,
      type: d.type,
      action: d.action as Json,
      reason: d.reason,
      confidence: d.confidence,
      ai_mode: "autonomous" as const,
      status: "executed" as const,
      executed_at: new Date().toISOString(),
      executed_by: "ai",
      tags: d.tags,
      revenue_uplift_usd: d.revenue_uplift_usd ?? null,
      budget_saved_usd: d.budget_saved_usd ?? null,
    }];
  });

  const { error: decErr } = await supabase.from("ai_decisions").insert(decisionInserts);
  if (decErr) throw decErr;
}
