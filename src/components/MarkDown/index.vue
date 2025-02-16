<script setup lang="ts">
import { marked } from 'marked';
import { ref, watch } from 'vue';

const markdownContent = ref("")
const { path } = defineProps({
    path: { type: String, required: true, default: '' },
})
const ErrorPath = '/article/404.md'

const getArticle = async () => {
    let data = null
    try {
        const response = await fetch(path);
        const contentType = response.headers.get('Content-Type')
        if(contentType === 'text/markdown') {
            data = await response.text();
        }
    } catch (err) {
        console.error("md文件读取出错")
    }
    if(data) {
        markdownContent.value = await marked(data);
    } else {
        const errorRes = await fetch(ErrorPath);
        const errorData = await errorRes.text();
        markdownContent.value = await marked(errorData);
    }
}

watch(() => path, () => {
    getArticle()
}, { immediate: true })

</script>

<template>
    <div class="markdown_container" v-html="markdownContent">

    </div>
</template>

<style scoped lang="scss"></style>
