import { http } from '@/utils/request'
import type { DemoItem, DemoListParams, DemoListResult, UploadResult } from '@/api/types/demo'

export function getDemoListApi(params: DemoListParams) {
  return http.get<DemoListResult>('/list', { data: params })
}

export function getDemoDetailApi(id: string) {
  return http.get<DemoItem>(`/list/${id}`)
}

export function uploadDemoFileApi(file: Blob) {
  return http.upload<UploadResult>('/upload', { file })
}
