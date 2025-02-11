<script setup lang="ts">

import { RouterView } from 'vue-router';
import Header from './header/index.vue'

</script>

<template>
    <div class="main_container">
        <div class="header">
            <Header />
        </div>
        <div class="content">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main_container {
    width: 100%;
    .header {
        position: fixed;
        top: 0;
        width: 100%;
        height: 64px;
        box-sizing: border-box;
        z-index: 999;
        // border-bottom: 1px solid var(--n-color);
        background-color: #FFFFFF;
    }
    .content {
        width: 90%;
        margin: 0 auto;
        box-sizing: border-box;
        z-index: 2;
        margin-top: 65px;
    }
}
</style>
