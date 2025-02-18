<script setup lang="ts">
// import { marked } from 'marked';
import { ref, watch } from 'vue';
import { formatMarkDown } from '@/utils/markdown'

const markdownContent = ref<any>(null)
const { path } = defineProps({
    path: { type: String, required: true, default: '' },
})
// const ErrorPath = '/article/404.md'

const getArticle = async () => {
    let data = null
    try {
        const response = await fetch(path);
        const contentType = response.headers.get('Content-Type')
        if (contentType === 'text/markdown') {
            data = await response.text();
        }
    } catch (err) {
        console.error("md文件读取出错")
    }
    if (data) {
        // markdownContent.value = await marked(data);
        const result = formatMarkDown(data)
        console.log("md文件读取结果：")
        console.log(result)
        markdownContent.value = result;
    } else {
        // const errorRes = await fetch(ErrorPath);
        // const errorData = await errorRes.text();
        // markdownContent.value = await marked(errorData);
    }
}

watch(() => path, () => {
    getArticle()
}, { immediate: true })

</script>

<template>
    <!-- 方式一：采用marked.js 直接渲染 -->
    <!-- <div class="markdown_container" v-html="markdownContent"></div> -->
    <div class="markdown_container">
        <div :class="`md_content md_${item.type}`" v-for="(item, index) in markdownContent" :key="'md' + index">
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
            <template v-else-if="item.type === 'divider'">

            </template>
            <template v-else-if="item.type === 'quote'">
                <div v-for="(q, q_index) in item.content" :key="'quote' + q_index">{{ q.trim().replace(/>/g, "") }}
                </div>
            </template>
            <template v-else-if="item.type === 'link'">
                <a :href="item.content[2]">{{ item.content[1] }}</a>
            </template>
            <template v-else-if="item.type === 'unorderList'">
                <ul>
                    <li v-for="(l, l_index) in item.content" :key="'unorder' + l_index">{{ l.replace(/-/g, "") }}</li>
                </ul>
            </template>
            <template v-else-if="item.type === 'todo'">
                <p v-for="(t, t_index) in item.content" :key="'todo' + t_index">
                    <n-checkbox :checked="t.finished">
                        {{ t.label }}
                    </n-checkbox>
                </p>
            </template>
            <template v-else-if="item.type === 'text'">
                <div v-html="item.content"></div>
            </template>
            <template v-else>
                <div>{{ item.content }}</div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.markdown_container {
    .md_content {
        width: fit-content;
        font-size: 14px;
        color: var(--text-color-base);
        height: auto;
    }

    .md_text {
        height: 20px;
        line-height: 20px;
    }

    .md_emptyLine {
        width: 100%;
        height: 20px;
        line-height: 20px;
    }

    .md_divider {
        width: 100%;
        height: 1px !important;
        background-color: #f0f0f0;
        margin: 20px 0;
    }

    .md_quote {
        width: 100%;
        padding: 10px;
        background-color: #f0f0f0;
        color: var(--text-color-3);
        border-radius: 5px;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            width: 2px;
            height: 100%;
            background-color: #bfbfbf;
            left: 0;
            top: 0;
        }
    }
}
</style>