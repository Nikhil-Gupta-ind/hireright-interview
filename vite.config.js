import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import srgr from 'vite-plugin-svgr'


// https://vite.dev/config/
export default defineConfig({
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
    // VITE_API_BASE_URL=/api/v1 TODO: Remove this
    // proxy: {
    //   '/api': {
    //     target: 'https://api.hire-right.ai',
    //     changeOrigin: true,
    //     secure: true,
    //   }
    // }
  }
})
