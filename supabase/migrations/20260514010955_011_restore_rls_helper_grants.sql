-- ─── Fix : RLS helpers must be EXECUTABLE by authenticated + anon ────────
-- Migration 007 over-revoked EXECUTE on these helpers to address the advisor
-- warning "Public Can Execute SECURITY DEFINER Function". Problem : RLS
-- policies on campaigns/creatives/ai_decisions/etc call these helpers via
-- `public.is_tenant_member(tenant_id)`. The effective role at policy
-- evaluation time is the caller's (authenticated/anon), so Postgres requires
-- EXECUTE permission on the function.
--
-- Without this grant, "permission denied for function is_tenant_member" is
-- thrown on ANY SELECT against campaigns by a signed-in user.
--
-- Right solution :
--   - GRANT EXECUTE to roles that may trigger a policy (authenticated, anon)
--   - Functions remain SECURITY DEFINER (they bypass RLS to read tenant_members)
--   - The "fingerprinting via RPC" risk is minimal : a user can already deduce
--     their membership by SELECT'ing tenants/campaigns

grant execute on function public.is_tenant_member(uuid) to authenticated, anon;
grant execute on function public.is_tenant_admin(uuid)  to authenticated, anon;
grant execute on function public.is_super_admin()       to authenticated, anon;

-- handle_new_user stays locked (trigger-only, never called via RPC)
-- my_tenants() keeps its authenticated-only grant from migration 007
