<script setup lang="ts">
import NavItem from '@/components/navItem/index.vue'
import { onMounted, ref, onUnmounted, watch } from 'vue';

const { data } = defineProps({
    data: { type: Array<any>, required: true, default: () => [] },
    withGuide: { type: Boolean, required: false, default: true }
})

const leftRef = ref(null)

const goBacktoTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

watch(() => data, () => {
    goBacktoTop()
})

const scrollToSection = () => {
    const decodedHash = decodeURIComponent(location.hash.substring(1));
    const element = document.getElementById('page_nav_' + decodedHash);

    if (element) {
        // 滚动到元素位置，并预留顶部间距
        window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 65 - 30, // 50为顶部间距
            behavior: 'smooth'
        });
    }
}

onMounted(() => {
    goBacktoTop()
    window.addEventListener('hashchange', scrollToSection);
})

onUnmounted(() => {
    window.removeEventListener('hashchange', scrollToSection);
})

</script>

<template>
    <div class="page_content flex-between-center">
        <div class="left" ref="leftRef">
            <div v-for="(item, index) in data" :key="index" style="margin-bottom: 50px;">
                <div class="page_hover_title" :id="'page_nav_' + item.title">{{ item.title }}</div>
                <Divider :margin="20" />
                <div class="content flex-start-center">
                    <template v-if="item.children && item.children.length > 0">
                        <div v-for="(item2, index2) in item.children" :key="index2">
                            <NavItem :nav="item2" />
                        </div>
                    </template>
                    <n-empty style="width: 200px;height: auto;" v-else description="暂时啥也没有"></n-empty>
                </div>
            </div>
        </div>
        <div v-if="withGuide" class="right flex-column-start-start">
            <a :href="`#${item.title}`" class="guide_item" v-for="(item, index) in data" :key="'guide_' + index">
                {{ item.title }}
            </a>
        </div>
        <div class="backTop">
            <n-button type="primary" @click="goBacktoTop">
                回到顶部
            </n-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.page_content {
    width: 100%;
    .left {
        width: 80%;

        .content {
            flex-wrap: wrap;
            gap: 30px;
        }
    }

    .right {
        width: 15%;
        height: 500px;
        position: fixed;
        right: 5%;
        top: 150px;
        padding: 10px;
        .guide_item {
            color: var(--text-color-3);
            text-decoration: none;
            height: 25px;
            line-height: 25px;
            &:hover {
                color: var(--primary-color);
                cursor: pointer;
            }
        }
    }

    .backTop {
        position: fixed;
        bottom: 50px;
        right: 50px;
        z-index: 99;
    }
}
</style>
