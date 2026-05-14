-- ═══════════════════════════════════════════════════════════════════════════
-- pg_net + helper that calls claude-decide Edge Function from pg_cron
-- ═══════════════════════════════════════════════════════════════════════════
-- Architecture :
--   pg_cron (every 30 min)
--     → public.run_ai_decisions_loop()
--         → for each tenant with ai_mode='autonomous', not churned :
--             net.http_post(claude-decide, body={tenant_id})
--   → Edge Function (in service_role mode)
--     → Claude analyzes campaigns
--     → INSERT INTO ai_decisions
--     → Realtime push to connected clients

create extension if not exists pg_net with schema extensions;

create or replace function public.adnova_supabase_url()
returns text
language sql
immutable
set search_path = public
as $$
  select 'https://jrfxmgxtnftbcxoqzagz.supabase.co'::text;
$$;

-- Helper : call claude-decide for ONE tenant via pg_net.
-- Reads service_role_key from Vault (user must store it once via
-- `select vault.create_secret('eyJ...', 'service_role_key');`).
create or replace function public.invoke_claude_decide(_tenant_id uuid)
returns bigint
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_service_key text;
  v_request_id  bigint;
begin
  select decrypted_secret into v_service_key
  from vault.decrypted_secrets
  where name = 'service_role_key'
  limit 1;

  if v_service_key is null then
    raise notice 'Vault secret "service_role_key" not configured — skipping AI loop for tenant %', _tenant_id;
    return null;
  end if;

  select net.http_post(
    url := public.adnova_supabase_url() || '/functions/v1/claude-decide',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || v_service_key
    ),
    body := jsonb_build_object('tenant_id', _tenant_id),
    timeout_milliseconds := 60000
  ) into v_request_id;

  return v_request_id;
end;
$$;

-- Loop function : iterate over all autonomous + active/trial tenants
create or replace function public.run_ai_decisions_loop()
returns table (tenant_id uuid, request_id bigint)
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_req_id bigint;
begin
  for r in
    select t.id
    from public.tenants t
    where t.ai_mode = 'autonomous'
      and t.status in ('active', 'trial')
  loop
    v_req_id := public.invoke_claude_decide(r.id);
    tenant_id := r.id;
    request_id := v_req_id;
    return next;
  end loop;
end;
$$;

-- Lock these from public — only superuser / cron may execute
revoke execute on function public.invoke_claude_decide(uuid) from public, anon, authenticated;
revoke execute on function public.run_ai_decisions_loop() from public, anon, authenticated;
