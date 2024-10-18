<script setup>
    import { useAuthStore } from '@/stores/auth.store'
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const authState = useAuthStore()

    const title = import.meta.env.VITE_APP_SITE_TITLE
    const loginName = authState.getAuthName()

    const visiablePassword = ref(false)

    const handleSelect = (index) => {
        switch (index) {
            case 'password':
                visiablePassword.value = true
                break

            case 'logout':
                router.push({ name: 'login' })
                break
        }
    }
</script>

<template>
    <el-header>
        <div class="logo">
            <span>{{ title }}</span>
        </div>
        <div class="float-right">
            <el-menu mode="horizontal" :ellipsis="false" @select="handleSelect">
                <el-sub-menu index="user">
                    <template #title>hi {{ loginName }}</template>
                    <el-menu-item index="password">修改密码</el-menu-item>
                    <el-menu-item index="logout">退出</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
    </el-header>
</template>

<style lang="scss" scoped>
    .el-header {
        height: 60px;
        border-bottom: 1px solid var(--el-border-color);
        background-color: var(--el-bg-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            color: var(--el-color-primary);
            font-size: 20px;
            font-weight: 400;
        }
    }
    .float-right {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-menu,
    .el-menu .el-sub-menu__title {
        border: 0px !important;
    }
    // ::v-deep .el-switch--small .el-switch__core .el-switch__action {
    //     display: none !important;
    // }
</style>
