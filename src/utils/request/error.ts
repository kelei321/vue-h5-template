import { showToast } from 'vant'

import router from '@/router'
import type { RequestError } from '@/utils/fetch-request'

let onUnauthorized: (() => void) | null = null

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message
  }
  return '请求失败，请稍后重试'
}

export function handleRequestError(error: unknown, showError = true) {
  const requestError = error as RequestError
  const status = requestError.status
  const code = String(requestError.code ?? '')

  if (status === 401 || code === '401') {
    onUnauthorized?.()
    const redirect = encodeURIComponent(router.currentRoute.value.fullPath)
    router.replace(`/login?redirect=${redirect}`)
    if (showError) {
      showToast('登录已失效，请重新登录')
    }
    return
  }

  if (status === 403 || code === '403') {
    router.replace('/403')
    if (showError) {
      showToast('暂无权限')
    }
    return
  }

  if (showError) {
    showToast(getErrorMessage(error))
  }
}
