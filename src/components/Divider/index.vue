<script setup lang="ts">
const { size, margin } = defineProps({
    size: { type: Number, required: false, default: 1 },
    margin: { type: Number, required: false, default: 20 },
})
</script>

<template>
<div class="divider" :style="`height: ${size}px;margin: ${margin}px 0;`">

</div>
</template>

<style scoped lang="scss">
.divider {
    width: 100%;
    background-color: var(--color-border);
}
</style>
