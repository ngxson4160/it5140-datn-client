<template>
  <blog-detail is-company />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'company-dashboard',

  roles: [ERole.COMPANY],
});
</script>

<style scoped></style>
