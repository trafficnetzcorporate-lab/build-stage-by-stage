-- Allow public uploads to intake-uploads bucket (no auth required for the onboarding flow)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'intake_uploads_public_insert'
  ) THEN
    CREATE POLICY "intake_uploads_public_insert"
    ON storage.objects
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (bucket_id = 'intake-uploads');
  END IF;
END $$;

-- No SELECT policy on intake-uploads — service role bypasses RLS, public/anon cannot read.
-- No SELECT/INSERT policies on signed-agreements — server-only via service role.
