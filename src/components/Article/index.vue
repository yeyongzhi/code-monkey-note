<script setup lang="ts">
import { onMounted } from 'vue';

const { data } = defineProps({
    data: { type: Object, required: true, default: '' },
})

onMounted(() => {

})

</script>

<template>
    <div class="article_container">
        <div :class="item.type" v-for="(item, index) in data" :key="index">
            <!-- 有序列表 -->
            <template v-if="item.type === 'orderList'">
                <div class="orderList_item" v-for="(c, index) in item.content" :key="'order' + index">
                    <span class="orderList_index">{{ index + 1 }} . </span>
                    {{ c }}
                </div>
            </template>
            <!-- 无序列表 -->
            <template v-else-if="item.type === 'unorderList'">
                <div class="unorderList_item" v-for="(c, index) in item.content" :key="'unorder' + index">{{ c }}</div>
            </template>
            <!-- 单张图片 -->
            <template v-else-if="item.type === 'image'">
                <n-image :src="item.content" :style="`width: ${item.params.width ? item.params.width + 'px' : 'auto'};height: ${item.params.height ? item.params.height + 'px' : 'auto'};`" />
            </template>
            <!-- 图片列表 -->
            <template v-else-if="item.type === 'imgList'">
                <n-image-group>
                    <n-image :src="c.url" v-for="(c, index) in item.content" :key="'imgList' + index" />
                </n-image-group>
            </template>
            <!-- 轮播图 TODO -->
            <template v-else-if="item.type === 'carousel'">
                <n-image-group>
                    <n-carousel autoplay show-arrow style="width: 600px;">
                        <n-image style="width: 600px;" :src="c.url" v-for="(c, index) in item.content" :key="'carousel' + index" />
                    </n-carousel>
                </n-image-group>
            </template>
            <template v-else>
                {{ item.content }}
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.article_container {
    padding-bottom: 100px;
    font-size: 15px;
    .title {
        font-size: 30px;
        font-weight: bolder;
        margin: 40px 0;
    }

    .title1 {
        font-size: 25px;
        font-weight: bolder;
        margin: 30px 0;
    }

    .title2 {
        font-size: 22px;
        font-weight: bolder;
        margin: 20px 0;
    }

    .title2 {
        font-size: 18px;
        font-weight: bolder;
        margin-bottom: 20px;
    }

    .content {
        margin-bottom: 10px;
    }

    .unorderList {
        margin-bottom: 10px;
        padding-left: 10px;

        .unorderList_item {
            height: 30px;
            line-height: 30px;
        }
    }

    .orderList {
        margin-bottom: 10px;
        padding-left: 10px;

        .orderList_index {
            margin-right: 5px;
        }

        .orderList_item {
            height: 30px;
            line-height: 30px;
        }
    }

    .imgList {
        width: 100%;
        height: 500px;
        display: flex;
        gap: 0 40px;
    }

    .carousel {
        img {
            
        }
    }
}
</style>
