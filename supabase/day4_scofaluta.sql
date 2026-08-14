-- Day 4: Scofalută — puncte RON-Local, clearing P2P, trust score
-- Run in Supabase SQL Editor after day3_phone_handshake.sql

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS trust_score INT DEFAULT 50;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ron_local_balance INT DEFAULT 0;

CREATE TABLE IF NOT EXISTS ron_local_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  amount INT NOT NULL,
  reason TEXT NOT NULL,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ron_local_ledger_user_idx
  ON ron_local_ledger (user_id, expires_at);

CREATE TABLE IF NOT EXISTS clearing_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  gives TEXT NOT NULL,
  wants TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'matched', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS clearing_offers_open_idx
  ON clearing_offers (status, created_at DESC);

ALTER TABLE ron_local_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE clearing_offers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ledger_select_own" ON ron_local_ledger;
CREATE POLICY "ledger_select_own" ON ron_local_ledger
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "ledger_insert_own" ON ron_local_ledger;
CREATE POLICY "ledger_insert_own" ON ron_local_ledger
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "clearing_select_open" ON clearing_offers;
CREATE POLICY "clearing_select_open" ON clearing_offers
  FOR SELECT USING (status = 'open' OR auth.uid() = user_id);

DROP POLICY IF EXISTS "clearing_insert_own" ON clearing_offers;
CREATE POLICY "clearing_insert_own" ON clearing_offers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "clearing_update_own" ON clearing_offers;
CREATE POLICY "clearing_update_own" ON clearing_offers
  FOR UPDATE USING (auth.uid() = user_id);
