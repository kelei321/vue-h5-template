import type { AppRequestOptions } from './types'

const REPEAT_INTERVAL = 800
const pendingRequests = new Map<string, number>()

export function createRepeatKey(url: string, options: AppRequestOptions) {
  const method = (options.method || 'GET').toUpperCase()
  const payload = options.data ?? options.params ?? null
  return `${method}:${url}:${JSON.stringify(payload)}`
}

export function shouldBlockRepeat(url: string, options: AppRequestOptions) {
  const method = (options.method || 'GET').toUpperCase()
  if (!['POST', 'PUT', 'DELETE'].includes(method) || options.repeatSubmit === false) {
    return false
  }

  const key = createRepeatKey(url, options)
  const now = Date.now()
  const last = pendingRequests.get(key)
  pendingRequests.set(key, now)

  return Boolean(last && now - last < REPEAT_INTERVAL)
}
