<template>
  <header-guest />
  <job-list />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect'],
});
</script>

<style scoped></style>
