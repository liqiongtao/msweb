import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import './assets/main.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElIcons)) {
    app.component(key, component)
}

app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.use(store)

app.mount('#app')
