<script setup lang="ts">

const props = defineProps({
    data: { type: Array<any>, required: true, default: () => [] }
})

console.log(props)

</script>

<template>
    <div class="page_content">
        <div class="left">
            <div v-for="(item, index) in data" :key="index">
                <div class="page_hover_title" :id="'nav_' + item.title">{{ item.title }}</div>
                <Divider :margin="30" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
