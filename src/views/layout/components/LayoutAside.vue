<script setup>
    import { mainRoutes } from '@/router/routes'
    import { ref } from 'vue'

    const loop = (menus) => {
        return menus.filter((item) => {
            if (item.meta?.hide === true) return
            if (!item.meta?.permissions?.length) {
                return item
            }
            // for (let i of item.meta.permissions) {
            //     if (permissions.value.includes(i)) {
            //         return item
            //     }
            // }
            if (item.children && item.children.length) {
                loop(item.children)
            }
        })
    }

    const menus = loop(mainRoutes.filter((i) => i.path == '/')[0].children || [])

    const isCollapse = ref(false)
</script>

<template>
    <el-aside width="200px">
        <el-menu :default-active="$route.path" :collapse="isCollapse" router>
            <template v-for="(item1, index1) in menus" :key="index1">
                <el-sub-menu :index="$router.resolve({ name: item1.name }).path" v-if="(item1.children || []).length">
                    <template v-slot:title>
                        <el-icon v-if="item1.meta?.icon">
                            <component :is="item1.meta.icon"></component>
                        </el-icon>
                        <span>{{ item1.meta?.title }}</span>
                    </template>
                    <template v-for="(item2, index2) in item1.children || []" :key="index2">
                        <el-menu-item :index="$router.resolve({ name: item2.name }).path">
                            <template v-slot:title>
                                <i style="margin-right: 10px"></i>
                                <span>{{ item2.meta?.title }}</span>
                            </template>
                        </el-menu-item>
                    </template>
                </el-sub-menu>
                <el-menu-item :index="$router.resolve({ name: item1.name }).path" v-else>
                    <el-icon v-if="item1.meta?.icon">
                        <component :is="item1.meta.icon"></component>
                    </el-icon>
                    <template v-slot:title>{{ item1.meta?.title }}</template>
                </el-menu-item>
            </template>
        </el-menu>
    </el-aside>
</template>

<style lang="scss" scoped>
    .el-aside {
        border-right: 1px solid var(--el-border-color);
        background-color: var(--el-bg-color);
        padding-bottom: 59px;
    }
    .el-menu,
    .el-menu .el-sub-menu__title {
        border: 0px !important;
    }
</style>
