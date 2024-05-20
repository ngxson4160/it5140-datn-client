<template>
  <header-auth />
  <job-list />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect'],
});
</script>

<style scoped></style>
