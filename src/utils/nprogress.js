import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 可选配置，关闭默认的旋转图标
NProgress.configure({ showSpinner: false })

export function startProgress() {
    NProgress.start()
}

export function stopProgress() {
    NProgress.done()
}
