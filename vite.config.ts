import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' //引入node的path模块 这里报错
// pnpm install pinia
export default defineConfig({
    plugins: [vue()],
    // 配置解析项
    resolve:{//路径别名
        alias:{
          '@': resolve(__dirname,'./src')
        }
    },
})
