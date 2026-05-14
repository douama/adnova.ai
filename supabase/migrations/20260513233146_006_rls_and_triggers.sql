
-- ═══════════════════════════════════════════════════════════════════════════
-- RLS — Row Level Security pour isolation multi-tenant
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── user_profiles ──────────────────────────────────────────────────────────
alter table public.user_profiles enable row level security;

create policy user_profiles_select_own
  on public.user_profiles for select
  using (id = auth.uid() or public.is_super_admin());

create policy user_profiles_update_own
  on public.user_profiles for update
  using (id = auth.uid())
  with check (id = auth.uid() and is_super_admin = (select is_super_admin from public.user_profiles where id = auth.uid()));

create policy user_profiles_super_admin_all
  on public.user_profiles for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

-- ─── tenants ────────────────────────────────────────────────────────────────
alter table public.tenants enable row level security;

create policy tenants_select_member
  on public.tenants for select
  using (public.is_tenant_member(id) or public.is_super_admin());

create policy tenants_update_admin
  on public.tenants for update
  using (public.is_tenant_admin(id) or public.is_super_admin())
  with check (public.is_tenant_admin(id) or public.is_super_admin());

create policy tenants_insert_authenticated
  on public.tenants for insert
  to authenticated
  with check (created_by = auth.uid());

create policy tenants_delete_owner
  on public.tenants for delete
  using (
    exists (select 1 from public.tenant_members where tenant_id = tenants.id and user_id = auth.uid() and role = 'owner')
    or public.is_super_admin()
  );

-- ─── tenant_members ────────────────────────────────────────────────────────
alter table public.tenant_members enable row level security;

create policy tenant_members_select_member
  on public.tenant_members for select
  using (public.is_tenant_member(tenant_id) or user_id = auth.uid() or public.is_super_admin());

create policy tenant_members_insert_admin
  on public.tenant_members for insert
  with check (public.is_tenant_admin(tenant_id) or public.is_super_admin());

create policy tenant_members_update_admin
  on public.tenant_members for update
  using (public.is_tenant_admin(tenant_id) or public.is_super_admin())
  with check (public.is_tenant_admin(tenant_id) or public.is_super_admin());

create policy tenant_members_delete_admin_or_self
  on public.tenant_members for delete
  using (public.is_tenant_admin(tenant_id) or user_id = auth.uid() or public.is_super_admin());

-- ─── platform_connections ─────────────────────────────────────────────────
alter table public.platform_connections enable row level security;

create policy platform_connections_select_member
  on public.platform_connections for select
  using (public.is_tenant_member(tenant_id) or public.is_super_admin());

create policy platform_connections_admin_write
  on public.platform_connections for all
  using (public.is_tenant_admin(tenant_id) or public.is_super_admin())
  with check (public.is_tenant_admin(tenant_id) or public.is_super_admin());

-- ─── campaigns ─────────────────────────────────────────────────────────────
alter table public.campaigns enable row level security;

create policy campaigns_select_member on public.campaigns for select
  using (public.is_tenant_member(tenant_id) or public.is_super_admin());
create policy campaigns_insert_member on public.campaigns for insert
  with check (public.is_tenant_member(tenant_id));
create policy campaigns_update_member on public.campaigns for update
  using (public.is_tenant_member(tenant_id))
  with check (public.is_tenant_member(tenant_id));
create policy campaigns_delete_admin on public.campaigns for delete
  using (public.is_tenant_admin(tenant_id) or public.is_super_admin());

-- ─── ad_sets ───────────────────────────────────────────────────────────────
alter table public.ad_sets enable row level security;

create policy ad_sets_select_member on public.ad_sets for select
  using (public.is_tenant_member(tenant_id) or public.is_super_admin());
create policy ad_sets_insert_member on public.ad_sets for insert
  with check (public.is_tenant_member(tenant_id));
create policy ad_sets_update_member on public.ad_sets for update
  using (public.is_tenant_member(tenant_id))
  with check (public.is_tenant_member(tenant_id));
create policy ad_sets_delete_admin on public.ad_sets for delete
  using (public.is_tenant_admin(tenant_id) or public.is_super_admin());

-- ─── creatives ─────────────────────────────────────────────────────────────
alter table public.creatives enable row level security;

create policy creatives_select_member on public.creatives for select
  using (public.is_tenant_member(tenant_id) or public.is_super_admin());
create policy creatives_insert_member on public.creatives for insert
  with check (public.is_tenant_member(tenant_id));
create policy creatives_update_member on public.creatives for update
  using (public.is_tenant_member(tenant_id))
  with check (public.is_tenant_member(tenant_id));
create policy creatives_delete_admin on public.creatives for delete
  using (public.is_tenant_admin(tenant_id) or public.is_super_admin());

-- ─── audiences ─────────────────────────────────────────────────────────────
alter table public.audiences enable row level security;

create policy audiences_select_member on public.audiences for select
  using (public.is_tenant_member(tenant_id) or public.is_super_admin());
create policy audiences_insert_member on public.audiences for insert
  with check (public.is_tenant_member(tenant_id));
create policy audiences_update_member on public.audiences for update
  using (public.is_tenant_member(tenant_id))
  with check (public.is_tenant_member(tenant_id));
create policy audiences_delete_admin on public.audiences for delete
  using (public.is_tenant_admin(tenant_id) or public.is_super_admin());

-- ─── automation_rules ──────────────────────────────────────────────────────
alter table public.automation_rules enable row level security;

create policy automation_rules_select_member on public.automation_rules for select
  using (public.is_tenant_member(tenant_id) or public.is_super_admin());
create policy automation_rules_insert_member on public.automation_rules for insert
  with check (public.is_tenant_member(tenant_id));
