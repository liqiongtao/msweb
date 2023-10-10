import { post } from '@/utils/http'

const state = {
    search: {},
    page: {
        num: 1,
        size: 20,
        sizes: [20, 50, 100, 300],
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        list: []
    },
    form: {},
    formDialogVisibale: false,
    loading: false
}

const getters = {
    rules(state) {
        return {
            account: [
                { required: true, message: '请填写', trigger: 'blur' }
            ],
            password: !state.form.id ? [
                { required: true, message: '请填写', trigger: 'blur' },
                {
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请输入密码'))
                        } else if (!/(?=.*[a-zA-Z])(?=.*[0-9]).{6,18}/.test(value)) {
                            callback(new Error('密码长度限制6-18位，由数字和字母组合!'))
                        } else {
                            callback()
                        }
                    }, trigger: 'blur'
                }
            ] : [],
            confirm_password: !state.form.id ? [
                { required: true, message: '请填写', trigger: 'blur' },
                {
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请再次输入密码'))
                        } else if (value !== state.form.password) {
                            callback(new Error('两次输入密码不一致!'))
                        } else {
                            callback()
                        }
                    }, trigger: 'blur'
                }
            ] : []
        }
    }
}

const actions = {
    getPageList({ state }) {
        state.loading = true
        const data = {
            ...state.search,
            page_num: state.page.num,
            page_size: state.page.size
        }
        post('/admin/list', data).then(res => {
            state.loading = false
            if (res.code) return
            state.page.total = res.data.total || 0
            state.page.list = res.data.list || []
        })
    },
    updatePageSize({ state, dispatch }, val) {
        state.page.size = val
        dispatch('getPageList')
    },
    updatePageNum({ state, dispatch }, val) {
        state.page.num = val
        dispatch('getPageList')
    },
    formSubmit({ state, dispatch }, formData) {
        state.loading = true
        var uri = formData.id ? '/admin/update' : '/admin/create'
        return post(uri, { ...formData }).then(res => {
            setTimeout(() => { state.loading = false }, 600)
            if (res.code > 0) {
                return Promise.resolve(res.message || '操作失败')
            }
            dispatch('getPageList')
            return Promise.resolve()
        })
    },
    updateStatus(_, { id, status }) {
        return post('/admin/status', { id, status }).then(res => {
            if (res.code > 0) {
                return Promise.resolve(res.message || '操作失败')
            }
            return Promise.resolve()
        })
    }
}

const mutations = {
    openFormDialog(state, formData) {
        state.form = Object.assign({}, formData || {})
        if (state.form.id) {
            state.form.password = ''
        }
        state.formDialogVisibale = true
    },
    closeFormDialog(state) {
        state.formDialogVisibale = false
    }
}

export default { namespaced: true, state, getters, actions, mutations }
