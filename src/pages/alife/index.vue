<script setup lang="ts">
import { ref } from 'vue'
import { basePath } from '@/router/index'

const baseLifePath = basePath + '/article/life'
const alifePath = ref(`${baseLifePath}/alife/alife.md`)

</script>

<template>
    <div class="container app_container">
        <Article :path="alifePath" />
    </div>
</template>

<style scoped lang="scss"></style>
