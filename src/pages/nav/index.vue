<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch } from 'vue';
import { NavList } from '@/data/nav/index'
import NavItem from './components/navItem/index.vue'
import { ErrorCircle20Regular } from '@vicons/fluent'

const navContainerRef = ref<HTMLElement | null>(null)
const searchWord = ref<string>("")
const searchVisible = ref(false)
const result = ref<any>([])

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
    if (newVal && newVal.trim() !== "") {
        if (interval) {
            clearTimeout(interval)
            interval = null
        }
        interval = setTimeout(() => {
            handleSearch()
        }, 300)
    } else {
        result.value = []
    }
})

const handleSearch = () => {
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
}

const handleKeyDown = (event: any) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'f') {
        // 阻止默认行为（可选）
        event.preventDefault();
        // 执行自定义逻辑
        console.log('Ctrl + F 被触发，执行自定义功能');
        searchVisible.value = !searchVisible.value
        if(!searchVisible.value) {
            result.value = []
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
                <div class="result">
                    <div class="box flex-between-center" v-for="(item, index) in result" :key="'result' + index">
                        <div class="left flex-start-center">
                            <img class="icon" :src="item.icon" />
                            <div class="name">{{ item.name }}</div>
                        </div>
                        <div class="right">
                            <n-tag type="success">
                                {{ item.tag }}
                            </n-tag>
                        </div>
                    </div>
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

            .title {
                font-size: 24px;
                font-weight: bolder;
                cursor: pointer;
            }

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
            font-size: var(--font-size);
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
    height: 80vh;
    margin: 0 auto;
    box-shadow: none;

    .input {
        height: 50px;
        line-height: 50px;
        margin-bottom: 20px;
        font-size: 18px;
    }

    .result {
        width: 100%;
        height: calc(100% - 70px);
        // border: 1px solid var(--border-color);
        overflow-x: hidden;
        overflow-y: auto;

        .box {
            width: calc(100% - 40px);
            padding: 10px 20px;
            background-color: var(--body-color);

            .left {
                font-size: 16px;

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
    }
}
</style>
