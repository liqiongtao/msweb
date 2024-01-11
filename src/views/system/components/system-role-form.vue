<script setup>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import { ElNotification } from 'element-plus'
import permissions from '@/utils/permissions'

const formRef = ref()
const { state, getters, dispatch, commit } = useStore()

const form = state['system-role'].form
const formDialogVisibale = computed(() => state['system-role'].formDialogVisibale)

const rules = computed(() => getters['system-role/rules'])
const loading = computed(() => getters['system-role/loading'])

const handleCloseFormDialog = () => commit('system-role/closeFormDialog')

const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) return

        var permissions = this.$refs.permissions.getCheckedKeys().filter((i) => i)
        form.permissions = permissions

        dispatch('system-role/formSubmit', form).then((err) => {
            if (err) {
                ElNotification.error(err)
                return
            }
            ElNotification.success('操作成功')
            formRef.value.resetFields()
            handleCloseFormDialog()
        })
    })
}

dispatch('system-role/getPermissions')
</script>

<template>
    <el-dialog
        :title="form.id ? '编辑' : '添加'"
        v-model="formDialogVisibale"
        :before-close="handleCloseFormDialog"
        width="800px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        append-to-body
        destroy-on-close
    >
        <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" label-position="right">
            <el-form-item prop="name" label="角色名称">
                <el-input v-model="form.name" placeholder="请填写" @keyup.enter="handleSubmit" style="width: 400px">
                </el-input>
            </el-form-item>
            <el-form-item prop="description" label="角色描述">
                <el-input
                    type="textarea"
                    v-model="form.description"
                    placeholder="请填写"
                    @keyup.enter="handleSubmit"
                    style="width: 400px"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="权限分配">
                <el-tree
                    ref="permissions"
                    :data="permissions"
                    show-checkbox
                    node-key="key"
                    :default-checked-keys="form.view_permissions"
                    :expand-on-click-node="false"
                    check-on-click-node
                    default-expand-all
                >
                </el-tree>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit" :loading="loading" plain>确定</el-button>
                <el-button @click="handleCloseFormDialog" plain>关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
