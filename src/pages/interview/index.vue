<script setup lang="ts">
import type { TreeOption } from 'naive-ui'
import { watch, ref, nextTick } from 'vue';
import { basePath } from '@/router/index'
import { openTab, getMarkDownContent, scrollToTop, getArticleTextCount, getMarkDownInfo } from '@/utils/index'
import { formatMarkDown } from '@/utils/markdown'
import message from '@/plugins/message'
const baseInterviewPath = basePath + '/article/interview'
import InterviewData from '@/data/interview/index.json'

const defaultSelectKey = localStorage.getItem('interviewSelectKey')

const columns = ref(4)
const selectKey = ref<Array<string | number>>(defaultSelectKey ? [defaultSelectKey] : [])
const articlePath = ref<string | null>(null)

const handleGridItemClick = (item: any) => {
    selectKey.value = [item.key]
    localStorage.setItem('interviewSelectKey', item.key)
}

const handleUpdateSelectKeys = (keys: Array<string | number>, option: Array<TreeOption | null>, meta: { node: TreeOption | null, action: 'select' | 'unselect' }) => {
    if (keys && keys.length > 0 && !meta.node?.children) {
        selectKey.value = keys
    }
}

const findPath = (tree: Array<any>, targetId: string | number) => {
    // 定义递归函数
    const traverse: any = (node: any, path: Array<any>) => {
        // 将当前节点的 id 添加到路径中
        const newPath = path.concat(node.key);

        // 如果当前节点是目标节点，返回路径
        if (node.key === targetId) {
            return newPath;
        }

        // 如果当前节点有子节点，递归遍历子节点
        if (node.children && node.children.length > 0) {
            for (const child of node.children) {
                const result = traverse(child, newPath);
                if (result) return result; // 如果找到目标节点，返回路径
            }
        }

        // 如果当前节点不是目标节点且没有子节点，返回 null
        return null;
    }
    // 遍历树的根节点
    for (const root of tree) {
        const result = traverse(root, []);
        if (result) return result; // 如果找到目标节点，返回路径
    }

    // 如果遍历完整棵树都没有找到目标节点，返回 null
    return null;
}

const getFullPath = (path: string | number) => {
    const fullPath = findPath(InterviewData, path)
    return fullPath.join("/")
}

watch(selectKey, (newVal) => {
    if (newVal && newVal.length > 0) {
        const path = getFullPath(newVal[0])
        articlePath.value = `${baseInterviewPath}/${path}.md`
    }
}, { immediate: true })

const loading = ref(false)
const article = ref<any>(null)
watch(articlePath, async (newVal) => {
    if (newVal) {
        loading.value = true
        const result = await getMarkDownContent(newVal)
        if (result) {
            message.success("文章加载成功")
            const data = formatMarkDown(result)
            console.log(data)
            article.value = data
        } else {
            message.error("未找到文章")
            article.value = null
        }
        loading.value = false
        nextTick(() => {
            scrollToTop()
        })
    }
}, { immediate: true })

