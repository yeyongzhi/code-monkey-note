<template>
    <div class="x-border-box" :style="{ borderWidth: computedBorderWidth + 'px' }">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup> 
import { computed } from 'vue'
import { DataTypeHandle } from '@/utils/define'

const props = defineProps({
    borderWidth: {
        type: [Number, String],
        default: 2
    }
})

const computedBorderWidth = computed(() => {
    if(DataTypeHandle.isString(props.borderWidth)) {
        return props.borderWidth.replace('px', '')
    }
    return props.borderWidth
})
</script>

<style scoped lang="scss">
.x-border-box {
    border-style: solid;
    border-color: var(--border-color);
    cursor: pointer;
    border-radius: 8px;
    &:hover {
        border-style: solid;
        border-color: var(--primary-color);
    }
}
</style>