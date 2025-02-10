<script setup lang="ts">
import { ref } from 'vue';
import { NavList } from '@/data/nav/index'
import NavItem from './components/navItem/index.vue'

console.log(NavList)
</script>

<template>
    <div class="nav_container">
        <div class="nav_box" v-for="(item, index) in NavList" :key="index">
            <div class="title">{{ item.title }}</div>
            <div class="content flex-start-center">
                <div v-for="(item2, index2) in item.linkList" :key="index2">
                    <NavItem :nav="item2"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.nav_container {
    padding-top: 65px;
    .nav_box {
        padding: 20px;
        border-radius: 5px;
        border: 1px solid #b3b3b3;
        margin-top: 30px;
        .title {
            font-size: 20px;
            font-weight: bolder;
            cursor: pointer;
            margin-bottom: 10px;
        }
        .content {
            flex-wrap: wrap;
            gap: 40px;
        }
    }
}
</style>
