import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

const ts = (name: string) => timestamp(name, { withTimezone: true }).defaultNow().notNull();

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logoUrl: text("logo_url"),
  plan: text("plan").notNull().default("starter"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  creditsRemaining: integer("credits_remaining").notNull().default(20),
  creditsResetAt: timestamp("credits_reset_at", { withTimezone: true }),
  settings: jsonb("settings").notNull().default(sql`'{}'::jsonb`),
  createdAt: ts("created_at"),
  updatedAt: ts("updated_at"),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "set null" }),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  role: text("role").notNull().default("member"),
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  preferences: jsonb("preferences").notNull().default(sql`'{}'::jsonb`),
  createdAt: ts("created_at"),
});

export const adAccounts = pgTable(
  "ad_accounts",
  {
    id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    platform: text("platform").notNull(),
    externalAccountId: text("external_account_id").notNull(),
    accountName: text("account_name").notNull(),
    currency: text("currency").notNull().default("USD"),
    timezone: text("timezone").notNull().default("UTC"),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    tokenExpiresAt: timestamp("token_expires_at", { withTimezone: true }),
    status: text("status").notNull().default("active"),
    lastSyncAt: timestamp("last_sync_at", { withTimezone: true }),
    metadata: jsonb("metadata").notNull().default(sql`'{}'::jsonb`),
    createdAt: ts("created_at"),
  },
  (t) => ({ uq: unique().on(t.organizationId, t.platform, t.externalAccountId) }),
);

export const campaigns = pgTable(
  "campaigns",
  {
    id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    adAccountId: uuid("ad_account_id").notNull().references(() => adAccounts.id, { onDelete: "cascade" }),
    externalCampaignId: text("external_campaign_id").notNull(),
    name: text("name").notNull(),
    objective: text("objective"),
    status: text("status").notNull().default("active"),
    budgetDaily: numeric("budget_daily", { precision: 12, scale: 2 }),
    budgetLifetime: numeric("budget_lifetime", { precision: 12, scale: 2 }),
    spendTotal: numeric("spend_total", { precision: 12, scale: 2 }).notNull().default("0"),
    impressions: bigint("impressions", { mode: "number" }).notNull().default(0),
    clicks: bigint("clicks", { mode: "number" }).notNull().default(0),
    conversions: integer("conversions").notNull().default(0),
    roas: numeric("roas", { precision: 8, scale: 4 }).notNull().default("0"),
    cpa: numeric("cpa", { precision: 10, scale: 2 }),
    ctr: numeric("ctr", { precision: 8, scale: 6 }),
    cpc: numeric("cpc", { precision: 10, scale: 2 }),
    startDate: date("start_date"),
    endDate: date("end_date"),
    aiScore: integer("ai_score"),
    aiRecommendations: jsonb("ai_recommendations").notNull().default(sql`'[]'::jsonb`),
    lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
    createdAt: ts("created_at"),
    updatedAt: ts("updated_at"),
  },
  (t) => ({ uq: unique().on(t.adAccountId, t.externalCampaignId) }),
);