const renderTitleId = (item: any) => {
    return 'markdown_nav_' + item.content.replace(/#/g, "").trim()
}

const getImageUrl = (url: string) => {
    if (!articlePath.value) {
        return ''
    }
    const basePath = articlePath.value.substring(0, articlePath.value.lastIndexOf("/"))
    return basePath + url.replace(".", "")
}

const copyCode = (content: string) => {
    navigator.clipboard.writeText(content)
        .then(() => {
            message.success("复制成功")
        })
        .catch(() => {
            message.error("复制出错，请重试")
        });
}

</script>

<template>
    <div class="app_container">
        <!-- <VuePdfEmbed :source="pdfSrc" /> -->
        <n-thing v-for="item in InterviewData" :key="item.key" class="mb-50" v-show="selectKey.length === 0">
            <template #header>
                <div class="page_hover_title">
                    {{ item.label }}
                </div>
            </template>
            <template #description>
                {{ item.description }}
            </template>
            <n-grid x-gap="20" y-gap="20" :cols="columns" class="interview_grid">
                <n-gi v-for="child in item.children" :key="child.key" class="interview_grid_item"
                    @click="handleGridItemClick(child)">
                    <div class="interview_box">
                        <div class="title flex-start-center">
                            <FluentIcon name="Code24Filled" style="margin-right: 5px;" />
                            {{ child.label }}
                        </div>
                    </div>
                </n-gi>
            </n-grid>
        </n-thing>
        <div v-show="selectKey && selectKey.length > 0" class="interview_container">
            <div class="tree">
                <div class="header">
                    <n-tooltip trigger="hover">
                        <template #trigger>
                            <FluentIcon name="Apps24Regular" @click="selectKey = []"/>
                        </template>
                        返回宫格页
                    </n-tooltip>
                </div>
                <n-scrollbar style="height: calc(100% - 40px);">
                    <n-tree block-line :selected-keys="selectKey" default-expand-all :data="InterviewData"
                        key-field="key" label-field="label" children-field="children" selectable
                        :on-update:selected-keys="handleUpdateSelectKeys" />
                </n-scrollbar>

            </div>
            <!-- 内容区 -->
            <div class="markdown_content">
                <div :class="`md_content md_${item.type} ${(item.type === 'h1' && index === 0) ? 'md_h1_fist' : ''}`"
                    v-for="(item, index) in article" :key="'md' + index">
                    <template v-if="item.type === 'h1'">
                        <h1 :id="renderTitleId(item)">{{ item.content.trim().replace(/#/g, "") }}</h1>
                    </template>
                    <template v-else-if="item.type === 'h2'">
                        <h2 :id="renderTitleId(item)">{{ item.content.trim().replace(/#/g, "") }}</h2>
                    </template>
                    <template v-else-if="item.type === 'h3'">
                        <h3 :id="renderTitleId(item)">{{ item.content.trim().replace(/#/g, "") }}</h3>
                    </template>
                    <template v-else-if="item.type === 'h4'">
                        <h4 :id="renderTitleId(item)">{{ item.content.trim().replace(/#/g, "") }}</h4>
                    </template>
                    <template v-else-if="item.type === 'h5'">
                        <h5 :id="renderTitleId(item)">{{ item.content.trim().replace(/#/g, "") }}</h5>
                    </template>
                    <template v-else-if="item.type === 'h6'">
                        <h6 :id="renderTitleId(item)">{{ item.content.trim().replace(/#/g, "") }}</h6>
                    </template>
                    <template v-else-if="item.type === 'divider'">

                    </template>
                    <template v-else-if="item.type === 'quote'">
                        <div v-for="(q, q_index) in item.content" :key="'quote' + q_index" v-html="q"></div>
                    </template>
                    <!-- 超链接 -->
                    <template v-else-if="item.type === 'link'">
                        <!-- <a :href="item.content[2]">{{ item.content[1] }}</a> -->
                        <n-tooltip trigger="hover">
                            <template #trigger>
                                <span @click="openTab(item.content[2])">
                                    <FluentIcon name="Link24Regular" style="margin-right: 5px;" />
                                    {{ item.content[1] }}
                                </span>
                            </template>
                            👇点击前往
                        </n-tooltip>
                    </template>
                    <!-- 图片 -->
                    <template v-else-if="item.type === 'img'">
                        <div class="single_img">
                            <n-image width="700" height="auto" :src="getImageUrl(item.content[2])" object-fit="contain"
                                :title="item.content[1]" />
                            <p :title="item.content[1]">{{ item.content[1] }}</p>
                        </div>
                    </template>
                    <!-- 无序列表 -->
                    <template v-else-if="item.type === 'unorderList'">
                        <div v-html="item.content"></div>
                    </template>
                    <!-- 有序列表 -->
                    <template v-else-if="item.type === 'orderList'">
                        <div class="orderList_box">
                            <span>{{ item.content[0] }}. </span>
                            <span v-html="item.content[1]"></span>
                        </div>
                    </template>
                    <!-- 待办事项 -->
                    <template v-else-if="item.type === 'todo'">
                        <p v-for="(t, t_index) in item.content" :key="'todo' + t_index">
                            <n-checkbox :checked="t.finished">
                                {{ t.label }}
                            </n-checkbox>
                        </p>
                    </template>
                    <!-- 代码片段 -->
                    <template v-else-if="item.type === 'code'">
                        <div class="code_header">
                            <span @click="copyCode(item.content.join('\n'))">📄复制代码</span>
                        </div>
                        <n-code :code="item.content.join('\n')" language="javascript" />
                    </template>
                    <template v-else-if="item.type === 'text'">
                        <div v-html="item.content"></div>
                    </template>
                    <template v-else>
                        <div>{{ item.content }}</div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.app_container {
    padding: 0 10%;
}

.interview_grid {
    margin-top: 25px;

    .interview_grid_item {
        height: 100px;

        .interview_box {
            background-color: var(--tag-color);
            padding: 10px;
            height: 100%;
            border-radius: 5px;
            border: 2px solid transparent;
            box-sizing: border-box;

            &:hover {
                border: 2px solid var(--primary-color);
                cursor: pointer;

                .title {
                    color: var(--primary-color);
                }
            }

            .title {
                font-size: 16px;
                font-weight: bolder;
                letter-spacing: 1px;
            }
        }
    }
}

.interview_container {
    width: calc(100% - 280px);
    margin-left: 280px;

    .tree {
        position: fixed;
        width: 200px;
        height: 60%;
        top: 100px;
        left: 15%;
        background-color: var(--tag-color);
        overflow: hidden;
        padding: 10px;
        border-radius: 5px;
        box-sizing: border-box;

        .header {
            height: 30px;
            line-height: 30px;
            margin-bottom: 10px;
        }
    }
}
</style>
