<script setup lang="ts">
import { computed } from 'vue'
import * as Fluent from '@vicons/fluent'
const { name } = defineProps({
    name: { type: String, required: true, default: "" },
    size: { type: Number, required: true, default: 25 },
    color: { type: String, required: false, default: '' },
})
const icon = computed(() => {
    return (Fluent as any)[name]
})
</script>

<template>
    <n-icon :size="size" :color="color">
        <component :is="icon" />
    </n-icon>
</template>

<style scoped lang="scss"></style>
