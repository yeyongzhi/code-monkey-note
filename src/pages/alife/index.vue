<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AlifeArticle } from '@/data/article/alife'

onMounted(async () => {
    
})
</script>

<template>
    <div class="container app_container">
        <Article :data="AlifeArticle" />
    </div>
</template>

<style scoped lang="scss"></style>
