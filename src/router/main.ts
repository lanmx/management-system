export default [
  // 用户管理
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '@/views/users/user.vue'),
    childern: [
      {
        path: '/user-list',
        name: 'UserList',
        component: () => import(/* webpackChunkName: "about" */ '@/views/users/user.vue'),
        meta: {
          title: "用户列表",
        },
      },
    ]
  },
  // 权限管理
  {
    path: '/permiss',
    name: 'Permiss',
    component: () => import(/* webpackChunkName: "about" */ '../layout/index.vue'),
    childern: [
      {
        path: '/user-list',
        name: 'user-list',
        component: () => import(/* webpackChunkName: "about" */ '@/views/users/user.vue'),
        meta: {
          title: "权限分配",
        },
      },
      {
        path: '/user-list',
        name: 'user-list',
        component: () => import(/* webpackChunkName: "about" */ '@/views/users/user.vue'),
        meta: {
          title: "角色管理",
        },
      },
    ]
  },
  // 设置
  {
    path: '/setting',
    name: 'Setting',
    component: () => import(/* webpackChunkName: "about" */ '../layout/index.vue')
  },
]