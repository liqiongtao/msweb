<script setup>
    import { useStore } from 'vuex'
    import { computed } from 'vue'

    import { formatDateTime } from '@/utils/date'

    const { state, dispatch, commit } = useStore()

    const page = computed(() => state['system-admin'].page)
    const loading = computed(() => state['system-admin'].loading)

    const getPageList = () => dispatch('system-admin/getPageList')
    const updatePageSize = (val) => dispatch('system-admin/updatePageSize', val)
    const updatePageNum = (val) => dispatch('system-admin/updatePageNum', val)
    const updateStatus = ({ id, status }) => dispatch('system-admin/updateStatus', { id, status })

    const handleOpenFormDialog = (fromData) => commit('system-admin/openFormDialog', fromData)

    getPageList()
</script>

<template>
    <el-card>
        <el-table :data="page.list" v-loading="loading" style="width: 100%">
            <el-table-column type="index" label="序号" align="center" width="60px" />
            <el-table-column prop="account" label="登录账号" align="center" min-width="120px" />
            <el-table-column prop="nickname" label="显示名称" align="center" min-width="120px" />
            <el-table-column prop="role_names" label="角色" align="center" min-width="120px" />
            <el-table-column prop="create_time" label="添加时间" align="center" width="120px">
                <template #default="scope">
                    {{ formatDateTime(scope.row.create_time) }}
                </template>
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" align="center" width="120px">
                <template #default="scope">
                    {{ formatDateTime(scope.row.update_time) }}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center" width="80px" fixed="right">
                <template #default="scope">
                    <check-permission value="sys-admin-manage">
                        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" @change="updateStatus(scope.row)" />
                        <template #no-permission>
                            <el-tag type="success" v-if="scope.row.status == 1">启用</el-tag>
                            <el-tag type="warning" v-else>停用</el-tag>
                        </template>
                    </check-permission>
                </template>
            </el-table-column>
            <check-permission value="sys-admin-manage">
                <el-table-column prop="" label="操作" align="center" width="80px" fixed="right">
                    <template #default="scope">
                        <el-button type="primary" @click="handleOpenFormDialog(scope.row)" link>编辑</el-button>
                    </template>
                </el-table-column>
            </check-permission>
        </el-table>

        <el-pagination background @size-change="updatePageSize" @current-change="updatePageNum" :current-page="page.num" :page-size="page.size" :total="page.total" :page-sizes="page.sizes" :layout="page.layout"></el-pagination>
    </el-card>
</template>
