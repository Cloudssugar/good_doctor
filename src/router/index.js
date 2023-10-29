import { createRouter, createWebHistory} from 'vue-router'; // history
// createWebHashHistory hash

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/home.vue') // 懒加载
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue') 
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue') 
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router