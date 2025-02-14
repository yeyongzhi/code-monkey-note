import { createWebHistory, createRouter } from 'vue-router'

const basePath = '/code-monkey-note'

const routes = [
    { path: '/nav', component: () => import('@/pages/nav/index.vue') },
    { path: '/home', component: () => import('@/pages/home/index.vue') },
    { path: '/alife', component: () => import('@/pages/alife/index.vue') },
    { path: '/toolbox', component: () => import('@/pages/toolbox/index.vue') },
    { path: '/note', component: () => import('@/pages/note/index.vue') },
    { path: '/interview', component: () => import('@/pages/interview/index.vue') },
    { path: '/life', component: () => import('@/pages/life/index.vue') },
    { path: '/think', component: () => import('@/pages/think/index.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes.map(r => {
        return {
            ...r,
            path: basePath + r.path
        }
    }),
})

export const gotoPage = (path: string) => {
    router.push(basePath + path)
}

export default router