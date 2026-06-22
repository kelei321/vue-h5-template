<script setup lang="ts">
interface Props {
  description?: string
}

withDefaults(defineProps<Props>(), {
  description: '暂无数据'
})
</script>

<template>
  <van-empty image="search" :description="description">
    <slot />
  </van-empty>
</template>
