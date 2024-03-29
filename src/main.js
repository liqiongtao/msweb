import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import '@/assets/main.scss'

import CheckPermission from '@/components/check-permission.vue'

const app = createApp(App)

app.use(store)
app.use(router)

app.use(ElementPlus, {
    size: 'large',
    locale: zhCn
})

for (const [key, component] of Object.entries(ElIcons)) {
    app.component(key, component)
}

app.component('CheckPermission', CheckPermission)

app.mount('#app')
