<script setup lang="ts">
import { showToast } from 'vant'

import { API_BASE_URL, APP_ENV, APP_NAME, APP_VERSION, MOCK_ENABLED } from '@/constants/app'
import { local, session } from '@/utils/storage'

function clearCache() {
  local.clear()
  session.clear()
  showToast('本地缓存已清理')
}
</script>

<template>
  <div class="px-4 py-4">
    <section class="rounded-3xl bg-white p-5 shadow-sm">
      <div class="flex items-center gap-3">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-500"
        >
          <i-mdi-cellphone class="text-[28px]" />
        </div>
        <div>
          <h1 class="font-semibold text-gray-900">{{ APP_NAME }}</h1>
          <p class="text-sm text-gray-500">Vue3 + Vant4 H5 模板</p>
        </div>
      </div>
    </section>

    <section class="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm">
      <van-cell title="版本" :value="APP_VERSION" />
      <van-cell title="环境" :value="APP_ENV" />
      <van-cell title="API 地址" :value="API_BASE_URL" />
      <van-cell title="Mock" :value="MOCK_ENABLED ? '开启' : '关闭'" />
      <van-cell title="暗黑模式" label="已预留 CSS 变量，默认不启用切换" />
    </section>

    <section class="mt-4 rounded-3xl bg-white p-4 shadow-sm">
      <van-button block round type="primary" plain @click="clearCache">清除全部缓存</van-button>
    </section>
  </div>
</template>
