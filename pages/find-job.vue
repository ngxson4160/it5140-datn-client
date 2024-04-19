<template>
  <div class="h-[200px] bg-[#007c32b8] flex items-center justify-center">
    <span class="text-6xl font-bold text-center text-white">
      Find Your Dream Job
    </span>
  </div>

  <job-filter class="mx-auto" />

  <div class="flex flex-col items-center mt-2">
    <card-job-full class="mt-1 w-[1220px]" />
    <card-job-full class="mt-1 w-[1220px]" />
    <card-job-full class="mt-1 w-[1220px]" />
    <card-job-full class="mt-1 w-[1220px]" />
    <card-job-full class="mt-1 w-[1220px]" />
    <card-job-full class="mt-1 w-[1220px]" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'guest',
});
</script>

<style scoped></style>
