import Vue from 'vue'
import VueRouter from 'vue-router'
import ResourcePage from '../views/ResourcePage.vue'
import DemoPage from '@/views/demo/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ResourcePage
  },
  {
    path: '/tickets',
    component: () => import('@/views/tickets/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/tickets/list.vue'),
      },
      {
        path: 'new',
        component: () => import('@/views/tickets/new.vue'),
      },
      {
        path: ':id',
        component: () => import('@/views/tickets/detail.vue'),
      }
    ]
    /*
    component: () => import('@/tickets/index.vue')  箭头函数
    类似等价 
    component(){
      return import('@/tickets/index.vue')
    }
    类似等价
    component: function(){
      return import('@/tickets/index.vue')
    }
    */
  },
  {
    path: '/forum',
    component: () => import('@/views/forum/')
  },
  {
    path: '/faq',
    component: () => import('@/views/faq/')
  },
  {
    path: '/demo',
    component: DemoPage
  },
  {
    path: '/sweep',
    component: () => import('@/views/sweep/')
  },
  {
    path: '/testt',
    component: () => import('@/views/test/')
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash',
})

export default router
