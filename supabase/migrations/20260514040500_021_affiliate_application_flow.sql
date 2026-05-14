-- Public-facing RPCs for the affiliate / influencer program.
--
-- apply_as_affiliate : creates a pending application (is_active=false,
--   approved_at=null). Callable by anon + authenticated. Generates a
--   provisional code from the display name; the admin reviews + approves
--   before the code goes live and pays out.
-- approve_affiliate  : super-admin only. Activates the row, optionally
--   regenerates a code, sets approved_at/by.

create or replace function public.apply_as_affiliate(
  p_display_name text,
  p_email text,
  p_channel text default null,
  p_channel_url text default null,
  p_audience_size int default null,
  p_payout_method text default 'stripe',
  p_payout_account_ref text default null
) returns json
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_code text;
  v_id uuid;
  v_existing uuid;
begin
  if p_display_name is null or length(trim(p_display_name)) < 2 then
    raise exception 'display_name required';
  end if;
  if p_email is null or position('@' in p_email) < 2 then
    raise exception 'valid email required';
  end if;
  if p_payout_method not in ('stripe','paypal','sepa','wise') then
    raise exception 'invalid payout_method';
  end if;

  select id into v_existing from public.affiliates where lower(email) = lower(p_email) limit 1;
  if v_existing is not null then
    return json_build_object(
      'ok', true,
      'duplicate', true,
      'affiliate_id', v_existing,
      'message', 'application already on file for this email'
    );
  end if;

  v_code := regexp_replace(lower(p_display_name), '[^a-z0-9]+', '', 'g');
  v_code := left(v_code, 16);
  if length(v_code) < 3 then v_code := 'aff'; end if;
  v_code := v_code || '-' || lower(substring(md5(random()::text || clock_timestamp()::text), 1, 4));

  insert into public.affiliates(
    user_id, code, display_name, email, channel, channel_url,
    audience_size, tier, commission_pct, payout_method,
    payout_account_ref, is_active
  ) values (
    auth.uid(), v_code, trim(p_display_name), lower(trim(p_email)),
    nullif(trim(coalesce(p_channel,'')), ''),
    nullif(trim(coalesce(p_channel_url,'')), ''),
    p_audience_size,
    'bronze', 20,
    p_payout_method::public.payout_method,
    nullif(trim(coalesce(p_payout_account_ref,'')), ''),
    false
  )
  returning id into v_id;

  return json_build_object(
    'ok', true,
    'affiliate_id', v_id,
    'code', v_code,
    'tier', 'bronze',
    'commission_pct', 20,
    'status', 'pending_review'
  );
end$$;

create or replace function public.approve_affiliate(
  p_affiliate_id uuid,
  p_new_code text default null
) returns json
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_final_code text;
begin
  if not public.is_super_admin() then
    raise exception 'access denied';
  end if;
  if p_new_code is not null and length(p_new_code) >= 3 then
    v_final_code := regexp_replace(lower(p_new_code), '[^a-z0-9-]', '', 'g');
  end if;

  update public.affiliates
     set is_active = true,
         approved_at = now(),
         approved_by = auth.uid(),
         code = coalesce(v_final_code, code)
   where id = p_affiliate_id;

  return json_build_object('ok', true);
end$$;

revoke execute on function public.apply_as_affiliate(text, text, text, text, int, text, text) from public;
grant execute on function public.apply_as_affiliate(text, text, text, text, int, text, text) to anon, authenticated;
revoke execute on function public.approve_affiliate(uuid, text) from public, anon;
grant execute on function public.approve_affiliate(uuid, text) to authenticated;
