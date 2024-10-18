import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { session, local } from '@/utils/cache'

export const useAuthStore = defineStore('auth', () => {
    const state = reactive({
        name: '',
        token: '',
        permissions: []
    })

    const nameKey = '__auth_name__'
    const tokenKey = '__auth_token__'
    const permissionsKey = '__auth_permissions__'

    function setAuthState(data) {
        state.name = data.name || data.username || data.nickname || ''
        local.set(nameKey, state.name)

        state.token = data.token || ''
        session.set(tokenKey, state.token)

        state.permissions = data.permissions || []
        session.set(permissionsKey, JSON.stringify(state.permissions))
    }

    function getAuthToken() {
        return state.token || session.get(tokenKey)
    }

    function getAuthName() {
        return state.name || session.get(nameKey)
    }

    function getPermissions() {
        if (state.permissions.length) return state.permissions
        const str = session.get(permissionsKey)
        if (!str) return []
        try {
            return JSON.parse(str)
        } catch (e) {
            return []
        }
    }

    function hasPermissions(permissions) {
        const userPermissions = getPermissions()
        if (!userPermissions.length) return false

        let has = true
        for (let permission of permissions) {
            has = userPermissions.includes(permission)
            if (!has) break
        }

        return has
    }

    function cleanAuthState() {
        state.token = ''
        session.remove(tokenKey)

        state.permissions = []
        session.remove(permissionsKey)
    }

    return { setAuthState, getAuthName, getAuthToken, hasPermissions, cleanAuthState }
})
