<script setup></script>

<template>
    <el-result icon="warning" title="401" sub-title="未授权访问" v-if="$route.name == '401'"></el-result>
    <el-result icon="warning" title="404" sub-title="页面没找到" v-if="$route.name == '404'"></el-result>
</template>

<style scoped></style>
