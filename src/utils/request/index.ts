import { createRequestClient } from '@/utils/fetch-request'
import { useUserStore } from '@/stores/user'
import { API_BASE_URL, REQUEST_TIMEOUT } from '@/constants/app'

import { handleRequestError } from './error'
import { hideRequestLoading, showRequestLoading } from './loading'
import { shouldBlockRepeat } from './repeat'
import type { AppRequestOptions, HttpMethod, UploadOptions } from './types'

const client = createRequestClient({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  successCodes: [0],
  responseReturn: 'data'
})

client.addRequestInterceptor((context) => {
  const userStore = useUserStore()

  if (!userStore.accessToken) {
    return context
  }

  if (context.type === 'request') {
    const headers = new Headers(context.options.headers)
    headers.set('Authorization', `Bearer ${userStore.accessToken}`)
    return {
      ...context,
      options: {
        ...context.options,
        headers
      }
    }
  }

  return {
    ...context,
    options: {
      ...context.options,
      headers: {
        ...(context.options.headers || {}),
        Authorization: `Bearer ${userStore.accessToken}`
      }
    }
  }
})

async function request<T>(url: string, options: AppRequestOptions = {}) {
  const method = (options.method || 'GET').toUpperCase() as HttpMethod
  const loading = options.loading ?? method !== 'GET'
  const showError = options.showError ?? true

  if (shouldBlockRepeat(url, { ...options, method })) {
    return Promise.reject(new Error('请勿重复提交'))
  }

  if (loading) {
    showRequestLoading(options.loadingText)
  }

  try {
    return await client.request<T>(url, {
      ...options,
      method
    })
  } catch (error) {
    handleRequestError(error, showError)
    throw error
  } finally {
    if (loading) {
      hideRequestLoading()
    }
  }
}

export const http = {
  request,
  get<T>(url: string, options?: Omit<AppRequestOptions, 'method'>) {
    return request<T>(url, { ...options, method: 'GET' })
  },
  post<T>(url: string, data?: unknown, options?: Omit<AppRequestOptions, 'method' | 'data'>) {
    return request<T>(url, { ...options, method: 'POST', data })
  },
  put<T>(url: string, data?: unknown, options?: Omit<AppRequestOptions, 'method' | 'data'>) {
    return request<T>(url, { ...options, method: 'PUT', data })
  },
  delete<T>(url: string, data?: unknown, options?: Omit<AppRequestOptions, 'method' | 'data'>) {
    return request<T>(url, { ...options, method: 'DELETE', data })
  },
  upload<T>(url: string, options: UploadOptions) {
    const loading = options.loading ?? true
    const showError = options.showError ?? true

    if (loading) {
      showRequestLoading(options.loadingText || '上传中...')
    }

    return client
      .uploadRequest<T>(url, {
        file: options.file,
        fieldName: options.fieldName,
        data: options.data,
        headers: options.headers,
        onProgress: options.onProgress
      })
      .catch((error) => {
        handleRequestError(error, showError)
        throw error
      })
      .finally(() => {
        if (loading) {
          hideRequestLoading()
        }
      })
  }
}

export type { AppRequestOptions, UploadOptions }
