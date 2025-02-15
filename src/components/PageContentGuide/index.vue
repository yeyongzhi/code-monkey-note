<script setup lang="ts">
import NavItem from '@/components/navItem/index.vue'

const { data } = defineProps({
    data: { type: Array<any>, required: true, default: () => [] }
})

console.log(data)

</script>

<template>
    <div class="page_content flex-between-center">
        <div class="left">
            <div v-for="(item, index) in data" :key="index" style="margin-bottom: 40px;">
                <div class="page_hover_title" :id="'nav_' + item.title">{{ item.title }}</div>
                <Divider :margin="20" />
                <div class="content flex-start-center">
                    <template v-if="item.children && item.children.length > 0">
                        <div v-for="(item2, index2) in item.children" :key="index2">
                            <NavItem :nav="item2" />
                        </div>
                    </template>
                    <n-empty style="width: 100%;height: 100px;" v-else description="暂无数据"></n-empty>
                </div>
            </div>
        </div>
        <div class="right">

        </div>
    </div>
</template>

<style scoped lang="scss">
.page_content {
    width: 100%;
    .left {
        width: 80%;
        .content {
            flex-wrap: wrap;
            gap: 30px;
        }
    }
    .right {
        width: 15%;
    }
}
</style>
