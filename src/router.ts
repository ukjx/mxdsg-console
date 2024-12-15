import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/index.vue') },
  { path: '/list', component: () => import('@/pages/list.vue') },
]

const router = createRouter({
  // history: createMemoryHistory(),
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
})

export default router