-- ═══════════════════════════════════════════════════════════════════════════
-- ai_run_log : one row per claude-decide invocation (cron or user)
-- ═══════════════════════════════════════════════════════════════════════════
-- Captures token usage, cost estimate, status, duration. Realtime-enabled so
-- the Dashboard panel can stream new runs as they happen.
--
-- Writes : service_role only (via Edge Function + invoke_claude_decide).
-- Reads  : tenant members (RLS via is_tenant_member).

create table if not exists public.ai_run_log (
  id                  uuid primary key default gen_random_uuid(),
  tenant_id           uuid not null references public.tenants(id) on delete cascade,
  trigger_source      text not null check (trigger_source in ('cron', 'user', 'manual')),
  status              text not null default 'pending'
                          check (status in ('pending', 'completed', 'failed', 'skipped')),
  pg_net_request_id   bigint,
  http_status_code    int,
  error_message       text,
  decisions_count     int not null default 0,
  input_tokens        int,
  output_tokens       int,
  cost_usd_estimate   numeric(12, 6),
  claude_model        text,
  duration_ms         int,
  started_at          timestamptz not null default now(),
  completed_at        timestamptz
);

create index if not exists ai_run_log_tenant_started_idx
  on public.ai_run_log (tenant_id, started_at desc);

create index if not exists ai_run_log_pg_net_request_idx
  on public.ai_run_log (pg_net_request_id)
  where pg_net_request_id is not null;

alter table public.ai_run_log enable row level security;

-- SELECT : tenant members only
drop policy if exists ai_run_log_select on public.ai_run_log;
create policy ai_run_log_select on public.ai_run_log
  for select
  using (public.is_tenant_member(tenant_id));

-- No INSERT/UPDATE/DELETE policies — only service_role writes (via bypassRLS).

-- Realtime publication
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'ai_run_log'
  ) then
    alter publication supabase_realtime add table public.ai_run_log;
  end if;
end $$;

-- REPLICA IDENTITY FULL so UPDATEs ship the full row (needed for postgres_changes UPDATE events)
alter table public.ai_run_log replica identity full;

comment on table public.ai_run_log is
  'One row per claude-decide invocation. Tracks token usage, cost, status. Service writes, members read.';
