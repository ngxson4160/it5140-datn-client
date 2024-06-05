<template>
  <div>
    <header-company class="border-b shadow-sm sticky top-0 bg-white z-10" />
    <div class="bg-[#f2f5f8] flex gap-x-4 min-h-screen">
      <div class="bg-[#f2f5f8]">
        <company-side-bar class="sticky top-20 bg-white z-10" />
      </div>
      <div class="flex-1 pt-4">
        <slot />
      </div>
    </div>
  </div>
  <footer-home />
</template>

<script setup lang="ts"></script>

<style scoped></style>
