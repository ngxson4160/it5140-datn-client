<template>
  <div
    v-loading="commonStore.loading"
    class="flex bg-stone-cs dark:bg-slate-950 dark:text-gray-400"
  >
    <Sidebar />
    <div class="flex flex-col flex-1">
      <Header />
      <div class="flex flex-col flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const commonStore = useCommonStore()
</script>

<style lang="scss" scoped></style>
