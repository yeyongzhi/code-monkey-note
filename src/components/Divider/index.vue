<script setup lang="ts">
const { width, size, margin } = defineProps({
    width: { type: Number, required: false, default: 100 },
    size: { type: Number, required: false, default: 1 },
    margin: { type: Number, required: false, default: 20 },
})
</script>

<template>
<div class="divider" :style="`width: ${width}%;padding: 0 ${(100 - width) / 2}%;height: ${size}px;margin: ${margin}px auto;`">
    
</div>
</template>

<style scoped lang="scss">
.divider {
    box-sizing: border-box;
    background-color: var(--border-color);
}
</style>
