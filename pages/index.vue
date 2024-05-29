<template>
  <header-guest />
  <home-page />
</template>

<script setup lang="ts">
definePageMeta({
  // middleware: ['redirect'],
  middleware: ['redirect-to-user-router'],
});
</script>

<style scoped></style>
