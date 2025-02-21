import { createApp } from 'vue'
import './style/index.scss'
import App from './App.vue'
import naive from 'naive-ui'
// import router from '@/router/index.ts'

import Divider from '@/components/Divider/index.vue'
import MarkDown from '@/components/MarkDown/index.vue'
import Article from '@/components/Article/index.vue'
import globalData from '@/data/user.json'

// import message from '@/plugins/message'

const app = createApp(App)

app.use(naive)
// app.use(router)

// 全局通用组件
app.component('Divider', Divider)
app.component('MarkDown', MarkDown)
app.component('Article', Article)

// 全局变量
app.config.globalProperties.globalData = globalData;

// 全局方法
// app.config.globalProperties.$message = message

app.mount('#app')
