<template>
  <div>
    <div class="h-[125px] bg-[#007c32b8] flex items-center justify-center">
      <span class="text-5xl font-bold text-center text-white">Job Detail</span>
    </div>

    <div class="bg-[#f2f5f8] pt-4 pb-20">
      <div class="grid grid-cols-7 w-[1300px] mx-auto gap-x-6">
        <div class="col-span-5">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div
              class="bg-[#f8f9fa] rounded-md px-4 py-2 flex flex-col gap-y-4"
            >
              <p class="font-bold text-xl">{{ job.title }}</p>
              <p
                v-if="job.salaryMin && job.salaryMax"
                class="text-sm text-danger text-one-line"
              >
                {{ `$ ${job.salaryMin}-${job.salaryMax}` }}
              </p>
              <p
                v-if="!job.salaryMin && job.salaryMax"
                class="text-sm text-danger text-one-line"
              >
                {{ `$ Lên tới ${job.salaryMax}` }}
              </p>
              <p
                v-if="job.salaryMin && !job.salaryMax"
                class="text-sm text-danger text-one-line"
              >
                {{ `$ Ít nhất ${job.salaryMin}` }}
              </p>
              <p
                v-if="!job.salaryMin && !job.salaryMax"
                class="text-sm text-danger text-one-line"
              >
                {{ `$ Thương lượng` }}
              </p>
              <div class="flex text-sm gap-x-2">
                <div class="flex items-center gap-x-1">
                  <img src="@/assets/images/time-gray.svg" class="w-5" />
                  <span>Kết thúc: {{ formatDateFull(job.hiringEndDate) }}</span>
                </div>
                <div class="flex items-center gap-x-1">
                  <img src="@/assets/images/view-gray.svg" class="w-6" />
                  <span>{{ `${job.totalViews} lượt xem` }}</span>
                </div>
                <div class="flex items-center gap-x-1">
                  <img src="@/assets/images/two-guy-gray.svg" class="w-6" />
                  <span>{{ `${job.totalCandidate} Lượt ứng tuyển` }}</span>
                </div>
                <div class="flex items-center gap-x-1">
                  <img src="@/assets/images/location-gray.svg" class="w-6" />
                  <p v-for="(city, index) in job.cities" :key="index">
                    {{
                      `${city.name} ${index !== job.cities.length - 1 ? ',' : ''}`
                    }}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-4">
                <el-button
                  v-if="job.application.status"
                  type="info"
                  class="col-span-3 !h-10"
                  disabled
                >
                  Đã ứng tuyển
                </el-button>
                <el-button
                  v-else
                  type="primary"
                  class="col-span-3 !h-10"
                  @click="handleApplyJob"
                >
                  Ứng tuyển ngay
                </el-button>
                <el-button class="col-span-1 !h-10" @click="handleFollowJob">
                  <img
                    src="@/assets/images/heart-border-gray.svg"
                    class="w-6 mr-1"
                  />
                  Lưu công việc này
                </el-button>
              </div>
            </div>

            <div class="mt-10">
              <h2 class="border-l-title">Mô tả công việc</h2>
              <div class="tiptap" v-html="job.description"></div>
              <h2 class="border-l-title mt-6">Yêu cầu công việc</h2>
              <div class="tiptap" v-html="job.requirement"></div>
              <h2 class="border-l-title mt-6">Phúc lợi cho bạn</h2>
              <div class="tiptap" v-html="job.benefits"></div>
              <h2 class="border-l-title mt-6">Địa điểm làm việc</h2>
              <div class="text-sm">
                <p v-for="(address, index) in job.address" :key="index">
                  {{ `• ${address.data}` }}
                </p>
              </div>

              <h2 class="border-l-title mt-6">Thời gian làm việc</h2>
              <div class="text-sm">
                <p>{{ `• ${job.time}` }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-2">
          <div class="bg-white rounded-lg px-6 py-4">
            <div class="grid grid-cols-3 gap-x-4 gap-y-2">
              <div class="col-span-1">
                <img
                  :src="company?.avatar"
                  class="w-[88px] h-[88px] object-contain border rounded-md"
                />
              </div>
              <div class="col-span-2">
                <p class="font-bold">{{ company?.name }}</p>
              </div>
              <div class="col-span-1">
                <div class="flex">
                  <p class="text-sm text-gray">Quy mô:</p>
                </div>
              </div>
              <div class="col-span-2">
                <p class="font-bold text-sm">{{ company?.totalStaff }}</p>
              </div>
              <div class="col-span-1">
                <div class="flex"></div>
                <p class="text-sm text-gray">Địa điểm:</p>
              </div>
              <div class="col-span-2">
                <p class="font-bold text-sm">{{ company?.primaryAddress }}</p>
              </div>
            </div>
            <div
              class="flex items-center justify-center gap-x-1 mt-4 text-sm text-primary cursor-pointer"
            >
              <p>Xem chi tiết công ty</p>
              <img
                src="@/assets/images/newscreen-primary.svg"
                class="w-[22px]"
              />
            </div>
          </div>

          <div class="mt-6 px-6 py-4 bg-white round-lg">
            <p class="text-xl font-bold mb-4">Thông tin chung</p>
            <div class="grid grid-cols-2">
              <div class="flex items-center gap-x-2">
                <img src="@/assets/images/medal-primary.svg" class="w-6" />
                <span class="text-sm">Cấp bậc:</span>
              </div>
              <div class="flex items-center text-sm font-bold">
                {{ CJobLevel[job.level].name }}
              </div>
            </div>
            <div class="grid grid-cols-2 mt-3">
              <div class="flex items-center gap-x-2">
                <img src="@/assets/images/hourglass-primary.svg" class="w-6" />
                <span class="text-sm">Kinh nghiệm:</span>
              </div>
              <div class="flex items-center text-sm font-bold">
                {{ CJobExperience[job.yearExperience].name }}
              </div>
            </div>
            <div class="grid grid-cols-2 mt-3">
              <div class="flex items-center gap-x-2">
                <img src="@/assets/images/bag-primary.svg" class="w-6" />
                <span class="text-sm">Hình thức:</span>
              </div>
              <div class="flex items-center text-sm font-bold">
                {{ CJobMode[job.jobMode].name }}
              </div>
            </div>
            <div class="grid grid-cols-2 mt-3">
              <div class="flex items-center gap-x-2">
                <img
                  src="@/assets/images/dollar-circle-primary.svg"
                  class="w-6"
                />
                <span class="text-sm">Mức lương:</span>
              </div>
              <div class="flex items-center text-sm font-bold">
                <p
                  v-if="job.salaryMin && job.salaryMax"
                  class="text-sm text-danger text-one-line"
                >
                  {{ `$ ${job.salaryMin}-${job.salaryMax}` }}
                </p>
                <p
                  v-if="!job.salaryMin && job.salaryMax"
                  class="text-sm text-danger text-one-line"
                >
                  {{ `$ Lên tới ${job.salaryMax}` }}
                </p>
                <p
                  v-if="job.salaryMin && !job.salaryMax"
                  class="text-sm text-danger text-one-line"
                >
                  {{ `$ Ít nhất ${job.salaryMin}` }}
                </p>
                <p
                  v-if="!job.salaryMin && !job.salaryMax"
                  class="text-sm text-danger text-one-line"
                >
                  {{ `$ Thương lượng` }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 mt-3">
              <div class="flex items-center gap-x-2">
                <img src="@/assets/images/two-guy-primary.svg" class="w-6" />
                <span class="text-sm">Số lượng:</span>
              </div>
              <div class="flex items-center text-sm font-bold">
                {{ job.quantity }}
              </div>
            </div>
            <div class="grid grid-cols-2 mt-3">
              <div class="flex items-center gap-x-2">
                <img src="@/assets/images/gender-primary.svg" class="w-6" />
                <span class="text-sm">Giới tính:</span>
              </div>
              <div class="flex items-center text-sm font-bold">
                {{ VGender[job.gender] ?? 'Không yêu cầu' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VGender } from '~/types/common';
import { CJobExperience, CJobLevel, CJobMode } from '~/utils/constant/job';

const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
  company: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['onApplyJob', 'onFollowJob']);

const handleApplyJob = () => {
  emits('onApplyJob');
};

const handleFollowJob = () => {
  emits('onFollowJob');
};
</script>

<style scoped></style>
