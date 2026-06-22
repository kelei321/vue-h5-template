<script setup lang="ts">
import { showConfirmDialog, showToast } from 'vant'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { local, session } from '@/utils/storage'

const router = useRouter()
const userStore = useUserStore()
const user = computed(() => userStore.userInfo)

function goSettings() {
  router.push('/settings')
}

function clearCache() {
  session.clear()
  showToast('缓存已清理')
}

async function logout() {
  await showConfirmDialog({
    title: '退出登录',
    message: '确认退出当前账号吗？'
  })
  userStore.logout()
  local.clear()
  router.replace('/login')
}
</script>

<template>
  <div class="px-4 py-4">
    <section class="rounded-3xl bg-white p-5 shadow-sm">
      <div class="flex items-center gap-4">
        <div
          class="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-500"
        >
          <i-mdi-account-circle-outline class="text-[42px]" />
        </div>
        <div>
          <h1 class="text-xl font-semibold text-gray-900">{{ user?.nickname }}</h1>
          <p class="mt-1 text-sm text-gray-500">@{{ user?.username }}</p>
        </div>
      </div>
    </section>

    <section class="mt-4 rounded-3xl bg-white p-4 shadow-sm">
      <h2 class="mb-3 font-semibold text-gray-900">账号权限</h2>
      <van-cell title="角色" :value="user?.roles.join(', ')" />
      <van-cell title="权限" :label="user?.permissions.join(', ')" />
    </section>

    <section class="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm">
      <van-cell title="设置" is-link @click="goSettings">
        <template #icon><i-mdi-cog-outline class="mr-2 text-[20px] text-blue-500" /></template>
      </van-cell>
      <van-cell title="清除会话缓存" is-link @click="clearCache">
        <template #icon><i-mdi-broom class="mr-2 text-[20px] text-blue-500" /></template>
      </van-cell>
      <van-cell title="退出登录" is-link title-class="text-red-500" @click="logout">
        <template #icon><i-mdi-logout class="mr-2 text-[20px] text-red-500" /></template>
      </van-cell>
    </section>
  </div>
</template>
