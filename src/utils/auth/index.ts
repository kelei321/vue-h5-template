import type { UserInfo } from '@/api/types/user'

export function hasWildcardPermission(permission: string, target: string) {
  if (permission === '*:*:*') {
    return true
  }
  if (permission.endsWith(':*')) {
    return target.startsWith(permission.slice(0, -1))
  }
  return permission === target
}

export function matchPermission(permissions: string[] = [], target?: string | string[]) {
  if (!target) {
    return true
  }
  const targets = Array.isArray(target) ? target : [target]
  return targets.some((item) =>
    permissions.some((permission) => hasWildcardPermission(permission, item))
  )
}

export function matchRole(roles: string[] = [], target?: string | string[]) {
  if (!target) {
    return true
  }
  const targets = Array.isArray(target) ? target : [target]
  return roles.includes('admin') || targets.some((item) => roles.includes(item))
}

export function canAccess(
  user: UserInfo | null,
  options: { roles?: string[]; permissions?: string[] }
) {
  if (!user) {
    return false
  }
  return (
    matchRole(user.roles, options.roles) && matchPermission(user.permissions, options.permissions)
  )
}
