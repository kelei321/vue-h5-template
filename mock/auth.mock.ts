import { defineMock } from 'vite-plugin-mock-dev-server'

import { fail, success, users } from './_utils'

export default defineMock([
  {
    url: '/api/auth/login',
    method: 'POST',
    delay: 300,
    body: ({ body }) => {
      const { username, password } = body || {}
      const user = users[String(username)]
      if (!user || user.password !== password) {
        return fail('账号或密码错误', 401)
      }
      const userInfo = { ...user }
      delete (userInfo as Partial<typeof userInfo>).password
      return success({
        accessToken: `mock-access-token-${user.username}`,
        refreshToken: `mock-refresh-token-${user.username}`,
        userInfo
      })
    }
  },
  {
    url: '/api/auth/refresh-token',
    method: 'POST',
    delay: 300,
    body: ({ body }) => {
      const refreshToken = String(body?.refreshToken || '')
      const username = refreshToken.replace('mock-refresh-token-', '')
      const user = users[username]
      if (!user) {
        return fail('refreshToken 无效', 401)
      }
      return success({
        accessToken: `mock-access-token-${user.username}`,
        refreshToken: `mock-refresh-token-${user.username}`
      })
    }
  }
])
