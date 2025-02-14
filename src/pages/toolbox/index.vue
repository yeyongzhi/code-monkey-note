<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import PageContentGuide from '@/components/PageContentGuide/index.vue'
import LifeList from '@/data/toolbox/life.json'

const tabList = ref([
    { label: '生活日常', value: 'life', data: LifeList },
    { label: '学习提效', value: 'study', data: null },
    { label: '好玩好用', value: 'play', data: null },
])
const tabKey = ref<any>('life')

watch(tabKey, (newVal) => {
    console.log(newVal)
})

const activeData: any = computed(() => {
    const result = tabList.value.find(t => {
        return t.value === tabKey.value
    })
    return result ? result.data : []
})

</script>

<template>
    <div class="app_container">
        <div class="tab_container">
            <n-tabs type="segment" animated v-model="tabKey">
                <n-tab-pane :name="item.value" :tab="item.label" v-for="(item, index) in tabList" :key="'tab' + index"></n-tab-pane>
            </n-tabs>
        </div>
        <PageContentGuide :data="activeData"/>
    </div>
</template>

<style scoped lang="scss">
.tab_container {
    width: fit-content;
    :deep(.n-tabs-tab) {
        width: 150px !important;
    }
}
</style>
