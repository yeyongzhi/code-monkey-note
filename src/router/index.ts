import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/nav', component: () => import('@/pages/nav/index.vue') },
  { path: '/home', component: () => import('@/pages/home/index.vue') },
  { path: '/alife', component: () => import('@/pages/alife/index.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router