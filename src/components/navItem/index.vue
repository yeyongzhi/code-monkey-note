<script setup lang="ts">
import XBorderBox from '@/components/XBorderBox/index.vue'
import { openTab } from '@/utils/index'

const { nav } = defineProps({
    nav: { type: Object, required: true, default: () => { } }
})

</script>

<template>
    <XBorderBox>
        <div class="navItem flex-column-center-center" @click="() => openTab(nav.url)">
            <div class="title flex-start-center">
                <template v-if="nav.textIcon">
                    <div class="texticon flex-center-center">
                        <span>{{ nav.textIcon }}</span>
                    </div>
                </template>
                <template v-else>
                    <div class="icon flex-center-center" :style="`width: ${nav.iconWidth || 40}px;`">
                        <img :src="nav.icon" :style="`width: ${nav.iconWidth + 'px' || 'auto'};`" />
                    </div>
                    <div class="name">
                        {{ nav.name }}
                    </div>
                </template>
            </div>
            <div class="description">
                <n-ellipsis :line-clamp="2">
                    {{ nav.descriptions }}
                </n-ellipsis>
            </div>

        </div>
    </XBorderBox>
</template>

<style scoped lang="scss">
.navItem {
    width: 240px;
    height: 100px;
    padding: 10px;

    .title {
        width: 100%;
        height: 40px;
        margin-bottom: 5px;

        .texticon {
            background-color: var(--tag-color);
            width: 40px;
            height: 40px;
            border-radius: 5px;
            font-size: 1.14rem;
        }

        .icon {
            background-color: var(--tag-color);
            width: 40px;
            height: 40px;
            border-radius: 5px;

            img {
                width: 30px;
                height: 30px;
            }
        }

        .single_icon {
            background-color: var(--tag-color);
            width: 200px;
            height: 40px;
            border-radius: 5px;

            img {
                width: 180px;
                height: 30px;
            }
        }

        .name {
            font-size: 1.07rem;
            font-weight: bolder;
            margin-left: 10px;
        }
    }

    .description {
        height: 55px;
        width: 100%;
        margin-top: 5px;
        color: var(--text-color-2);
    }
}
</style>
