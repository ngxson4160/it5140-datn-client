<template>
  <header-auth />
  <home-page :role="ERole.COMPANY" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect'],
});
</script>

<style scoped></style>
