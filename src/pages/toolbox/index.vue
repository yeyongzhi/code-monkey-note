<script setup lang="ts">
import { computed, ref } from 'vue'
import PageContentGuide from '@/components/PageContentGuide/index.vue'
import LifeList from '@/data/toolbox/life.json'
import StudyList from '@/data/toolbox/study.json'
import PlayList from '@/data/toolbox/play.json'

const tabList = ref([
    { label: '生活日常', value: 'life', data: LifeList },
    { label: '学习提效', value: 'study', data: StudyList },
    { label: '好玩好用', value: 'play', data: PlayList }
])
const tabKey = ref<string>('life')

const activeData: any = computed(() => {
    const result = tabList.value.find(t => {
        return t.value === tabKey.value
    })
    return result ? (result.data || []) : []
})

</script>

<template>
    <div class="app_container toolbox_container flex-between-start">
        <div class="tab_container">
            <n-tabs animated v-model:value="tabKey" type="line" :placement="'left'">
                <n-tab :name="item.value" v-for="(item, index) in tabList"
                :key="'tab' + index">
                    {{ item.label }}
                </n-tab>
            </n-tabs>
        </div>
        <div class="toolbox_content_container">
            <PageContentGuide :data="activeData" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.toolbox_container {
    .tab_container {
        width: 150px;
        position: fixed;
        top: 100px;
        left: 5%;
    }
    .toolbox_content_container {
        width: 100%;
        margin-left: 150px;
    }
}
</style>
