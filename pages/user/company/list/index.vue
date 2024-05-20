<template>
  <header-auth />
  <company-list />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect'],
});
</script>

<style scoped></style>
