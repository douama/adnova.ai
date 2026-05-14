-- ─── Missing INSERT policy on ai_decisions ────────────────────────────────
-- Tenant members can insert decisions for their tenant (used by demo seeder
-- and UI-driven actions). Edge Functions still use service_role + manual
-- tenant_id validation for AI-generated decisions.
create policy ai_decisions_insert_member
  on public.ai_decisions for insert
  with check (public.is_tenant_member(tenant_id));

comment on policy ai_decisions_insert_member on public.ai_decisions is
  'Tenant members can insert decisions for their tenant (demo seeder + UI). Edge Functions still use service_role with manual tenant_id validation.';
