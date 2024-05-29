<template>
  <message-page />
</template>

<script setup lang="ts">
definePageMeta({
  roles: [ERole.USER],
  layout: 'user-dashboard',
  // middleware: ['redirect'],
});
</script>

<style scoped></style>
