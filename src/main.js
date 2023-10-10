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

for (const [key, component] of Object.entries(ElIcons)) {
    app.component(key, component)
}

app.use(ElementPlus, {
    size: 'large',
    locale: zhCn
})

app.use(store)
app.use(router)

app.component('CheckPermission', CheckPermission)

app.mount('#app')
