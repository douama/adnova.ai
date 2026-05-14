
-- ═══════════════════════════════════════════════════════════════════════════
-- Hardening sécurité — fixes des advisor lints
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 1. ai_decisions_feed view : SECURITY INVOKER ──────────────────────────
-- Par défaut Postgres views s'exécutent comme leur créateur (postgres).
-- Pour respecter RLS du user qui interroge, on force security_invoker.
alter view public.ai_decisions_feed set (security_invoker = on);

-- ─── 2. Helpers RLS : revoke anon, keep authenticated minimal ─────────────
-- is_tenant_member / is_tenant_admin / is_super_admin sont appelés par RLS
-- elle-même (bypass via SECURITY DEFINER côté policy), pas besoin d'être
-- callable par le client en RPC. On retire l'accès anon ; authenticated
-- peut garder pour usage côté Edge Functions, mais on retire aussi par sûreté.
revoke execute on function public.is_tenant_member(uuid) from public, anon, authenticated;
revoke execute on function public.is_tenant_admin(uuid)  from public, anon, authenticated;
revoke execute on function public.is_super_admin()       from public, anon, authenticated;

-- handle_new_user est UNIQUEMENT un trigger — pas de RPC, jamais.
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- my_tenants() est utile en RPC pour le client signed-in → keep authenticated only
revoke execute on function public.my_tenants() from public, anon;
grant   execute on function public.my_tenants() to authenticated;

-- ═══════════════════════════════════════════════════════════════════════════
-- Index sur foreign keys (20 manquants)
-- ═══════════════════════════════════════════════════════════════════════════
create index if not exists affiliates_approved_by_idx on public.affiliates(approved_by);
create index if not exists affiliates_tenant_id_idx on public.affiliates(tenant_id);

create index if not exists ai_decisions_ad_set_id_idx on public.ai_decisions(ad_set_id)
  where ad_set_id is not null;
create index if not exists ai_decisions_rolled_back_by_idx on public.ai_decisions(rolled_back_by)
  where rolled_back_by is not null;
create index if not exists ai_decisions_triggered_by_rule_id_idx on public.ai_decisions(triggered_by_rule_id)
  where triggered_by_rule_id is not null;

create index if not exists audiences_created_by_idx on public.audiences(created_by);
create index if not exists automation_rules_created_by_idx on public.automation_rules(created_by);

create index if not exists campaigns_created_by_idx on public.campaigns(created_by);
create index if not exists campaigns_platform_connection_id_idx on public.campaigns(platform_connection_id)
  where platform_connection_id is not null;

create index if not exists commission_earnings_payout_id_idx on public.commission_earnings(payout_id)
  where payout_id is not null;
create index if not exists commission_earnings_referral_id_idx on public.commission_earnings(referral_id)
  where referral_id is not null;
create index if not exists commission_earnings_source_invoice_id_idx on public.commission_earnings(source_invoice_id)
  where source_invoice_id is not null;

create index if not exists creatives_ad_set_id_idx on public.creatives(ad_set_id)
  where ad_set_id is not null;
create index if not exists creatives_created_by_idx on public.creatives(created_by);

create index if not exists invoices_subscription_id_idx on public.invoices(subscription_id)
  where subscription_id is not null;

create index if not exists platform_connections_connected_by_idx on public.platform_connections(connected_by);

create index if not exists referrals_signed_up_tenant_id_idx on public.referrals(signed_up_tenant_id)
  where signed_up_tenant_id is not null;

create index if not exists subscriptions_plan_idx on public.subscriptions(plan);

create index if not exists tenant_members_invited_by_idx on public.tenant_members(invited_by)
  where invited_by is not null;

create index if not exists tenants_created_by_idx on public.tenants(created_by);
