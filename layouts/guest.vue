<template>
  <div class="max-auto">
    <header-guest />
    <slot />
  </div>
</template>

<script lang="ts" setup>
const commonStore = useCommonStore();
</script>

<style lang="scss" scoped></style>
