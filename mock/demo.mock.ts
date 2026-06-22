import { defineMock } from 'vite-plugin-mock-dev-server'

import { success } from './_utils'
import type { DemoItem, DemoStatus } from '../src/api/types/demo'

const statuses: DemoStatus[] = ['pending', 'processing', 'done']

const demoList: DemoItem[] = Array.from({ length: 42 }).map((_, index) => {
  const id = String(index + 1)
  const status = statuses[index % statuses.length]
  return {
    id,
    title: `模板示例数据 ${id}`,
    status,
    description: '这是一条用于演示 H5 列表、筛选、下拉刷新、上拉加载和详情跳转的 mock 数据。',
    createdAt: new Date(Date.now() - index * 60 * 60 * 1000).toISOString()
  }
})

export default defineMock([
  {
    url: '/api/list',
    method: 'GET',
    delay: 300,
    body: ({ query }) => {
      const page = Number(query.page || 1)
      const pageSize = Number(query.pageSize || 10)
      const keyword = String(query.keyword || '').trim()
      const status = String(query.status || '') as DemoStatus | ''

      const filtered = demoList.filter((item) => {
        const matchKeyword =
          !keyword || item.title.includes(keyword) || item.description.includes(keyword)
        const matchStatus = !status || item.status === status
        return matchKeyword && matchStatus
      })
      const start = (page - 1) * pageSize
      return success({
        list: filtered.slice(start, start + pageSize),
        total: filtered.length
      })
    }
  },
  {
    url: '/api/list/:id',
    method: 'GET',
    delay: 300,
    body: ({ params }) => {
      const item = demoList.find((demo) => demo.id === params.id)
      return success(item || null)
    }
  }
])
