import type { RequestOptions, UploadProgress } from '@/utils/fetch-request'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface AppRequestOptions extends Omit<RequestOptions, 'method' | 'body'> {
  method?: HttpMethod
  loading?: boolean
  loadingText?: string
  showError?: boolean
  repeatSubmit?: boolean
}

export interface UploadOptions {
  file: Blob
  fieldName?: string
  data?: Record<string, FormDataEntryValue | FormDataEntryValue[] | null | undefined>
  headers?: Record<string, string | number | boolean | null | undefined>
  loading?: boolean
  loadingText?: string
  showError?: boolean
  onProgress?: (progress: UploadProgress) => void
}
