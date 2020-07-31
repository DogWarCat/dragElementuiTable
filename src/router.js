import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import TextVx from '@/views/testVx'
import testDragInstance  from '@/views/testDrag/testDragInstance'
 
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    }, {
      path: '/testVx',
      component: TextVx
    },{
      path:'/testDrag/testDragInstance',
      component:testDragInstance
    }
  ]
})
export default router
