import Auth from '@/views/auth/index.vue'
import Home from '@/layout/index.vue'

const constRoutes = [
  // 认证页
  {
    path: '/',
    name: 'auth',
    component: Auth,
    meta: { keepAlive: false, isProtected: false },
  },
  // 主页
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { keepAlive: true },
    children: [
      // 论文
      {
        path: '/resource/paper',
        name: 'resource-paper',
        component: () => import('@/views/paper/index.vue'),
        redirect: '/resource/paper/list',
        children: [
          // 列表页
          {
            path: '/resource/paper/list',
            name: 'resource-paper-list',
            component: () => import('@/views/paper/list.vue'),
            meta: { keepAlive: false },
          },
          // 新增
          {
            path: '/resource/paper/add',
            name: 'resource-paper-add',
            component: () => import('@/views/paper/add.vue'),
            meta: { keepAlive: false },
          },
        ],
      },
    ],
  },
  // 404
  {
    path: '/error',
    name: 'error',
    component: () => import('@/components/error/404.vue'),
  },
]
export default constRoutes
