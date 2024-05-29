<template>
  <div>About Us Page</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'guest',
  middleware: ['redirect-to-user-router'],
});
</script>

<style scoped></style>
