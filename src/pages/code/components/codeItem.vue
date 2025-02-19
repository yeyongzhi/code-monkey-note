<script setup lang="ts">
import { Copy16Regular } from '@vicons/fluent'
import { useMessage } from 'naive-ui'

const message = useMessage()

const props = defineProps({
    title: { type: String, required: false, default: "" },
    code: { type: String, required: true, default: "" }
})

const copyCode = () => {
    navigator.clipboard.writeText(props.code)
        .then((res) => {
            message.success("复制成功")
        })
        .catch((err) => {
            message.error("复制出错，请重试")
        });
}

</script>

<template>
    <div class="codeItem_container">
        <!-- <div>{{ props.title }}</div>
        <pre class="code">
            <span v-html="highlightedCode"></span>
        </pre> -->
        <div class="title flex-between-center">
            {{ props.title }}
            <n-icon :size="20" style="cursor: pointer;" @click="copyCode" :component="Copy16Regular" />
        </div>
        <n-code :code="props.code" language="javascript" />
    </div>
</template>

<style scoped lang="scss">
.codeItem_container {
    background-color: var(--tag-color);
    padding: 0 10px 10px 10px;
    border-radius: 5px;

    .title {
        color: var(--primary-color);
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        border-bottom: 1px solid var(--border-color);
    }

    .code {
        height: auto;
        border: 2px solid var(--border-color);
        // padding: 10px;
        border-radius: 5px;
    }
}
</style>
