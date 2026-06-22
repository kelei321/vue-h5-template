<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function switchTab(path: string) {
  if (route.path !== path) {
    router.push(path)
  }
}
</script>

<template>
  <main class="app-page min-h-screen safe-tabbar-bottom">
    <RouterView />
    <van-tabbar
      :model-value="route.path"
      fixed
      safe-area-inset-bottom
      placeholder
      @change="switchTab"
    >
      <van-tabbar-item name="/home">
        <template #icon>
          <i-mdi-home-outline class="text-[22px]" />
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item name="/list">
        <template #icon>
          <i-mdi-format-list-bulleted class="text-[22px]" />
        </template>
        列表
      </van-tabbar-item>
      <van-tabbar-item name="/mine">
        <template #icon>
          <i-mdi-account-outline class="text-[22px]" />
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </main>
</template>
