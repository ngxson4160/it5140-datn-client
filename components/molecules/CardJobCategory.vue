<template>
  <div class="card-job-category">
    <img class="h-10" src="@/assets/images/job-search-home.svg" />
    <p class="text-center mb-2 mt-6 text-sm font-bold">{{ data?.title }}</p>
    <p class="text-grey">{{ data?.totalJob }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
