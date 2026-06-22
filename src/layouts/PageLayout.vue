<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const title = computed(() => route.meta.title || '')

function goBack() {
  if (window.history.length > 1) {
    router.back()
    return
  }
  router.replace('/home')
}
</script>

<template>
  <main class="app-page min-h-screen">
    <van-nav-bar
      :title="title"
      left-arrow
      fixed
      placeholder
      safe-area-inset-top
      @click-left="goBack"
    />
    <RouterView />
  </main>
</template>
