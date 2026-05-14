-- ═══════════════════════════════════════════════════════════════════════════
-- Security hardening — close exposed SECURITY DEFINER surfaces
-- ═══════════════════════════════════════════════════════════════════════════
-- Supabase advisor flagged these as WARN-level :
--
--   * is_tenant_member, is_tenant_admin, is_super_admin, my_tenants, and
--     trg_ai_decisions_embed are SECURITY DEFINER and EXECUTABLE by anon
--     via /rest/v1/rpc/<name>. They can't leak data RLS already protects,
--     but exposing the surface is unnecessary. Revoke anon, keep the
--     authenticated/service_role grants the app actually needs.
--
--   * trg_ai_decisions_embed is a trigger function. It should never be
--     RPC-callable. Revoke everyone except service_role (triggers run as
--     definer regardless of grants on the function itself).
--
-- These helpers stay SECURITY DEFINER because RLS policies that call them
-- must bypass RLS to evaluate (otherwise infinite recursion). The fix is
-- to limit who can REACH them via the REST API.

-- ─── 1. Helper RPCs : revoke anon, keep authenticated + service_role ─────
revoke execute on function public.is_tenant_member(uuid)    from anon, public;
revoke execute on function public.is_tenant_admin(uuid)     from anon, public;
revoke execute on function public.is_super_admin()          from anon, public;
revoke execute on function public.my_tenants()              from anon, public;

-- (Migration 011 over-granted to anon. authenticated grants stay in place.)
grant execute on function public.is_tenant_member(uuid)     to authenticated, service_role;
grant execute on function public.is_tenant_admin(uuid)      to authenticated, service_role;
grant execute on function public.is_super_admin()           to authenticated, service_role;
grant execute on function public.my_tenants()               to authenticated, service_role;

-- ─── 2. Trigger function : never RPC-callable ─────────────────────────────
revoke execute on function public.trg_ai_decisions_embed() from public, anon, authenticated;
-- service_role retains execute via default ownership; the trigger fires as
-- definer regardless of REST grants.

-- ─── 3. Sanity : recent_decisions + similar_decisions stay reachable ──────
-- These are user-facing helpers used by claude-decide and the UI.
grant execute on function public.recent_decisions_for_campaigns(uuid, uuid[], int, int)
  to authenticated, service_role;
grant execute on function public.similar_decisions_by_embedding(uuid, extensions.vector, int, uuid[], real)
  to authenticated, service_role;

comment on function public.is_tenant_member(uuid) is
  'SECURITY DEFINER RLS helper. Anon revoked (mig 018) — anon has no rows to evaluate anyway.';
comment on function public.is_tenant_admin(uuid) is
  'SECURITY DEFINER RLS helper. Anon revoked (mig 018).';
comment on function public.is_super_admin() is
  'SECURITY DEFINER RLS helper for super-admin gated rows. Anon revoked (mig 018).';
comment on function public.my_tenants() is
  'Returns the tenants the current user belongs to. Anon revoked (mig 018) — anon has no membership.';
