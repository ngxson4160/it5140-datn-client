<template>
  <div class="h-full">
    <header-auth class="border-b shadow-md" />
    <div class="bg-[#f2f5f8] h-full flex gap-x-4 pt-4">
      <company-side-bar />
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
