<template>
  <div class="p-2 rounded-lg">
    <div class="mt-10 w-[1500px] mx-auto">
      <el-carousel
        height="150px"
        arrow="always"
        trigger="click"
        :autoplay="false"
      >
        <el-carousel-item v-for="item in 5" :key="item">
          <div class="flex justify-center gap-6 w-full">
            <card-job-recommend
              v-for="(el, index) in data"
              :key="index"
              class="!h-[150px] w-[400px]"
              :data="el"
            />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
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
