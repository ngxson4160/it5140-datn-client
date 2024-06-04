<template>
  <div
    class="bg-white h-[150px] border rounded-lg flex py-2 px-4 hover:bg-[#1caf5705] hover:border-[#1caf573f] cursor-pointer"
  >
    <NuxtLink
      class="w-full flex items-center justify-between"
      target="_blank"
      :to="`/blog/${data.id}`"
    >
      <div class="flex items-center gap-x-2">
        <img :src="data.image" class="w-[162px] h-24 border rounded-md" />
        <div class="flex flex-col justify-between h-24">
          <p class="text-xl font-bold">{{ data.title }}</p>
          <p class="text-sm">{{ formatDateFull(data.createdAt) }}</p>
        </div>
      </div>
      <img
        src="@/assets/images/heart-gray.svg"
        class="w-8 h-8 cursor-pointer"
      />
    </NuxtLink>
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
