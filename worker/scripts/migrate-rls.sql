-- ============================================
-- ADNOVA AI — DATABASE RLS & TRIGGERS
-- ============================================

-- RLS (Row Level Security)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE creatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;

-- Policies organizations
CREATE POLICY "Users see their org" ON organizations
  FOR ALL USING (
    id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

-- Policies profiles
CREATE POLICY "Users manage their profile" ON profiles
  FOR ALL USING (id = auth.uid());

-- Policies ad_accounts
CREATE POLICY "Org members see their accounts" ON ad_accounts
  FOR ALL USING (
    organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

-- Policies campaigns
CREATE POLICY "Org members see their campaigns" ON campaigns
  FOR ALL USING (
    organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

-- Auto-update updated_at Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply Triggers
DROP TRIGGER IF EXISTS campaigns_updated_at ON campaigns;
CREATE TRIGGER campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS organizations_updated_at ON organizations;
CREATE TRIGGER organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
