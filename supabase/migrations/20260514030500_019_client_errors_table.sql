-- ═══════════════════════════════════════════════════════════════════════════
-- client_errors : capture frontend exceptions in DB (Sentry-lite)
-- ═══════════════════════════════════════════════════════════════════════════
-- Filled by the React ErrorBoundary on componentDidCatch. Cheap, durable,
-- queryable from SQL. Trivial to swap for Sentry/Datadog later — just
-- change the reporter in apps/web/src/components/ErrorBoundary.tsx.

create table if not exists public.client_errors (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users(id) on delete set null,
  tenant_id        uuid references public.tenants(id) on delete set null,
  url              text,
  message          text,
  stack            text,
  component_stack  text,
  user_agent       text,
  created_at       timestamptz not null default now()
);

create index if not exists client_errors_created_idx
  on public.client_errors (created_at desc);

create index if not exists client_errors_user_idx
  on public.client_errors (user_id)
  where user_id is not null;

alter table public.client_errors enable row level security;

-- Anyone authenticated can log their own errors (user_id auto-stamped client-side)
drop policy if exists client_errors_insert_self on public.client_errors;
create policy client_errors_insert_self on public.client_errors
  for insert to authenticated
  with check (user_id is null or user_id = (select auth.uid()));

-- Only super-admins read (for triage). Tenant members never see other users' errors.
drop policy if exists client_errors_select_super_admin on public.client_errors;
create policy client_errors_select_super_admin on public.client_errors
  for select
  using (public.is_super_admin());

comment on table public.client_errors is
  'Captures frontend React render-time exceptions via ErrorBoundary. Super-admin-readable only.';
