<template>
  <div
    class="bg-white flex items-center border h-[150px] rounded-lg py-2 px-4 hover:bg-[#1caf5705] hover:border-[#1caf573f] cursor-pointer"
  >
    <div class="w-full flex items-center justify-between">
      <div class="flex">
        <img :src="data.creator.company.avatar" class="w-24 object-contain" />
        <div class="ml-4">
          <p class="font-bold text-one-line text-lg">
            {{ data.title }}
          </p>
          <p class="w-[270px] text-one-line">
            {{ data.creator.company.name }}
          </p>
          <p class="text-sm text-danger text-one-line">
            ${{ `${data.salaryMin}-${data.salaryMax}` }}
          </p>
          <!-- <p class="text-sm text-one-line">{{data.city}}</p> -->
          <div class="flex">
            <div v-for="city in data.city" :key="city" class="text-sm">
              {{ city }}
            </div>
          </div>
          <el-tag
            v-for="city in data.city"
            :key="city"
            class="mr-1"
            type="primary"
          >
            {{ city }}
          </el-tag>
        </div>
      </div>
      <div class="flex flex-col justify-between items-end">
        <img src="@/assets/images/heart-gray.svg" class="w-10" />
        <p class="text-gray mt-10">Thời gian: 18/04/2024 - 31/12/2024</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: () => InitJob,
  },
  label: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped></style>
