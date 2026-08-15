-- crutsanimia-ron Day 1 schema — run once in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT CHECK (role IN ('citizen', 'entrepreneur', 'producer', 'transporter')),
  cui_number TEXT,
  is_verified_sme BOOLEAN DEFAULT FALSE,
  ron_local_balance INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS business_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  upvotes_count INT DEFAULT 1,
  ai_insights_summary JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL DEFAULT auth.uid(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS business_post_mortems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  failure_reasons TEXT NOT NULL,
  pricing_strategy_notes TEXT,
  min_capital_required NUMERIC,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL DEFAULT auth.uid(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.business_requests
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL DEFAULT auth.uid();

ALTER TABLE public.business_post_mortems
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL DEFAULT auth.uid();

CREATE TABLE IF NOT EXISTS group_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  target_units INT NOT NULL,
  current_units INT DEFAULT 0,
  unit_price NUMERIC NOT NULL,
  status TEXT DEFAULT 'active',
  created_by UUID REFERENCES auth.users ON DELETE SET NULL
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    NULLIF(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'role', ''), 'citizen')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_post_mortems ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_deals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "requests_select_all" ON business_requests;
CREATE POLICY "requests_select_all" ON business_requests
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "requests_insert_auth" ON business_requests;
CREATE POLICY "requests_insert_auth" ON business_requests
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "requests_update_auth" ON business_requests;
CREATE POLICY "requests_update_auth" ON business_requests
  FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "postmortems_select_all" ON business_post_mortems;
CREATE POLICY "postmortems_select_all" ON business_post_mortems
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "postmortems_insert_auth" ON business_post_mortems;
CREATE POLICY "postmortems_insert_auth" ON business_post_mortems
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "deals_select_all" ON group_deals;
CREATE POLICY "deals_select_all" ON group_deals
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "deals_insert_auth" ON group_deals;
CREATE POLICY "deals_insert_auth" ON group_deals
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "deals_update_auth" ON group_deals;
CREATE POLICY "deals_update_auth" ON group_deals
  FOR UPDATE USING (auth.role() = 'authenticated');
