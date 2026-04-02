import pages from '@hono/vite-cloudflare-pages'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [pages()],
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug'],
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
