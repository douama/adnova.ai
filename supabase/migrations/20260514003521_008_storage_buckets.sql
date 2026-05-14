-- ═══════════════════════════════════════════════════════════════════════════
-- Storage buckets : creatives (tenant-scoped) + avatars (user-scoped)
-- ═══════════════════════════════════════════════════════════════════════════
-- Convention de path :
--   creatives/{tenant_id}/{creative_id}.{ext}
--   avatars/{user_id}/avatar.{ext}

-- ─── Bucket creatives (privé, signed URLs only) ────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'creatives',
  'creatives',
  false,
  104857600, -- 100 MB max (vidéos UGC)
  array[
    'image/png', 'image/jpeg', 'image/webp', 'image/gif',
    'video/mp4', 'video/quicktime', 'video/webm'
  ]
)
on conflict (id) do nothing;

-- ─── Bucket avatars (public read, RLS on write) ───────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  2097152,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do nothing;

-- ─── RLS policies on storage.objects (creatives) ──────────────────────────
create policy "creatives_select_member"
  on storage.objects for select
  using (
    bucket_id = 'creatives'
    and (
      public.is_tenant_member((storage.foldername(name))[1]::uuid)
      or public.is_super_admin()
    )
  );

create policy "creatives_insert_member"
  on storage.objects for insert
  with check (
    bucket_id = 'creatives'
    and public.is_tenant_member((storage.foldername(name))[1]::uuid)
  );

create policy "creatives_update_member"
  on storage.objects for update
  using (
    bucket_id = 'creatives'
    and public.is_tenant_member((storage.foldername(name))[1]::uuid)
  )
  with check (
    bucket_id = 'creatives'
    and public.is_tenant_member((storage.foldername(name))[1]::uuid)
  );

create policy "creatives_delete_admin"
  on storage.objects for delete
  using (
    bucket_id = 'creatives'
    and (
      public.is_tenant_admin((storage.foldername(name))[1]::uuid)
      or public.is_super_admin()
    )
  );

-- ─── RLS policies on storage.objects (avatars) ────────────────────────────
create policy "avatars_insert_own"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_update_own"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_delete_own"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- ─── Helper SQL : generate canonical creative path ────────────────────────
create or replace function public.creative_storage_path(
  _tenant_id uuid,
  _creative_id uuid,
  _extension text
)
returns text
language sql
immutable
as $$
  select _tenant_id::text || '/' || _creative_id::text || '.' || lower(_extension);
$$;

comment on function public.creative_storage_path is
  'Generates canonical path creatives/{tenant_id}/{creative_id}.{ext}';
