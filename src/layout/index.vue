<script setup lang="ts">
import { darkTheme, type GlobalTheme } from 'naive-ui'
import { RouterView } from 'vue-router';
import Header from './header/index.vue'
import { ref, onMounted } from 'vue';
import router, { gotoPage } from '@/router/index'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('javascript', javascript)

onMounted(() => {
    const value = localStorage.getItem("codeMonkey_datatheme")
    // 默认白天模式
    if (!value || value === "") {
        localStorage.setItem("codeMonkey_datatheme", 'light')
    }
    window.addEventListener('beforeunload', (event) => {
        console.log(event)
        console.log(router)
        localStorage.setItem("before_refresh_path", router.currentRoute.value.path)
    });
    window.addEventListener('load', () => {
        const path = localStorage.getItem("before_refresh_path")
        console.log(path)
        if (path && path !== "") {
            localStorage.setItem("before_refresh_path", "")
            gotoPage(path)
        }
    });
})

const theme = ref<GlobalTheme | null>(null)

const handleChangeTheme = (value: string) => {
    localStorage.setItem("codeMonkey_datatheme", value)
    document.body.setAttribute("data-theme", value)
    theme.value = (value === 'light' ? null : darkTheme)
}

</script>

<template>
    <n-config-provider :theme="theme" :hljs="hljs">
        <n-el>
            <n-notification-provider>
                <n-message-provider>
                    <div class="main_container">
                        <div class="header">
                            <Header @changeTheme="handleChangeTheme" />
                        </div>
                        <div class="content">
                            <RouterView></RouterView>
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
