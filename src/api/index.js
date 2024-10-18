import { post } from '@/utils/http'

// 获取图片验证码
export function captchaGet() {
    return post('/captcha/get', {})
}

// 登录
export function login(form = {}) {
    return post('/login', form)
}
