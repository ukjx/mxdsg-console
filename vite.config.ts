import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.44.4:12580/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }

})
