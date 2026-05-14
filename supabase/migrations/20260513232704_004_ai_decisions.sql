
-- ─── ai_decisions ──────────────────────────────────────────────────────────
-- Décision Log — chaque action prise par l'IA est tracée avec :
--   • le type (scale, kill, create, budget_realloc...)
--   • la raison expliquée (text + jsonb signals)
--   • le contexte data (before/after metrics)
--   • le mode au moment de la décision (advisory/guardrails/autonomous)
--   • le statut (proposed/executed/rolled_back/blocked/rejected)
--   • impact mesuré a posteriori (revenue_uplift_usd)
--   • embedding pour recherche sémantique ("trouve décisions similaires")
create table public.ai_decisions (
  id                  uuid primary key default gen_random_uuid(),
  tenant_id           uuid not null references public.tenants(id) on delete cascade,
  -- Cible de la décision (un seul de ces 3 sera renseigné selon type)
  campaign_id         uuid references public.campaigns(id) on delete set null,
  ad_set_id           uuid references public.ad_sets(id) on delete set null,
  creative_id         uuid references public.creatives(id) on delete set null,
  -- Décision
  type                public.decision_type not null,
  action              jsonb not null,     -- {"op":"scale","pct":10,"new_budget":924}
  reason              text not null,      -- "ROAS 5.26× sur 72h, conditions remplies"
  signals             jsonb default '{}'::jsonb not null,  -- métriques sources
  confidence          numeric(4,3) check (confidence >= 0 and confidence <= 1),
  ai_mode             public.ai_mode not null,
  triggered_by_rule_id uuid references public.automation_rules(id) on delete set null,
  -- Statut + impact
  status              public.decision_status default 'proposed' not null,
  executed_at         timestamptz,
  executed_by         text,               -- 'ai' | 'user:{uuid}' | 'rule:{uuid}'
  rolled_back_at      timestamptz,
  rolled_back_by      uuid references auth.users(id) on delete set null,
  rolled_back_reason  text,
  -- Mesure d'impact (rempli a posteriori)
  before_metrics      jsonb,              -- snapshot avant
  after_metrics       jsonb,              -- snapshot 24/48/72h après
  measured_at         timestamptz,
  revenue_uplift_usd  numeric(12,2),
  budget_saved_usd    numeric(12,2),
  -- Embedding pour recherche sémantique (Phase 7)
  embedding           extensions.vector(1536),
  -- Tags pour UI ("rule:auto-scale", "guardrail:roas-min-3.5", "confidence:94%")
  tags                text[] default '{}',
  created_at          timestamptz default now() not null
);

-- Hot indexes
create index ai_decisions_tenant_idx on public.ai_decisions(tenant_id, created_at desc);
create index ai_decisions_campaign_idx on public.ai_decisions(campaign_id, created_at desc)
  where campaign_id is not null;
create index ai_decisions_creative_idx on public.ai_decisions(creative_id, created_at desc)
  where creative_id is not null;
create index ai_decisions_status_idx on public.ai_decisions(tenant_id, status)
  where status in ('proposed', 'blocked');  -- besoin de filtrage rapide pour validation
create index ai_decisions_type_idx on public.ai_decisions(tenant_id, type);

-- Index HNSW pour similarity search (créé même si vide pour Phase 7)
create index ai_decisions_embedding_idx on public.ai_decisions
  using hnsw (embedding extensions.vector_cosine_ops);

comment on table public.ai_decisions is
  'Decision Log — USP anti-Smartly. Chaque action IA tracée avec raison, contexte, statut, impact mesuré et embedding pour replay sémantique.';
comment on column public.ai_decisions.action is
  'JSON décrivant l''action exacte. Forme libre par type — exemple scale: {"op":"scale","pct":10,"new_budget":924}';
comment on column public.ai_decisions.signals is
  'Métriques sources qui ont déclenché la décision. Permet de rejouer le contexte.';
comment on column public.ai_decisions.executed_by is
  'Qui a exécuté : ''ai'' (autonomous mode), ''user:{uuid}'' (advisory mode), ''rule:{uuid}''';

-- ─── View pratique pour le dashboard "Live decisions feed" ────────────────
create or replace view public.ai_decisions_feed as
  select
    d.id,
    d.tenant_id,
    d.type,
    d.action,
    d.reason,
    d.confidence,
    d.ai_mode,
    d.status,
    d.created_at,
    coalesce(c.name, '') as campaign_name,
    coalesce(c.platform::text, '') as platform,
    cr.id as creative_id,
    cr.headline as creative_headline,
    d.tags,
    d.revenue_uplift_usd,
    d.budget_saved_usd
  from public.ai_decisions d
  left join public.campaigns c on c.id = d.campaign_id
  left join public.creatives cr on cr.id = d.creative_id;

comment on view public.ai_decisions_feed is
  'View dénormalisée pour le live feed dashboard — joint campaign/creative en une requête.';
