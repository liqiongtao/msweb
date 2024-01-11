<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const { state, dispatch } = useStore()

const search = computed(() => state['system-admin'].search)
const getPageList = () => dispatch('system-admin/getPageList')
</script>

<template>
    <el-card>
        <el-form :model="search" label-position="left" inline>
            <el-form-item label="账号" @keyup.enter="getPageList">
                <el-input
                    v-model="search.account"
                    placeholder="请输入账号"
                    clearable
                    @keypress="getPageList"
                ></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="getPageList" plain>
                    <el-space>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </el-space>
                    搜索
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
