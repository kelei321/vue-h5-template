<script setup lang="ts">
import { showToast } from 'vant'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { getUserInfoApi } from '@/api/modules/user'
import { usePermission } from '@/hooks/usePermission'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const { hasPermission } = usePermission()

const nickname = computed(() => userStore.userInfo?.nickname || '用户')

const entries = [
  { title: '列表演示', icon: 'list', path: '/list' },
  { title: '权限演示', icon: 'shield', path: '/admin-demo' },
  { title: '设置', icon: 'setting', path: '/settings' },
  { title: '我的', icon: 'user', path: '/mine' }
]

async function requestUserInfo() {
  const user = await getUserInfoApi()
  showToast(`当前用户：${user.nickname}`)
}

function go(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="px-4 py-4">
    <section class="rounded-3xl bg-gradient-to-r from-blue-500 to-sky-400 p-5 text-white shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm opacity-90">欢迎回来</p>
          <h1 class="mt-1 text-2xl font-semibold">{{ nickname }}</h1>
        </div>
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
          <i-mdi-hand-wave-outline class="text-[28px]" />
        </div>
      </div>
      <p class="mt-4 text-sm opacity-90">这是一个内置登录、权限、请求和 Mock 的 H5 模板。</p>
    </section>

    <section class="mt-4 grid grid-cols-4 gap-3 rounded-3xl bg-white p-4 shadow-sm">
      <button
        v-for="entry in entries"
        :key="entry.title"
        class="flex flex-col items-center gap-2 text-xs text-gray-600"
        type="button"
        @click="go(entry.path)"
      >
        <span
          class="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-500"
        >
          <i-mdi-format-list-bulleted v-if="entry.icon === 'list'" class="text-[24px]" />
          <i-mdi-shield-account-outline v-else-if="entry.icon === 'shield'" class="text-[24px]" />
          <i-mdi-cog-outline v-else-if="entry.icon === 'setting'" class="text-[24px]" />
          <i-mdi-account-outline v-else class="text-[24px]" />
        </span>
        {{ entry.title }}
      </button>
    </section>

    <section class="mt-4 grid grid-cols-3 gap-3">
      <div class="rounded-3xl bg-white p-4 shadow-sm">
        <p class="text-xs text-gray-500">今日访问</p>
        <p class="mt-2 text-xl font-semibold text-gray-900">128</p>
      </div>
      <div class="rounded-3xl bg-white p-4 shadow-sm">
        <p class="text-xs text-gray-500">待处理</p>
        <p class="mt-2 text-xl font-semibold text-gray-900">8</p>
      </div>
      <div class="rounded-3xl bg-white p-4 shadow-sm">
        <p class="text-xs text-gray-500">完成率</p>
        <p class="mt-2 text-xl font-semibold text-gray-900">92%</p>
      </div>
    </section>

    <section class="mt-4 rounded-3xl bg-white p-4 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-semibold text-gray-900">请求示例</h2>
          <p class="mt-1 text-sm text-gray-500">调用 GET /api/user/info</p>
        </div>
        <van-button size="small" type="primary" round @click="requestUserInfo">请求</van-button>
      </div>
    </section>

    <section class="mt-4 rounded-3xl bg-white p-4 shadow-sm">
      <h2 class="font-semibold text-gray-900">权限示例</h2>
      <p class="mt-1 text-sm text-gray-500">普通用户无法访问管理员入口。</p>
      <div class="mt-4 flex gap-2">
        <van-button size="small" round type="primary" plain @click="go('/admin-demo')"
          >访问管理员页面</van-button
        >
        <van-button v-permission="'demo:add'" size="small" round type="success"
          >新增按钮权限</van-button
        >
      </div>
      <p class="mt-3 text-xs text-gray-400">
        当前 demo:add 权限：{{ hasPermission('demo:add') ? '有' : '无' }}
      </p>
    </section>
  </div>
</template>
