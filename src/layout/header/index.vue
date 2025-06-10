<script setup lang="ts">
import { onMounted, ref, watch, getCurrentInstance } from 'vue';
import Avatar from '@/assets/images/user/logo.png'
import { HeaderLink, type HeaderLinkItem, HeaderUserLink, type HeaderUserLinkItem } from '@/data/header/index'
import { ArrowLeft16Filled, ArrowRight16Filled, ArrowClockwise16Filled, Settings24Regular, Clock24Regular } from '@vicons/fluent'
import { useTime } from '@/hooks/useTime';

const systemTime = useTime()

const { proxy }: any = getCurrentInstance()

const { componentKey, primaryColor } = defineProps({
    componentKey: {
        type: String,
    },
    primaryColor: {
        type: String,
    }
})

const emits = defineEmits(['changeTheme', 'changeComponent', 'goHistoryBack', 'goHistoryNext', 'upodate-primaryColor'])

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
    if (key === 1) {
        emits('goHistoryBack')
    } else {
        emits('goHistoryNext')
    }
}

const refresh = () => {
    window.location.reload()
}

const settingVisible = ref<Boolean>(false)
const handleSettingColorChanged = (value: string) => {
    emits('upodate-primaryColor', value)
}

// 全局设置
const htmlFontSize = ref<number>(14)
watch(htmlFontSize, (newVal) => {
    document.documentElement.style.fontSize = `${newVal}px`;
    localStorage.setItem("codeMonkey_fontsize", newVal.toString())
})

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
            <span class="name">{{ proxy.globalData.name }}</span>
            <div style="margin-left: 20px;">
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-button quaternary circle type="primary" @click="refresh">
                            <template #icon>
                                <n-icon :size="25">
                                    <ArrowClockwise16Filled />
                                </n-icon>
                            </template>
                        </n-button>
                    </template>
                    刷新
                </n-tooltip>
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-button quaternary circle type="primary" style="margin-left: 10px;" @click="gotoHistroy(1)">
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
                        <n-button quaternary circle type="primary" style="margin-left: 10px;" @click="gotoHistroy(2)">
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
                <span :class="`link_item hover_color_text ${componentKey === link.key ? 'link_item_selected' : ''}`"
                    @click="gotoLink(link)" v-for="(link, index) in HeaderLink" :key="'link' + index">
                    <span v-if="componentKey === link.key">📌</span>
                    {{ link.name }}
                </span>
            </div>
            <div class="userInfo flex-center-center">
                <span class="flex-center-center" @click="gotoUserLink(link)" v-for="(link, index) in HeaderUserLink"
                    :key="'userlink' + index" :title="link.name">
                    <img :src="link.icon" />
                </span>
                <n-tooltip trigger="hover" placement="bottom">
                    <template #trigger>
                        <n-switch class="mr-10 ml-10" v-model:value="isDarkTheme" />
                    </template>
                    {{ !isDarkTheme ? '打开黑夜模式' : '关闭黑夜模式' }}
                </n-tooltip>
                <n-tooltip trigger="hover" placement="bottom">
                    <template #trigger>
                        <n-button class="mr-10" quaternary circle type="primary" @click="settingVisible = !settingVisible">
                            <template #icon>
                                <n-icon :size="25">
                                    <Settings24Regular />
                                </n-icon>
                            </template>
                        </n-button>
                    </template>
                    设置
                </n-tooltip>
                <n-popover trigger="hover">
                    <template #trigger>
                        <n-button quaternary circle type="primary">
                            <template #icon>
                                <n-icon :size="25">
                                    <Clock24Regular />
                                </n-icon>
                            </template>
                        </n-button>
                    </template>
                    <p>🕗{{ systemTime.timestmp.value }}</p>
                    <p>📅{{ systemTime.week.value }}</p>
                </n-popover>
            </div>
        </div>
        <n-drawer v-model:show="settingVisible" :width="400" placement="right">
            <n-drawer-content title="设置" body-content-class="setting_drawer_content">
                <div class="box">
                    <div class="title">颜色设置</div>
                    <n-color-picker :default-value="primaryColor" :show-alpha="false" :modes="['hex', 'rgb']"
                        :on-update:value="handleSettingColorChanged" :swatches="[
                            '#18a058',
                            '#e03131',
                            '#f76707',
                            '#f59f00',
                            '#37b24d',
                            '#1098ad',
                            '#1c7ed6',
                            '#ae3ec9',
                        ]" />
                </div>
                <div class="box">
                    <div class="title">字体大小</div>
                    <n-input-number v-model:value="htmlFontSize">
                        <template #suffix>
                            px
                        </template>
                    </n-input-number>
                </div>
            </n-drawer-content>
        </n-drawer>
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
            font-size: 15px;
            padding: 5px 0;
        }

        .link_item_selected {
            color: var(--primary-color);
            font-weight: bolder;
            border-bottom: 2px solid var(--primary-color);
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

.setting_drawer_content {
    .box {
        margin-bottom: 10px;

        .title {
            font-size: 1.0rem;
            font-weight: bolder;
            margin-bottom: 10px;
        }
    }
}
</style>
