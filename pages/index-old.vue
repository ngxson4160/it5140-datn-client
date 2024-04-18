<template>
  <div>
    index landing pagedasd ddsad dasdad xxxxx {{ authStore.email }}
    <UIcon name="i-heroicons-light-bulb" />
    <div>test github action deploy</div>
    <el-button type="primary">test</el-button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['system-only'],
  roles: [ERole.ROOT, ERole.ADMIN],
});

const authStore = useAuthStore();
</script>

<style scoped></style>
