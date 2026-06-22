import type { App, DirectiveBinding } from 'vue'

import { useUserStore } from '@/stores/user'
import { matchRole } from '@/utils/auth'

function updateRole(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
  const userStore = useUserStore()
  const allowed = matchRole(userStore.roles, binding.value)
  el.style.display = allowed ? '' : 'none'
}

export function setupRoleDirective(app: App) {
  app.directive('role', {
    mounted: updateRole,
    updated: updateRole
  })
}
