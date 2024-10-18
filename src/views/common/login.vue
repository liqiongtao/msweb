<script setup>
    import { ElNotification } from 'element-plus'
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '@/stores/auth.store'
    import * as api from '@/api'
    import { reactive, ref } from 'vue'

    const title = import.meta.env.VITE_SITE_TITLE
    const router = useRouter()
    const authStore = useAuthStore()

    const loading = ref(false)
    const form = reactive({
        account: '',
        password: '',
        captcha_id: '',
        captcha_code: ''
    })
    const rules = reactive({
        account: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
        captcha_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
    })

    const formRef = ref()
    const submitForm = (formEl) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (!valid || loading.value) return
            loading.value = true
            api.login(form).then((res) => {
                setTimeout(() => {
                    loading.value = false
                }, 300)
                if (res.code) {
                    refPasswordCaptchaImg()
                    ElNotification.error(res.message || '操作失败')
                    return
                }

                authStore.setAuthState(res.data || {})
                ElNotification.success('登录成功！')

                setTimeout(() => {
                    router.push({ name: 'home' })
                }, 300)
            })
        })
    }

    const passwordCaptchaImg = ref('')
    const refPasswordCaptchaImg = () => {
        api.captchaGet().then((res) => {
            passwordCaptchaImg.value = res.data.base64image
            form.captcha_id = res.data.id
        })
    }

    refPasswordCaptchaImg()
</script>

<template>
    <div class="container">
        <div class="login-box">
            <div class="logo">{{ title }}</div>
            <el-card size="large">
                <el-form ref="formRef" :model="form" :rules="rules" size="large">
                    <el-form-item prop="account">
                        <el-input v-model="form.account" placeholder="登录账号" class="input-with-select" @keyup.enter="submitForm(formRef)"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" type="password" placeholder="登录密码" show-password auto-complete="new-password" @keyup.enter="submitForm(formRef)"></el-input>
                    </el-form-item>
                    <el-form-item class="rela" prop="captcha_code">
                        <el-input maxLength="4" v-model="form.captcha_code" placeholder="点击刷新图形验证码" @keyup.enter="submitForm(formRef)"></el-input>
                        <template v-if="passwordCaptchaImg">
                            <img @click="refPasswordCaptchaImg" class="captcha-img" :src="passwordCaptchaImg" width="84" height="32" alt="" />
                        </template>
                    </el-form-item>
                    <el-button class="button" type="primary" @click="submitForm(formRef)" :loading="loading">登 录</el-button>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100%;
        overflow: auto;
        position: relative;
        background: url(@/assets/bg.png) no-repeat;
        background-size: cover;
        background-position: center;
    }
    .login-box {
        width: 400px;
        height: 600px;
        position: fixed;
        top: 15%;
        right: 8%;
    }
    .logo {
        color: #fff;
        font-size: 36px;
        font-weight: 600;
        text-align: center;
        padding-bottom: 20px;
    }
    .el-form {
        padding: 10px;
    }
    .el-form-item {
        position: relative;
        .captcha-img {
            height: 38px;
            position: absolute;
            top: 0;
            right: 0;
        }
    }
    .el-button {
        width: 100%;
    }
</style>
