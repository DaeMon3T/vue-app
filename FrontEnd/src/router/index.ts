import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SigninView from "../views/SigninView.vue"
import SignupView from "../views/SignupView.vue"
import DashboardView from "../views/DashboardView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),    
    },
    
    { path: "/signin", component: SigninView },
    { path: "/signup", component: SignupView },
     {
      path: "/dashboard",
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    
  ],
})

export default router
