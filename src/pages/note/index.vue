<script setup lang="ts">
import { onMounted, ref, computed, onBeforeMount, isRef } from 'vue'
import NoteData from '@/data/note/index.json'
import { basePath } from '@/router/index'
import { Bookmark24Regular } from '@vicons/fluent'

const baseNotePath = basePath + '/article/note'

const articlePath = ref<string | null>(null)
const expandedKeys = ref<Array<string | number>>([])
const selectKeys = ref<Array<string | number>>([])
const defaultArticleKey = ref(null) // 默认打开的文章

const count = ref(0)
console.log(isRef(count))

console.log(count)

// 查找文章路径
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
	const fullPath = findPath(NoteData, path)
	console.log(fullPath)
	return fullPath.join("/")
}

// 处理Note的选中事件
const handleTreeSelected = (keys: any, _: any, meta: any) => {
	if (keys.length === 0) return
	const path = keys[0]
	if (!meta.node.children || meta.node.children.length === 0) {
		const fullPath = getFullPath(path)
		articlePath.value = `${baseNotePath}/${fullPath}.md`
		selectKeys.value = keys
	}
}

// 处理Note的展开事件
const handleTreeExpanded = (keys: any) => {
	expandedKeys.value = keys
}

const articleTotalNum = computed(() => {
	const getTotal = (tree: Array<any>) => {
		let total = 0
		tree.forEach((item) => {
			if (item.children && item.children.length > 0) {
				total += getTotal(item.children)
			}
			if (!item.children) {
				total++
			}
		})
		return total
	}
	return getTotal(NoteData)
})

const findDefaultArticle = (tree: Array<any>) => {
	tree.forEach((item) => {
		if (item.children && item.children.length > 0) {
			findDefaultArticle(item.children)
		} else {
			if (item.default) {
				defaultArticleKey.value = item.key
			}
		}
	})
}

onBeforeMount(() => {
	// 默认文章
	findDefaultArticle(NoteData)
})

onMounted(() => {
	if (defaultArticleKey.value) {
		const path = getFullPath(defaultArticleKey.value)
		if (path) {
			const pathList = path.split("/")
			pathList.pop()
			expandedKeys.value = pathList
			articlePath.value = `${baseNotePath}/${path}.md`
			selectKeys.value = [defaultArticleKey.value]
		}
	}
})

</script>

<template>
	<div class="app_container note_container flex-between-start">
		<div class="tab_container">
			<div class="flex-start-center header">
				<span>学无止境</span>
				<n-tooltip trigger="hover">
					<template #trigger>
						<n-icon :size="20" style="cursor: pointer;margin-left: 5px;">
							<Bookmark24Regular />
						</n-icon>
					</template>
					已写文章：{{ articleTotalNum }}篇
				</n-tooltip>

			</div>
			<!-- :expanded-keys="expandedKeys"  -->
			<div class="content">
				<n-scrollbar style="height: 100%;">
					<n-tree :default-expand-all="true" block-line :data="NoteData" expand-on-click
						:selected-keys="selectKeys" :on-update:selected-keys="handleTreeSelected"
						:on-update:expanded-keys="handleTreeExpanded" />
				</n-scrollbar>
			</div>
		</div>
		<div class="note_content_container">
			<MarkDown v-if="articlePath" :path="articlePath" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.note_container {
	.tab_container {
		width: 250px;
		position: fixed;
		top: 100px;
		left: 5%;
		border-right: 1px solid var(--border-color);
		padding-right: 10px;
		height: 80vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		.header {}

		.content {
			flex: 1;
			overflow: hidden;
			padding-bottom: 20px;
		}

	}

	.note_content_container {
		box-sizing: border-box;
		width: calc(100% - 280px);
		margin-left: 280px;
	}
}
</style>
