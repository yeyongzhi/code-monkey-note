<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import LifeData from '@/data/life/index.json'
import { basePath } from '@/router/index'
import { getMarkDownContent } from '@/utils/index'

const baseLifePath = basePath + '/article/life'

// 文章路径
const articlePath = ref<string | null>(null)
const expandedKeys = ref<Array<string | number>>([])
const selectKeys = ref<Array<string | number>>([])

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

// 读取文章内容
watch(articlePath, async (newVal) => {
    if (newVal) {
        const result = await getMarkDownContent(newVal)
        console.log(result)
    }
})

onMounted(() => {

})

</script>

<template>
    <div class="app_container life_container">
        <div class="tab_container">
            <n-tree block-line :data="LifeData" expand-on-click :selected-keys="selectKeys"
                :expanded-keys="expandedKeys" :on-update:selected-keys="handleTreeSelected"
                :on-update:expanded-keys="handleTreeExpanded" />
        </div>
        <div class="life_content_container">
			
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
    }
    .life_content_container {
		width: 100%;
		margin-left: 280px;
	}
}
</style>