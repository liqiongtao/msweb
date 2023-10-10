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
    loading: false,
    options: [],
    permissions: []
}

const getters = {
    rules() {
        return {
            name: [
                { required: true, message: '请填写', trigger: 'blur' }
            ]
        }
    }
}

const actions = {
    getOptions({ state }) {
        post('/role/options', {}).then(res => {
            if (res.code) return
            var options = []
            for (var i of (res.data.list || [])) {
                options.push(Object.assign({}, i))
            }
            state.options = options
        })
    },
    getPageList({ state }) {
        state.loading = true
        const data = {
            ...state.search,
            page_num: state.page.num,
            page_size: state.page.size
        }
        post('/role/list', data).then(res => {
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
        var uri = formData.id ? '/role/update' : '/role/create'
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
        return post('/role/status', { id, status }).then(res => {
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
        state.formDialogVisibale = true
    },
    closeFormDialog(state) {
        state.formDialogVisibale = false
    }
}

export default { namespaced: true, state, getters, actions, mutations }
