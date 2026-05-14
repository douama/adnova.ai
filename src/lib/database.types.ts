// Auto-generated from Supabase schema (jrfxmgxtnftbcxoqzagz) — DO NOT EDIT MANUALLY.
// Regenerate via Supabase MCP (generate_typescript_types) after schema changes.
// Last generated : 2026-05-14 (Phase 4 — Storage buckets)

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ad_sets: {
        Row: {
          campaign_id: string
          clicks_total: number
          conversions_total: number
          created_at: string
          daily_budget_usd: number | null
          external_id: string | null
          id: string
          impressions_total: number
          name: string
          revenue_total: number
          spend_total: number
          status: Database["public"]["Enums"]["campaign_status"]
          targeting: Json
          tenant_id: string
          updated_at: string
        }
        Insert: {
          campaign_id: string
          clicks_total?: number
          conversions_total?: number
          created_at?: string
          daily_budget_usd?: number | null
          external_id?: string | null
          id?: string
          impressions_total?: number
          name: string
          revenue_total?: number
          spend_total?: number
          status?: Database["public"]["Enums"]["campaign_status"]
          targeting?: Json
          tenant_id: string
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          clicks_total?: number
          conversions_total?: number
          created_at?: string
          daily_budget_usd?: number | null
          external_id?: string | null
          id?: string
          impressions_total?: number
          name?: string
          revenue_total?: number
          spend_total?: number
          status?: Database["public"]["Enums"]["campaign_status"]
          targeting?: Json
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_sets_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_sets_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          audience_size: number | null
          channel: string | null
          channel_url: string | null
          code: string
          commission_pct: number
          created_at: string
          display_name: string
          email: string
          id: string
          is_active: boolean
          payout_account_ref: string | null
          payout_method: Database["public"]["Enums"]["payout_method"]
          tenant_id: string | null
          tier: Database["public"]["Enums"]["affiliate_tier"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          audience_size?: number | null
          channel?: string | null
          channel_url?: string | null
          code: string
          commission_pct?: number
          created_at?: string
          display_name: string
          email: string
          id?: string
          is_active?: boolean
          payout_account_ref?: string | null
          payout_method?: Database["public"]["Enums"]["payout_method"]
          tenant_id?: string | null
          tier?: Database["public"]["Enums"]["affiliate_tier"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          audience_size?: number | null
          channel?: string | null
          channel_url?: string | null
          code?: string
          commission_pct?: number
          created_at?: string
          display_name?: string
          email?: string
          id?: string
          is_active?: boolean
          payout_account_ref?: string | null
          payout_method?: Database["public"]["Enums"]["payout_method"]
          tenant_id?: string | null
          tier?: Database["public"]["Enums"]["affiliate_tier"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliates_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_decisions: {
        Row: {
          action: Json
          ad_set_id: string | null
          after_metrics: Json | null
          ai_mode: Database["public"]["Enums"]["ai_mode"]
          before_metrics: Json | null
          budget_saved_usd: number | null
          campaign_id: string | null
          confidence: number | null
          created_at: string
          creative_id: string | null
          embedding: string | null
          executed_at: string | null
          executed_by: string | null
          id: string
          measured_at: string | null
          reason: string
          revenue_uplift_usd: number | null
          rolled_back_at: string | null
          rolled_back_by: string | null
          rolled_back_reason: string | null
          signals: Json
          status: Database["public"]["Enums"]["decision_status"]
          tags: string[] | null
          tenant_id: string
          triggered_by_rule_id: string | null
          type: Database["public"]["Enums"]["decision_type"]
        }
        Insert: {
          action: Json
          ad_set_id?: string | null
          after_metrics?: Json | null
          ai_mode: Database["public"]["Enums"]["ai_mode"]
          before_metrics?: Json | null
          budget_saved_usd?: number | null
          campaign_id?: string | null
          confidence?: number | null
          created_at?: string
          creative_id?: string | null
          embedding?: string | null
          executed_at?: string | null
          executed_by?: string | null
          id?: string
          measured_at?: string | null
          reason: string
          revenue_uplift_usd?: number | null
          rolled_back_at?: string | null
          rolled_back_by?: string | null
          rolled_back_reason?: string | null
          signals?: Json
          status?: Database["public"]["Enums"]["decision_status"]
          tags?: string[] | null
          tenant_id: string
          triggered_by_rule_id?: string | null
          type: Database["public"]["Enums"]["decision_type"]
        }
        Update: {
          action?: Json
          ad_set_id?: string | null
          after_metrics?: Json | null
          ai_mode?: Database["public"]["Enums"]["ai_mode"]
          before_metrics?: Json | null
          budget_saved_usd?: number | null
          campaign_id?: string | null
          confidence?: number | null
          created_at?: string
          creative_id?: string | null
          embedding?: string | null
          executed_at?: string | null
          executed_by?: string | null
          id?: string
          measured_at?: string | null
          reason?: string
          revenue_uplift_usd?: number | null
          rolled_back_at?: string | null
          rolled_back_by?: string | null
          rolled_back_reason?: string | null
          signals?: Json
          status?: Database["public"]["Enums"]["decision_status"]
          tags?: string[] | null
          tenant_id?: string
          triggered_by_rule_id?: string | null
          type?: Database["public"]["Enums"]["decision_type"]
        }
        Relationships: [
          {
            foreignKeyName: "ai_decisions_ad_set_id_fkey"
            columns: ["ad_set_id"]
            isOneToOne: false
            referencedRelation: "ad_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_decisions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_decisions_creative_id_fkey"
            columns: ["creative_id"]
            isOneToOne: false
            referencedRelation: "ai_decisions_feed"
            referencedColumns: ["creative_id"]
          },
          {
            foreignKeyName: "ai_decisions_creative_id_fkey"
            columns: ["creative_id"]
            isOneToOne: false
            referencedRelation: "creatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_decisions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_decisions_triggered_by_rule_id_fkey"
            columns: ["triggered_by_rule_id"]
            isOneToOne: false
            referencedRelation: "automation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_run_log: {
        Row: {
          claude_model: string | null
          completed_at: string | null
          cost_usd_estimate: number | null
          decisions_count: number
          duration_ms: number | null
          error_message: string | null
          http_status_code: number | null
          id: string
          input_tokens: number | null
          output_tokens: number | null
          pg_net_request_id: number | null
          started_at: string
          status: string
          tenant_id: string
          trigger_source: string
        }
        Insert: {
          claude_model?: string | null
          completed_at?: string | null
          cost_usd_estimate?: number | null
          decisions_count?: number
          duration_ms?: number | null
          error_message?: string | null
          http_status_code?: number | null
          id?: string
          input_tokens?: number | null
          output_tokens?: number | null
          pg_net_request_id?: number | null
          started_at?: string
          status?: string
          tenant_id: string
          trigger_source: string
        }
        Update: {
          claude_model?: string | null
          completed_at?: string | null
          cost_usd_estimate?: number | null
          decisions_count?: number
          duration_ms?: number | null
          error_message?: string | null
          http_status_code?: number | null
          id?: string
          input_tokens?: number | null
          output_tokens?: number | null
          pg_net_request_id?: number | null
          started_at?: string
          status?: string
          tenant_id?: string
          trigger_source?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_run_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      audiences: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          name: string
          performance_score: number | null
          platforms: Database["public"]["Enums"]["ad_platform"][] | null
          size_estimate: number | null
          source_meta: Json
          source_type: string | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          name: string
          performance_score?: number | null
          platforms?: Database["public"]["Enums"]["ad_platform"][] | null
          size_estimate?: number | null
          source_meta?: Json
          source_type?: string | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          name?: string
          performance_score?: number | null
          platforms?: Database["public"]["Enums"]["ad_platform"][] | null
          size_estimate?: number | null
          source_meta?: Json
          source_type?: string | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audiences_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          action: Json
          cooldown_hours: number
          created_at: string
          created_by: string | null
          description: string | null
          fire_count: number
          id: string
          is_active: boolean
          last_fired_at: string | null
          name: string
          tenant_id: string
          trigger_condition: Json
          updated_at: string
        }
        Insert: {
          action: Json
          cooldown_hours?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          fire_count?: number
          id?: string
          is_active?: boolean
          last_fired_at?: string | null
          name: string
          tenant_id: string
          trigger_condition: Json
          updated_at?: string
        }
        Update: {
          action?: Json
          cooldown_hours?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          fire_count?: number
          id?: string
          is_active?: boolean
          last_fired_at?: string | null
          name?: string
          tenant_id?: string
          trigger_condition?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          ai_managed: boolean
          clicks_total: number
          conversions_total: number
          cpa: number | null
          created_at: string
          created_by: string | null
          ctr: number | null
          daily_budget_usd: number | null
          end_at: string | null
          external_id: string | null
          id: string
          impressions_total: number
          last_decision_at: string | null
          lifetime_budget_usd: number | null
          name: string
          objective: string | null
          platform: Database["public"]["Enums"]["ad_platform"]
          platform_connection_id: string | null
          revenue_total: number
          roas: number | null
          spend_total: number
          start_at: string | null
          status: Database["public"]["Enums"]["campaign_status"]
          tenant_id: string
          updated_at: string
        }
        Insert: {
          ai_managed?: boolean
          clicks_total?: number
          conversions_total?: number
          cpa?: number | null
          created_at?: string
          created_by?: string | null
          ctr?: number | null
          daily_budget_usd?: number | null
          end_at?: string | null
          external_id?: string | null
          id?: string
          impressions_total?: number
          last_decision_at?: string | null
          lifetime_budget_usd?: number | null
          name: string
          objective?: string | null
          platform: Database["public"]["Enums"]["ad_platform"]
          platform_connection_id?: string | null
          revenue_total?: number
          roas?: number | null
          spend_total?: number
          start_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          tenant_id: string
          updated_at?: string
        }
        Update: {
          ai_managed?: boolean
          clicks_total?: number
          conversions_total?: number
          cpa?: number | null
          created_at?: string
          created_by?: string | null
          ctr?: number | null
          daily_budget_usd?: number | null
          end_at?: string | null
          external_id?: string | null
          id?: string
          impressions_total?: number
          last_decision_at?: string | null
          lifetime_budget_usd?: number | null
          name?: string
          objective?: string | null
          platform?: Database["public"]["Enums"]["ad_platform"]
          platform_connection_id?: string | null
          revenue_total?: number
          roas?: number | null
          spend_total?: number
          start_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_platform_connection_id_fkey"
            columns: ["platform_connection_id"]
            isOneToOne: false
            referencedRelation: "platform_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      client_errors: {
        Row: {
          component_stack: string | null
          created_at: string
          id: string
          message: string | null
          stack: string | null
          tenant_id: string | null
          url: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          component_stack?: string | null
          created_at?: string
          id?: string
          message?: string | null
          stack?: string | null
          tenant_id?: string | null
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          component_stack?: string | null
          created_at?: string
          id?: string
          message?: string | null
          stack?: string | null
          tenant_id?: string | null
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_errors_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_earnings: {
        Row: {
          affiliate_id: string
          amount_usd: number
          created_at: string
          id: string
          payout_id: string | null
          period_start: string
          referral_id: string | null
          source_invoice_id: string | null
        }
        Insert: {
          affiliate_id: string
          amount_usd: number
          created_at?: string
          id?: string
          payout_id?: string | null
          period_start: string
          referral_id?: string | null
          source_invoice_id?: string | null
        }
        Update: {
          affiliate_id?: string
          amount_usd?: number
          created_at?: string
          id?: string
          payout_id?: string | null
          period_start?: string
          referral_id?: string | null
          source_invoice_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_earnings_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_earnings_payout_id_fkey"
            columns: ["payout_id"]
            isOneToOne: false
            referencedRelation: "payouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_earnings_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_earnings_source_invoice_id_fkey"
            columns: ["source_invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      creatives: {
        Row: {
          ad_set_id: string | null
          campaign_id: string | null
          clicks_total: number
          conversions_total: number
          created_at: string
          created_by: string | null
          cta: string | null
          ctr: number | null
          cvr: number | null
          description: string | null
          external_id: string | null
          generation_engine: string | null
          generation_meta: Json
          generation_prompt: string | null
          headline: string | null
          id: string
          impressions_total: number
          killed_at: string | null
          killed_reason: string | null
          landing_url: string | null
          primary_text: string | null
          spend_total: number
          status: Database["public"]["Enums"]["creative_status"]
          storage_path: string | null
          tenant_id: string
          thumbnail_path: string | null
          type: Database["public"]["Enums"]["creative_type"]
          updated_at: string
          won_at: string | null
        }
        Insert: {
          ad_set_id?: string | null
          campaign_id?: string | null
          clicks_total?: number
          conversions_total?: number
          created_at?: string
          created_by?: string | null
          cta?: string | null
          ctr?: number | null
          cvr?: number | null
          description?: string | null
          external_id?: string | null
          generation_engine?: string | null
          generation_meta?: Json
          generation_prompt?: string | null
          headline?: string | null
          id?: string
          impressions_total?: number
          killed_at?: string | null
          killed_reason?: string | null
          landing_url?: string | null
          primary_text?: string | null
          spend_total?: number
          status?: Database["public"]["Enums"]["creative_status"]
          storage_path?: string | null
          tenant_id: string
          thumbnail_path?: string | null
          type: Database["public"]["Enums"]["creative_type"]
          updated_at?: string
          won_at?: string | null
        }
        Update: {
          ad_set_id?: string | null
          campaign_id?: string | null
          clicks_total?: number
          conversions_total?: number
          created_at?: string
          created_by?: string | null
          cta?: string | null
          ctr?: number | null
          cvr?: number | null
          description?: string | null
          external_id?: string | null
          generation_engine?: string | null
          generation_meta?: Json
          generation_prompt?: string | null
          headline?: string | null
          id?: string
          impressions_total?: number
          killed_at?: string | null
          killed_reason?: string | null
          landing_url?: string | null
          primary_text?: string | null
          spend_total?: number
          status?: Database["public"]["Enums"]["creative_status"]
          storage_path?: string | null
          tenant_id?: string
          thumbnail_path?: string | null
          type?: Database["public"]["Enums"]["creative_type"]
          updated_at?: string
          won_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creatives_ad_set_id_fkey"
            columns: ["ad_set_id"]
            isOneToOne: false
            referencedRelation: "ad_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creatives_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creatives_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount_usd: number
          currency: string
          due_at: string | null
          hosted_invoice_url: string | null
          id: string
          invoice_pdf_url: string | null
          issued_at: string
          number: string | null
          paid_at: string | null
          status: string
          stripe_invoice_id: string | null
          subscription_id: string | null
          tenant_id: string
        }
        Insert: {
          amount_usd: number
          currency?: string
          due_at?: string | null
          hosted_invoice_url?: string | null
          id?: string
          invoice_pdf_url?: string | null
          issued_at?: string
          number?: string | null
          paid_at?: string | null
          status: string
          stripe_invoice_id?: string | null
          subscription_id?: string | null
          tenant_id: string
        }
        Update: {
          amount_usd?: number
          currency?: string
          due_at?: string | null
          hosted_invoice_url?: string | null
          id?: string
          invoice_pdf_url?: string | null
          issued_at?: string
          number?: string | null
          paid_at?: string | null
          status?: string
          stripe_invoice_id?: string | null
          subscription_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          affiliate_id: string
          amount_usd: number
          created_at: string
          currency: string
          failed_reason: string | null
          id: string
          paid_at: string | null
          payout_method: Database["public"]["Enums"]["payout_method"]
          period_end: string
          period_start: string
          status: Database["public"]["Enums"]["payout_status"]
          stripe_transfer_id: string | null
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          amount_usd: number
          created_at?: string
          currency?: string
          failed_reason?: string | null
          id?: string
          paid_at?: string | null
          payout_method: Database["public"]["Enums"]["payout_method"]
          period_end: string
          period_start: string
          status?: Database["public"]["Enums"]["payout_status"]
          stripe_transfer_id?: string | null
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          amount_usd?: number
          created_at?: string
          currency?: string
          failed_reason?: string | null
          id?: string
          paid_at?: string | null
          payout_method?: Database["public"]["Enums"]["payout_method"]
          period_end?: string
          period_start?: string
          status?: Database["public"]["Enums"]["payout_status"]
          stripe_transfer_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payouts_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          ai_modes_allowed: Database["public"]["Enums"]["ai_mode"][]
          created_at: string
          description: string | null
          features: Json
          id: Database["public"]["Enums"]["plan_tier"]
          is_visible: boolean
          max_campaigns: number | null
          max_creatives_per_month: number | null
          max_platforms: number | null
          max_team_members: number | null
          name: string
          price_annual_usd: number | null
          price_monthly_usd: number | null
          sort_order: number | null
          stripe_price_annual_id: string | null
          stripe_price_monthly_id: string | null
        }
        Insert: {
          ai_modes_allowed?: Database["public"]["Enums"]["ai_mode"][]
          created_at?: string
          description?: string | null
          features?: Json
          id: Database["public"]["Enums"]["plan_tier"]
          is_visible?: boolean
          max_campaigns?: number | null
          max_creatives_per_month?: number | null
          max_platforms?: number | null
          max_team_members?: number | null
          name: string
          price_annual_usd?: number | null
          price_monthly_usd?: number | null
          sort_order?: number | null
          stripe_price_annual_id?: string | null
          stripe_price_monthly_id?: string | null
        }
        Update: {
          ai_modes_allowed?: Database["public"]["Enums"]["ai_mode"][]
          created_at?: string
          description?: string | null
          features?: Json
          id?: Database["public"]["Enums"]["plan_tier"]
          is_visible?: boolean
          max_campaigns?: number | null
          max_creatives_per_month?: number | null
          max_platforms?: number | null
          max_team_members?: number | null
          name?: string
          price_annual_usd?: number | null
          price_monthly_usd?: number | null
          sort_order?: number | null
          stripe_price_annual_id?: string | null
          stripe_price_monthly_id?: string | null
        }
        Relationships: []
      }
      platform_connections: {
        Row: {
          access_token: string | null
          account_id: string
          account_name: string | null
          connected_by: string | null
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          last_synced_at: string | null
          platform: Database["public"]["Enums"]["ad_platform"]
          refresh_token: string | null
          scope: string | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          access_token?: string | null
          account_id: string
          account_name?: string | null
          connected_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          last_synced_at?: string | null
          platform: Database["public"]["Enums"]["ad_platform"]
          refresh_token?: string | null
          scope?: string | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          access_token?: string | null
          account_id?: string
          account_name?: string | null
          connected_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          last_synced_at?: string | null
          platform?: Database["public"]["Enums"]["ad_platform"]
          refresh_token?: string | null
          scope?: string | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "platform_connections_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ecommerce_connections: {
        Row: {
          id: string
          tenant_id: string
          provider: string
          shop_domain: string
          api_token: string
          api_secret: string | null
          is_active: boolean
          last_synced_at: string | null
          last_sync_status: string | null
          last_sync_error: string | null
          product_count: number
          created_at: string
          created_by: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          provider: string
          shop_domain: string
          api_token: string
          api_secret?: string | null
          is_active?: boolean
          last_synced_at?: string | null
          last_sync_status?: string | null
          last_sync_error?: string | null
          product_count?: number
          created_at?: string
          created_by?: string | null
          updated_at?: string
        }
        Update: Partial<{
          id: string
          tenant_id: string
          provider: string
          shop_domain: string
          api_token: string
          api_secret: string | null
          is_active: boolean
          last_synced_at: string | null
          last_sync_status: string | null
          last_sync_error: string | null
          product_count: number
          created_at: string
          created_by: string | null
          updated_at: string
        }>
        Relationships: []
      }
      products: {
        Row: {
          id: string
          tenant_id: string
          connection_id: string | null
          external_id: string
          title: string
          description: string | null
          price_usd: number | null
          currency: string | null
          image_url: string | null
          source_url: string | null
          sku: string | null
          status: string | null
          synced_at: string
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          connection_id?: string | null
          external_id: string
          title: string
          description?: string | null
          price_usd?: number | null
          currency?: string | null
          image_url?: string | null
          source_url?: string | null
          sku?: string | null
          status?: string | null
          synced_at?: string
          created_at?: string
        }
        Update: Partial<{
          id: string
          tenant_id: string
          connection_id: string | null
          external_id: string
          title: string
          description: string | null
          price_usd: number | null
          currency: string | null
          image_url: string | null
          source_url: string | null
          sku: string | null
          status: string | null
          synced_at: string
          created_at: string
        }>
        Relationships: []
      }
      provider_credentials: {
        Row: {
          api_key: string
          created_at: string
          is_active: boolean
          key_preview: string
          last_rotated_at: string
          notes: string | null
          provider: string
          rotated_by: string | null
        }
        Insert: {
          api_key: string
          created_at?: string
          is_active?: boolean
          key_preview: string
          last_rotated_at?: string
          notes?: string | null
          provider: string
          rotated_by?: string | null
        }
        Update: {
          api_key?: string
          created_at?: string
          is_active?: boolean
          key_preview?: string
          last_rotated_at?: string
          notes?: string | null
          provider?: string
          rotated_by?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          affiliate_id: string
          clicked_at: string
          converted_at: string | null
          converted_to_plan: Database["public"]["Enums"]["plan_tier"] | null
          id: string
          ip_hash: string | null
          referrer_url: string | null
          signed_up_at: string | null
          signed_up_tenant_id: string | null
          signed_up_user_id: string | null
          user_agent: string | null
          utm_source: string | null
        }
        Insert: {
          affiliate_id: string
          clicked_at?: string
          converted_at?: string | null
          converted_to_plan?: Database["public"]["Enums"]["plan_tier"] | null
          id?: string
          ip_hash?: string | null
          referrer_url?: string | null
          signed_up_at?: string | null
          signed_up_tenant_id?: string | null
          signed_up_user_id?: string | null
          user_agent?: string | null
          utm_source?: string | null
        }
        Update: {
          affiliate_id?: string
          clicked_at?: string
          converted_at?: string | null
          converted_to_plan?: Database["public"]["Enums"]["plan_tier"] | null
          id?: string
          ip_hash?: string | null
          referrer_url?: string | null
          signed_up_at?: string | null
          signed_up_tenant_id?: string | null
          signed_up_user_id?: string | null
          user_agent?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_signed_up_tenant_id_fkey"
            columns: ["signed_up_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          billing_period: string | null
          cancel_at_period_end: boolean
          canceled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan: Database["public"]["Enums"]["plan_tier"]
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          tenant_id: string
          trial_ends_at: string | null
          updated_at: string
        }
        Insert: {
          billing_period?: string | null
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan: Database["public"]["Enums"]["plan_tier"]
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tenant_id: string
          trial_ends_at?: string | null
          updated_at?: string
        }
        Update: {
          billing_period?: string | null
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["plan_tier"]
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          tenant_id?: string
          trial_ends_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_fkey"
            columns: ["plan"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_members: {
        Row: {
          invited_by: string | null
          joined_at: string
          role: Database["public"]["Enums"]["tenant_role"]
          tenant_id: string
          user_id: string
        }
        Insert: {
          invited_by?: string | null
          joined_at?: string
          role?: Database["public"]["Enums"]["tenant_role"]
          tenant_id: string
          user_id: string
        }
        Update: {
          invited_by?: string | null
          joined_at?: string
          role?: Database["public"]["Enums"]["tenant_role"]
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_members_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          ai_mode: Database["public"]["Enums"]["ai_mode"]
          created_at: string
          created_by: string | null
          guardrails: Json
          id: string
          logo_url: string | null
          name: string
          plan: Database["public"]["Enums"]["plan_tier"]
          slug: string
          status: Database["public"]["Enums"]["tenant_status"]
          trial_ends_at: string | null
          updated_at: string
        }
        Insert: {
          ai_mode?: Database["public"]["Enums"]["ai_mode"]
          created_at?: string
          created_by?: string | null
          guardrails?: Json
          id?: string
          logo_url?: string | null
          name: string
          plan?: Database["public"]["Enums"]["plan_tier"]
          slug: string
          status?: Database["public"]["Enums"]["tenant_status"]
          trial_ends_at?: string | null
          updated_at?: string
        }
        Update: {
          ai_mode?: Database["public"]["Enums"]["ai_mode"]
          created_at?: string
          created_by?: string | null
          guardrails?: Json
          id?: string
          logo_url?: string | null
          name?: string
          plan?: Database["public"]["Enums"]["plan_tier"]
          slug?: string
          status?: Database["public"]["Enums"]["tenant_status"]
          trial_ends_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      usage_meters: {
        Row: {
          ai_decisions_count: number
          api_calls_count: number
          campaigns_active: number
          creatives_generated: number
          period_start: string
          tenant_id: string
        }
        Insert: {
          ai_decisions_count?: number
          api_calls_count?: number
          campaigns_active?: number
          creatives_generated?: number
          period_start: string
          tenant_id: string
        }
        Update: {
          ai_decisions_count?: number
          api_calls_count?: number
          campaigns_active?: number
          creatives_generated?: number
          period_start?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_meters_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          is_super_admin: boolean
          locale: string | null
          marketing_opt_in: boolean | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_super_admin?: boolean
          locale?: string | null
          marketing_opt_in?: boolean | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_super_admin?: boolean
          locale?: string | null
          marketing_opt_in?: boolean | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      ai_decisions_feed: {
        Row: {
          action: Json | null
          ai_mode: Database["public"]["Enums"]["ai_mode"] | null
          budget_saved_usd: number | null
          campaign_name: string | null
          confidence: number | null
          created_at: string | null
          creative_headline: string | null
          creative_id: string | null
          id: string | null
          platform: string | null
          reason: string | null
          revenue_uplift_usd: number | null
          status: Database["public"]["Enums"]["decision_status"] | null
          tags: string[] | null
          tenant_id: string | null
          type: Database["public"]["Enums"]["decision_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_decisions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      creative_storage_path: {
        Args: { _creative_id: string; _extension: string; _tenant_id: string }
        Returns: string
      }
      is_super_admin: { Args: never; Returns: boolean }
      is_tenant_admin: { Args: { _tenant_id: string }; Returns: boolean }
      is_tenant_member: { Args: { _tenant_id: string }; Returns: boolean }
      my_tenants: {
        Args: never
        Returns: {
          ai_mode: Database["public"]["Enums"]["ai_mode"]
          name: string
          plan: Database["public"]["Enums"]["plan_tier"]
          role: Database["public"]["Enums"]["tenant_role"]
          slug: string
          status: Database["public"]["Enums"]["tenant_status"]
          tenant_id: string
        }[]
      }
      set_provider_credential: {
        Args: { p_provider: string; p_api_key: string; p_notes?: string | null }
        Returns: Json
      }
      list_provider_credentials: {
        Args: never
        Returns: {
          provider: string
          key_preview: string
          is_active: boolean
          last_rotated_at: string
          rotated_by_email: string | null
          notes: string | null
        }[]
      }
      delete_provider_credential: {
        Args: { p_provider: string }
        Returns: Json
      }
      toggle_provider_credential: {
        Args: { p_provider: string; p_is_active: boolean }
        Returns: Json
      }
      apply_as_affiliate: {
        Args: {
          p_display_name: string
          p_email: string
          p_channel?: string | null
          p_channel_url?: string | null
          p_audience_size?: number | null
          p_payout_method?: string
          p_payout_account_ref?: string | null
        }
        Returns: Json
      }
      approve_affiliate: {
        Args: { p_affiliate_id: string; p_new_code?: string | null }
        Returns: Json
      }
      list_ecommerce_connections: {
        Args: { _tenant_id: string }
        Returns: {
          id: string
          provider: string
          shop_domain: string
          token_preview: string
          is_active: boolean
          last_synced_at: string | null
          last_sync_status: string | null
          last_sync_error: string | null
          product_count: number
          created_at: string
        }[]
      }
    }
    Enums: {
      ad_platform:
        | "meta"
        | "google"
        | "tiktok"
        | "linkedin"
        | "snapchat"
        | "pinterest"
        | "x"
        | "youtube"
        | "amazon"
      affiliate_tier: "bronze" | "silver" | "gold" | "diamond"
      ai_mode: "advisory" | "guardrails" | "autonomous"
      campaign_status:
        | "draft"
        | "live"
        | "scaling"
        | "paused"
        | "killed"
        | "archived"
      creative_status: "draft" | "testing" | "winner" | "killed" | "archived"
      creative_type: "image" | "video" | "ugc_video" | "carousel" | "copy_only"
      decision_status:
        | "proposed"
        | "executed"
        | "rolled_back"
        | "blocked"
        | "rejected"
      decision_type:
        | "scale"
        | "kill"
        | "create"
        | "budget_realloc"
        | "audience_expand"
        | "audience_narrow"
        | "bid_adjust"
        | "pause"
        | "resume"
        | "guardrail_block"
      payout_method: "stripe_connect" | "paypal" | "sepa" | "wise"
      payout_status:
        | "pending"
        | "ready"
        | "processing"
        | "paid"
        | "failed"
        | "kyc_required"
      plan_tier: "trial" | "starter" | "growth" | "enterprise"
      subscription_status:
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "incomplete"
        | "paused"
      tenant_role: "owner" | "admin" | "editor" | "viewer"
      tenant_status: "active" | "trial" | "suspended" | "churned"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ad_platform: [
        "meta",
        "google",
        "tiktok",
        "linkedin",
        "snapchat",
        "pinterest",
        "x",
        "youtube",
        "amazon",
      ],
      affiliate_tier: ["bronze", "silver", "gold", "diamond"],
      ai_mode: ["advisory", "guardrails", "autonomous"],
      campaign_status: [
        "draft",
        "live",
        "scaling",
        "paused",
        "killed",
        "archived",
      ],
      creative_status: ["draft", "testing", "winner", "killed", "archived"],
      creative_type: ["image", "video", "ugc_video", "carousel", "copy_only"],
      decision_status: [
        "proposed",
        "executed",
        "rolled_back",
        "blocked",
        "rejected",
      ],
      decision_type: [
        "scale",
        "kill",
        "create",
        "budget_realloc",
        "audience_expand",
        "audience_narrow",
        "bid_adjust",
        "pause",
        "resume",
        "guardrail_block",
      ],
      payout_method: ["stripe_connect", "paypal", "sepa", "wise"],
      payout_status: [
        "pending",
        "ready",
        "processing",
        "paid",
        "failed",
        "kyc_required",
      ],
      plan_tier: ["trial", "starter", "growth", "enterprise"],
      subscription_status: [
        "trialing",
        "active",
        "past_due",
        "canceled",
        "incomplete",
        "paused",
      ],
      tenant_role: ["owner", "admin", "editor", "viewer"],
      tenant_status: ["active", "trial", "suspended", "churned"],
    },
  },
} as const
