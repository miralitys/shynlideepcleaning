import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["shynlideepcleaning.com", "www.shynlideepcleaning.com"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return
          if (id.includes("lucide-react")) return "vendor-icons"
          if (id.includes("react") || id.includes("react-dom")) return "vendor-react"
          if (id.includes("radix-ui")) return "vendor-radix"
          return "vendor"
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
