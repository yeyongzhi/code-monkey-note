import Nav from '@/pages/nav/index.vue'
import Home from '@/pages/home/index.vue'
import Alife from '@/pages/alife/index.vue'
import ToolBox from '@/pages/toolbox/index.vue'
import Note from '@/pages/note/index.vue'
import Interview from '@/pages/interview/index.vue'
import Life from '@/pages/life/index.vue'
import Think from '@/pages/think/index.vue'
import Code from '@/pages/code/index.vue'

export const routes: any = [
    { path: '/nav', component: Nav },
    { path: '/home', component: Home },
    { path: '/alife', component: Alife },
    { path: '/toolbox', component: ToolBox },
    { path: '/note', component: Note },
    { path: '/interview', component: Interview },
    { path: '/life', component: Life },
    { path: '/think', component: Think },
    { path: '/code', component: Code }
]