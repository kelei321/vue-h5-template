<template>
  <div class="px-4 py-4">
    <section class="rounded-3xl bg-white p-5 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
          <i-mdi-shield-account-outline class="text-[28px]" />
        </div>
        <div>
          <h1 class="text-lg font-semibold text-gray-900">管理员页面</h1>
          <p class="mt-1 text-sm text-gray-500">该页面用于演示路由角色权限。</p>
        </div>
      </div>
    </section>

    <section class="mt-4 rounded-3xl bg-white p-4 shadow-sm">
      <h2 class="font-semibold text-gray-900">访问规则</h2>
      <p class="mt-2 text-sm leading-6 text-gray-500">
        当前路由 meta.roles 配置为 admin。管理员账号可以访问，普通用户会跳转到 403 页面。
      </p>
      <div class="mt-4 rounded-2xl bg-gray-50 p-3 text-sm text-gray-500">
        meta.roles: ['admin']
      </div>
    </section>
  </div>
</template>
