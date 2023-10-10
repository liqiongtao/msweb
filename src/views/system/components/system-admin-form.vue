<script setup>
    import { useStore } from 'vuex'
    import { ref, computed } from 'vue'
    import { ElNotification } from 'element-plus'

    const { state, getters, dispatch, commit } = useStore()

    const form = state['system-admin'].form
    const formDialogVisibale = computed(() => state['system-admin'].formDialogVisibale)

    const rules = computed(() => getters['system-admin/rules'])
    const loading = computed(() => getters['system-admin/loading'])

    const handleCloseFormDialog = () => commit('system-admin/closeFormDialog')

    const formRef = ref()
    const handleSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) return
            dispatch('system-admin/formSubmit', form).then(err => {
                if (err) {
                    ElNotification.error(err)
                    return
                }
                handleCloseFormDialog()
                formRef.value.resetFields()
                ElNotification.success('操作成功')
            })
        })
    }

    const roleOptions = computed(() => state['system-role'].options)
    dispatch('system-role/getOptions')
</script>

<template>
    <el-dialog :title="form.id ? '编辑' : '添加'" v-model="formDialogVisibale" :before-close="handleCloseFormDialog" width="600px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body destroy-on-close>

        <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" label-position="right">
            <el-form-item prop="nickname" label="显示名称">
                <el-input v-model="form.nickname" placeholder="请填写" @keyup.enter="handleSubmit">
                </el-input>
            </el-form-item>
            <el-form-item prop="account" label="登录账号">
                <el-input v-model="form.account" placeholder="请填写" @keyup.enter="handleSubmit">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="登录密码">
                <el-input v-model="form.password" type="password" placeholder="请填写" @keyup.enter="handleSubmit" show-password>
                </el-input>
            </el-form-item>
            <el-form-item prop="confirm_password" label="确认密码">
                <el-input v-model="form.confirm_password" type="password" placeholder="请填写" @keyup.enter="handleSubmit" show-password>
                </el-input>
            </el-form-item>
            <el-form-item prop="roles" label="角色">
                <el-select v-model="form.roles" placeholder="请选择" multiple collapse-tags collapse-tags-tooltip>
                    <template v-for="i in roleOptions" :key="i.id">
                        <el-option :label="i.name" :value="i.id"></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit" :loading="loading" plain>确定</el-button>
                <el-button @click="handleCloseFormDialog" plain>关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
