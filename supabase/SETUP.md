# Supabase setup — one-time operations

This file documents manual setup steps that **cannot be encoded in migrations**
because they require secrets the repo must not contain.

Project : `jrfxmgxtnftbcxoqzagz`

---

## 1. Edge Function secrets

The `claude-decide` Edge Function needs Anthropic credentials.

Set in **Dashboard → Edge Functions → Secrets** (or via CLI):

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
```

Required by `supabase/functions/claude-decide/index.ts`. The function fails
fast at boot if missing (`500 ANTHROPIC_API_KEY not set`).

---

## 2. Vault : service_role_key (required for autonomous loop)

The pg_cron job `ai-decisions-loop` runs every 30 min and calls the
`claude-decide` Edge Function in service-role mode. To do that, the helper
`public.invoke_claude_decide(uuid)` reads the service-role JWT from Vault.

**Without this step the cron loop fires but skips every tenant with a
`raise notice`** — no errors, just nothing happens.

Run **once** in the SQL editor (paste the actual JWT from
Dashboard → Settings → API → service_role secret):

```sql
select vault.create_secret(
  'eyJ...your-service-role-jwt...',
  'service_role_key'
);
```

Verify :

```sql
select name from vault.decrypted_secrets where name = 'service_role_key';
-- should return 1 row
```

To rotate the key later :

```sql
select vault.update_secret(
  (select id from vault.decrypted_secrets where name = 'service_role_key'),
  'eyJ...new-jwt...'
);
```

---

## 3. Sanity-check the cron loop

```sql
-- list scheduled jobs
select jobid, schedule, command, active
from cron.job
where jobname = 'ai-decisions-loop';

-- last 10 runs
select runid, job_pid, status, return_message, start_time
from cron.job_run_details
where jobid = (select jobid from cron.job where jobname = 'ai-decisions-loop')
order by start_time desc
limit 10;

-- last 10 pg_net responses (Edge Function answers)
select id, status_code, content, created
from net._http_response
order by created desc
limit 10;
```

To manually trigger one full loop (without waiting 30 min) :

```sql
select * from public.run_ai_decisions_loop();
```

This iterates every tenant where `ai_mode = 'autonomous'` and
`status in ('active','trial')`, and POSTs to the Edge Function for each.
Returns one row per tenant with the pg_net `request_id`.

---

## 4. Opting a tenant into the autonomous loop

From the UI : owner/admin clicks the **AI mode badge** on the dashboard and
picks `Autonomous`. This calls `updateTenantAiMode()` which updates
`tenants.ai_mode`. Next cron tick (≤ 30 min later), Claude starts analyzing
that tenant's campaigns and inserting `ai_decisions` automatically.

From SQL :

```sql
update public.tenants set ai_mode = 'autonomous' where id = '<tenant-uuid>';
```

To turn it back off :

```sql
update public.tenants set ai_mode = 'advisory' where id = '<tenant-uuid>';
```

Even after the toggle, the Edge Function double-checks `ai_mode` at request
time and returns `{skipped: true}` if it no longer matches — protection
against the brief window between toggle and next cron run.
