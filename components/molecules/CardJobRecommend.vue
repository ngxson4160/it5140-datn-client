<template>
  <div
    class="bg-white flex items-center border rounded-md p-2 hover:bg-[#1caf5705] hover:border-[#1caf573f] cursor-pointer overflow-hidden"
  >
    <NuxtLink
      class="w-full flex items-center justify-between"
      target="_blank"
      :to="`/job/${data?.id}`"
    >
      <div class="flex items-center">
        <img
          :src="data.company?.avatar"
          class="w-24 h-24 object-contain border p-[2px] rounded-sm"
        />
        <div class="ml-4">
          <p :class="`w-[${width}px] font-bold text-one-line truncate`">
            {{ data?.title }}
          </p>
          <p :class="`text-sm w-[${width}px] text-one-line truncate`">
            {{ data?.company?.name }}
          </p>

          <!-- -->
          <p
            v-if="data?.salaryMin && data?.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{
              `${(data?.salaryMin / 1000000).toFixed(1)} triệu - ${(data?.salaryMax / 1000000).toFixed(1)} triệu`
            }}
          </p>
          <p
            v-if="!data?.salaryMin && data?.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `Lên tới ${(data?.salaryMax / 1000000).toFixed(1)} triệu` }}
          </p>
          <p
            v-if="data?.salaryMin && !data?.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `Ít nhất ${data?.salaryMin / 1000000} triệu` }}
          </p>
          <p
            v-if="!data?.salaryMin && !data?.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `Thương lượng` }}
          </p>
          <!--  -->
          <div class="flex gap-x-1 w-[600px] truncate">
            <div
              v-for="(city, index) in data.cities"
              :key="index"
              class="text-sm"
            >
              {{ city.name }}
              <span v-if="index !== data.cities.length - 1">,</span>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { number } from 'yup';

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  height: {
    type: String,
    default: '150',
  },
  width: {
    type: String,
    default: '270',
  },
});
</script>

<style scoped></style>
