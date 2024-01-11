import { session } from '@/utils/cache'

export const state = {
    // 初始化状态
    status: false,

    // 授权令牌
    token: '',
    // 用户姓名
    username: '',
    // 权限
    permissions: [],
    // 是否超管
    isSuper: false
}

export const getters = {
    isLogin(state) {
        if (state.token || session.get('__token__')) {
            return true
        }
        return false
    },
    hasPermission:
        (state) =>
        (...v) => {
            if (state.isSuper) {
                return true
            }
            return state.permissions.filter((i) => v.indexOf(i) !== -1).length > 0
        }
}

export const actions = {
    // 初始化
    init({ state }) {
        state.token = session.get('__token__') || ''
        state.username = session.get('__username__') || ''
        state.permissions = JSON.parse(session.get('__permissions__') || '[]')
        state.isSuper = session.get('__is_super__') ? true : false

        state.status = true
    }
}

export const mutations = {
    // 设置登录信息
    setLoginInfo(state, params) {
        state.token = params.token || ''
        state.username = params.username || params.nickname || ''
        state.permissions = params.permissions || []
        state.isSuper = params.is_super || false

        session.set('__token__', state.token)
        session.set('__username__', state.username)
        session.set('__permissions__', JSON.stringify(state.permissions))
        session.set('__is_super__', state.isSuper)
    },
    // 清理登录信息
    clearLoginStatus(state) {
        state.token = ''
        state.username = ''
        state.permissions = []
        state.isSuper = false

        session.remove('__token__')
        session.remove('__username__')
        session.remove('__permissions__')
        session.remove('__is_super__')
    }
}
