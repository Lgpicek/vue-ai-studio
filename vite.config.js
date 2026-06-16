import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// IMPORTANTE: 'base' debe coincidir con el nombre del repo en GitHub Pages.
// Si publicas en https://lgpicek.github.io/vue-ai-studio/ -> base: '/vue-ai-studio/'
// Si publicas en la raiz del usuario -> base: '/'
export default defineConfig({
  plugins: [vue()],
  base: '/vue-ai-studio/'
})
