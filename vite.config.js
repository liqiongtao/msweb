import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExend from 'vite-plugin-vue-setup-extend'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    return defineConfig({
        base: env.VITE_BASE_PATH,
        plugins: [
            vue(),
            vueSetupExend(),
            vueDevTools(),
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
            }),
            ElementPlus({})
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // quietDeps + api 用于解决sass版本过高导致某些js api失效问题
                    quietDeps: true,
                    api: 'modern-compiler',
                    additionalData: `
                        @use "@/assets/element.scss" as *;
                        @use "@/assets/element-dark.scss";
                    `
                }
            }
        },
        define: {
            'process.env': env,
        },
        build: {
            outDir: 'dist',
            manifest: true,
            chunkHash: true,
            contentHash: true,
            emptyOutDir: true,
            sourcemap: false,
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
                mangle: {
                    toplevel: true, // 在顶层作用域中混淆变量名
                    reserved: ['$super', '$', 'exports', 'require'], // 保留这些变量名不被混淆
                },
                output: {
                    comments: /^!/, // 仅保留以'!'开头的注释
                    beautify: false, // 不美化输出
                }
            },
            rollupOptions: {
                output: {
                    chunkFileNames: `static/js/[hash].js`,
                    entryFileNames: `static/js/[hash].js`,
                    assetFileNames: `static/[ext]/[hash].[ext]`,
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString()
                        }
                    }
                }
            }
        },
        server: {
            open: true,
            port: 8000,
            hmr: { overlay: false }
        }
    })
}
