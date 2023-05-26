import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vueSetupExend from 'vite-plugin-vue-setup-extend'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
    base: './',
    plugins: [
        vue(),
        vueJsx(),
        vueSetupExend(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', 'vue-router', 'vuex', '@vueuse/head'],
            dts: './auto-import.d.ts',
            eslintrc: {
                enabled: true,
                globalsPropValue: true,
                filepath: './.eslintrc-auto-import.json'
            }
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.mjs', '.cjs'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        outDir: 'dist',
        manifest: true,
        sourcemap: false,
        emptyOutDir: true
    },
    server: {
        open: true
    }
})
