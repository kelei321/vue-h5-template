import { http } from '@/utils/request'
import type {
  LoginParams,
  LoginResult,
  RefreshTokenParams,
  RefreshTokenResult
} from '@/api/types/auth'

export function loginApi(data: LoginParams) {
  return http.post<LoginResult>('/auth/login', data)
}

export function refreshTokenApi(data: RefreshTokenParams) {
  return http.post<RefreshTokenResult>('/auth/refresh-token', data, {
    loading: false,
    showError: false
  })
}
