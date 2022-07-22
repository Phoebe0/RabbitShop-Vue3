import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  // less变量和mixins样式统一注入
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/assets/styles/variables.less";
          @import "@/assets/styles/mixins.less";
        `
      }
    }
  },
  plugins: [ vueSetupExtend(), vue({
    reactivityTransform: true // 数据响应式
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
