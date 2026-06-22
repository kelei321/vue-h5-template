<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { APP_NAME } from '@/constants/app'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const form = reactive({
  username: 'admin',
  password: '123456'
})

const accounts = [
  { username: 'admin', password: '123456', label: '管理员' },
  { username: 'user', password: '123456', label: '普通用户' }
]

function useAccount(account: (typeof accounts)[number]) {
  form.username = account.username
  form.password = account.password
}

async function handleLogin() {
  loading.value = true
  try {
    await userStore.login(form)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/home'
    router.replace(redirect)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 px-5 py-10">
    <div class="mx-auto max-w-[420px] pt-10">
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500 text-white shadow-lg shadow-blue-200"
        >
          <i-mdi-cellphone class="text-[34px]" />
        </div>
        <h1 class="text-2xl font-semibold text-gray-900">{{ APP_NAME }}</h1>
        <p class="mt-2 text-sm text-gray-500">Vue3 + Vant4 H5 通用模板</p>
      </div>

      <div class="rounded-3xl bg-white p-5 shadow-sm">
        <van-form @submit="handleLogin">
          <van-cell-group inset>
            <van-field
              v-model="form.username"
              name="username"
              label="账号"
              placeholder="请输入账号"
              :rules="[{ required: true, message: '请输入账号' }]"
            />
            <van-field
              v-model="form.password"
              type="password"
              name="password"
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '请输入密码' }]"
            />
          </van-cell-group>
          <div class="mt-6 px-4">
            <van-button round block type="primary" native-type="submit" :loading="loading"
              >登录</van-button
            >
          </div>
        </van-form>
      </div>

      <div class="mt-4 rounded-3xl bg-white p-4 text-sm shadow-sm">
        <div class="mb-3 font-medium text-gray-900">测试账号</div>
        <div class="space-y-2">
          <button
            v-for="account in accounts"
            :key="account.username"
            class="flex w-full items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 text-left"
            type="button"
            @click="useAccount(account)"
          >
            <span class="text-gray-700">{{ account.label }}</span>
            <span class="text-gray-400">{{ account.username }} / {{ account.password }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
