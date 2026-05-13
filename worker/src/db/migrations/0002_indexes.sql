-- ============================================================================
-- AdNova AI — 0002_indexes.sql
-- Indexes for hot read paths (analytics dashboards, sync cron, notifications).
-- Apply after 0001_init.sql. Safe to re-run (IF NOT EXISTS).
-- ============================================================================

-- Analytics: time-series rollups per org and per entity
create index if not exists idx_metrics_daily_org_date
  on metrics_daily (organization_id, date desc);

create index if not exists idx_metrics_daily_entity
  on metrics_daily (entity_type, entity_id, date desc);

-- Sync cron: find campaigns stale-ish and active
create index if not exists idx_campaigns_org_status_sync
  on campaigns (organization_id, status, last_synced_at);

-- AI Insights panel: latest agent runs per org
create index if not exists idx_agent_runs_org_created
  on agent_runs (organization_id, created_at desc);

-- Notifications bell: unread per user, most recent first
create index if not exists idx_notifications_user_unread
  on notifications (user_id, read, created_at desc);

-- OAuth token refresh: find tokens about to expire among active accounts
create index if not exists idx_ad_accounts_token_expires
  on ad_accounts (token_expires_at)
  where status = 'active';

-- Ads: filter by org + status quickly (used by /api/ads listing)
create index if not exists idx_ads_org_status
  on ads (organization_id, status);
