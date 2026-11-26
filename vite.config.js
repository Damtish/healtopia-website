import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    // three.js lives in its own lazily loaded chunk (Services heart effect only),
    // so it never affects the initial page load.
    chunkSizeWarningLimit: 560,
  },
})
