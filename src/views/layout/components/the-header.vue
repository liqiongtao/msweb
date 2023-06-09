<script setup>
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
      border-bottom: 1px solid rgba($color: #f2f6fc, $alpha: 1);
      background-color: rgba($color: #ffffff, $alpha: 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .el-menu,
    .el-menu .el-sub-menu__title {
      border: 0px !important;
    }
</style>
