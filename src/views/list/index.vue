<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { getDemoListApi } from '@/api/modules/demo'
import type { DemoItem, DemoStatus } from '@/api/types/demo'
import AppEmpty from '@/components/AppEmpty/index.vue'
import { formatDateTime } from '@/utils/dayjs'

const router = useRouter()
const loading = ref(false)
const refreshing = ref(false)
const finished = ref(false)
const list = ref<DemoItem[]>([])

const query = reactive({
  page: 1,
  pageSize: 10,
  keyword: '',
  status: '' as DemoStatus | ''
})

const statusOptions = [
  { text: '全部', value: '' },
  { text: '待处理', value: 'pending' },
  { text: '进行中', value: 'processing' },
  { text: '已完成', value: 'done' }
]

function getStatusText(status: DemoStatus) {
  return statusOptions.find((item) => item.value === status)?.text || status
}

function getStatusType(status: DemoStatus) {
  if (status === 'done') return 'success'
  if (status === 'processing') return 'primary'
  return 'warning'
}

async function loadList(reset = false) {
  if (reset) {
    query.page = 1
    finished.value = false
  }

  const result = await getDemoListApi(query)
  if (reset) {
    list.value = result.list
  } else {
    list.value.push(...result.list)
  }

  finished.value = list.value.length >= result.total
  query.page += 1
}

async function onLoad() {
  loading.value = true
  try {
    await loadList()
  } finally {
    loading.value = false
  }
}

async function onRefresh() {
  try {
    await loadList(true)
  } finally {
    refreshing.value = false
  }
}

function handleSearch() {
  onRefresh()
}

function goDetail(item: DemoItem) {
  router.push(`/detail/${item.id}`)
}

onMounted(() => {
  onRefresh()
})
</script>

<template>
  <div class="px-4 py-4">
    <div class="mb-3 rounded-3xl bg-white p-3 shadow-sm">
      <van-search
        v-model="query.keyword"
        placeholder="搜索标题或描述"
        shape="round"
        @search="handleSearch"
        @clear="handleSearch"
      />
      <van-tabs v-model:active="query.status" shrink @change="handleSearch">
        <van-tab
          v-for="item in statusOptions"
          :key="item.value"
          :name="item.value"
          :title="item.text"
        />
      </van-tabs>
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-if="list.length" class="space-y-3">
          <button
            v-for="item in list"
            :key="item.id"
            class="w-full rounded-3xl bg-white p-4 text-left shadow-sm"
            type="button"
            @click="goDetail(item)"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0 flex-1">
                <h3 class="truncate font-semibold text-gray-900">{{ item.title }}</h3>
                <p class="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                  {{ item.description }}
                </p>
              </div>
              <van-tag :type="getStatusType(item.status)" round>{{
                getStatusText(item.status)
              }}</van-tag>
            </div>
            <div class="mt-3 flex items-center gap-1 text-xs text-gray-400">
              <i-mdi-clock-outline />
              {{ formatDateTime(item.createdAt) }}
            </div>
          </button>
        </div>
        <AppEmpty v-else-if="finished" description="暂无列表数据" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
