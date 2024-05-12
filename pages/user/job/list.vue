<template>
  <header-auth />
  <job-list />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-to-guest-router'],
});
</script>

<style scoped></style>
