<template>
  <company-list />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'user-header',
  // middleware: ['redirect'],
  middleware: ['redirect-to-guest-router'],
  roles: [ERole.USER],
});
</script>

<style scoped></style>
