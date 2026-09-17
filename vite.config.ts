import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbz2r28IoEltB7ZhyDtW1xtEvgWk1SwF_FgTKnhvoJuCnIDilUQOYbBS5wWLb6P0bTjE/exec'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: googleScriptUrl,
        changeOrigin: true,
        secure: true,
        rewrite: () => '',
      },
    },
  },
  preview: {
    proxy: {
      '/api': {
        target: googleScriptUrl,
        changeOrigin: true,
        secure: true,
        rewrite: () => '',
      },
    },
  },
})