<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <KeepAlive>
      <component :is="Component" v-if="route.meta.keepAlive" :key="route.fullPath" />
    </KeepAlive>
    <component :is="Component" v-if="!route.meta.keepAlive" :key="route.fullPath" />
  </RouterView>
</template>
