import { http } from '@/utils/request'
import type { UserInfo } from '@/api/types/user'

export function getUserInfoApi() {
  return http.get<UserInfo>('/user/info')
}
