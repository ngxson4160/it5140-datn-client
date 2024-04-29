<template>
  <div
    class="bg-white flex items-center border h-[150px] rounded-lg py-2 px-4 hover:bg-[#1caf5705] hover:border-[#1caf573f] cursor-pointer"
    @click="router.push(`/job/${data.id}`)"
  >
    <div class="w-full flex items-center justify-between">
      <div class="flex">
        <img :src="data.company?.avatar" class="w-24 object-contain" />
        <div class="ml-4">
          <p class="font-bold text-one-line text-lg">
            {{ data.title }}
          </p>
          <p class="w-[270px] text-one-line">
            {{ data.company?.name }}
          </p>
          <p
            v-if="data.salaryMin && data.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `$ ${data.salaryMin}-${data.salaryMax}` }}
          </p>
          <p
            v-if="!data.salaryMin && data.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `$ Lên tới ${data.salaryMax}` }}
          </p>
          <p
            v-if="data.salaryMin && !data.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `$ Ít nhất ${data.salaryMin}` }}
          </p>
          <p
            v-if="!data.salaryMin && !data.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `$ Thương lượng` }}
          </p>
          <!-- <p class="text-sm text-one-line">{{data.city}}</p> -->
          <div class="flex gap-x-1">
            <div
              v-for="(city, index) in data.cities"
              :key="index"
              class="text-sm"
            >
              {{ city.name }}
              <span v-if="index !== data.cities.length - 1">,</span>
            </div>
          </div>
          <el-tag
            v-for="(tag, index) in data.tags"
            :key="index"
            class="mr-1"
            type="primary"
          >
            {{ tag.name }}
          </el-tag>
        </div>
      </div>
      <div class="flex flex-col justify-between items-end">
        <img src="@/assets/images/heart-gray.svg" class="w-10" />
        <p class="text-gray mt-10">
          Kết thúc: {{ formatDateFull(data.hiringEndDate) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';

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

const router = useRouter();
</script>

<style scoped></style>
