<template>
  <header-auth class="border-b shadow-md" />
  <div class="bg-[#f2f5f8] flex gap-x-4 min-h-screen">
    <user-side-bar />
    <div class="flex-1 pt-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
