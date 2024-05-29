<template>
  <header-guest />
  <job-list />
</template>

<script setup lang="ts">
definePageMeta({
  // middleware: ['redirect'],
  middleware: ['redirect-to-user-router'],
});
</script>

<style scoped></style>
