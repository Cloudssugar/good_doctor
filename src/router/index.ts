import { createRouter, createWebHistory} from 'vue-router'; // history
// createWebHashHistory hash

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/home.vue') // 懒加载
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/home.vue') 
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

// 全局前置守卫 ————初始化的时候被调用、每次路由切换之前被调用   
router.beforeEach((to, from, next) => {
  // 登录和注册  首页界面进行选择
  if (to.path === '/login' || to.path === '/register' || to.path === '/home') {
    next()
  } else {
      // 如果没有 token 就去登录
    if (!sessionStorage.getItem('token')) {
      next({
        path: '/login'
      })
    } else {
      // 不写代表直接可以过去
      next()
    }
  }
})

export default router