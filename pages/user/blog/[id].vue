<template>
  <div class="pt-4 flex justify-center">
    <blog-detail />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'user-header',
  middleware: ['redirect-to-guest-router'],
  roles: [ERole.USER],
});
</script>

<style scoped></style>
