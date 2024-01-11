<!--
    权限判断：

    <check-permission value="view,manage">
        11
        <template #no-permission>
            22
        </template>
    </check-permission>
-->

<script setup>
import { computed } from 'vue'

const { getters } = useStore()

const props = defineProps(['value'])
const permissions = (props.value || '').split(',')

const hasPermission = computed(() => getters['hasPermission'])
</script>

<template>
    <slot v-if="hasPermission(...permissions)" />
    <slot v-else name="no-permission" />
</template>

<style lang="scss" scoped></style>
