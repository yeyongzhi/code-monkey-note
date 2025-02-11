<script setup lang="ts">
import { marked } from 'marked';
import { onMounted, ref } from 'vue';

const markdownContent = ref("")
const { path } = defineProps({
    path: { type: String, required: true, default: '' },
})

onMounted(async () => {
    try {
        const response = await fetch(path);
        const data = await response.text();
        markdownContent.value = await marked(data);
    } catch (err) {
        console.error('Error loading the Markdown file:', err);
    }
})

</script>

<template>
    <div class="markdown_container" v-html="markdownContent">

    </div>
</template>

<style scoped lang="scss"></style>
