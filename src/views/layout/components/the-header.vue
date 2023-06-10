<script setup>
    import { useDark, useToggle } from '@vueuse/core'

    const isDark = useDark()
    const toggleDark = useToggle(isDark)

    const { state } = useStore()

    const title = import.meta.env.VITE_APP_SITE_TITLE
    const username = computed(() => state.username)

    const handleSelect = () => {

    }

</script>

<template>
    <el-header>
        <div class="logo">
            <span>{{ title }}</span>
        </div>
        <div class="float-right">
            <el-switch size="small" v-model="isDark" />

            <el-menu mode="horizontal" :ellipsis="false" @select="handleSelect">
                <el-sub-menu index="user">
                    <template #title>hi {{ username }}</template>
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
</style>
