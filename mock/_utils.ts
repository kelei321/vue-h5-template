import type { UserInfo } from '../src/api/types/user'

export interface ApiResult<T> {
  code: number
  message: string
  data: T
}

export function success<T>(data: T, message = 'success'): ApiResult<T> {
  return {
    code: 0,
    message,
    data
  }
}

export function fail(message: string, code = 500) {
  return {
    code,
    message,
    data: null
  }
}

export const users: Record<string, UserInfo & { password: string }> = {
  admin: {
    id: '1',
    username: 'admin',
    password: '123456',
    nickname: '管理员',
    roles: ['admin'],
    permissions: ['*:*:*']
  },
  user: {
    id: '2',
    username: 'user',
    password: '123456',
    nickname: '普通用户',
    roles: ['user'],
    permissions: ['list:view', 'demo:view']
  }
}

export function getUserByToken(token?: string) {
  if (!token) {
    return null
  }
  const username = token.replace('mock-access-token-', '')
  return users[username] || null
}

export function readAuthorization(headers: Record<string, string | string[] | undefined>) {
  const authorization = headers.authorization
  if (Array.isArray(authorization)) {
    return authorization[0]
  }
  return authorization
}
