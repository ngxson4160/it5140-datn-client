<template>
  <div class="bg-[#f2f5f8] pb-20">
    <div class="grid grid-cols-8 mr-4 mx-auto gap-x-6">
      <div class="col-span-6">
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <div class="bg-[#f8f9fa] rounded-md px-4 py-2 flex flex-col gap-y-4">
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
                <span>Kết thúc: {{ formatDateShort(job.hiringEndDate) }}</span>
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
              <div v-for="(address, index) in job.address" :key="index">
                <p v-for="(data, index) in address.address" :key="index">
                  {{
                    `• ${data.data}, ${data.districtName}, ${address.cityName}`
                  }}
                </p>
              </div>
            </div>

            <h2 class="border-l-title mt-6">Thời gian làm việc</h2>
            <div class="text-sm">
              <p>{{ `• ${job.time}` }}</p>
            </div>
          </div>
        </div>

        <div class="flex gap-x-6 mt-4 justify-end">
          <el-button
            class="w-[200px]"
            size="large"
            @click="router.push('/company/job/list')"
          >
            Quay lại
          </el-button>
          <el-button
            class="w-[200px]"
            type="primary"
            size="large"
            @click="router.push(`/company/job/${params.id}/edit`)"
          >
            Chỉnh sửa
          </el-button>
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
              <p class="font-bold text-sm">
                {{ CCompanySizeType[company?.sizeType].name }}
              </p>
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
            class="flex items-center justify-center gap-x-1 mt-4 text-sm text-green cursor-pointer"
          >
            <p>Xem chi tiết công ty</p>
            <img src="@/assets/images/newscreen-primary.svg" class="w-[22px]" />
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
</template>

<script setup lang="ts">
import { VGender } from '~/types/common';
import { CCompanySizeType } from '~/utils/constant/common';
import { CJobExperience, CJobLevel, CJobMode } from '~/utils/constant/job';

definePageMeta({
  layout: 'company-dashboard',
  middleware: ['redirect'],
});

const job = ref();
const company = ref();

const { params } = useRoute();
const router = useRouter();

const jobStore = useJobStore();
const { data, error } = await jobStore.getJob(+params.id);
if (error && error.meta.statusCode === 400) {
  router.push('/404');
}
job.value = data.job;
company.value = data.company;
</script>

<style scoped></style>
