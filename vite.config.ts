import pages from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// Minimal .dev.vars loader — parses KEY=value pairs (ignores comments/blank lines)
// so c.env.ADMIN_EMAIL etc. resolve in `vite dev` exactly like in production.
function loadDevVars(): Record<string, string> {
  const path = resolve(__dirname, '.dev.vars')
  if (!existsSync(path)) return {}
  const out: Record<string, string> = {}
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq === -1) continue
    out[t.slice(0, eq).trim()] = t.slice(eq + 1).trim()
  }
  return out
}

export default defineConfig({
  plugins: [
    // Dev: serves src/index.tsx as the Hono worker on the Vite dev server.
    // Build: @hono/vite-cloudflare-pages emits dist/_worker.js for Pages.
    devServer({ entry: 'src/index.tsx', env: loadDevVars() }),
    pages(),
  ],
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_debugger: true,
        // Keep console.error / console.warn so app.onError stays observable in prod
        pure_funcs: ['console.log', 'console.debug', 'console.info'],
        passes: 2,
      },
      mangle: { toplevel: false },
      format: { comments: false },
    },
    rollupOptions: {
      output: {
        // Inline small assets directly
        inlineDynamicImports: true,
      },
    },
  },
})
