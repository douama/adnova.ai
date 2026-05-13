export type Bindings = {
  ENVIRONMENT: string;
  ALLOWED_ORIGINS: string;

  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_KEY: string;
  SUPABASE_JWT_SECRET: string;
  DATABASE_URL: string;

  ANTHROPIC_API_KEY: string;
  REPLICATE_API_KEY: string;
  HEYGEN_API_KEY: string;

  ENCRYPTION_KEY: string;

  META_APP_ID: string;
  META_APP_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  TIKTOK_APP_ID: string;
  TIKTOK_APP_SECRET: string;

  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;

  KV_CACHE: KVNamespace;
  R2_BUCKET: R2Bucket;
  QUEUE: Queue;
};

export type AuthContext = {
  userId: string;
  orgId: string;
  role: "owner" | "admin" | "member" | "viewer";
  email: string;
};

export type Variables = {
  auth: AuthContext;
  requestId: string;
};

export type AppEnv = { Bindings: Bindings; Variables: Variables };