export const adSets = pgTable(
  "ad_sets",
  {
    id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
    campaignId: uuid("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
    externalAdsetId: text("external_adset_id").notNull(),
    name: text("name").notNull(),
    targeting: jsonb("targeting").notNull().default(sql`'{}'::jsonb`),
    budgetDaily: numeric("budget_daily", { precision: 12, scale: 2 }),
    status: text("status").notNull().default("active"),
    spend: numeric("spend", { precision: 12, scale: 2 }).notNull().default("0"),
    impressions: bigint("impressions", { mode: "number" }).notNull().default(0),
    clicks: bigint("clicks", { mode: "number" }).notNull().default(0),
    roas: numeric("roas", { precision: 8, scale: 4 }),
    createdAt: ts("created_at"),
  },
  (t) => ({ uq: unique().on(t.campaignId, t.externalAdsetId) }),
);

export const ads = pgTable(
  "ads",
  {
    id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
    adSetId: uuid("ad_set_id").notNull().references(() => adSets.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    externalAdId: text("external_ad_id").notNull(),
    name: text("name").notNull(),
    type: text("type"),
    headline: text("headline"),
    description: text("description"),
    cta: text("cta"),
    creativeUrl: text("creative_url"),
    previewUrl: text("preview_url"),
    status: text("status").notNull().default("active"),
    spend: numeric("spend", { precision: 12, scale: 2 }).notNull().default("0"),
    impressions: bigint("impressions", { mode: "number" }).notNull().default(0),
    clicks: bigint("clicks", { mode: "number" }).notNull().default(0),
    conversions: integer("conversions").notNull().default(0),
    roas: numeric("roas", { precision: 8, scale: 4 }),
    ctr: numeric("ctr", { precision: 8, scale: 6 }),
    aiGenerated: boolean("ai_generated").notNull().default(false),
    aiScore: integer("ai_score"),
    createdAt: ts("created_at"),
  },
  (t) => ({ uq: unique().on(t.adSetId, t.externalAdId) }),
);

export const metricsDaily = pgTable(
  "metrics_daily",
  {
    id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
    entityType: text("entity_type").notNull(),
    entityId: uuid("entity_id").notNull(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    spend: numeric("spend", { precision: 12, scale: 2 }).notNull().default("0"),
    impressions: bigint("impressions", { mode: "number" }).notNull().default(0),
    clicks: bigint("clicks", { mode: "number" }).notNull().default(0),
    conversions: integer("conversions").notNull().default(0),
    revenue: numeric("revenue", { precision: 12, scale: 2 }).notNull().default("0"),
    roas: numeric("roas", { precision: 8, scale: 4 }),
    ctr: numeric("ctr", { precision: 8, scale: 6 }),
    cpc: numeric("cpc", { precision: 10, scale: 2 }),
    cpa: numeric("cpa", { precision: 10, scale: 2 }),
    frequency: numeric("frequency", { precision: 6, scale: 2 }),
    reach: bigint("reach", { mode: "number" }).notNull().default(0),
    videoViews: bigint("video_views", { mode: "number" }),
    platform: text("platform"),
    createdAt: ts("created_at"),
  },
  (t) => ({ uq: unique().on(t.entityType, t.entityId, t.date) }),
);

export const creatives = pgTable("creatives", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  prompt: text("prompt").notNull(),
  negativePrompt: text("negative_prompt"),
  style: text("style"),
  format: text("format"),
  status: text("status").notNull().default("pending"),
  fileUrl: text("file_url"),
  thumbnailUrl: text("thumbnail_url"),
  fileSize: integer("file_size"),
  durationSeconds: integer("duration_seconds"),
  generationModel: text("generation_model"),
  generationParams: jsonb("generation_params").notNull().default(sql`'{}'::jsonb`),
  creditsUsed: integer("credits_used").notNull().default(1),
  usedInAds: jsonb("used_in_ads").notNull().default(sql`'[]'::jsonb`),
  createdBy: uuid("created_by").references(() => profiles.id, { onDelete: "set null" }),
  createdAt: ts("created_at"),
});

export const automationRules = pgTable("automation_rules", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  triggerType: text("trigger_type").notNull(),
  triggerConfig: jsonb("trigger_config").notNull().default(sql`'{}'::jsonb`),
  conditions: jsonb("conditions").notNull().default(sql`'[]'::jsonb`),
  actions: jsonb("actions").notNull().default(sql`'[]'::jsonb`),
  isActive: boolean("is_active").notNull().default(true),
  lastTriggeredAt: timestamp("last_triggered_at", { withTimezone: true }),
  triggerCount: integer("trigger_count").notNull().default(0),
  createdBy: uuid("created_by").references(() => profiles.id, { onDelete: "set null" }),
  createdAt: ts("created_at"),
});

export const agentRuns = pgTable("agent_runs", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  agentType: text("agent_type").notNull(),
  status: text("status").notNull().default("running"),
  input: jsonb("input").notNull().default(sql`'{}'::jsonb`),
  output: jsonb("output").notNull().default(sql`'{}'::jsonb`),
  steps: jsonb("steps").notNull().default(sql`'[]'::jsonb`),
  errorMessage: text("error_message"),
  tokensUsed: integer("tokens_used").notNull().default(0),
  durationMs: integer("duration_ms"),
  triggeredBy: text("triggered_by"),
  createdAt: ts("created_at"),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => profiles.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  title: text("title").notNull(),
  message: text("message"),
  data: jsonb("data").notNull().default(sql`'{}'::jsonb`),
  read: boolean("read").notNull().default(false),
  createdAt: ts("created_at"),
});

export type Organization = typeof organizations.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type AdAccount = typeof adAccounts.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type Ad = typeof ads.$inferSelect;
export type Creative = typeof creatives.$inferSelect;
export type AgentRun = typeof agentRuns.$inferSelect;
