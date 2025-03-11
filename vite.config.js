import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal'],
    include: ['@fortawesome/react-fontawesome', '@fortawesome/free-brands-svg-icons', '@fortawesome/free-solid-svg-icons'],
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})