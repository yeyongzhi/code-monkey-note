<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LifeData from '@/data/life/index.json'
import { basePath } from '@/router/index'

const baseLifePath = basePath + '/article/life'

const DEFAULT_ARTICLE_KEY = "joker_xue"

const expandedKeys = ref<Array<string | number>>([])
const selectKeys = ref<Array<string | number>>([])
const articlePath = ref<string | null>(null) // 文章路径

const findPath = (tree: Array<any>, targetId: string) => {
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

const getFullPath = (path: string) => {
    const fullPath = findPath(LifeData, path)
    return fullPath.join("/")
}

const handleTreeSelected = (keys: any, _: any, meta: any) => {
    if(!(keys.length > 0)) {
        return false;
    }
    const path = keys[0]
    if (!meta.node.children || meta.node.children.length === 0) {
        const fullPath = getFullPath(path)
        articlePath.value = `${baseLifePath}/${fullPath}.md`
        selectKeys.value = keys
    }
}

const handleTreeExpanded = (keys: any) => {
    expandedKeys.value = keys
}

onMounted(() => {
    if (DEFAULT_ARTICLE_KEY) {
		const path = getFullPath(DEFAULT_ARTICLE_KEY)
		if (path) {
			const pathList = path.split("/")
			pathList.pop()
			expandedKeys.value = pathList
			articlePath.value = `${baseLifePath}/${path}.md`
			selectKeys.value = [DEFAULT_ARTICLE_KEY]
		}
	}
})

</script>

<template>
    <div class="app_container life_container">
        <div class="tab_container">
            <n-tree default-expand-all block-line :data="LifeData" expand-on-click :selected-keys="selectKeys" :on-update:selected-keys="handleTreeSelected" />
        </div>
        <div class="life_content_container">
			<Article v-if="articlePath && articlePath.length > 0" :path="articlePath" />
		</div>
    </div>
</template>

<style scoped lang="scss">
.life_container {
    .tab_container {
        width: 250px;
        position: fixed;
        top: 100px;
        left: 5%;
        border: 2px solid var(--border-color);
        padding: 5px;
        box-sizing: border-box;
        border-radius: 5px;
        font-weight: bolder;
        :deep(.n-tree-node--selected) {
            .n-tree-node-content {
                color: var(--primary-color) !important;
            }
            
        }
    }
    .life_content_container {
		width: calc(100% - 300px);
		margin-left: 300px;
        box-sizing: border-box;
        // border: 2px solid var(--border-color);
        // padding: 10px;
	}
}
</style>