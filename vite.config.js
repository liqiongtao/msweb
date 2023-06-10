import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueSetupExend from 'vite-plugin-vue-setup-extend'
import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    base: './',
    plugins: [
        vue(),
        vueSetupExend(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', 'vue-router', 'vuex'],
            eslintrc: {
                enabled: false,
                globalsPropValue: true,
                filepath: './.eslintrc-auto-import.json'
            }
        }),
        Components({
            resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
        }),
        ElementPlus()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use "@/assets/element.scss" as *;
                    @use "@/assets/element-dark.scss";
                `
            }
        }
    },
    build: {
        target: ['es2015'],
        outDir: 'dist',
        manifest: true,
        sourcemap: false,
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    lodash: ['lodash']
                }
            }
        }
    },
    server: {
        open: true,
        port: 3301,
        hmr: { overlay: false }
    }
})
