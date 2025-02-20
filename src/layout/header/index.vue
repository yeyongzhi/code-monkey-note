<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Avatar from '@/assets/images/user/logo.png'
import { HeaderLink, type HeaderLinkItem, HeaderUserLink, type HeaderUserLinkItem } from '@/data/header/index'
// import { gotoPage } from '@/router/index'

const emits = defineEmits(['changeTheme', 'changeComponent'])

const gotoLink = (link: HeaderLinkItem) => {
    if (!link.url) {
        return false;
    }
    // gotoPage(link.url)
    emits('changeComponent', link.url.replace("/", ""))
}

const gotoUserLink = (link: HeaderUserLinkItem) => {
    if (!link.url) {
        return false;
    }
    window.open(link.url)
}

const isDarkTheme = ref<Boolean>(false)

watch(isDarkTheme, (newVal) => {
    const theme = newVal ? "dark" : 'light'
    emits('changeTheme', theme)
})

onMounted(() => {
    const value = localStorage.getItem("codeMonkey_datatheme")
    if(value) {
        isDarkTheme.value = (value === 'dark')
    }
})

</script>

<template>
    <div class="header_container flex-between-center">
        <div class="user flex-start-center">
            <n-avatar round :size="40" :src="Avatar" />
            <span class="name">Aurora</span>
        </div>
        <div class="flex-center-center">
            <div class="link flex-start-center">
                <span class="link_item hover_color_text" @click="gotoLink(link)" v-for="(link, index) in HeaderLink"
                    :key="'link' + index">{{ link.name }}</span>
            </div>
            <div class="userInfo flex-center-center">
                <span class="flex-center-center" @click="gotoUserLink(link)" v-for="(link, index) in HeaderUserLink"
                    :key="'userlink' + index" :title="link.name">
                    <img :src="link.icon" />
                </span>
                <n-tooltip trigger="hover" placement="bottom">
                    <template #trigger>
                        <n-switch style="margin-left: 20px;" v-model:value="isDarkTheme"/>
                    </template>
                    {{ !isDarkTheme ? '打开黑夜模式' : '关闭黑夜模式' }}
                </n-tooltip>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header_container {
    width: 90%;
    padding: 0 5%;
    margin: 0 auto;
    height: 100%;
    border-bottom: 1px solid var(--border-color);

    .user {
        .name {
            margin-left: 10px;
            font-weight: bolder;
            font-size: var(--font-size-large);
        }
    }

    .link {
        .link_item {
            margin: 0 15px;
            cursor: pointer;
            font-size: 14px;
        }
    }

    .userInfo {
        img {
            width: 25px;
            height: 25px;
            cursor: pointer;

            &:nth-child(n + 1) {
                margin-left: 10px;
            }
        }
    }
}
</style>
