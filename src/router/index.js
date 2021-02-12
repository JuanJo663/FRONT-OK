import Vue from 'vue'
import VueRouter from 'vue-router'
//import App from './App.vue'
//import router from './router'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: ()=> import(/*webpackChunkName: "Login" */'../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    //requiere autenticación para evitar ingresar si la persona no se ha logueado.
    meta: { 
      requiresAuth:true
    }
  
  },
]
//se debe crear antes de cualquier objeto que lo llame

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//Comprueba que la persona está logueada
router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(localStorage.getItem('jwt')===null){
      next({
        path:'/'
      })
    }else{
      next();
    }
  }else{
    next();
  }
})

export default router