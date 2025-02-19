<script setup lang="ts">

import CodeItem from './components/codeItem.vue'
import { codeCardList } from '@/data/code/index'

</script>

<template>
    <div class="app_container code_container flex-column-center-start">
        <div class="code_box" v-for="item in codeCardList">
            <CodeItem  :code="item.content" :title="item.title"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.code_container {
    flex-wrap: wrap;
    gap: 20px;
    .code_box {
        width: 60%;
    }
}
</style>
