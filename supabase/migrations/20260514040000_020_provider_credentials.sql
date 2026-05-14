-- Store AI provider API keys in a server-side-only table so super-admins can
-- rotate keys from the admin UI instead of having to ssh into Supabase
-- secrets. The table is RLS-locked : no policies = anon/authenticated cannot
-- SELECT, INSERT, UPDATE, or DELETE anything. Only service_role bypasses RLS,
-- so Edge Functions are the sole readers. SECURITY DEFINER RPCs gated by
-- is_super_admin() are the sole writers.

create table if not exists public.provider_credentials (
  provider text primary key check (
    provider in ('anthropic','openai','runway','heygen')
  ),
  api_key text not null,
  key_preview text not null,
  is_active boolean not null default true,
  last_rotated_at timestamptz not null default now(),
  rotated_by uuid references auth.users(id) on delete set null,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.provider_credentials enable row level security;
-- intentionally no policies — locks the table to service_role only.

-- Upsert a provider credential. Only callable by super-admins.
create or replace function public.set_provider_credential(
  p_provider text,
  p_api_key text,
  p_notes text default null
) returns json
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_preview text;
begin
  if not public.is_super_admin() then
    raise exception 'access denied';
  end if;
  if p_api_key is null or length(p_api_key) < 10 then
    raise exception 'api_key too short';
  end if;
  if p_provider not in ('anthropic','openai','runway','heygen') then
    raise exception 'unknown provider: %', p_provider;
  end if;
  v_preview := left(p_api_key, 5) || '...' || right(p_api_key, 4);
  insert into public.provider_credentials(
    provider, api_key, key_preview, last_rotated_at, rotated_by, notes
  ) values (
    p_provider, p_api_key, v_preview, now(), auth.uid(), p_notes
  )
  on conflict (provider) do update
    set api_key = excluded.api_key,
        key_preview = excluded.key_preview,
        last_rotated_at = now(),
        rotated_by = auth.uid(),
        notes = coalesce(excluded.notes, public.provider_credentials.notes),
        is_active = true;
  return json_build_object('ok', true, 'preview', v_preview);
end$$;

create or replace function public.list_provider_credentials()
returns table(
  provider text,
  key_preview text,
  is_active boolean,
  last_rotated_at timestamptz,
  rotated_by_email text,
  notes text
)
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_super_admin() then
    raise exception 'access denied';
  end if;
  return query
    select c.provider, c.key_preview, c.is_active, c.last_rotated_at,
           u.email::text as rotated_by_email, c.notes
    from public.provider_credentials c
    left join auth.users u on u.id = c.rotated_by
    order by c.provider;
end$$;

create or replace function public.delete_provider_credential(p_provider text)
returns json
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_super_admin() then
    raise exception 'access denied';
  end if;
  delete from public.provider_credentials where provider = p_provider;
  return json_build_object('ok', true);
end$$;

create or replace function public.toggle_provider_credential(
  p_provider text,
  p_is_active boolean
) returns json
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_super_admin() then
    raise exception 'access denied';
  end if;
  update public.provider_credentials
     set is_active = p_is_active
   where provider = p_provider;
  return json_build_object('ok', true);
end$$;

create or replace function public.get_provider_credential(p_provider text)
returns text
language sql
security definer
set search_path = public
as $$
  select api_key
    from public.provider_credentials
   where provider = p_provider and is_active
   limit 1;
$$;

revoke execute on function public.set_provider_credential(text, text, text) from public, anon;
grant execute on function public.set_provider_credential(text, text, text) to authenticated;

revoke execute on function public.list_provider_credentials() from public, anon;
grant execute on function public.list_provider_credentials() to authenticated;

revoke execute on function public.delete_provider_credential(text) from public, anon;
grant execute on function public.delete_provider_credential(text) to authenticated;

revoke execute on function public.toggle_provider_credential(text, boolean) from public, anon;
grant execute on function public.toggle_provider_credential(text, boolean) to authenticated;

revoke execute on function public.get_provider_credential(text) from public, anon, authenticated;
