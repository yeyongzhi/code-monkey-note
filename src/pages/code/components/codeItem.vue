<script setup lang="ts">
import XTooltip from '@/components/XTooltip/index.vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

const props = defineProps({
    title: { type: String, required: false, default: "" },
    code: { type: String, required: true, default: "" }
})

const copyCode = () => {
    navigator.clipboard.writeText(props.code).then(() => {
        message.success("复制成功")
    }).catch(() => {
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
            <div>
                {{ props.title }}
            </div>
            <XTooltip content="复制代码">
                <FluentIcon name="Copy16Regular" size="20" @click="copyCode" />
            </XTooltip>
        </div>
        <n-code :code="props.code" language="javascript" />
    </div>
</template>

<style scoped lang="scss">
.codeItem_container {
    background-color: var(--tag-color);
    padding: 0 10px 10px 10px;
    border-radius: 8px;

    .title {
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        border-bottom: 1px solid var(--border-color);
    }

    .code {
        height: auto;
        border: 2px solid var(--border-color);
        border-radius: 8px;
    }
}
</style>
