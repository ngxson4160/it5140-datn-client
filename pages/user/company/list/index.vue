<template>
  <header-auth />
  <company-list />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-to-guest-router'],
});
</script>

<style scoped></style>
