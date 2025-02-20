import { createWebHistory, createRouter } from 'vue-router'

export const basePath = import.meta.env.MODE === 'production' 
  ? '/code-monkey-note' 
  : ''

console.log("basePath: " + basePath)

const routes: any = [
    { path: '', redirect: `${basePath}/nav` },
    { path: '/nav', component: () => import('@/pages/nav/index.vue') },
    { path: '/home', component: () => import('@/pages/home/index.vue') },
    { path: '/alife', component: () => import('@/pages/alife/index.vue') },
    { path: '/toolbox', component: () => import('@/pages/toolbox/index.vue') },
    { path: '/note', component: () => import('@/pages/note/index.vue') },
    { path: '/interview', component: () => import('@/pages/interview/index.vue') },
    { path: '/life', component: () => import('@/pages/life/index.vue') },
    { path: '/think', component: () => import('@/pages/think/index.vue') },
    { path: '/code', component: () => import('@/pages/code/index.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes.map((r: any) => {
        return {
            ...r,
            path: basePath + r.path
        }
    }),
})

export const gotoPage = (path: string) => {
    router.push(basePath + path)
}

export const findRoute = (path: string) => {
    // const target = routes.find((item: any) => {
    //     return item.path === path
    // })
    gotoPage(path)
}

export default router