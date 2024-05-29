<template>
  <message-page />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'user-dashboard',
  // middleware: ['redirect'],
  roles: [ERole.USER],
});
</script>

<style scoped></style>
