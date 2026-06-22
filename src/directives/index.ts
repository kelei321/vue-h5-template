import type { App } from 'vue'

import { setupPermissionDirective } from './permission'
import { setupRoleDirective } from './role'

export function setupDirectives(app: App) {
  setupPermissionDirective(app)
  setupRoleDirective(app)
}
