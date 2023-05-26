<template>
    <video class="video-bg" src="@/assets/bg.mp4" autoplay muted="muted" loop></video>
    <div class="login-model">
        <h1>
            <img src="@/assets/logo.svg" />
            <span>管理系统平台</span>
        </h1>
        <el-input v-model="account" placeholder="请输入账号"></el-input>
        <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
        <el-button @click="loginIn">登录</el-button>
    </div>
</template>

<script setup>
    import { ElMessage } from 'element-plus'
    import { session } from '@/utils/cache'

    const router = useRouter()
    const account = ref('')
    const password = ref('')

    const loginIn = () => {
        if (account.value == '') {
            ElMessage.error('请输入账号')
            return
        }
        if (password.value == '') {
            ElMessage.error('请输入密码')
            return
        }
        if (password.value.substr(0, 4) != 'mko0') {
            ElMessage.error('密码输入错误')
            return
        }
        session.set('account', account.value)
        router.push({ name: 'home' })
    }

</script>

<style lang="scss" scoped>
    .video-bg {
      width: 100%;
      height: 100%;
      min-height: 680px;
      object-fit: fill;
      position: absolute;
    }
    .login-model {
      width: 400px;
      height: 300px;
      padding: 20px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
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
        img {
          width: 50px;
          height: 50px;
        }
      }
      .el-input {
        margin-top: 20px;
        height: 36px;
      }
      .el-button {
        width: 100%;
        margin-top: 20px;
        height: 36px;
        color: #ffffff;
        background: #0d2ea8;
      }
    }
</style>