create policy automation_rules_update_member on public.automation_rules for update
  using (public.is_tenant_member(tenant_id))
  with check (public.is_tenant_member(tenant_id));
create policy automation_rules_delete_admin on public.automation_rules for delete
  using (public.is_tenant_admin(tenant_id) or public.is_super_admin());

-- ─── ai_decisions ──────────────────────────────────────────────────────────
alter table public.ai_decisions enable row level security;

create policy ai_decisions_select_member on public.ai_decisions for select
  using (public.is_tenant_member(tenant_id) or public.is_super_admin());

-- Approbation manuelle d'une décision "proposed" → seul un admin du tenant
create policy ai_decisions_approve_admin on public.ai_decisions for update
  using (public.is_tenant_admin(tenant_id) and status in ('proposed', 'blocked'))
  with check (public.is_tenant_admin(tenant_id));

-- INSERT et autres UPDATE → service_role uniquement (Edge Functions IA)

-- ─── plans (lecture publique, écriture super_admin) ────────────────────────
alter table public.plans enable row level security;

create policy plans_select_all on public.plans for select
  using (is_visible = true or public.is_super_admin());

create policy plans_super_admin_write on public.plans for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

-- ─── subscriptions / invoices / usage_meters ──────────────────────────────
alter table public.subscriptions enable row level security;
alter table public.invoices enable row level security;
alter table public.usage_meters enable row level security;

create policy subscriptions_select_admin on public.subscriptions for select
  using (public.is_tenant_admin(tenant_id) or public.is_super_admin());

create policy invoices_select_admin on public.invoices for select
  using (public.is_tenant_admin(tenant_id) or public.is_super_admin());

create policy usage_meters_select_member on public.usage_meters for select
  using (public.is_tenant_member(tenant_id) or public.is_super_admin());

-- ─── affiliates / referrals / payouts / commission_earnings ───────────────
alter table public.affiliates enable row level security;
alter table public.referrals enable row level security;
alter table public.payouts enable row level security;
alter table public.commission_earnings enable row level security;

create policy affiliates_select_own on public.affiliates for select
  using (
    user_id = auth.uid()
    or (tenant_id is not null and public.is_tenant_member(tenant_id))
    or public.is_super_admin()
  );

create policy affiliates_update_own on public.affiliates for update
  using (
    user_id = auth.uid()
    or (tenant_id is not null and public.is_tenant_admin(tenant_id))
    or public.is_super_admin()
  )
  with check (
    user_id = auth.uid()
    or (tenant_id is not null and public.is_tenant_admin(tenant_id))
    or public.is_super_admin()
  );

create policy referrals_select_own on public.referrals for select
  using (
    affiliate_id in (
      select id from public.affiliates
      where user_id = auth.uid() or (tenant_id is not null and public.is_tenant_member(tenant_id))
    )
    or public.is_super_admin()
  );

create policy payouts_select_own on public.payouts for select
  using (
    affiliate_id in (
      select id from public.affiliates
      where user_id = auth.uid() or (tenant_id is not null and public.is_tenant_member(tenant_id))
    )
    or public.is_super_admin()
  );

create policy commission_earnings_select_own on public.commission_earnings for select
  using (
    affiliate_id in (
      select id from public.affiliates
      where user_id = auth.uid() or (tenant_id is not null and public.is_tenant_member(tenant_id))
    )
    or public.is_super_admin()
  );

-- ═══════════════════════════════════════════════════════════════════════════
-- TRIGGER : auto-onboarding à la signup
-- ═══════════════════════════════════════════════════════════════════════════
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id   uuid;
  v_full_name   text;
  v_tenant_slug text;
  v_tenant_name text;
begin
  v_full_name := coalesce(
    new.raw_user_meta_data->>'full_name',
    split_part(new.email, '@', 1)
  );

  -- 1. user_profile
  insert into public.user_profiles (id, full_name)
  values (new.id, v_full_name);

  -- 2. tenant personnel
  v_tenant_slug := lower(regexp_replace(split_part(new.email, '@', 1), '[^a-z0-9]+', '-', 'g'));
  while exists (select 1 from public.tenants where slug = v_tenant_slug) loop
    v_tenant_slug := v_tenant_slug || '-' || substring(gen_random_uuid()::text, 1, 4);
  end loop;
  v_tenant_name := coalesce(new.raw_user_meta_data->>'company', v_full_name || '''s workspace');

  insert into public.tenants (slug, name, created_by, status, plan)
  values (v_tenant_slug, v_tenant_name, new.id, 'trial', 'trial')
  returning id into v_tenant_id;

  -- 3. owner membership
  insert into public.tenant_members (tenant_id, user_id, role)
  values (v_tenant_id, new.id, 'owner');

  -- 4. subscription trial 14j
  insert into public.subscriptions (tenant_id, plan, status, trial_ends_at)
  values (v_tenant_id, 'trial', 'trialing', now() + interval '14 days');

  return new;
end;
$$;

comment on function public.handle_new_user is
  'Trigger après auth.users INSERT — crée user_profile + tenant personnel + membership owner + subscription trial';

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── Helper SQL pour client : "mes tenants" ────────────────────────────────
create or replace function public.my_tenants()
returns table (
  tenant_id  uuid,
  slug       text,
  name       text,
  role       public.tenant_role,
  plan       public.plan_tier,
  status     public.tenant_status,
  ai_mode    public.ai_mode
)
language sql
stable
security definer
set search_path = public
as $$
  select t.id, t.slug, t.name, m.role, t.plan, t.status, t.ai_mode
  from public.tenants t
  join public.tenant_members m on m.tenant_id = t.id
  where m.user_id = auth.uid()
  order by m.joined_at asc;
$$;

comment on function public.my_tenants is
  'Helper côté client : liste les tenants dont l''user courant est membre + son rôle.';
