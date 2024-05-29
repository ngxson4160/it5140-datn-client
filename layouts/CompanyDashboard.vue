<template>
  <div>
    <header-company class="border-b shadow-md" />
    <div class="bg-[#f2f5f8] flex gap-x-4 md:h-screen">
      <div class="bg-[#f2f5f8]">
        <company-side-bar />
      </div>
      <div class="flex-1 pt-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
