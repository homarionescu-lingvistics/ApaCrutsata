ALTER TABLE public.business_requests
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL DEFAULT auth.uid();

ALTER TABLE public.business_post_mortems
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL DEFAULT auth.uid();

-- Optional: instruct Supabase/PostgREST to reload schema cache after the migration.
-- In Supabase SQL editor, this is typically enough; if you still see stale cache issues, re-open the schema browser or run a fresh migration from the dashboard.
NOTIFY pgrst, 'reload schema';
