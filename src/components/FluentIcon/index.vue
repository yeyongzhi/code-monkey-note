<template>
    <span class="fluent_icon_container flex-center-center" :style="{ width: size + 'px', height: size + 'px' }">
        <n-icon :size="size" :color="color">
            <component :is="icon" />
        </n-icon>
    </span>
</template>

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

<style scoped lang="scss">
.fluent_icon_container {
    cursor: pointer;
}
</style>
