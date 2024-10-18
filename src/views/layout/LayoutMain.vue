<script setup>
    import LayoutHeader from './components/LayoutHeader.vue'
    import LayoutAside from './components/LayoutAside.vue'
</script>

<template>
    <el-container>
        <LayoutHeader />
        <el-container>
            <LayoutAside />
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
    .el-container {
        width: 100%;
        height: 100%;
        background-color: var(--el-bg-color-page);
        flex-direction: column;
        .el-container {
            flex-direction: row;
        }
    }
    .el-main {
        padding-bottom: 59px;
    }
</style>
