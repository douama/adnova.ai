-- ═══════════════════════════════════════════════════════════════════════════
-- invoke_claude_decide v2 — writes ai_run_log before pg_net call
-- ═══════════════════════════════════════════════════════════════════════════
-- 1. INSERT a pending ai_run_log row (trigger_source='cron')
-- 2. POST to claude-decide with body = {tenant_id, run_id}
-- 3. UPDATE ai_run_log with the pg_net request_id
--
-- claude-decide v5 will later UPDATE the same row with final status,
-- token usage, cost estimate, decisions_count, http_status_code,
-- completed_at, duration_ms.

create or replace function public.invoke_claude_decide(_tenant_id uuid)
returns bigint
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_service_key text;
  v_request_id  bigint;
  v_run_id      uuid;
begin
  select decrypted_secret into v_service_key
  from vault.decrypted_secrets
  where name = 'service_role_key'
  limit 1;

  if v_service_key is null then
    raise notice 'Vault secret "service_role_key" not configured — skipping AI loop for tenant %', _tenant_id;
    return null;
  end if;

  -- 1) Pre-create a pending run-log row.
  insert into public.ai_run_log (tenant_id, trigger_source, status)
  values (_tenant_id, 'cron', 'pending')
  returning id into v_run_id;

  -- 2) Fire the async HTTP request.
  select net.http_post(
    url := public.adnova_supabase_url() || '/functions/v1/claude-decide',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || v_service_key
    ),
    body := jsonb_build_object('tenant_id', _tenant_id, 'run_id', v_run_id),
    timeout_milliseconds := 60000
  ) into v_request_id;

  -- 3) Stash the pg_net request id so we can correlate with net._http_response if needed.
  update public.ai_run_log
     set pg_net_request_id = v_request_id
   where id = v_run_id;

  return v_request_id;
end;
$$;

-- Re-revoke from public (lost on create or replace)
revoke execute on function public.invoke_claude_decide(uuid) from public, anon, authenticated;
