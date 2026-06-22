import { closeToast, showLoadingToast } from 'vant'

let loadingCount = 0

export function showRequestLoading(message = '加载中...') {
  loadingCount += 1
  if (loadingCount === 1) {
    showLoadingToast({
      message,
      forbidClick: true,
      duration: 0
    })
  }
}

export function hideRequestLoading() {
  loadingCount = Math.max(loadingCount - 1, 0)
  if (loadingCount === 0) {
    closeToast()
  }
}
