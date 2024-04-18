<template>
  <!-- <img v-if="urlImages.absolutePath" :src="urlImages.absolutePath" />
  <UpLoadImage v-model:data-upload="urlImages" /> -->

  <!-- <div class="flex justify-center">
    <iframe
      v-if="urlImages.absolutePath"
      :src="urlImages.absolutePath"
      class="w-1/2 h-[500px]"
    ></iframe>
  </div>
  <drag-to-upload
    v-if="!urlImages.absolutePath"
    v-model:data-upload="urlImages"
  /> -->
  <!-- <header-guest /> -->
  <header-auth />
  <div class="bg-slate-500 h-[500px] flex items-center justify-center">
    <search-job />
  </div>
</template>

<script setup lang="ts">
// import { type IFileInformation, initFileInformation } from '@/stores/upload';
// const urlImages = ref<IFileInformation>(initFileInformation);
</script>
