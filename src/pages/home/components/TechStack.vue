<template>
    <div style="margin: 20px 0;">
        <div class="flex-start-center" style="margin-bottom: 20px;"
            v-for="(item, index) in proxy.globalData.personalTechnology" :key="'technology' + index">
            <span style="margin-right: 10px;font-size: 1.1rem;width: 120px;font-weight: bolder;letter-spacing: 2px;">{{
                item.name }} </span>
            <n-tag :type="tagTypeList[Math.floor(Math.random() * 4)]" round
                :style="`margin-left: ${index2 === 0 ? '0' : '10px'};padding: 10px 15px;cursor: pointer;`"
                v-for="(item2, index2) in item.list" :key="'technology_item' + index2">
                {{ item2 }}
            </n-tag>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const tagTypeList = [
    'success',
    'warning',
    'info',
    'error'
]

// const tagColorList = [
//     '#d71345',
//     '#f47920',
//     '#ffd400',
//     '#1d953f',
//     '#4e72b8',
//     '#00ae9d',
//     '#8552a1'
// ]

// const gerRandomTagColor = () => {
//     const color = tagColorList[Math.floor(Math.random() * tagColorList.length)]
//     return {
//         color: color + '33',
//         textColor: 'var(--base-color)',
//         borderColor: color
//     }
// }

const { proxy }: any = getCurrentInstance()

</script>

<style lang="scss" scoped></style>