import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HolloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/task',
      name:'Task',
      component:()=>import ('@/components/task.vue'),
      children:[
        {
          path:'/aaa',
          name:'taskAAA',
          component:()=>import ('@/components/aaa.vue')
        }
      ]
    },
    {
      path:'/',
      name:'Table',
      component:()=>import('@/components/table/table.vue')
    },
    {
      path:'/edit',
      name:'edit',
      component:()=>import('@/components/table/edit.vue')
    }
  ]
})
