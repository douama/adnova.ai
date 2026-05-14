-- Ad packs feature: groups creatives generated from a single product analysis.
-- Adds monthly quota per plan to control AI generation costs.

-- 1) Plan quota column
ALTER TABLE plans
  ADD COLUMN IF NOT EXISTS max_ad_packs_per_month integer;

UPDATE plans SET max_ad_packs_per_month = 3  WHERE id = 'trial';
UPDATE plans SET max_ad_packs_per_month = 10 WHERE id = 'starter';
UPDATE plans SET max_ad_packs_per_month = 50 WHERE id = 'growth';
UPDATE plans SET max_ad_packs_per_month = NULL WHERE id = 'enterprise';

COMMENT ON COLUMN plans.max_ad_packs_per_month IS
  'Hard quota: max ad packs (creative sets) generatable per calendar month. NULL = unlimited.';

-- 2) ad_packs table
CREATE TABLE IF NOT EXISTS ad_packs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name text NOT NULL,
  source_image_url text,
  source_product_url text,
  product_title text,
  product_summary text,
  analysis_prompt text NOT NULL,
  prompt_chars int NOT NULL DEFAULT 0,
  analysis_meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft',
  engine text NOT NULL DEFAULT 'image',
  requested_images int NOT NULL DEFAULT 0,
  requested_videos int NOT NULL DEFAULT 0,
  requested_ugc int NOT NULL DEFAULT 0,
  generated_images int NOT NULL DEFAULT 0,
  generated_videos int NOT NULL DEFAULT 0,
  generated_ugc int NOT NULL DEFAULT 0,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ad_packs_status_check CHECK (status IN ('draft','generating','completed','failed'))
);

COMMENT ON TABLE ad_packs IS
  'Ad pack = one product analyzed -> group of creatives generated from a single AI prompt. Counts against monthly quota.';

CREATE INDEX IF NOT EXISTS ad_packs_tenant_created_idx ON ad_packs (tenant_id, created_at DESC);

-- 3) creatives -> ad_packs link
ALTER TABLE creatives
  ADD COLUMN IF NOT EXISTS ad_pack_id uuid REFERENCES ad_packs(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS creatives_ad_pack_idx ON creatives (ad_pack_id);

-- 4) RLS
ALTER TABLE ad_packs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ad_packs_member_select" ON ad_packs;
CREATE POLICY "ad_packs_member_select" ON ad_packs
  FOR SELECT
  USING (tenant_id IN (SELECT tenant_id FROM tenant_members WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "ad_packs_member_insert" ON ad_packs;
CREATE POLICY "ad_packs_member_insert" ON ad_packs
  FOR INSERT
  WITH CHECK (tenant_id IN (SELECT tenant_id FROM tenant_members WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "ad_packs_member_update" ON ad_packs;
CREATE POLICY "ad_packs_member_update" ON ad_packs
  FOR UPDATE
  USING (tenant_id IN (SELECT tenant_id FROM tenant_members WHERE user_id = auth.uid()));

-- 5) Quota RPC
CREATE OR REPLACE FUNCTION ad_packs_quota_status(_tenant_id uuid)
RETURNS TABLE (
  used int,
  quota int,
  unlimited boolean,
  plan_id text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH t AS (SELECT plan::text AS plan_id FROM tenants WHERE id = _tenant_id),
  q AS (SELECT max_ad_packs_per_month FROM plans WHERE id = (SELECT plan_id FROM t)),
  u AS (
    SELECT COUNT(*)::int AS used
    FROM ad_packs
    WHERE tenant_id = _tenant_id
      AND created_at >= date_trunc('month', now())
  )
  SELECT
    u.used,
    COALESCE(q.max_ad_packs_per_month, -1) AS quota,
    q.max_ad_packs_per_month IS NULL AS unlimited,
    (SELECT plan_id FROM t) AS plan_id
  FROM u, q;
$$;

GRANT EXECUTE ON FUNCTION ad_packs_quota_status(uuid) TO authenticated, anon, service_role;

-- 6) Atomic counter increment (called by generate-creative-* after success)
CREATE OR REPLACE FUNCTION ad_pack_increment_generated(_pack_id uuid, _kind text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _kind = 'image' THEN
    UPDATE ad_packs
      SET generated_images = generated_images + 1,
          updated_at = now(),
          status = CASE
            WHEN generated_images + 1 >= requested_images
              AND generated_videos >= requested_videos
              AND generated_ugc >= requested_ugc
            THEN 'completed' ELSE status END
      WHERE id = _pack_id;
  ELSIF _kind = 'video' THEN
    UPDATE ad_packs
      SET generated_videos = generated_videos + 1,
          updated_at = now(),
          status = CASE
            WHEN generated_images >= requested_images
              AND generated_videos + 1 >= requested_videos
              AND generated_ugc >= requested_ugc
            THEN 'completed' ELSE status END
      WHERE id = _pack_id;
  ELSIF _kind = 'ugc' THEN
    UPDATE ad_packs
      SET generated_ugc = generated_ugc + 1,
          updated_at = now(),
          status = CASE
            WHEN generated_images >= requested_images
              AND generated_videos >= requested_videos
              AND generated_ugc + 1 >= requested_ugc
            THEN 'completed' ELSE status END
      WHERE id = _pack_id;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION ad_pack_increment_generated(uuid, text) TO authenticated, service_role;
