-- Phone login + trusted devices + handshakes (Day 3)
-- Run in Supabase SQL Editor

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_phone_unique
  ON profiles (phone) WHERE phone IS NOT NULL;

CREATE TABLE IF NOT EXISTS phone_login_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS phone_login_tokens_token_idx
  ON phone_login_tokens (token) WHERE used_at IS NULL;

CREATE TABLE IF NOT EXISTS trusted_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  phone TEXT NOT NULL,
  device_token TEXT UNIQUE NOT NULL,
  user_agent TEXT,
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS handshakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES auth.users NOT NULL,
  code TEXT UNIQUE NOT NULL,
  partner_id UUID REFERENCES auth.users,
  owner_confirmed_at TIMESTAMPTZ,
  partner_confirmed_at TIMESTAMPTZ,
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE handshakes ADD COLUMN IF NOT EXISTS owner_confirmed_at TIMESTAMPTZ;
ALTER TABLE handshakes ADD COLUMN IF NOT EXISTS partner_confirmed_at TIMESTAMPTZ;

ALTER TABLE phone_login_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE trusted_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE handshakes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "handshakes_select_participants" ON handshakes;
CREATE POLICY "handshakes_select_participants" ON handshakes
  FOR SELECT USING (
    auth.uid() = owner_id OR auth.uid() = partner_id OR auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "handshakes_insert_owner" ON handshakes;
CREATE POLICY "handshakes_insert_owner" ON handshakes
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "handshakes_update_partner" ON handshakes;
CREATE POLICY "handshakes_update_partner" ON handshakes
  FOR UPDATE USING (auth.role() = 'authenticated');
