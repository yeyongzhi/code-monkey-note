<script setup lang="ts">
// import { marked } from 'marked';
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { formatMarkDown } from '@/utils/markdown'
import message from '@/plugins/message'
import { openTab, getMarkDownContent, scrollToTop, getArticleTextCount, getMarkDownInfo } from '@/utils/index'
import { BookInformation24Regular, Timer24Regular, Link24Regular } from '@vicons/fluent'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 扩展插件
dayjs.extend(utc);
dayjs.extend(timezone);

const markdownContent = ref<any>(null)
const markdownInfo = ref<any>(null) // 文章信息
const { path } = defineProps({
    path: { type: String, required: true, default: '' },
})

const copyCode = (content: string) => {
    navigator.clipboard.writeText(content)
        .then(() => {
            message.success("复制成功")
        })
        .catch(() => {
            message.error("复制出错，请重试")
        });
}

const findTitleRange = (list: Array<any>, level: number, originResult: Array<any> = []) => {
    let result: any[] = originResult
    for (let i = 0; i < list.length; i++) {
        if ((list[i].type.startsWith("h") && (Number(list[i].type.replace("h", "")) === level))) {
            if (level === 1) {
                result.push({
                    ...list[i],
                    index: i,
                    name: list[i].content.replace(/#/g, "").trim(),
                    key: `md_nav_${i}`
                })
            } else {
                const findLastIndex = (list2: any) => {
                    let parentTitleIndex = list2.findIndex((r: any) => {
                        return r.index > i
                    })
                    if (parentTitleIndex === -1) {
                        parentTitleIndex = list2.length - 1
                    } else {
                        parentTitleIndex = parentTitleIndex - 1
                    }
                    return parentTitleIndex
                }
                let targetIndex = findLastIndex(result)
                let target = result[targetIndex]
                if (level >= 3) {
                    for (let j = 2; j < level; j++) {
                        targetIndex = findLastIndex(target.children)
                        target = target.children[targetIndex]
                        if (j === level - 1) {
                            if (!target.children) {
                                target.children = []
                            }
                            target.children.push({
                                ...list[i],
                                index: i,
                                // children: [],
                                name: list[i].content.replace(/#/g, "").trim(),
                                key: `md_nav_${i}`
                            })
                        }
                    }
                } else {
                    if (!target.children) {
                        target.children = []
                    }
                    target.children.push({
                        ...list[i],
                        index: i,
                        // children: [],
                        name: list[i].content.replace(/#/g, "").trim(),
                        key: `md_nav_${i}`
                    })
                }
            }
        }
    }
    return result
}

const markdown_nav = computed(() => {
    if (!markdownContent.value) {
        return []
    }
    let list: any = []
    list = findTitleRange(markdownContent.value, 1)
    list = findTitleRange(markdownContent.value, 2, list)
    list = findTitleRange(markdownContent.value, 3, list)
    list = findTitleRange(markdownContent.value, 4, list)
    list = findTitleRange(markdownContent.value, 5, list)
    list = findTitleRange(markdownContent.value, 6, list)
    // console.log("文章目录生成如下：")
    // console.log(list)
    return list
})

const selectTitleLevel = ref("")
const handleNavClick = ({ option }: { option: any }) => {
    selectTitleLevel.value = option.type
    location.hash = `#${option.name}`
}

watch(() => path, async (newVal) => {
    console.log("新的文章路径：", newVal)
    if (newVal) {
        const result = await getMarkDownContent(newVal)
        // console.log("文章内容：")
        // console.log(result)
        const info = await getMarkDownInfo(newVal)
        if (info) {
            const localTime = dayjs(info).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
            markdownInfo.value = {
                lastModified: localTime
            }
        }
        if (result) {
            message.success("文章加载成功")
            const data = formatMarkDown(result)
            markdownContent.value = data;
        } else {
            message.error("未找到文章")
            markdownContent.value = null;
        }
        scrollToTop()
    }
}, { immediate: true })

const scrollToSection = () => {
    const decodedHash = decodeURIComponent(location.hash.substring(1));
    // const elements = document.getElementsByTagName(selectTitleLevel.value)
    // console.log(elements)
    const element = document.getElementById('markdown_nav_' + decodedHash);
    if (element) {
        // 滚动到元素位置，并预留顶部间距
        window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 65 - 30, // 50为顶部间距
            behavior: 'smooth'
        });
    }
}

onMounted(() => {
    window.addEventListener('hashchange', scrollToSection);
})

onUnmounted(() => {
    window.removeEventListener('hashchange', scrollToSection);
})

const renderTitleId = (item: any) => {
    return 'markdown_nav_' + item.content.replace(/#/g, "").trim()
}

const getImageUrl = (url: string) => {
    const basePath = path.substring(0, path.lastIndexOf("/"))
    return basePath + url.replace(".", "")
}

const getEmptyDescription = computed(() => {
    if (Array.isArray(markdownContent) && markdownContent.length === 0) {
        return '暂无内容'
    }
    return `【${path}】: 找不到文章~`
})

const articelTextTotal = computed(() => {
    if (!markdownContent.value) {
        return '-'
    }
    return getArticleTextCount(markdownContent.value)
})

</script>

<template>
    <!-- 方式一：采用marked.js 直接渲染 -->
    <!-- <div class="markdown_container" v-html="markdownContent"></div> -->
    <div class="markdown_container flex-between-start">
        <div class="markdown_content" v-if="markdownContent && markdownContent.length > 0">
            <div :class="`md_content md_${item.type}`" v-for="(item, index) in markdownContent" :key="'md' + index">
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
                                <n-icon size="20" style="margin-right: 5px;">
                                    <Link24Regular />
                                </n-icon>
                                {{ item.content[1] }}
                            </span>
                        </template>
                        点击前往
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
        <n-empty class="flex-center-center" style="width: 100%;height: 500px;" :description="getEmptyDescription"
            v-else></n-empty>
        <div class="markdown_guide" v-if="markdownContent && markdown_nav && markdown_nav.length > 0">
            <n-tree block-line :default-expand-all="true" :data="markdown_nav" key-field="key" label-field="name"
                children-field="children" :selectable="false" :override-default-node-click-behavior="handleNavClick" />
        </div>
        <div class="articel_info_container flex-end-center">
            <div class="content">
                <div class="flex-start-center" style="margin-bottom: 5px;">
                    <n-tooltip trigger="hover">
                        <template #trigger>
                            <n-icon size="20" style="margin-right: 5px;">
                                <BookInformation24Regular />
                            </n-icon>
                        </template>
                        字数统计
                    </n-tooltip>
                    <div style="height: 20px;line-height: 20px;cursor: pointer;">{{ articelTextTotal }}字</div>
                </div>
                <div class="flex-start-center">
                    <n-tooltip trigger="hover">
                        <template #trigger>
                            <n-icon size="20" style="margin-right: 5px;">
                                <Timer24Regular />
                            </n-icon>
                        </template>
                        最后修改时间
                    </n-tooltip>
                    <div style="height: 20px;line-height: 20px;cursor: pointer;">{{ markdownInfo ?
                        (markdownInfo.lastModified ||
                        '-') :
                        '-' }}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.markdown_container {
    .markdown_content {
        width: 80%;
        padding-right: 350px;

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {}

        .md_content {
            width: fit-content;
            font-size: 1.07rem;
            color: var(--text-color-base);
            height: auto;
        }

        .md_h1 {
            margin: 30px 0;
        }

        .md_h2 {
            margin: 25px 0;
        }

        .md_h3 {
            margin: 20px 0;
        }

        .md_h4 {
            margin: 15px 0;
        }

        .md_h5 {
            margin: 10px 0;
        }

        .md_h6 {
            margin: 5px 0;
        }

        .md_text {
            line-height: 30px;
        }

        .md_emptyLine {
            width: 100%;
            height: 20px;
            margin: 0 !important;
        }

        .md_link {
            span {
                color: var(--primary-color);
                font-weight: bolder;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }

        .md_unorderList {
            position: relative;
            padding-left: 15px;
            line-height: 20px;

            &::before {
                content: "";
                position: absolute;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background-color: var(--primary-color);
                left: 0;
                top: 8px;
            }
        }

        .md_orderList {
            .orderList_box {
                & span {
                    font-weight: bolder;
                    font-size: 1.07rem;
                }
            }
        }

        .md_unorderList,
        .md_orderList {
            margin: 10px 0;
        }

        .md_divider {
            width: 100%;
            height: 1px !important;
            background-color: #f0f0f0;
            margin: 20px 0;
        }

        .md_quote {
            width: 100%;
            padding: 10px 10px 10px 15px;
            background-color: var(--tab-color);
            color: var(--text-color-3);
            border-radius: 5px;
            position: relative;
            line-height: 30px;

            &::before {
                content: "";
                position: absolute;
                width: 4px;
                height: 100%;
                background-color: #bfbfbf;
                left: 0;
                top: 0;
            }
        }

        .md_code {
            width: 100%;
            padding: 0 10px 10px 10px;
            background-color: var(--code-color);
            border-radius: 8px;
            border: 1px solid var(--border-color);

            .code_header {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 10px;
                line-height: 40px;
                line-height: 40px;
                border-bottom: 1px solid var(--border-color);

                span {
                    cursor: pointer;

                    &:hover {
                        color: var(--primary-color);
                    }
                }
            }
        }

        .md_img {
            .single_img {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                & p {
                    padding-bottom: 2px;
                    border-bottom: 1px solid #c4c4c4;
                    color: #c4c4c4;
                    margin-top: 20px;
                }
            }
        }
    }

    .markdown_guide {
        width: 300px;
        flex: 1;
        position: fixed;
        top: 100px;
        right: 5%;
        border-left: 1px solid var(--border-color);
        padding-left: 10px;
    }

    .articel_info_container {
        position: fixed;
        width: 250px;
        box-sizing: border-box;
        left: calc(5%);
        bottom: 10px;
        font-size: 0.85rem;
        color: var(--text-color-3);

        .content {
            padding: 5px 10px;
            border-radius: 5px;
            border: 1px solid var(--border-color);
        }
    }
}
</style>