import type { Router } from 'vue-router'

import { APP_NAME } from '@/constants/app'
import { useUserStore } from '@/stores/user'
import { canAccess } from '@/utils/auth'
import { setUnauthorizedHandler } from '@/utils/request/error'

const WHITE_LIST = ['/login', '/403', '/404']

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to) => {
    const userStore = useUserStore()

    document.title = to.meta.title ? `${to.meta.title} - ${APP_NAME}` : APP_NAME

    setUnauthorizedHandler(() => userStore.logout())

    if (WHITE_LIST.includes(to.path)) {
      if (to.path === '/login' && userStore.isLogin) {
        return '/home'
      }
      return true
    }

    if (to.meta.requiresAuth && !userStore.isLogin) {
      return {
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      }
    }

    if (userStore.isLogin && !userStore.userInfo) {
      try {
        await userStore.loadUserInfo()
      } catch {
        userStore.logout()
        return {
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        }
      }
    }

    if (
      !canAccess(userStore.userInfo, { roles: to.meta.roles, permissions: to.meta.permissions })
    ) {
      return '/403'
    }

    return true
  })
}
