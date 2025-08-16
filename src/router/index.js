import Vue from 'vue'
import VueRouter from 'vue-router'
import UsersView from '../views/UsersView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/usuarios',
    name: 'users',
    component: UsersView
  },
  {
    path: '/',
    redirect: '/usuarios'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
