<script setup lang="ts">
import { showToast } from 'vant'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { getDemoDetailApi } from '@/api/modules/demo'
import type { DemoItem, DemoStatus } from '@/api/types/demo'
import AppEmpty from '@/components/AppEmpty/index.vue'
import { useRequest } from '@/hooks/useRequest'
import { formatDateTime } from '@/utils/dayjs'

const route = useRoute()
const id = computed(() => String(route.params.id || ''))

const { data: detail, loading, run } = useRequest<DemoItem | null, [string]>(getDemoDetailApi)

const statusMap: Record<DemoStatus, { text: string; type: 'primary' | 'success' | 'warning' }> = {
  pending: { text: '待处理', type: 'warning' },
  processing: { text: '进行中', type: 'primary' },
  done: { text: '已完成', type: 'success' }
}

function handleAction() {
  showToast('操作成功')
}

run(id.value)
</script>

<template>
  <div class="px-4 py-4">
    <van-loading v-if="loading" class="mt-20 flex justify-center" />
    <template v-else-if="detail">
      <section class="rounded-3xl bg-white p-5 shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <h1 class="text-xl font-semibold text-gray-900">{{ detail.title }}</h1>
          <van-tag :type="statusMap[detail.status].type" round>{{
            statusMap[detail.status].text
          }}</van-tag>
        </div>
        <p class="mt-4 text-sm leading-7 text-gray-500">{{ detail.description }}</p>
        <div class="mt-4 rounded-2xl bg-gray-50 p-3 text-sm text-gray-500">
          创建时间：{{ formatDateTime(detail.createdAt) }}
        </div>
      </section>

      <section class="mt-4 rounded-3xl bg-white p-4 shadow-sm">
        <h2 class="font-semibold text-gray-900">操作区</h2>
        <p class="mt-1 text-sm text-gray-500">演示普通按钮与按钮权限。</p>
        <div class="mt-4 flex gap-2">
          <van-button type="primary" round size="small" @click="handleAction">普通操作</van-button>
          <van-button
            v-permission="'demo:add'"
            type="success"
            round
            size="small"
            @click="handleAction"
            >权限操作</van-button
          >
        </div>
      </section>
    </template>
    <AppEmpty v-else description="详情不存在" />
  </div>
</template>
