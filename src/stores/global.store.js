import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { debug } from '@/utils/log'
import { session, local } from '@/utils/cache'

export const useGlobalStore = defineStore('global', () => {
    const state = reactive({
        loaded: false
    })

    function init() {
        state.loaded = true
        debug('global.init')
    }

    function isLoaded() {
        return state.loaded
    }

    return { init, isLoaded }
})
