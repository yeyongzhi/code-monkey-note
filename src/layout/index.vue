<script setup lang="ts">
import { darkTheme, type GlobalTheme } from 'naive-ui'
// import { RouterView } from 'vue-router';
import Header from './header/index.vue'
import { ref, onMounted, watch, onBeforeMount, shallowRef, ComponentOptions } from 'vue';
// import router, { gotoPage, basePath } from '@/router/index'
import { routes } from '@/router/component'
import hljs from 'highlight.js/lib/core'
import message from '@/plugins/message'
import javascript from 'highlight.js/lib/languages/javascript'
import ComponentsRouterManager from '@/utils/componentKeyManager'

hljs.registerLanguage('javascript', javascript)

const componentManager = shallowRef<ComponentsRouterManager>()

const componentKey = ref<string>("")
const componentName = ref<ComponentOptions<any>>()

onBeforeMount(() => {
    componentManager.value = new ComponentsRouterManager(routes)
    const defaultKey = localStorage.getItem("before_refresh_key")
    if(defaultKey && defaultKey !== "") {
        componentKey.value = defaultKey
        localStorage.setItem("before_refresh_key", "")
    } else {
        componentKey.value = "nav"
    }
    componentManager.value?.push(componentKey.value)
})

onMounted(() => {
    const value = localStorage.getItem("codeMonkey_datatheme")
    // 默认白天模式
    if (!value || value === "") {
        localStorage.setItem("codeMonkey_datatheme", 'light')
    }
    window.addEventListener('beforeunload', () => {
        localStorage.setItem("before_refresh_key", componentKey.value)
        // console.log(event)
        // console.log(router)
        // window.location.href = window.location.origin + basePath;
        // if(localStorage.getItem("before_refresh_path")) {
        //     localStorage.setItem("before_refresh_path", router.currentRoute.value.path)
        // }
    });
    // window.addEventListener('load', () => {
        // const path = localStorage.getItem("before_refresh_path")
        // if (path && path !== "") {
        //     localStorage.setItem("before_refresh_path", "")
        //     setTimeout(() => {
        //         console.log("刷新后重定向")
        //         gotoPage(path)
        //     }, 3000)
        // }
    // });
})

const theme = ref<GlobalTheme | null>(null)

const handleChangeTheme = (value: string) => {
    localStorage.setItem("codeMonkey_datatheme", value)
    document.body.setAttribute("data-theme", value)
    theme.value = (value === 'light' ? null : darkTheme)
}

const changeComponent = (value: string) => {
    console.log("新的组件路径" + value)
    componentKey.value = value
    window.location.hash = ""
    componentManager.value?.push(componentKey.value)
}

const goHistoryBack = () => {
    const newKey = componentManager.value?.back()
    if(newKey) {
        componentKey.value = newKey
    }
}

const goHistoryNext = () => {
    const newKey = componentManager.value?.next()
    if(newKey) {
        componentKey.value = newKey
    }
}

watch(componentKey, (newVal) => {
    if (newVal) {
        const re = routes.find((item: any) => {
            return item.path === `/${componentKey.value}`
        })
        re && (componentName.value = re.component)
    }
}, { immediate: true })

</script>

<template>
    <n-config-provider :theme="theme" :hljs="hljs">
        <n-el>
            <n-notification-provider>
                <n-message-provider>
                    <div class="main_container">
                        <div class="header">
                            <Header @changeTheme="handleChangeTheme" @changeComponent="changeComponent" @goHistoryBack="goHistoryBack" @goHistoryNext="goHistoryNext"/>
                        </div>
                        <div class="content">
                            <component :is="componentName" @changeComponent="changeComponent" />
                            <!-- <RouterView></RouterView> -->
                        </div>
                    </div>
                </n-message-provider>
            </n-notification-provider>
        </n-el>
        <n-global-style />
    </n-config-provider>
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
        background-color: var(--body-color);
        z-index: 99;
    }

    .content {
        width: 90%;
        margin: 0 auto;
        box-sizing: border-box;
        z-index: 1;
        margin-top: 65px;
    }
}
</style>
