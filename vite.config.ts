import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxWocxJi8ApEuAsXGGxwD-e3CRD2vGphLvTIcT3nwbEyjHtKFSewLF7MgUs-XZIxx7D/exec'

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