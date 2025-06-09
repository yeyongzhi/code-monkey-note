<script setup lang="ts">
import { watch, ref } from 'vue';
import { getMarkDownContent, openTab } from '@/utils/index'
import { formatMarkDown } from '@/utils/customMarkdown'
import { Link24Filled } from '@vicons/fluent'


const { path } = defineProps({
    path: { type: String, required: true, default: '' },
})
const data = ref<any>(null)

watch(() => path, async (newVal) => {
    if (newVal) {
        const result = await getMarkDownContent(newVal) // 获取markdown文档内容
        if (result) {
            const content = formatMarkDown(result) // 识别格式化内容（自定义）
            console.log(content)
            data.value = content
        } else {
            data.value = null
        }
    }
}, { immediate: true })

const getImageUrl = (url: string) => {
    const basePath = path.substring(0, path.lastIndexOf("/"))
    return basePath + url.replace(".", "")
}

</script>

<template>
    <div class="article_container">
        <div :class="item.type" v-for="(item, index) in data" :key="index">
            <template v-if="item.type === 'h1'">
                <h1>{{ item.content.trim().replace(/#/g, "") }}</h1>
            </template>
            <template v-else-if="item.type === 'h2'">
                <h2>{{ item.content.trim().replace(/#/g, "") }}</h2>
            </template>
            <template v-else-if="item.type === 'h3'">
                <h3>{{ item.content.trim().replace(/#/g, "") }}</h3>
            </template>
            <template v-else-if="item.type === 'h4'">
                <h4>{{ item.content.trim().replace(/#/g, "") }}</h4>
            </template>
            <template v-else-if="item.type === 'h5'">
                <h5>{{ item.content.trim().replace(/#/g, "") }}</h5>
            </template>
            <template v-else-if="item.type === 'h6'">
                <h6>{{ item.content.trim().replace(/#/g, "") }}</h6>
            </template>
            <!-- 空行 -->
            <template v-else-if="item.type === 'emptyLine'">

            </template>
            <!-- 链接 -->
            <template v-else-if="item.type === 'link'">
                <span @click="openTab(item.content[2])" :title="item.content[1]" class="flex-start-center">
                    <n-icon :size="20" style="cursor: pointer;margin-right: 10px;" :component="Link24Filled" />
                    {{ item.content[1] }}
                </span>
            </template>
            <!-- 有序列表 -->
            <template v-else-if="item.type === 'orderList'">
                <div class="orderList_item" v-for="(c, index) in item.content" :key="'order' + index">
                    <span class="orderList_index">{{ index + 1 }} . </span>
                    {{ c }}
                </div>
            </template>
            <!-- 无序列表 -->
            <template v-else-if="item.type === 'unorderList'">
                <div class="unorderList_item" :key="'unorder' + index">{{ item.content }}</div>
            </template>
            <!-- 单张图片 -->
            <template v-else-if="item.type === 'img'">
                <n-image class="img_image" :src="getImageUrl(item.content[2])" />
            </template>
            <!-- 图片列表 -->
            <template v-else-if="item.type === 'imgList'">
                <n-image-group>
                    <n-grid x-gap="20" y-gap="20" :cols="3">
                        <n-gi class="imgList_grid_item flex-center-center" v-for="(c, index) in item.content"
                            :key="'imgList_item' + index">
                            <n-image class="imgList_item" :src="getImageUrl(c.url)" />
                        </n-gi>
                    </n-grid>
                </n-image-group>
            </template>
            <template v-else>
                <span v-html="item.content"></span>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.article_container {
    padding-bottom: 100px;
    font-size: 1.07rem;

    .link {
        span {
            width: fit-content;
            color: var(--primary-color);
            cursor: pointer;
            border-bottom: 1px solid transparent;
            &:hover {
                border-bottom: 1px solid var(--primary-color);
            }
        }
    }

    .emptyLine {
        height: 30px;
        line-height: 30px;
    }

    .imgList {
        width: 1240px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .imgList_grid_item {
            border-radius: 5px;
            border: 2px solid var(--border-color);
            padding: 10px;
            box-sizing: border-box;

            &:hover {
                border: 2px solid var(--primary-color);
            }
        }

        .imgList_item {
            height: 500px;
            max-width: 380px;
        }
    }

    .img {
        .img_image {
            height: 500px;
            max-width: 380px;
        }
    }

    .unorderList {
        .unorderList_item {
            position: relative;
            padding-left: 20px;
            &::before {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 2px;
                content: '';
                background-color: var(--primary-color);
                width: 5px;
                height: 5px;
                border-radius: 50%;
            }
        }
    }
}
</style>
