<script setup>
    import { useDark } from '@vueuse/core'
    import { Opportunity, Sunny } from '@element-plus/icons-vue'
    import ThePassword from './the-password.vue'

    const router = useRouter()
    const { state, commit } = useStore()

    const isDark = useDark()

    const title = import.meta.env.VITE_APP_SITE_TITLE
    const username = computed(() => state.username)

    const visiablePassword = ref(false)

    const handleSelect = (index) => {
        switch (index) {
            case 'password':
                visiablePassword.value = true
                break

            case 'logout':
                commit('clearLoginStatus')
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
            <el-switch size="small" v-model="isDark" :active-icon="Opportunity" :inactive-icon="Sunny" inline-prompt />

            <el-menu mode="horizontal" :ellipsis="false" @select="handleSelect">
                <el-sub-menu index="user">
                    <template #title>hi {{ username }}</template>
                    <el-menu-item index="password">修改密码</el-menu-item>
                    <el-menu-item index="logout">退出</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
    </el-header>

    <the-password :visiable="visiablePassword" @close="visiablePassword=false"></the-password>
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
    ::v-deep .el-switch--small .el-switch__core .el-switch__action {
      display: none !important;
    }
</style>
