import Nav from '@/pages/nav/index.vue'
import Home from '@/pages/home/index.vue'
import Alife from '@/pages/alife/index.vue'
import ToolBox from '@/pages/toolbox/index.vue'
import Note from '@/pages/note/index.vue'
import Interview from '@/pages/interview/index.vue'
import Life from '@/pages/life/index.vue'
import Think from '@/pages/think/index.vue'
import Code from '@/pages/code/index.vue'
import { ComponentOptions } from 'vue';

export interface ComponentRouteItem {
    path: string;
    component: ComponentOptions<any>,
    name: string;
}

export const routes: Array<ComponentRouteItem> = [
    { path: '/nav', component: Nav, name: '前端导航' },
    { path: '/home', component: Home, name: '主页' },
    { path: '/alife', component: Alife, name: 'A Life清单' },
    { path: '/toolbox', component: ToolBox, name: '工具箱' },
    { path: '/note', component: Note, name: '前端笔记' },
    { path: '/interview', component: Interview, name: '面经' },
    { path: '/life', component: Life, name: '生活记录' },
    { path: '/think', component: Think, name: '思考' },
    { path: '/code', component: Code, name: '代码片段' }
]