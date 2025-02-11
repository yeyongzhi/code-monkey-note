<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { NavList } from '@/data/nav/index'
import NavItem from './components/navItem/index.vue'

const navContainerRef = ref<HTMLElement | null>(null)

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

onMounted(() => {
    window.addEventListener('hashchange', scrollToSection);
})

onUnmounted(() => {
    window.removeEventListener('hashchange', scrollToSection);
})

</script>

<template>
    <div class="nav_container app_container flex-between-start" ref="navContainerRef">
        <div class="left">
            <div class="nav_box" v-for="(item, index) in NavList" :key="index">
                <div class="title" :id="'nav_' + item.title">{{ item.title }}</div>
                <Divider :margin="30"/>
                <div class="content flex-start-center">
                    <div v-for="(item2, index2) in item.linkList" :key="index2">
                        <NavItem :nav="item2" />
                    </div>
                </div>
            </div>
        </div>
        <div class="nav_guide flex-column-center-start">
            <a class="title" :href="`#${item.title}`" v-for="(item, index) in NavList" :key="index">
                {{ item.title }}
            </a>
        </div>
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
        border: 1px solid #b3b3b3;
        padding: 10px;
        margin-top: 30px;
        position: fixed;
        top: 94px;
        right: 5%;

        .title {
            height: 30px;
            line-height: 30px;
            color: gray;
            cursor: pointer;
            font-size: 14px;
            text-decoration: none;

            &:hover {
                color: #000;
            }
        }
    }
}
</style>
