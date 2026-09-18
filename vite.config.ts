import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxQ09E6sitrfif9VZJs4kLg0wugTgMuLjSeso2AwgdvJxaZwgEglspxc237oLEt80YA/exec'

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