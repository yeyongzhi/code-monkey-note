# vue3 Ref解读
跟随本篇文章一起学习vue3源码中关于ref的实现~
首先vue里面关于ref的一些方法有如下几种（目前据我所知）：
```javascript
import { ref, isRef, toRef, shallowRef } from 'vue'
```
## ref入口
[响应式 API：核心——Ref](https://cn.vuejs.org/api/reactivity-core#ref)
`ref()`接受一个内部值，返回一个**响应式的、可更改**的`ref`对象，此对象只有一个指向其内部值的属性`.value`
```javascript
function ref<T>(value: T): Ref<UnwrapRef<T>>

interface Ref<T> {
  value: T
}

export function ref<T>(
  value: T,
): [T] extends [Ref] ? IfAny<T, Ref<T>, T> : Ref<UnwrapRef<T>, UnwrapRef<T> | T>
export function ref<T = any>(): Ref<T | undefined>
export function ref(value?: unknown) {
  return createRef(value, false) // 【核心入口代码】
}

export function shallowRef<T>(
  value: T,
): Ref extends T
  ? T extends Ref
    ? IfAny<T, ShallowRef<T>, T>
    : ShallowRef<T>
  : ShallowRef<T>
export function shallowRef<T = any>(): ShallowRef<T | undefined>
export function shallowRef(value?: unknown) {
  return createRef(value, true) // 【核心入口代码】
}
// 【核心入口代码】
function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}
```
> 这里的核心就是`createRef(value, false)`方法。返回的是一个`RefImpl`实例。其中`shallow`参数控制的就是我们平常用法当中的ref、shallowRef。虽然暂时我还不清楚他们的具体差异。接下去我们就来看看`RefImpl`类的实现。

## RefImpl类
![RefImpl类的实现](./images/vue_ref_1.png)
作为一个如此核心的类，居然才区区的50行代码。给我震惊到了，而且构造器也非常的简单。根据我们平常使用的情况来看，可以得到以下猜想：
1. `_value`就是我们传入ref的内部值，也是**唯一一个指向其内部值的属性（与文档中呼应）**，例如`ref(0)`中的0。
2. `_rawValue`存储的是旧值，当我们修改了`_value`的值的时候，会把旧值赋值给`_rawValue`。这个变量应该是用于`watch`中的`(newVal, oldVal) => { }`回调函数的。

借助于AI的分析，我们得到关于RefImpl类的一些代码讲解：
### 构造器
```javascript
constructor(value: T, isShallow: boolean) {
  this._rawValue = isShallow ? value : toRaw(value)
  this._value = isShallow ? value : toReactive(value)
  this[ReactiveFlags.IS_SHALLOW] = isShallow
}
```
`isShallow`表示是否为浅响应。如果为浅响应，则`_value`和`_rawValue`指向同一个值。如果为深响应，则`_value`和`_rawValue`指向不同的值。
> 意思就是：**【浅响应】**不需要对内部值进行响应式处理（也就是**代理**），而**【深响应】**则需要处理。

这里也可以知道`toRaw`和`toReactive`的作用，`toRaw`的作用是将传入的值**转换为原始值**，而`toReactive`的作用是将传入的值**转换为响应式值**。
`_rawValue`的意思是原始值，`_value`是vue帮我们进行了一层代理，`_rawValue`是**原始值**，也就是我们传入的ref的值。`_rawValue`可以用来比较新旧值是否发生变化。