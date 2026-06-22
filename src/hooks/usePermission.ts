import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/user'
import { matchPermission, matchRole } from '@/utils/auth'

export function usePermission() {
  const userStore = useUserStore()
  const { permissions, roles } = storeToRefs(userStore)

  const hasPermission = (target?: string | string[]) => matchPermission(permissions.value, target)
  const hasRole = (target?: string | string[]) => matchRole(roles.value, target)

  return {
    hasPermission,
    hasRole
  }
}
