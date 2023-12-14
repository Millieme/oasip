import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/kp6/',
  plugins: [vue()],
  server:{
    proxy:{
      'api':{
        //target: "http://localhost:8080",
        target: 'https://intproj21.sit.kmutt.ac.th/spike',
        changeOrigin: true
      }
    }
  }
})
