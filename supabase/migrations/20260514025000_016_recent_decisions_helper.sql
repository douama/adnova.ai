-- ═══════════════════════════════════════════════════════════════════════════
-- recent_decisions_for_campaigns : memory helper for claude-decide
-- ═══════════════════════════════════════════════════════════════════════════
-- Returns the last N decisions per campaign within the last K hours, so that
-- claude-decide can pass them to Claude as "past actions context" and avoid :
--   - double-scaling the same campaign within 24h (15% cap would compound)
--   - contradicting a kill that was just executed
--   - re-proposing a budget_realloc that already happened
--
-- SECURITY INVOKER : RLS on ai_decisions enforces tenant isolation via
-- is_tenant_member(). When called by the Edge Function with service_role,
-- RLS is bypassed and the function works the same way.

create or replace function public.recent_decisions_for_campaigns(
  _tenant_id      uuid,
  _campaign_ids   uuid[],
  _per_campaign   int default 3,
  _max_age_hours  int default 72
)
returns table (
  campaign_id    uuid,
  decision_id    uuid,
  decision_type  text,
  action         jsonb,
  reason         text,
  confidence     numeric,
  created_at     timestamptz
)
language sql
stable
security invoker
set search_path = public
as $$
  select
    sub.campaign_id,
    sub.decision_id,
    sub.decision_type,
    sub.action,
    sub.reason,
    sub.confidence,
    sub.created_at
  from (
    select
      d.campaign_id,
      d.id   as decision_id,
      d.type::text as decision_type,
      d.action,
      d.reason,
      d.confidence,
      d.created_at,
      row_number() over (
        partition by d.campaign_id
        order by d.created_at desc
      ) as rn
    from public.ai_decisions d
    where d.tenant_id = _tenant_id
      and d.campaign_id = any(_campaign_ids)
      and d.created_at > now() - make_interval(hours => _max_age_hours)
  ) sub
  where sub.rn <= _per_campaign
  order by sub.campaign_id, sub.created_at desc;
$$;

grant execute on function public.recent_decisions_for_campaigns(uuid, uuid[], int, int)
  to authenticated, service_role;

comment on function public.recent_decisions_for_campaigns is
  'Returns top-N most recent decisions per campaign within K hours, ordered by recency. Used by claude-decide for cross-run memory.';
