<template>
  <header-auth />
  <company-list />
</template>

<script setup lang="ts">
definePageMeta({
  // middleware: ['redirect'],
  middleware: ['redirect-to-guest-router'],
  roles: [ERole.USER],
});
</script>

<style scoped></style>
