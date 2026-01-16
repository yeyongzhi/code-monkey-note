<template>
    <div class="header flex-between-center">
        <div class="title">
            <div class="name">{{ proxy.globalData.name }}</div>
            <div class="tips">
                <XAnimateWord :text="proxy.globalData.description" :duration="3"/>
            </div>
            <img :src="lineSrc" style="width: 25%;height: 20px;" />
            <div class="signature">{{ proxy.globalData.signature }}</div>
            <div class="tag">
                <n-tag :type="renderTagType(index as number)" round v-for="(item, index) in userTagList"
                    :key="'tag' + index">
                    {{ item }}
                </n-tag>
            </div>
        </div>
        <img class="logo" :src="logo" />
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, computed } from 'vue';
import XAnimateWord from '@/components/XAnimateWord/index.vue'
import logo from '@/assets/images/user/logo.png'
import Line1 from '@/assets/images/line_white.png'
import Line2 from '@/assets/images/line_black.png'

const userTagList = computed(() => {
    return proxy.globalData.user_tag
})

const tagTypeList = [
    'success',
    'warning',
    'info',
    'error',
]

const renderTagType = (index: number) => {
    return tagTypeList[index % 4]
}

const { proxy }: any = getCurrentInstance()

const props = defineProps(['theme'])

const lineSrc = computed(() => {
    if (!props.theme) {
        return Line2
    }
    return Line1
})

</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    margin-bottom: 50px;

    .title {
        .name {
            font-size: 4.3rem;
            font-weight: 700;
            font-family: 'Mi-Normal';
        }

        .tips {
            font-size: 3.2rem;
            font-weight: 500;
            height: 3.2rem;
            margin-bottom: 20px;
        }

        .signature {
            font-size: 1.8rem;
            font-family: 'Mi-Bold';
        }

        .tag {
            margin-top: 20px;

            .n-tag {
                margin-right: 10px;
            }
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    .logo {
        width: 300px;
        height: 300px;
        padding: 2px;
        box-sizing: border-box;
        border-radius: 50%;

        &:hover {
            border: 2px solid var(--primary-color);
            animation: rotate 4s infinite linear;
        }
    }
}
</style>