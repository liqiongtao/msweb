<script setup>
    const isCollapse = ref(false)
    const handleOpen = () => { }
    const handleClose = () => { }
</script>

<template>
    <el-aside width="200px">
        <el-menu :default-active="$route.path" :collapse="isCollapse" @open="handleOpen" @close="handleClose" router>
            <el-menu-item index="/home">
                <el-icon>
                    <PieChart />
                </el-icon>
                <template #title>首页</template>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<style lang="scss" scoped>
    .el-aside {
      border-right: 1px solid rgba($color: #f2f6fc, $alpha: 1);
      background-color: rgba($color: #ffffff, $alpha: 1);
    }
    .el-menu,
    .el-menu .el-sub-menu__title {
      border: 0px !important;
    }
</style>
