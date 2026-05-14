import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  // Sub-path deploy : the SPA is mounted under /app on adnovaai.vercel.app
  // (landing Hono SSR sits on /). All asset URLs in the build get prefixed
  // with /app/ so Vercel serves them statically from public/app/.
  base: "/app/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
