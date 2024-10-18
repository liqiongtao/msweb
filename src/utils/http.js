import axios from 'axios'
import { ElNotification } from 'element-plus'
import { md5, sha1, encrypt, decrypt } from '@/utils/crypto'
import { useAuthStore } from '@/stores/auth.store'
import { debug } from '@/utils/log'

const { getAuthToken, cleanAuthState } = useAuthStore()

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json',
    timeout: 30000
})

instance.interceptors.request.use(
    (http) => {
        http.headers = Object.assign({}, http.headers, getHeaders())
        return http
    },
    (error) => {
        return Promise.reject(error)
    }
)

const errorMessages = {
    401: { title: '警告', message: '未授权访问' },
    403: { title: '警告', message: '没有权限访问' },
    404: { title: '警告', message: '请求接口不存在' }
}

instance.interceptors.response.use(
    (res) => {
        const code = res?.data?.code
        if (code == 401) {
            cleanAuthState()
            window.location.reload()
        } else if (code == 403 || code == 404) {
            ElNotification.error(errorMessages[code])
        }
        return res
    },
    (error) => {
        if (typeof error == 'string') {
            ElNotification.error(error)
            return Promise.reject(error)
        }

        const code = (error?.response?.status || error?.response?.data?.code)
        if (code == 401) {
            cleanAuthState()
            window.location.reload()
        } else if (code == 403 || code == 404) {
            ElNotification.error(errorMessages[code])
        }
        return Promise.reject(error)
    }
)

export function getHeaders() {
    const ts = new Date().getTime() / 1000

    const headers = {
        'X-Request-AppId': md5(import.meta.env.VITE_APP_KEY),
        'X-Request-Sign': sha1(ts + md5(navigator.userAgent || '')),
        'X-Request-Timestamp': ts
    }

    const token = getAuthToken()
    if (token) {
        headers['Authorization'] = token
    }

    return headers
}

export async function get(uri) {
    debug(`[GET Request] uri=${uri}`)
    const res = await instance.get(uri)
    let rst = res?.data || {}
    debug(`[GET Response] uri=${uri}`, 'result=', rst)
    return await Promise.resolve(rst)
}

export async function post(uri, params = {}) {
    debug(`[POST Request] uri=${uri}`, `params=${JSON.stringify(params)}`)
    const res = await instance.post(uri, encrypt(params || {}))
    let rst = res.data || {}
    if (rst.data) {
        rst.data = JSON.parse(decrypt(rst.data) || '{}') || {}
    }
    debug(`[POST Response] uri=${uri}`, `params=${JSON.stringify(params)}`, 'result=', rst)
    return await Promise.resolve(rst)
}

export async function download(uri, params = {}, fileType = '') {
    const res = await instance.post(uri, encrypt(params || {}), { responseType: 'blob' })

    const blob = new Blob([res.data], { type: fileType })
    const link = document.createElement('a')

    link.download = decodeURIComponent((res.headers['content-disposition'] || '').split('filename=')[1] || '')
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)

    document.body.appendChild(link)

    link.click()

    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)

    debug(`[Download] uri=${uri}`, `params=${JSON.stringify(params)}`, link.download)

    return await Promise.resolve({ code: 0, message: 'ok' })
}

export async function downloadExcel(uri, params = {}) {
    return await download(uri, params, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8')
}
