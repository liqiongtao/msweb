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
    loading: false
}

const getters = {
}

const actions = {
    getPageList({ state }) {
        state.loading = true
        const data = {
            ...state.search,
            page_num: state.page.num,
            page_size: state.page.size
        }
        post('/log/list', data).then(res => {
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
    }
}

const mutations = {
}

export default { namespaced: true, state, getters, actions, mutations }
