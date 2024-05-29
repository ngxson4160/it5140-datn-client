<template>
  <message-page />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'company-dashboard',
  // middleware: ['redirect'],
  roles: [ERole.COMPANY],
});
</script>

<style scoped></style>
