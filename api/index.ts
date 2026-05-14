// ─── Vercel Edge entry for the Hono marketing landing ────────────────────
// Vercel auto-detects any file under /api as a serverless/edge function.
// vercel.json rewrites `/(.*)` → `/api` so every request reaches this handler.
// The Hono `app` from src/index.tsx serves the marketing pages (/, /pricing,
// /customers, /partners, etc.) via SSR. API/admin routes that rely on
// Cloudflare D1 will fail gracefully at runtime — the marketing surface
// doesn't touch them.
import { handle } from "hono/vercel";
import app from "../src/index";

export const config = {
  runtime: "edge",
};

export default handle(app);
