import { createApp } from 'vue'
import './style/index.scss'
import App from './App.vue'
import naive from 'naive-ui'
import router from '@/router/index.ts'

const app = createApp(App)

app.use(naive)
app.use(router)

app.mount('#app')
