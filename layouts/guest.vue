<template>
  <div class="mx-auto">
    <header-guest />
    <div class="bg-[#F2F5F8] h-full">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const commonStore = useCommonStore();
</script>

<style lang="scss" scoped></style>
