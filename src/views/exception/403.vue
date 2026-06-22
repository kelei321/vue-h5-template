<template>
  <div class="flex min-h-[70vh] flex-col items-center justify-center px-8 text-center">
    <div
      class="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 text-orange-500"
    >
      <i-mdi-shield-alert-outline class="text-[44px]" />
    </div>
    <h1 class="text-xl font-semibold text-gray-900">暂无权限</h1>
    <p class="mt-2 text-sm leading-6 text-gray-500">当前账号没有访问该页面或操作的权限。</p>
    <RouterLink class="mt-6" to="/home">
      <van-button type="primary" round>返回首页</van-button>
    </RouterLink>
  </div>
</template>
