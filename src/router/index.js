import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '@/firebase/firebaseConfig'
//import { getAuth } from "firebase/auth";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/LoginView'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/RegisterView')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(ruta => ruta.meta.requiresAuth)) {
    const user = auth.currentUser;
    if (user) {
      next();
    } else {
      next({
        name: 'login'
      })
    }
  } else {
    next();
  }
})

export default router
