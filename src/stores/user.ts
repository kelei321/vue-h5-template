import { defineStore } from 'pinia'

import { loginApi, refreshTokenApi } from '@/api/modules/auth'
import { getUserInfoApi } from '@/api/modules/user'
import type { LoginParams } from '@/api/types/auth'
import type { UserInfo } from '@/api/types/user'

interface UserState {
  accessToken: string
  refreshToken: string
  userInfo: UserInfo | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    accessToken: '',
    refreshToken: '',
    userInfo: null
  }),
  getters: {
    isLogin: (state) => Boolean(state.accessToken),
    roles: (state) => state.userInfo?.roles ?? [],
    permissions: (state) => state.userInfo?.permissions ?? []
  },
  actions: {
    setToken(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
    },
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo
    },
    async login(params: LoginParams) {
      const result = await loginApi(params)
      this.setToken(result.accessToken, result.refreshToken)
      this.setUserInfo(result.userInfo)
      return result
    },
    async loadUserInfo() {
      const userInfo = await getUserInfoApi()
      this.setUserInfo(userInfo)
      return userInfo
    },
    async refreshAccessToken() {
      if (!this.refreshToken) {
        throw new Error('refreshToken 不存在')
      }
      const result = await refreshTokenApi({ refreshToken: this.refreshToken })
      this.setToken(result.accessToken, result.refreshToken)
      return result
    },
    logout() {
      this.accessToken = ''
      this.refreshToken = ''
      this.userInfo = null
    }
  },
  persist: {
    key: 'vue-h5-template:user',
    pick: ['accessToken', 'refreshToken', 'userInfo']
  }
})
