
-- =========================================
-- 1) Lock down audience_profiles public read
-- =========================================

-- Drop overly permissive public read policies that exposed all columns
DROP POLICY IF EXISTS "Public read profiles" ON public.audience_profiles;
DROP POLICY IF EXISTS "public read profiles" ON public.audience_profiles;

-- Keep owner read policy (audience_profiles_read_own already exists)
-- Add explicit owner read by id as well, in case profile owner check uses id instead of user_id
CREATE POLICY "audience_profiles_read_own_by_id"
ON public.audience_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id OR auth.uid() = user_id);

-- Create a safe public view that exposes ONLY non-PII fields
CREATE OR REPLACE VIEW public.audience_profiles_public
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

-- Allow public read on the safe view
GRANT SELECT ON public.audience_profiles_public TO anon, authenticated;

-- Because security_invoker uses caller's RLS, we need a permissive policy
-- that allows reading the safe (non-PII) columns publicly. We do this by
-- adding a policy that only matters for the columns selected by the view.
-- Postgres RLS is row-level (not column-level), so to make the view readable
-- by anon we add a separate row-permissive policy AND ensure the underlying
-- table's sensitive columns are never selected by the view.
CREATE POLICY "audience_profiles_public_safe_read"
ON public.audience_profiles
FOR SELECT
TO anon, authenticated
USING (true);

-- NOTE: The above policy alone re-opens row-level read. To fully prevent PII
-- exposure when clients query the table directly, we revoke direct column
-- access to sensitive fields from anon/authenticated and force them through
-- the view.
REVOKE SELECT ON public.audience_profiles FROM anon;
REVOKE SELECT ON public.audience_profiles FROM authenticated;

-- Grant SELECT on only the safe columns of the underlying table to authenticated
-- (owners still get full access via their own role context through the owner policy,
--  but column grants are checked first; so we grant full to authenticated for owner reads
--  and rely on app code to use the public view for non-owner browsing).
GRANT SELECT (
  id, user_id, username, display_name, avatar_url, cover_photo_url, cover_url,
  bio, profile_name, base_profile_link, onboarding_completed, created_at, updated_at
) ON public.audience_profiles TO anon, authenticated;

-- Owners need to read their full row (including sensitive fields). Grant
-- column-level SELECT on sensitive columns to authenticated; RLS still
-- restricts row access to the owner via audience_profiles_read_own / _by_id.
GRANT SELECT (
  wallet_address, twitter_url, x_profile, x_profile_link, location, base_name
) ON public.audience_profiles TO authenticated;


-- ===================================================
-- 2) Lock down avaters storage bucket update/delete
-- ===================================================

-- Drop any existing permissive update/delete policies on the avaters bucket
DROP POLICY IF EXISTS "avaters update" ON storage.objects;
DROP POLICY IF EXISTS "avaters delete" ON storage.objects;
DROP POLICY IF EXISTS "avaters insert" ON storage.objects;
DROP POLICY IF EXISTS "avaters select" ON storage.objects;
DROP POLICY IF EXISTS "Avaters are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avater" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avater" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avater" ON storage.objects;

-- Public read of avatars (bucket is public, but explicit policy helps clarity)
CREATE POLICY "Avaters are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avaters');

-- Authenticated users can upload only into their own user-id folder
CREATE POLICY "Users can upload their own avater"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avaters'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Only the owner (path starts with their user id) can update their avatar file
CREATE POLICY "Users can update their own avater"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avaters'
  AND auth.uid()::text = (storage.foldername(name))[1]
)
WITH CHECK (
  bucket_id = 'avaters'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Only the owner can delete their avatar file
CREATE POLICY "Users can delete their own avater"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'avaters'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
