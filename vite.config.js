import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import srgr from 'vite-plugin-svgr'


// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production'
  ? '/hireright-interview/'
  : '/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    srgr()
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['.ngrok-free.dev', '.trycloudflare.com', 'localhost'],
  },
  preview: {
    port: 5173,
    strictPort: true,
  }
})
