<script setup>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import { formatDateTime } from '@/utils/date'

const { state, dispatch } = useStore()

const h = ref(document.body.clientHeight - 330)
window.onresize = () => {
    h.value = document.body.clientHeight - 280
}

const page = computed(() => state['system-log'].page)
const loading = computed(() => state['system-log'].loading)

const getPageList = () => dispatch('system-log/getPageList')
const updatePageSize = (val) => dispatch('system-log/updatePageSize', val)
const updatePageNum = (val) => dispatch('system-log/updatePageNum', val)

getPageList()
</script>

<template>
    <el-card>
        <el-table :data="page.list" v-loading="loading" :height="h" style="width: 100%">
            <el-table-column type="index" label="序号" align="center" width="80px" />
            <el-table-column prop="operator_admin" label="操作人" align="center" width="120px" />
            <el-table-column
                prop="event_content"
                label="操作内容"
                align="center"
                min-width="200px"
                :show-overflow-tooltip="true"
            />
            <el-table-column prop="create_time" label="添加时间" align="center" width="120px">
                <template #default="scope">
                    {{ formatDateTime(scope.row.create_time) }}
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            background
            @size-change="updatePageSize"
            @current-change="updatePageNum"
            :current-page="page.num"
            :page-size="page.size"
            :total="page.total"
            :page-sizes="page.sizes"
            :layout="page.layout"
        >
        </el-pagination>
    </el-card>
</template>
