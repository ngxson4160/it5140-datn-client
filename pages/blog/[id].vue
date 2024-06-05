<template>
  <div class="pt-4 flex justify-center">
    <blog-detail />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'guest',
  middleware: 'redirect-to-user-router',
});
</script>

<style scoped></style>
