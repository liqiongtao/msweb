import { createRouter, createWebHistory } from 'vue-router'
import { startProgress, stopProgress } from '@/utils/nprogress'
import routes from './routes'
import { debug } from '@/utils/log'
import { useAuthStore } from '@/stores/auth.store'
import { useGlobalStore } from '@/stores/global.store'

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_PATH),
    routes
})

router.beforeEach(async (to, form, next) => {
    debug('[route]', to)
    startProgress()

    document.title = to.meta.title || import.meta.env.VITE_SITE_TITLE || ''

    if (to.meta.requireAuth === false) {
        return next()
    }

    const { getAuthToken, cleanAuthState } = useAuthStore()
    const { init, isLoaded } = useGlobalStore()

    if (!isLoaded()) {
        init()
    }

    if (!getAuthToken()) {
        cleanAuthState()
        return next({ name: 'login' })
    }

    return next()
})

router.afterEach(() => {
    stopProgress()
})

export default router
