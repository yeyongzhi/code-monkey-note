<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch } from 'vue';
import { NavList } from '@/data/nav/index'
import NavItem from '@/components/navItem/index.vue'
import { ErrorCircle20Regular } from '@vicons/fluent'
import { openTab } from '@/utils/index'

const navContainerRef = ref<HTMLElement | null>(null)
const searchWord = ref<string>("")
const searchVisible = ref(false)
const result = ref<any>([])
const selectItem = ref<any>(null)

const scrollToSection = () => {
    const decodedHash = decodeURIComponent(location.hash.substring(1));
    const element = document.getElementById('nav_' + decodedHash);

    if (element) {
        // 滚动到元素位置，并预留顶部间距
        window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 65 - 30, // 50为顶部间距
            behavior: 'smooth'
        });
    }
}

let interval: any = null
watch(searchWord, (newVal) => {
    console.log(newVal)
    if (newVal && newVal.trim() !== "") {
        if (interval) {
            clearTimeout(interval)
            interval = null
        }
        interval = setTimeout(() => {
            handleSearch()
        }, 300)
    } else {
        console.log("清空数据")
        result.value = []
    }
})

const handleSearch = () => {
    if (!searchWord.value || searchWord.value.length === 0) {
        return false;
    }
    let list: any = []
    NavList.forEach(item => {
        item.linkList.forEach(item2 => {
            if (item2.name.includes(searchWord.value)) {
                list.push({
                    ...item2,
                    tag: item.title
                })
            }
        })
    })
    result.value = list
    if (list.length > 0) {
        selectItem.value = list[0].name
    }
}

const handleKeyDown = (event: any) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'f') {
        // 阻止默认行为（可选）
        event.preventDefault();
        // 执行自定义逻辑
        console.log('Ctrl + F 被触发，执行自定义功能');
        searchVisible.value = !searchVisible.value
        result.value = []
        searchWord.value = ''
        return false;
    }
    if (searchVisible.value) {
        let index = result.value.findIndex((r: any) => {
            return r.name === selectItem.value
        })
        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                if(index !== 0) {
                    index = index - 1
                }
                break;
            case "ArrowDown":
                event.preventDefault();
                if(index !== result.value.length - 1) {
                    index = index + 1
                }
                break;
            case 'Enter':
                openTab(result.value[index].url)
                break;
        }
        if(event.key === "ArrowUp" || event.key === "ArrowDown") {
            selectItem.value = result.value[index].name
        }
        if(event.key === "Enter") {
            // selectItem.value = null
        }
    }
};

onMounted(() => {
    window.addEventListener('hashchange', scrollToSection);
    document.addEventListener('keydown', handleKeyDown);
})

onUnmounted(() => {
    window.removeEventListener('hashchange', scrollToSection);
    document.removeEventListener('keydown', handleKeyDown);
})

</script>

<template>
    <div class="nav_container app_container flex-between-start" ref="navContainerRef">
        <div class="left">
            <div class="nav_box" v-for="(item, index) in NavList" :key="index">
                <div class="page_hover_title" :id="'nav_' + item.title">{{ item.title }}</div>
                <Divider :margin="30" />
                <div class="content flex-start-center">
                    <div v-for="(item2, index2) in item.linkList" :key="index2">
                        <NavItem :nav="item2" />
                    </div>
                </div>
            </div>
        </div>
        <div class="nav_guide flex-column-center-start">
            <div class="flex-center-center">
                <n-icon :size="20" :component="ErrorCircle20Regular" />
                <span style="margin-left: 5px;">可通过ctrl + F 快捷键进行快速搜索</span>
            </div>
            <a class="title" :href="`#${item.title}`" v-for="(item, index) in NavList" :key="index">
                {{ item.title }}
            </a>
        </div>
        <n-modal :to="navContainerRef" v-model:show="searchVisible" title="确认">
            <div class="search_modal">
                <n-input class="input" size="large" clearable @keyup.enter="handleSearch" v-model:value="searchWord"
                    type="text" placeholder="请输入关键字搜索">
                </n-input>
                <div class="result" v-if="result && result.length > 0">
                    <template v-if="result && result.length > 0">
                        <div :class="`box flex-between-center ${item.name === selectItem ? 'select_box' : ''}`"
                            v-for="(item, index) in result" :key="'result' + index">
                            <div class="left flex-start-center">
                                <img class="icon" :src="item.icon" />
                                <div class="name">
                                    <n-highlight :text="item.name" :patterns="[searchWord]" />
                                </div>
                            </div>
                            <div class="right">
                                <n-tag type="success">
                                    {{ item.tag }}
                                </n-tag>
                            </div>
                        </div>
                    </template>
                    <!-- <n-empty class="flex-center-center" style="width: 100%;height: 100%;" description="暂无数据" v-else>
                    </n-empty> -->
                </div>
            </div>
        </n-modal>
    </div>
</template>

<style scoped lang="scss">
.nav_container {
    .left {
        width: 75%;
        overflow-y: auto;

        .nav_box {
            padding: 20px;
            border-radius: 5px;

            .content {
                flex-wrap: wrap;
                gap: 30px;
            }
        }
    }

    .nav_guide {
        width: 20%;
        padding: 10px;
        margin-top: 30px;
        position: fixed;
        top: 94px;
        right: 5%;
        color: var(--text-color-3);

        .title {
            height: 30px;
            line-height: 30px;
            color: var(--text-color-3);
            cursor: pointer;
            font-size: 1.0rem;
            text-decoration: none;

            &:hover {
                color: var(--primary-color);
                text-decoration: underline;
                text-decoration-color: var(--primary-color);
            }
        }
    }
}

.search_modal {
    width: 60%;
    height: 60vh;
    margin: 0 auto;
    box-shadow: none;
    z-index: 999;

    .input {
        height: 50px;
        line-height: 50px;
        margin-bottom: 20px;
        font-size: 1.3rem;
        background-color: var(--body-color);
    }

    .result {
        width: 100%;
        height: calc(100% - 68px);
        overflow-x: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {
            display: none;
        }
        .box {
            width: calc(100% - 44px);
            padding: 10px 20px;
            background-color: var(--body-color);
            border: 2px solid transparent;
            .left {
                font-size: 1.14rem;

                .icon {
                    width: 40px;
                    height: 40px;
                }

                .name {
                    font-weight: bolder;
                    margin-left: 20px;
                }

                .tag {}
            }
        }

        .select_box {
            border: 2px solid var(--primary-color);
        }
    }
}
</style>
