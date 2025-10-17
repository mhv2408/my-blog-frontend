import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',                // keep this as root for custom domains
  build: {
    outDir: 'docs',         // output build files into /docs
  },
  plugins: [react(), tailwindcss()],
})
