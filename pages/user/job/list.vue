<template>
  <header-auth />
  <job-list />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-to-guest-router'],
  roles: [ERole.USER],
});
</script>

<style scoped></style>
