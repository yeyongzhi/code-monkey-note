import { createApp } from 'vue'
import './style/index.scss'
import App from './App.vue'
import naive from 'naive-ui'
// import router from '@/router/index.ts'

import FluentIcon from '@/components/FluentIcon/index.vue'
import Divider from '@/components/Divider/index.vue'
import MarkDown from '@/components/MarkDown/index.vue'
import Article from '@/components/Article/index.vue'
import globalData from '@/data/user.json'

// 设置页面标题
document.title = import.meta.env.VITE_APP_TITLE || '默认标题'

const app = createApp(App)

app.use(naive)
// app.use(router)

// 全局通用组件
app.component('Divider', Divider)
app.component('MarkDown', MarkDown)
app.component('Article', Article)
app.component('FluentIcon', FluentIcon)

// 全局变量
app.config.globalProperties.globalData = globalData;

app.mount('#app')
