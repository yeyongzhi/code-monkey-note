<template>
    <div class="person_works_container">
        <div class="work_box" v-for="(item, index) in proxy.globalData.personalWorks" :key="'works' + index">
            <div class="title hover_color_text" @click="gotoPersonWorks(item)">📌 {{ item.name }}</div>
            <div class="descriptions">
                {{ item.descriptions }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { openTab } from '@/utils/index'
const { proxy }: any = getCurrentInstance()

const emits = defineEmits(['changeComponent'])

const gotoPersonWorks = (item: any) => {
    if (item.routePath) {
        // gotoPage(item.routePath)
        emits('changeComponent', item.routePath.replace("/", ""))
    } else {
        openTab(item.link)
    }
}

</script>

<style lang="scss" scoped>
.person_works_container {
    width: 100%;
    margin: var(--space-margin-md) 0;

    .work_box {
        margin-bottom: 20px;

        .title {
            width: fit-content;
            font-size: 16px;
            font-weight: bolder;
        }

        .descriptions {
            margin-top: 10px;
            padding-left: 10px;
            color: var(--text-color-3);
            letter-spacing: 2px;
        }
    }
}
</style>