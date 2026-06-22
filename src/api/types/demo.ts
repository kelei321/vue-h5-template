export type DemoStatus = 'pending' | 'processing' | 'done'

export interface DemoListParams {
  page?: number
  pageSize?: number
  keyword?: string
  status?: DemoStatus | ''
}

export interface DemoItem {
  id: string
  title: string
  status: DemoStatus
  description: string
  createdAt: string
}

export interface DemoListResult {
  list: DemoItem[]
  total: number
}

export interface UploadResult {
  url: string
  filename: string
}
