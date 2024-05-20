<template>
  <div class="h-full">
    <header-company class="shadow-md" />
    <div class="bg-[#f2f5f8] h-full flex gap-x-4">
      <company-side-bar />
      <div class="flex-1 pt-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
