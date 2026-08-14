-- Day 2: listings (Mânzare + Feed)
-- Run in Supabase SQL Editor after day 1 schema

CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL DEFAULT 'product'
    CHECK (type IN ('product', 'service', 'asset', 'request')),
  title TEXT NOT NULL,
  description TEXT,
  photo_url TEXT,
  city TEXT,
  neighborhood TEXT,
  price_ron NUMERIC,
  barter_ok BOOLEAN DEFAULT TRUE,
  contact_phone TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'closed', 'pending')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS listings_status_created_idx
  ON listings (status, created_at DESC);

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "listings_select_active" ON listings;
CREATE POLICY "listings_select_active" ON listings
  FOR SELECT USING (status = 'active' OR auth.uid() = user_id);

DROP POLICY IF EXISTS "listings_insert_own" ON listings;
CREATE POLICY "listings_insert_own" ON listings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "listings_update_own" ON listings;
CREATE POLICY "listings_update_own" ON listings
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "listings_delete_own" ON listings;
CREATE POLICY "listings_delete_own" ON listings
  FOR DELETE USING (auth.uid() = user_id);
