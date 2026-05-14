-- ═══════════════════════════════════════════════════════════════════════════
-- pgvector wiring : auto-embed new ai_decisions + semantic recall helper
-- ═══════════════════════════════════════════════════════════════════════════
-- Flow :
--   INSERT INTO ai_decisions
--     → trigger ai_decisions_embed (AFTER INSERT)
--     → invoke_embed_decision(NEW.id)
--     → pg_net.http_post → embed-decision Edge Function
--     → OpenAI text-embedding-3-small (1536 dims)
--     → UPDATE ai_decisions SET embedding = <vec>
--
-- If OPENAI_API_KEY is not set on the Edge Function, embed-decision returns
-- {skipped: true} and the embedding column stays null. claude-decide then
-- skips semantic retrieval and falls back to rule-based recent context only.

-- ─── Helper : POST to embed-decision Edge Function for one decision ──────
create or replace function public.invoke_embed_decision(_decision_id uuid)
returns bigint
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_service_key text;
  v_request_id  bigint;
begin
  select decrypted_secret into v_service_key
  from vault.decrypted_secrets
  where name = 'service_role_key'
  limit 1;

  if v_service_key is null then
    raise notice 'Vault secret "service_role_key" not configured — embedding skipped for decision %', _decision_id;
    return null;
  end if;

  select net.http_post(
    url := public.adnova_supabase_url() || '/functions/v1/embed-decision',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || v_service_key
    ),
    body := jsonb_build_object('decision_id', _decision_id),
    timeout_milliseconds := 30000
  ) into v_request_id;

  return v_request_id;
end;
$$;

revoke execute on function public.invoke_embed_decision(uuid)
  from public, anon, authenticated;

-- ─── Trigger : fire-and-forget embedding on each INSERT ──────────────────
create or replace function public.trg_ai_decisions_embed()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  -- Async via pg_net — never blocks the INSERT.
  perform public.invoke_embed_decision(NEW.id);
  return NEW;
end;
$$;

drop trigger if exists ai_decisions_embed on public.ai_decisions;
create trigger ai_decisions_embed
  after insert on public.ai_decisions
  for each row
  execute function public.trg_ai_decisions_embed();

-- ─── Semantic recall : top-K similar past decisions for this tenant ──────
-- Cosine distance via pgvector HNSW index (ai_decisions_embedding_idx).
-- Returns similarity (1 - cosine_distance) so higher = more similar.

create or replace function public.similar_decisions_by_embedding(
  _tenant_id        uuid,
  _query_embedding  extensions.vector(1536),
  _k                int default 5,
  _exclude_ids      uuid[] default array[]::uuid[],
  _min_similarity   real default 0.0
)
returns table (
  id             uuid,
  campaign_id    uuid,
  decision_type  text,
  reason         text,
  confidence     numeric,
  created_at     timestamptz,
  similarity     real
)
language sql
stable
security invoker
set search_path = public, extensions
as $$
  select
    d.id,
    d.campaign_id,
    d.type::text as decision_type,
    d.reason,
    d.confidence,
    d.created_at,
    (1 - (d.embedding operator(extensions.<=>) _query_embedding))::real as similarity
  from public.ai_decisions d
  where d.tenant_id = _tenant_id
    and d.embedding is not null
    and not (d.id = any(_exclude_ids))
    and (1 - (d.embedding operator(extensions.<=>) _query_embedding)) >= _min_similarity
  order by d.embedding operator(extensions.<=>) _query_embedding
  limit _k;
$$;

grant execute on function public.similar_decisions_by_embedding(uuid, extensions.vector, int, uuid[], real)
  to authenticated, service_role;

comment on function public.similar_decisions_by_embedding is
  'Returns top-K decisions semantically similar to the query embedding, scoped to one tenant. Uses cosine distance on the HNSW index.';
