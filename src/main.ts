import { createApp } from 'vue'
import './style/index.scss'
import App from './App.vue'
import naive from 'naive-ui'
import router from '@/router/index.ts'

import Divider from '@/components/Divider/index.vue'
import MarkDown from '@/components/MarkDown/index.vue'
import Article from '@/components/Article/index.vue'

const app = createApp(App)

app.use(naive)
app.use(router)

app.component('Divider', Divider)
app.component('MarkDown', MarkDown)
app.component('Article', Article)

app.mount('#app')
