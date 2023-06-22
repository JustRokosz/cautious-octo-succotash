import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), EnvironmentPlugin('all')],
})
