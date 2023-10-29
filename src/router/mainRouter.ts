export default [
  // 用户列表
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '@/views/users/userList.vue'),
    meta: {
      title: "用户列表",
    },
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import(/* webpackChunkName: "about" */ '@/views/users/infoDetail.vue'),
    meta: {
      title: "个人中心",
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
  {
    path: '/blog',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "about" */ '@/views/blog/blog.vue'),
    meta: {
      title: "文章列表",
    },
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import(/* webpackChunkName: "about" */ '@/views/music/music.vue'),
    meta: {
      title: "音乐列表",
    },
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import(/* webpackChunkName: "about" */ '@/views/statistics/statistics.vue'),
    meta: {
      title: "音乐列表",
    },
  },
  // 设置
  {
    path: '/setting',
    name: 'Setting',
    component: () => import(/* webpackChunkName: "about" */ '@/views/setting/setting.vue')
  },
];
