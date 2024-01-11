<script setup>
import { ElMessage } from 'element-plus'
import { post } from '@/utils/http'

const { commit } = useStore()
const router = useRouter()

const title = import.meta.env.VITE_APP_SITE_TITLE

const captcha_img = ref('')
const formRef = ref()
const form = ref({
    account: '',
    password: '',
    captcha_code: '',
    captcha_id: ''
})
const rules = ref({
    account: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
    captcha_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

const submitForm = () => {
    formRef.value.validate((valid) => {
        if (!valid) return

        post('/login', form.value).then((res) => {
            if (res.code) {
                refreshCaptchaImg()
                ElMessage.error(res.message || '操作失败')
                return
            }

            commit('setLoginInfo', res.data || {})
            ElMessage.success('登录成功！')

            setTimeout(() => {
                router.push({ name: 'home' })
            }, 600)
        })
    })
}

const refreshCaptchaImg = () => {
    post('/captcha/get', {}).then((res) => {
        captcha_img.value = res.data.base64image
        form.value.captcha_code = ''
        form.value.captcha_id = res.data.id
    })
}

refreshCaptchaImg()
</script>

<template>
    <div class="video-container">
        <video src="https://s.shuzhuo.cn/static/ae/2d/bg_322d9057d362cc5c.mp4" autoplay muted="muted" loop></video>
    </div>
    <div class="login-page">
        <div class="login-model">
            <h1>
                <span>{{ title }}</span>
            </h1>
            <el-form ref="formRef" :model="form" :rules="rules">
                <el-form-item prop="account">
                    <el-input v-model="form.account" placeholder="登录账号" @keyup.enter="submitForm" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="form.password"
                        placeholder="登录密码"
                        type="password"
                        show-password
                        @keyup.enter="submitForm"
                    />
                </el-form-item>
                <el-form-item class="ipt-captcha-bar" prop="captcha_code">
                    <el-input
                        maxLength="4"
                        v-model="form.captcha_code"
                        placeholder="点击刷新验证码"
                        @keyup.enter="submitForm"
                    ></el-input>
                    <img v-if="captcha_img" @click="refreshCaptchaImg" :src="captcha_img" />
                </el-form-item>
                <el-button class="button" type="primary" @click="submitForm">登 录</el-button>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.video-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    video {
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: fill;
    }
}
.login-page {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-model {
    width: 400px;
    min-height: 352px;
    padding: 20px;
    border-radius: 10px;
    background: #ffffff;
    h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            margin-top: 4px;
            margin-left: 20px;
            font-size: 30px;
            color: #07154f;
        }
    }
    .el-form {
        margin-top: 20px;
        .ipt-captcha-bar {
            position: relative;
            img {
                width: 84px;
                height: 40px;
                position: absolute;
                top: 0;
                right: 0;
            }
        }
        .el-button {
            width: 100%;
            margin-top: 20px;
        }
    }
}
</style>
