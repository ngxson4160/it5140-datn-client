<template>
  <div
    class="bg-white flex items-center border w-[400px] h-[150px] rounded-md p-2 hover:bg-[#1caf5705] hover:border-[#1caf573f] cursor-pointer"
  >
    <NuxtLink
      class="w-full flex items-center justify-between"
      target="_blank"
      :to="`/job/${data?.id}`"
    >
      <div class="flex items-center">
        <img
          :src="data?.company?.avatar"
          class="w-24 h-24 object-contain border p-[2px] rounded-sm"
        />
        <div class="ml-4">
          <p class="font-bold w-[270px] text-one-line truncate">
            {{ data?.title }}
          </p>
          <p class="text-sm w-[270px] text-one-line truncate">
            Công ty cổ phần Vinhomes
            {{ data?.company?.name }}
          </p>
          <!-- <p class="text-sm text-danger w-[270px] text-one-line">$800 - $2500</p>
        <p class="text-sm w-[270px] text-one-line truncate">Đà Nẵng</p> -->
          <p
            v-if="data.salaryMin && data.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{
              `${(data.salaryMin / 1000000).toFixed(1)} triệu - ${(data.salaryMax / 1000000).toFixed(1)} triệu`
            }}
          </p>
          <p
            v-if="!data.salaryMin && data.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `Lên tới ${(data.salaryMax / 1000000).toFixed(1)} triệu` }}
          </p>
          <p
            v-if="data.salaryMin && !data.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `Ít nhất ${data.salaryMin / 1000000} triệu` }}
          </p>
          <p
            v-if="!data.salaryMin && !data.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `Thương lượng` }}
          </p>
          <div class="flex gap-x-1 w-[270px] truncate">
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
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  label: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped></style>
