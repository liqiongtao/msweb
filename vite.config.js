import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueSetupExend from 'vite-plugin-vue-setup-extend'
import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

const ts = new Date().getTime()

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    return defineConfig({
        base: env.VITE_ROUTER_BASE,
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
                    chunkFileNames: `static/js/[name]-${ts}.js`,
                    entryFileNames: `static/js/[name]-${ts}.js`,
                    assetFileNames: `static/[ext]/[name]-${ts}.[ext]`,
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
            port: 3301,
            hmr: { overlay: false }
        }
    })
}
