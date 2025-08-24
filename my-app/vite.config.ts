import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Nếu bạn dùng Vite 4+ và gặp lỗi với postcss + type:module, hãy chắc chắn file postcss config là postcss.config.cjs
})
