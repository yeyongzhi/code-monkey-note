<script setup lang="ts">

import Avatar from '@/assets/images/user/logo.png'

</script>

<template>
    <div class="header_container flex-between-center">
        <div class="user flex-start-center">
            <n-avatar round :size="40" :src="Avatar" />
            <span class="name">Aurora</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header_container {
    width: 90%;
    margin: 0 auto;
    height: 100%;
    border: 1px solid #000000;
    .user {
        .name {
            margin-left: 10px;
            font-weight: bolder;
            font-size: var(--font-size-large);
        }
    }
}
</style>
