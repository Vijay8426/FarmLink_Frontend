import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ensure the server is accessible on all network interfaces
    port: 3000,      // Ensure the port is correct and matches the deployment settings
  },
})
