<template>
  <!-- <header-auth /> -->
  <home-page :role="ERole.COMPANY" />
</template>

<script setup lang="ts">
definePageMeta({
  // middleware: ['redirect'],
  layout: 'user-header',
  middleware: ['redirect-to-guest-router'],
  roles: [ERole.USER],
});
</script>

<style scoped></style>
