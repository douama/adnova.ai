-- Payment credentials — multi-slot per provider (Stripe / PayPal).
-- Stripe needs publishable_key + secret_key + webhook_secret.
-- PayPal needs client_id + client_secret + webhook_id.
-- We expose publishable keys to the browser (is_publishable=true), keep the
-- rest service-role-only.

CREATE TABLE IF NOT EXISTS payment_credentials (
  provider text NOT NULL,
  slot text NOT NULL,
  api_key text NOT NULL,
  key_preview text NOT NULL,
  is_publishable boolean NOT NULL DEFAULT false,
  mode text NOT NULL DEFAULT 'test',
  is_active boolean NOT NULL DEFAULT true,
  last_rotated_at timestamptz NOT NULL DEFAULT now(),
  rotated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  notes text,
  PRIMARY KEY (provider, slot),
  CONSTRAINT payment_credentials_provider_check CHECK (provider IN ('stripe', 'paypal')),
  CONSTRAINT payment_credentials_mode_check CHECK (mode IN ('test', 'live')),
  CONSTRAINT payment_credentials_slot_check CHECK (
    (provider = 'stripe' AND slot IN ('publishable_key', 'secret_key', 'webhook_secret'))
    OR (provider = 'paypal' AND slot IN ('client_id', 'client_secret', 'webhook_id'))
  )
);

COMMENT ON TABLE payment_credentials IS
  'Stripe + PayPal credentials, one row per (provider, slot). Secrets are service-role-only; publishable keys are returned to the browser via list_payment_credentials_public().';

-- RLS — table is locked tight; everything goes through SECURITY DEFINER RPCs.
ALTER TABLE payment_credentials ENABLE ROW LEVEL SECURITY;

-- ── Admin RPCs ────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_payment_credential(
  p_provider text,
  p_slot text,
  p_api_key text,
  p_mode text DEFAULT 'test',
  p_is_publishable boolean DEFAULT false,
  p_notes text DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  v_preview text;
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'access denied';
  END IF;
  IF p_api_key IS NULL OR length(p_api_key) < 8 THEN
    RAISE EXCEPTION 'api_key too short';
  END IF;
  IF p_mode NOT IN ('test', 'live') THEN
    RAISE EXCEPTION 'mode must be test or live';
  END IF;

  v_preview := left(p_api_key, 7) || '…' || right(p_api_key, 4);

  INSERT INTO payment_credentials (
    provider, slot, api_key, key_preview, is_publishable, mode,
    last_rotated_at, rotated_by, notes
  ) VALUES (
    p_provider, p_slot, p_api_key, v_preview, p_is_publishable, p_mode,
    now(), auth.uid(), p_notes
  )
  ON CONFLICT (provider, slot) DO UPDATE SET
    api_key = EXCLUDED.api_key,
    key_preview = EXCLUDED.key_preview,
    is_publishable = EXCLUDED.is_publishable,
    mode = EXCLUDED.mode,
    last_rotated_at = now(),
    rotated_by = auth.uid(),
    notes = COALESCE(EXCLUDED.notes, payment_credentials.notes),
    is_active = true;

  RETURN json_build_object('ok', true, 'preview', v_preview);
END;
$$;

GRANT EXECUTE ON FUNCTION set_payment_credential(text, text, text, text, boolean, text)
  TO authenticated;

CREATE OR REPLACE FUNCTION delete_payment_credential(p_provider text, p_slot text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'access denied';
  END IF;
  DELETE FROM payment_credentials WHERE provider = p_provider AND slot = p_slot;
  RETURN json_build_object('ok', true);
END;
$$;

GRANT EXECUTE ON FUNCTION delete_payment_credential(text, text) TO authenticated;

CREATE OR REPLACE FUNCTION toggle_payment_credential(
  p_provider text, p_slot text, p_is_active boolean
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'access denied';
  END IF;
  UPDATE payment_credentials
    SET is_active = p_is_active
    WHERE provider = p_provider AND slot = p_slot;
  RETURN json_build_object('ok', true);
END;
$$;

GRANT EXECUTE ON FUNCTION toggle_payment_credential(text, text, boolean) TO authenticated;

-- Admin listing — preview-only, no plain api_key
CREATE OR REPLACE FUNCTION list_payment_credentials()
RETURNS TABLE (
  provider text,
  slot text,
  key_preview text,
  is_publishable boolean,
  mode text,
  is_active boolean,
  last_rotated_at timestamptz,
  rotated_by_email text,
  notes text
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'access denied';
  END IF;
  RETURN QUERY
    SELECT
      pc.provider,
      pc.slot,
      pc.key_preview,
      pc.is_publishable,
      pc.mode,
      pc.is_active,
      pc.last_rotated_at,
      (SELECT u.email FROM auth.users u WHERE u.id = pc.rotated_by),
      pc.notes
    FROM payment_credentials pc
    ORDER BY pc.provider, pc.slot;
END;
$$;

GRANT EXECUTE ON FUNCTION list_payment_credentials() TO authenticated;

-- Service-role only — returns the raw api_key. Used by Edge Functions
-- (e.g. stripe-checkout, paypal-webhook) to obtain the secret at call time.
CREATE OR REPLACE FUNCTION get_payment_credential(p_provider text, p_slot text)
RETURNS text
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_key text;
BEGIN
  SELECT api_key INTO v_key
  FROM payment_credentials
  WHERE provider = p_provider AND slot = p_slot AND is_active = true;
  RETURN v_key;
END;
$$;

GRANT EXECUTE ON FUNCTION get_payment_credential(text, text) TO service_role;

-- Public-safe listing — publishable keys only, for use in frontend (Stripe.js init etc.)
CREATE OR REPLACE FUNCTION list_payment_credentials_public()
RETURNS TABLE (
  provider text,
  slot text,
  api_key text,
  mode text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT provider, slot, api_key, mode
  FROM payment_credentials
  WHERE is_publishable = true AND is_active = true;
$$;

GRANT EXECUTE ON FUNCTION list_payment_credentials_public() TO authenticated, anon;
