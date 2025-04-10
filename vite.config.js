import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    // Añade esta configuración:
    allowedHosts: [
      '9213-45-225-227-89.ngrok-free.app', // Tu dominio ngrok actual
      '.ngrok-free.app' // Permite cualquier subdominio de ngrok
    ]
  }
})