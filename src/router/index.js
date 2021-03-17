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
      path:'/table',
      name:'Table',
      component:()=>import('@/components/table/table.vue')
    },
    {
      path:'/edit',
      name:'edit',
      component:()=>import('@/components/table/edit.vue')
    },
    {
      path:'/',
      name:'Login',
      component:()=>import('@/components/login.vue')
    },
	{
		path:'/table1',
		name:'Table1',
		component:()=>import('@/views/table.vue')
	},{
		path:'/jm',
		name:'jm',
			component:()=>import('@/views/jm.vue')
	},
  ]
})
