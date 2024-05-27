<template>
  <message-page />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'user-dashboard',
  middleware: ['redirect'],
});
</script>

<style scoped></style>
