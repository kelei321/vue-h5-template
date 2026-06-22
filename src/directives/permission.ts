import type { App, DirectiveBinding } from 'vue'

import { useUserStore } from '@/stores/user'
import { matchPermission } from '@/utils/auth'

function updatePermission(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
  const userStore = useUserStore()
  const allowed = matchPermission(userStore.permissions, binding.value)
  el.style.display = allowed ? '' : 'none'
}

export function setupPermissionDirective(app: App) {
  app.directive('permission', {
    mounted: updatePermission,
    updated: updatePermission
  })
}
