<script setup>
import TheHeader from './components/the-header.vue'
import TheAside from './components/the-aside.vue'
</script>

<template>
    <el-container>
        <the-header></the-header>
        <el-container>
            <the-aside></the-aside>
            <el-main>
                <router-view></router-view>
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
