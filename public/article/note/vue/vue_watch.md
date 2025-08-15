# vue3 数据监听
## watch
[侦听器](https://cn.vuejs.org/guide/essentials/watchers.html)
`watch`应该是我们使用频率很高的一个函数了，它的作用是：
在`组合式API`中，我们可以使用`watch`函数在<u>每次响应式状态发生变化时触发回调函数</u>，使用示例如下：
```javascript
const count = ref(0)

watch(count, (newCount, oldCount) => {
  console.log(`count is: ${newCount}`)
  console.log(`oldCount was: ${oldCount}`)
}, {})
```
watch函数接受三个参数，分别是`数据源source`、`回调函数callback`和`配置选项options`。
同时，watch返回一个`停止函数stop`，用于停止监听。
如下图所示：

![watch函数的参数和返回值](./images/vue_watch_1.png)

### 数据源source

通过上面可以看到，数据源source的类型有以下几种：`WatchSource | WatchSource[] | WatchEffect | object`

```javascript
// WatchSource表示Ref、ComputedRef或箭头函数的类型
export type WatchSource<T = any> = Ref<T, any> | ComputedRef<T> | (() => T)
```

### 回调函数callback

### 配置选项options
比较常用的配置项有：
- `immediate`：是否立即执行回调函数，默认为false。
- `deep`：是否深度监听，默认为false。
- `once`：是否仅需单次执行。
## watchEffect