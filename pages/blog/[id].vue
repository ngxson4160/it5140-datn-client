<template>
  <blog-detail />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'guest',
  middleware: 'redirect-to-user-router',
});
</script>

<style scoped></style>
