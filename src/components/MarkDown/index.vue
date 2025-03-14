<script setup lang="ts">
// import { marked } from 'marked';
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { formatMarkDown } from '@/utils/markdown'
import message from '@/plugins/message'

const markdownContent = ref<any>(null)
const { path } = defineProps({
    path: { type: String, required: true, default: '' },
})

const getArticle = async () => {
    let data = null
    try {
        const response = await fetch(path);
        const contentType = response.headers.get('Content-Type')
        console.log(contentType)
        data = await response.text()
    } catch (err) {
        console.error("md文件读取出错")
    }
    console.log(data)
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

const copyCode = (content: string) => {
    navigator.clipboard.writeText(content)
        .then(() => {
            message.success("复制成功")
        })
        .catch(() => {
            message.error("复制出错，请重试")
        });
}

let title_index: any = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
}

const markdown_nav = computed(() => {
    if (!markdownContent.value) {
        return []
    }
    let list: any = []
    markdownContent.value.forEach((m: any, i: number) => {
        // 属于标题
        if (m.type.startsWith("h")) {
            const title_num: number = Number(m.type.replace("h", ""))
            if (title_num === 1) {
                list.push({
                    name: m.content.trim().replace(/#/g, ""),
                    key: `md_nav_${i}`,
                })
            } else {
                if(!list[String(title_index[title_num - 1])].children) {
                    list[title_index[title_num - 1]].children = []
                }
                list[title_index[title_num - 1]].children.push({
                    name: m.content.trim().replace(/#/g, ""),
                    key: `md_nav_${i}`,
                })
            }
            title_index[title_num] = list.length - 1
        }
    })
    return list
})

const handleNavClick = ({ option }: { option: any }) => {
    location.hash = `#${option.name}`
}

watch(() => path, (newVal) => {
    if (newVal) {
        console.log(newVal)
        getArticle()
    }
}, { immediate: true })

const scrollToSection = () => {
    const decodedHash = decodeURIComponent(location.hash.substring(1));
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
    return 'markdown_nav_' + item.content.trim().replace(/#/g, "")
}

const getImageUrl = (url: string) => {
    const basePath = path.substring(0, path.lastIndexOf("/"))
    return basePath + url.replace(".", "")
}

</script>

<template>
    <!-- 方式一：采用marked.js 直接渲染 -->
    <!-- <div class="markdown_container" v-html="markdownContent"></div> -->
    <div class="markdown_container flex-between-start">
        <div class="markdown_content">
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
                <template v-else-if="item.type === 'link'">
                    <a :href="item.content[2]">{{ item.content[1] }}</a>
                </template>
                <template v-else-if="item.type === 'img'">
                    <div class="single_img">
                        <n-image
                            width="700"
                            height="400"
                            :src="getImageUrl(item.content[2])"
                            object-fit="contain"
                            :title="item.content[1]"
                        />
                        <p>{{ item.content[1] }}</p>
                    </div>
                </template>
                <template v-else-if="item.type === 'unorderList'">
                    <ul>
                        <li v-for="(l, l_index) in item.content" :key="'unorder' + l_index" v-html="l"></li>
                    </ul>
                </template>
                <template v-else-if="item.type === 'orderList'">
                    <ol>
                        <li v-for="(l, l_index) in item.content" :key="'order' + l_index" v-html="l"></li>
                    </ol>
                </template>
                <template v-else-if="item.type === 'todo'">
                    <p v-for="(t, t_index) in item.content" :key="'todo' + t_index">
                        <n-checkbox :checked="t.finished">
                            {{ t.label }}
                        </n-checkbox>
                    </p>
                </template>
                <template v-else-if="item.type === 'code'">
                    <div class="code_header">
                        <span @click="copyCode(item.content.join('\n'))">复制代码</span>
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
        <div class="markdown_guide">
            <n-tree block-line :default-expand-all="true" :data="markdown_nav" key-field="key" label-field="name" children-field="children" :selectable="false" :override-default-node-click-behavior="handleNavClick"/>
        </div>
    </div>

</template>

<style scoped lang="scss">
.markdown_container {
    .markdown_content {
        width: 80%;
        .md_content {
            width: fit-content;
            font-size: 14px;
            color: var(--text-color-base);
            height: auto;
            margin: 10px 0;
        }

        .md_text {
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

        .md_code {
            width: 100%;
            padding: 0 10px 10px 10px;
            background-color: #f0f0f0;

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
                    text-decoration: underline;
                    color: #c4c4c4;
                }
            }
        }
    }

    .markdown_guide {
        flex: 1;
        position: fixed;
        top: 100px;
        right: 5%;
    }
}
</style>