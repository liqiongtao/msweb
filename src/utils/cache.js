import { md5, encrypt, decrypt } from '@/utils/crypto'

function encodeKey(key) {
    return md5(window.location.host + import.meta.env.VITE_BASE_PATH + import.meta.env.VITE_APP_KEY + key)
}

export const session = {
    set(key, val) {
        sessionStorage.setItem(encodeKey(key), encrypt(val))
    },
    get(key) {
        if (key == 'debug') return sessionStorage.getItem(key) || ''
        var val = sessionStorage.getItem(encodeKey(key)) || ''
        return val ? decrypt(val) : ''
    },
    remove(key) {
        sessionStorage.removeItem(encodeKey(key))
    }
}

export const local = {
    set(key, val) {
        localStorage.setItem(encodeKey(key), encrypt(val))
    },
    get(key) {
        if (key == 'debug') return localStorage.getItem(key) || ''
        var val = localStorage.getItem(encodeKey(key)) || ''
        return val ? decrypt(val) : ''
    },
    remove(key) {
        localStorage.removeItem(encodeKey(key))
    }
}

export default { session, local }
