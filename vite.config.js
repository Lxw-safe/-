// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // 关键优化：禁用压缩以大幅缩短 Vercel 构建时间
    minify: false,
    // 避免因大文件块导致的警告和潜在卡顿
    chunkSizeWarningLimit: 1000,
    // 禁用 CSS 代码分割，简化构建过程
    cssCodeSplit: false,
    // 生产环境不需要 source map，加快构建
    sourcemap: false,
  },
});