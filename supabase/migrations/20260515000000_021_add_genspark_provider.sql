-- Add Genspark as a supported AI provider for image and video creative generation.
-- Drops and recreates the check constraint to include 'genspark',
-- then updates set_provider_credential to accept the new value.

ALTER TABLE public.provider_credentials
  DROP CONSTRAINT provider_credentials_provider_check;

ALTER TABLE public.provider_credentials
  ADD CONSTRAINT provider_credentials_provider_check
    CHECK (provider IN ('anthropic','openai','runway','heygen','genspark'));

-- Recreate set_provider_credential with genspark in the guard list.
CREATE OR REPLACE FUNCTION public.set_provider_credential(
  p_provider text,
  p_api_key text,
  p_notes text default null
) RETURNS json
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
  IF p_api_key IS NULL OR length(p_api_key) < 10 THEN
    RAISE EXCEPTION 'api_key too short';
  END IF;
  IF p_provider NOT IN ('anthropic','openai','runway','heygen','genspark') THEN
    RAISE EXCEPTION 'unknown provider: %', p_provider;
  END IF;
  v_preview := left(p_api_key, 5) || '...' || right(p_api_key, 4);
  INSERT INTO public.provider_credentials(
    provider, api_key, key_preview, last_rotated_at, rotated_by, notes
  ) VALUES (
    p_provider, p_api_key, v_preview, now(), auth.uid(), p_notes
  )
  ON CONFLICT (provider) DO UPDATE
    SET api_key          = EXCLUDED.api_key,
        key_preview      = EXCLUDED.key_preview,
        last_rotated_at  = now(),
        rotated_by       = auth.uid(),
        notes            = COALESCE(EXCLUDED.notes, public.provider_credentials.notes),
        is_active        = true;
  RETURN json_build_object('ok', true, 'preview', v_preview);
END$$;
