-- ═══════════════════════════════════════════════════════════════════════════
-- Schedule pg_cron : ai-decisions-loop every 30 min
-- ═══════════════════════════════════════════════════════════════════════════
-- Cron expression : `*/30 * * * *` → minutes 0 and 30 of each hour.
-- Idle cost : SQL function iterates autonomous tenants, so 0 HTTP calls
-- if no tenant has opted in to autonomous mode.

do $$
declare
  v_job_id integer;
begin
  select jobid into v_job_id from cron.job where jobname = 'ai-decisions-loop';
  if v_job_id is not null then
    perform cron.unschedule(v_job_id);
  end if;
end $$;

select cron.schedule(
  'ai-decisions-loop',
  '*/30 * * * *',
  $$ select public.run_ai_decisions_loop(); $$
);
