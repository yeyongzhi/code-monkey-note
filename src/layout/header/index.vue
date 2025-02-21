<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Avatar from '@/assets/images/user/logo.png'
import { HeaderLink, type HeaderLinkItem, HeaderUserLink, type HeaderUserLinkItem } from '@/data/header/index'
import { ArrowLeft16Filled, ArrowRight16Filled } from '@vicons/fluent'
// import { gotoPage } from '@/router/index'

const emits = defineEmits(['changeTheme', 'changeComponent', 'goHistoryBack', 'goHistoryNext'])

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

const gotoHistroy = (key: number) => {
    if(key === 1) {
        emits('goHistoryBack')
    } else {
        emits('goHistoryNext')
    }
}

onMounted(() => {
    const value = localStorage.getItem("codeMonkey_datatheme")
    if (value) {
        isDarkTheme.value = (value === 'dark')
    }
})

</script>

<template>
    <div class="header_container flex-between-center">
        <!-- 左侧头像 -->
        <div class="user flex-start-center">
            <n-avatar round :size="40" :src="Avatar" />
            <span class="name">Aurora</span>
            <div style="margin-left: 20px;">
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-button quaternary circle type="primary" @click="gotoHistroy(1)">
                            <template #icon>
                                <n-icon :size="25">
                                    <ArrowLeft16Filled />
                                </n-icon>
                            </template>
                        </n-button>
                    </template>
                    后退
                </n-tooltip>
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-button quaternary circle type="primary" style="margin-left: 5px;" @click="gotoHistroy(2)">
                            <template #icon>
                                <n-icon :size="25">
                                    <ArrowRight16Filled />
                                </n-icon>
                            </template>
                        </n-button>
                    </template>
                    前进
                </n-tooltip>
            </div>
        </div>
        <!-- 右侧菜单 -->
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
                        <n-switch style="margin:0 20px;" v-model:value="isDarkTheme" />
                    </template>
                    {{ !isDarkTheme ? '打开黑夜模式' : '关闭黑夜模式' }}
                </n-tooltip>
                <!-- <n-tooltip trigger="hover" placement="bottom">
                    <template #trigger>
                        <n-button circle type="primary" size="small">
                            <template #icon>
                                <n-icon><ArrowClockwise20Filled /></n-icon>
                            </template>
                        </n-button>
                    </template>
                    刷新页面
                </n-tooltip> -->
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
