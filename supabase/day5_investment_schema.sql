-- Day 5: Investment Platform & Profile Schema Alignment

-- Add missing columns to profiles table
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS trust_score INT DEFAULT 0;

-- Create investment_opportunities table
CREATE TABLE IF NOT EXISTS investment_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  founder_name TEXT NOT NULL,
  sector TEXT NOT NULL,
  city TEXT NOT NULL,
  description TEXT,
  min_investment NUMERIC DEFAULT 1000,
  max_investment NUMERIC DEFAULT 100000,
  equity_percentage NUMERIC,
  timeline_months INT,
  risk_score INT,
  co_investors_count INT DEFAULT 0,
  iban_recipient TEXT,
  crypto_wallet TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_whatsapp TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'funded', 'closed', 'paused')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create investment_subscriptions table (user's investments)
CREATE TABLE IF NOT EXISTS investment_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID REFERENCES investment_opportunities(id) ON DELETE CASCADE,
  investor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_invested NUMERIC NOT NULL,
  investment_type TEXT CHECK (investment_type IN ('equity', 'loan', 'revenue_share', 'crypto')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  payment_method TEXT,
  transaction_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE investment_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_subscriptions ENABLE ROW LEVEL SECURITY;

-- Investment opportunities policies
DROP POLICY IF EXISTS "opportunities_select_all" ON investment_opportunities;
CREATE POLICY "opportunities_select_all" ON investment_opportunities
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "opportunities_insert_auth" ON investment_opportunities;
CREATE POLICY "opportunities_insert_auth" ON investment_opportunities
  FOR INSERT WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "opportunities_update_own" ON investment_opportunities;
CREATE POLICY "opportunities_update_own" ON investment_opportunities
  FOR UPDATE USING (auth.uid() = created_by);

-- Investment subscriptions policies
DROP POLICY IF EXISTS "subscriptions_select_own" ON investment_subscriptions;
CREATE POLICY "subscriptions_select_own" ON investment_subscriptions
  FOR SELECT USING (auth.uid() = investor_id OR auth.uid() IN (
    SELECT created_by FROM investment_opportunities WHERE id = investment_subscriptions.opportunity_id
  ));

DROP POLICY IF EXISTS "subscriptions_insert_auth" ON investment_subscriptions;
CREATE POLICY "subscriptions_insert_auth" ON investment_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = investor_id);

DROP POLICY IF EXISTS "subscriptions_update_own" ON investment_subscriptions;
CREATE POLICY "subscriptions_update_own" ON investment_subscriptions
  FOR UPDATE USING (auth.uid() = investor_id);
