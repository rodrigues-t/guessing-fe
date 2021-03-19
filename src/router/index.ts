import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Guessing from '@/views/Guessing.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Guessing',
    component: Guessing
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/views/Game.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('@/views/Result.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
