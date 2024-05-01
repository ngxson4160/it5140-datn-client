<template>
  <div
    class="bg-white flex items-center border h-[150px] rounded-lg py-2 px-4 hover:bg-[#1caf5705] hover:border-[#1caf573f]"
  >
    <div class="w-full flex items-center justify-between">
      <div class="flex">
        <img :src="data.job.company?.avatar" class="w-24 object-contain" />
        <div
          class="ml-4 cursor-pointer"
          @click="router.push(`/job/${data.job.id}`)"
        >
          <p class="font-bold text-one-line text-lg">
            {{ data.job.title }}
          </p>
          <p class="w-[270px] text-one-line">
            {{ data.job.company?.name }}
          </p>
          <p
            v-if="data.job.salaryMin && data.job.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `$ ${data.job.salaryMin}-${data.job.salaryMax}` }}
          </p>
          <p
            v-if="!data.job.salaryMin && data.job.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `$ Lên tới ${data.job.salaryMax}` }}
          </p>
          <p
            v-if="data.job.salaryMin && !data.job.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `$ Ít nhất ${data.job.salaryMin}` }}
          </p>
          <p
            v-if="!data.job.salaryMin && !data.job.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `$ Thương lượng` }}
          </p>
          <div class="flex gap-x-1">
            <div
              v-for="(city, index) in data.job.cities"
              :key="index"
              class="text-sm"
            >
              {{ city.name }}
              <span v-if="index !== data.job.cities.length - 1">,</span>
            </div>
          </div>
          <p class="text-gray text-sm">
            Kết thúc: {{ formatDateFull(data.job.hiringEndDate) }}
          </p>
          <el-tag
            v-for="(tag, index) in data.job.tags"
            :key="index"
            class="mr-1"
            type="primary"
          >
            {{ tag.name }}
          </el-tag>
        </div>
      </div>

      <div>
        <div class="flex items-center">
          <img src="@/assets/images/tick-gray.svg" class="w-6" />
          <p class="text-sm text-[#a3a8ad] rounded-xl italic">
            Ứng tuyển lúc {{ formatDateShort(data.job.createdAt) }}
          </p>
          <img src="@/assets/images/heart-gray.svg" class="w-10 ml-4" />
        </div>
        <p
          class="text-white text-sm py-[2px] px-2 rounded-xl w-fit"
          :class="{
            'bg-[#e6a23c]':
              data.status === 0 || data.status === 3 || data.status === 4,
            'bg-[#409eff]': data.status === 1,
            'bg-danger': data.status === 2 || data.status === 6,
            'bg-primary': data.status === 5,
            'bg-[#c8c9cc]': data.status === 7,
          }"
        >
          TT: {{ CApplicationStatus[data.status].name }}
        </p>

        <div class="mt-10 flex justify-between items-center">
          <div
            class="text-sm flex cursor-pointer"
            @click.stop="handleShowPreviewCV(data.candidateCv)"
          >
            <img src="@/assets/images/pdf-danger.svg" />
            <p class="ml-2 w-[125px]">Hồ sơ đính kèm</p>
          </div>
          <el-button round size="default" class="!h-7">Hủy ứng tuyển</el-button>
        </div>
      </div>
    </div>
  </div>

  <dialog-preview-cv
    v-model:dialog-visible="showCVPreview"
    :url="urlCVPreview"
  />
</template>

<script setup lang="ts">
import { CApplicationStatus } from '~/utils/constant/common';

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

const urlCVPreview = ref('');
const showCVPreview = ref(false);

const handleShowPreviewCV = (url: string) => {
  urlCVPreview.value = url;
  showCVPreview.value = true;
};
</script>

<style scoped></style>
