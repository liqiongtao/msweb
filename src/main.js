import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(ElementPlus, {
    size: 'small',
    zIndex: 3000,
    locale: zhCn
})

for (const [key, component] of Object.entries(ElIcons)) {
    app.component(key, component)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
