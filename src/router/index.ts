/*
 * @Author: your name
 * @Date: 2021-11-09 20:51:29
 * @LastEditTime: 2021-11-18 09:13:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lanmxvuets\src\router\index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Welcome',
    // component: Welcome
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
    children: [
      // 用户列表
      {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "about" */ '@/views/users/user.vue'),
        meta: {
          title: "用户列表",
        },
      },
      // 权限管理
      {
        path: '/permiss',
        name: 'Permiss',
        component: () => import(/* webpackChunkName: "about" */ '@/views/permiss/permiss.vue'),
        meta: {
          title: "权限分配",
        },
      },
      {
        path: '/role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "about" */ '@/views/permiss/role.vue'),
        meta: {
          title: "角色管理",
        },
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "about" */ '@/views/menu/menu.vue'),
        meta: {
          title: "菜单列表",
        },
      },
      // 设置
      {
        path: '/setting',
        name: 'Setting',
        component: () => import(/* webpackChunkName: "about" */ '@/views/setting/setting.vue')
      },
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router