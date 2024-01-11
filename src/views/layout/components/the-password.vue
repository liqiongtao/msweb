<script setup>
import { ElNotification } from 'element-plus'
import { post } from '@/utils/http'

const router = useRouter()
const { commit } = useStore()

const emits = defineEmits(['close'])
const props = defineProps({
    visiable: { type: Boolean, default: false }
})

const visiable = computed(() => {
    return props.visiable
})

const formRef = ref()
const form = ref({
    password: '',
    confirm_password: ''
})
const rules = ref({
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '密码长度限制为6至12个字符', trigger: 'blur' }
    ],
    confirm_password: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { min: 6, max: 12, message: '密码长度限制为6至12个字符', trigger: 'blur' }
    ]
})

const handleClose = () => {
    emits('close')
}
const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) return

        post('/admin/password', form.value).then((res) => {
            if (res.code) {
                ElNotification.error(res.message || '操作失败')
                return
            }
            ElNotification.success('修改密码成功，请重新登录！')
            commit('clearLoginStatus')
            router.push({ name: 'login' })
        })
    })
}
</script>

<template>
    <el-dialog
        class="dialog-box"
        v-model="visiable"
        width="500px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :before-close="handleClose"
    >
        <template #header>修改密码</template>
        <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="新密码：" prop="password">
                <el-input type="text" placeholder="请输入新密码" v-model="form.password" show-password> </el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="confirm_password">
                <el-input type="text" placeholder="请输入确认密码" v-model="form.confirm_password" show-password>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button @click="handleSubmit" type="primary">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style scoped>
.el-form {
    margin-right: 60px;
}
</style>
