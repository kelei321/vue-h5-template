import type { UserInfo } from './user'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  accessToken: string
  refreshToken: string
  userInfo: UserInfo
}

export interface RefreshTokenParams {
  refreshToken: string
}

export interface RefreshTokenResult {
  accessToken: string
  refreshToken: string
}
