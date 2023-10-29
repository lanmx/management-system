import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import mainRouter from './mainRouter';
import { getLocalStorage } from '@/utils/storage';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import(/* webpackChunkName: "about" */ '@/views/welcome.vue')  //路由懒加载，进入到页面再加载，否则不加载
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/loginRegister.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '@/views/404.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '@/layout/index.vue'),
    children: [...mainRouter]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// 路由守卫（主要是做一些重定向操作）
// router.beforeEach((to, from, next) => {
// 	const token = getLocalStorage("token");
// 	if (token) {
// 		to.name === "Login" ? next("/home") : next();
// 	} else {
// 		to.name === "Login" ? next() : next({ path: "/login", query: { redirect: to.fullPath }, replace: true });
// 	}
// });

export default router