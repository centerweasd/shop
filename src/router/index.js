import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'
import Rights from '@/components/power/Rights'
import Roles from '@/components/power/Roles'
Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      redirect:'login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect:'/welcome',
      children:[
        {
          path:'/welcome',
          name:'Welcome',
          component:Welcome,
        },
        {
          path:'/users',
          component:Users,
        },
        {
          path:'/rights',
          component:Rights,
        },
        {
          path:'/roles',
          component:Roles,
        },
      ]
    }
   
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.path === '/login'){
    return next()
  }
  const tokenstr = window.sessionStorage.getItem('token')
  if(!tokenstr){
    return next('/login')
  }
  next()
})
export default router
