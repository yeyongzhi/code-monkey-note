<template>
    <span class="x_tooltip_container flex-center-center">
        <n-tooltip trigger="hover">
            <template #trigger>
                <slot />
            </template>
            {{ props.content }}
        </n-tooltip>
    </span>
</template>

<script setup lang="ts" name="XTooltip">

interface XTooltipProps {
    content: string
}

const props = withDefaults(defineProps<XTooltipProps>(), {
    content: "",
})

</script>

<style scoped lang="scss">
.x_tooltip_container {}
</style>
