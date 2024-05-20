<template>
  <header-guest />
  <home-page />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect'],
});
</script>

<style scoped></style>
