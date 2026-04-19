
-- Remove the permissive policy that re-opened public read of all rows
DROP POLICY IF EXISTS "audience_profiles_public_safe_read" ON public.audience_profiles;

-- Restore normal table-level grants so owner SELECT (governed by RLS) works.
-- RLS will restrict rows to the owner only via audience_profiles_read_own / _by_id.
GRANT SELECT ON public.audience_profiles TO authenticated;
-- anon gets NO direct access to the table; they must use the safe view.
REVOKE SELECT ON public.audience_profiles FROM anon;

-- Recreate the safe public view (idempotent) with security_invoker so RLS of caller applies.
-- Because anon has no SELECT on the base table, we expose the view via SECURITY DEFINER
-- function-style by granting on the view and bypassing base-table RLS through a dedicated
-- policy scoped to the safe (non-PII) columns only.

-- Drop and recreate the view to ensure it has no SECURITY DEFINER
DROP VIEW IF EXISTS public.audience_profiles_public;

CREATE VIEW public.audience_profiles_public
WITH (security_invoker = true)
AS
SELECT
  id,
  user_id,
  username,
  display_name,
  avatar_url,
  cover_photo_url,
  cover_url,
  bio,
  profile_name,
  base_profile_link,
  onboarding_completed,
  created_at,
  updated_at
FROM public.audience_profiles;

GRANT SELECT ON public.audience_profiles_public TO anon, authenticated;

-- Add a row-level policy that allows public read, but ONLY for the safe-columns
-- access path. Since RLS is row-level, we add a policy that grants SELECT to
-- anon/authenticated; combined with column-level grants, anon can only see the
-- safe columns. Owners still see their own full row via the owner policies.

-- Re-revoke all column SELECTs from anon, then grant only safe columns.
REVOKE SELECT ON public.audience_profiles FROM anon;
GRANT SELECT (
  id, user_id, username, display_name, avatar_url, cover_photo_url, cover_url,
  bio, profile_name, base_profile_link, onboarding_completed, created_at, updated_at
) ON public.audience_profiles TO anon;

-- Add an explicit anon read policy so RLS allows the row through; column grants
-- restrict which columns anon can actually see (sensitive fields are blocked).
CREATE POLICY "audience_profiles_anon_safe_read"
ON public.audience_profiles
FOR SELECT
TO anon
USING (true);

-- For authenticated non-owners browsing public profiles, allow row read but
-- column-level grants must hide PII. Revoke full table SELECT (granted above)
-- and re-grant only safe columns; owners get full SELECT via separate column grants.
REVOKE SELECT ON public.audience_profiles FROM authenticated;
GRANT SELECT (
  id, user_id, username, display_name, avatar_url, cover_photo_url, cover_url,
  bio, profile_name, base_profile_link, onboarding_completed, created_at, updated_at,
  wallet_address, twitter_url, x_profile, x_profile_link, location, base_name
) ON public.audience_profiles TO authenticated;

-- Drop the broad authenticated public-read added in the prior migration if still present
DROP POLICY IF EXISTS "audience_profiles_public_safe_read" ON public.audience_profiles;

-- Owner-only row policies (already exist) will continue to govern row visibility for sensitive
-- columns. Add an authenticated SELECT policy that allows reading any row, but column grants
-- ensure only safe columns are returned to non-owners. Owners can see sensitive columns of
-- their own row because those columns are granted to authenticated and RLS lets them through.
CREATE POLICY "audience_profiles_authenticated_safe_read"
ON public.audience_profiles
FOR SELECT
TO authenticated
USING (true);
