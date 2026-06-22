import type { RouteRecordRaw } from 'vue-router'

const BasicLayout = () => import('@/layouts/BasicLayout.vue')
const PageLayout = () => import('@/layouts/PageLayout.vue')
const BlankLayout = () => import('@/layouts/BlankLayout.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          requiresAuth: true,
          keepAlive: true,
          showTabBar: true
        }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/list/index.vue'),
        meta: {
          title: '列表',
          requiresAuth: true,
          permissions: ['list:view'],
          keepAlive: true,
          showTabBar: true
        }
      },
      {
        path: 'mine',
        name: 'Mine',
        component: () => import('@/views/mine/index.vue'),
        meta: {
          title: '我的',
          requiresAuth: true,
          keepAlive: true,
          showTabBar: true
        }
      }
    ]
  },
  {
    path: '/',
    component: PageLayout,
    children: [
      {
        path: 'detail/:id',
        name: 'Detail',
        component: () => import('@/views/detail/index.vue'),
        meta: {
          title: '详情',
          requiresAuth: true,
          permissions: ['list:view']
        }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/settings/index.vue'),
        meta: {
          title: '设置',
          requiresAuth: true
        }
      },
      {
        path: 'admin-demo',
        name: 'AdminDemo',
        component: () => import('@/views/exception/403.vue'),
        meta: {
          title: '管理员页面',
          requiresAuth: true,
          roles: ['admin']
        }
      },
      {
        path: '403',
        name: 'Forbidden',
        component: () => import('@/views/exception/403.vue'),
        meta: {
          title: '无权限'
        }
      },
      {
        path: '404',
        name: 'NotFound',
        component: () => import('@/views/exception/404.vue'),
        meta: {
          title: '未找到'
        }
      }
    ]
  },
  {
    path: '/',
    component: BlankLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: '登录'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]
