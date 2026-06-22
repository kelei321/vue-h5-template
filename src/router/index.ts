import { createRouter, createWebHashHistory } from 'vue-router'

import { setupRouterGuard } from './guard'
import { routes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

setupRouterGuard(router)

export default router
