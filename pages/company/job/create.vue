<template>
  <!-- <header-guest /> -->
  <div class="bg-[#f2f5f8] pb-20">
    <div class="w-[1200px]">
      <div class="mx-auto bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/edit-title-primary.svg" class="w-8 h-8" />
        <div>
          <p class="font-bold text-xl mb-4">Tiêu đề tuyển dụng</p>
          <el-input
            v-model="data.title"
            class="!h-10 !w-[1000px] input-border-b-only"
            placeholder="Nhập tiêu đề công việc"
          />
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/job-primary.svg" class="w-8 h-8" />
        <div>
          <p class="font-bold text-xl mb-4">Ngành nghề</p>
          <select-job-category
            v-model="data.jobCategoryId"
            :is-multiple="false"
          />
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img
          src="@/assets/images/information-circle-primary.svg"
          class="w-8 h-8"
        />

        <div class="w-full pr-12">
          <p class="font-bold text-xl mb-4">Thông tin chung</p>

          <div class="grid grid-cols-8 gap-x-10 gap-y-9">
            <div class="col-span-3">
              <p class="mb-2 text-sm text-gray">Số lượng tuyển</p>
              <el-input v-model="data.quantity" placeholder="Nhập số lượng" />
            </div>
            <div class="col-span-5">
              <p class="mb-2 text-sm text-gray">Loại công việc</p>
              <select-job-mode
                v-model="data.jobMode"
                class="w-[377px]"
                size="medium"
              />
            </div>

            <div class="col-span-3">
              <p class="mb-2 text-sm text-gray">Giới tính</p>
              <el-select v-model="data.gender" class="w-full">
                <el-option
                  v-for="(item, index) in genderOption"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="col-span-3">
              <p class="mb-2 text-sm text-gray">Cấp bậc</p>
              <select-job-level
                v-model="data.level"
                class="w-full"
                size="medium"
              />
            </div>
            <div class="col-span-2">
              <p class="mb-2 text-sm text-gray">Kinh nghiệm</p>
              <select-job-experience
                v-model="data.yearExperience"
                class="w-full"
                size="medium"
              />
            </div>
          </div>

          <p class="text-sm text-gray mt-9 mb-2">Thời gian làm việc</p>
          <el-input v-model="data.time" class="!w-[795px]" />

          <p class="text-sm text-gray mt-9 mb-2">Mức lương</p>
          <select-type-salary v-model:value="salary" />

          <p class="text-sm text-gray mt-9">Khu vực làm việc</p>
          <div v-for="(el, index) in region" :key="index" class="mt-2">
            <select-job-region
              v-model:value="region[index]"
              :index-region="index + 1"
            />
          </div>
          <el-button class="mt-4" type="primary" @click="handleAddRegion">
            Thêm khu vực
          </el-button>
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/edit-text-primary.svg" class="w-8 h-8" />
        <div>
          <p class="font-bold text-xl mb-4">Mô tả công việc</p>
          <div class="grow-1">
            <content-editor
              v-model:model-value="data.description"
              class="w-[1075px]"
              placeholder="Nhập nội dung mô tả công việc"
            />
          </div>
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/edit-text-primary.svg" class="w-8 h-8" />
        <div>
          <p class="font-bold text-xl mb-4">Yêu cầu ứng viên</p>
          <content-editor
            v-model:model-value="data.requirement"
            class="w-[1075px]"
            placeholder="Nhập nội dung mô tả yêu cầu ứng viên"
          />
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/edit-text-primary.svg" class="w-8 h-8" />
        <div>
          <p class="font-bold text-xl mb-4">Phúc lợi ứng viên</p>
          <content-editor
            v-model:model-value="data.benefits"
            class="w-[1075px]"
            placeholder="Nhập nội dung mô tả phúc lợi ứng viên"
          />
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/receive-box-primary.svg" class="w-8 h-8" />
        <div>
          <p class="font-bold text-xl mb-4">Thông tin nhận CV</p>

          <p class="mb-2 text-gray text-sm">Hạn chót nhận CV</p>
          <el-date-picker
            v-model="data.hiringEndDate"
            type="date"
            placeholder="dd/mm/yyyy"
            format="DD/MM/YYYY"
          />

          <!-- <p class="text-gray mt-6 mb-2 text-sm">Thông tin người nhận CV</p>
          <div class="w-[1000px] flex justify-between">
            <div>
              <p class="text-sm mb-1 text-gray">Họ và tên</p>
              <el-input class="!w-[300px] !h-10" placeholder="Họ và tên" />
            </div>
            <div>
              <p class="text-sm mb-1 text-gray">Email</p>
              <el-input class="!w-[300px] !h-10" placeholder="Số điện thoại" />
            </div>
            <div>
              <p class="text-sm mb-1 text-gray">Số điện thoại</p>
              <el-input class="!w-[300px] !h-10" placeholder="Email" />
            </div>
          </div> -->
        </div>
      </div>

      <div class="flex justify-end mt-10">
        <el-button type="primary" class="!h-10" @click="handleSubmitCreateJob">
          Đăng tin tuyển dụng
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IJobRegion } from '~/components/atoms/SelectJobRegion.vue';
import { EGender } from '~/types/common';
import type { IJobCreate } from '~/types/job';

definePageMeta({
  layout: 'company-dashboard',
});

const router = useRouter();

const genderOption = [
  {
    id: EGender.MALE,
    label: 'Nam',
    value: 0,
  },
  {
    id: EGender.FEMALE,
    label: 'Nữ',
    value: 1,
  },
  {
    id: EGender.OTHER,
    label: 'Khác',
    value: 2,
  },
  {
    id: 3,
    label: 'Không yêu cầu',
    value: null,
  },
];

const jobStore = useJobStore();

const salary = ref({
  salaryMin: null,
  salaryMax: null,
});
const region = ref<IJobRegion[]>([
  {
    cityId: null,
    cityName: '',
    address: [
      {
        districtId: null,
        districtName: '',
        data: '',
      },
    ],
  },
]);
const data = ref<IJobCreate>({ ...initCreateJob });

const handleAddRegion = () => {
  region.value.push({
    cityId: null,
    cityName: '',
    address: [
      {
        districtId: null,
        districtName: '',
        data: '',
      },
    ],
  });
};

const handleSubmitCreateJob = async () => {
  // if (region.value?.cityId) data.value.cityIds = [region.value?.cityId];

  region.value.forEach((el) => {
    if (el.cityId) data.value.cityIds.push(el.cityId);
  });

  data.value.salaryMin = salary.value.salaryMin ? +salary.value.salaryMin : 0;
  data.value.salaryMax = salary.value.salaryMax ? +salary.value.salaryMax : 0;
  data.value.quantity = +data.value.quantity;

  const dateFormat = new Date(data.value.hiringEndDate);
  data.value.hiringEndDate = dateFormat.toISOString();
  const timeNow = new Date();
  data.value.hiringStartDate = timeNow.toISOString();

  // const address = region.value?.address.map((el) => {
  //   return {
  //     cityId: region.value?.cityId,
  //     cityName: region.value?.cityName,
  //     data: `${el.data}, ${el.districtName}, ${region.value?.cityName}`,
  //   };
  // });

  const addressData = [] as object[];
  region.value.forEach((el) => {
    el.address.forEach((address) => {
      addressData.push({
        cityId: el.cityId,
        cityName: el.cityName,
        data: `${address.data}, ${address.districtName}, ${el.cityName}`,
      });
    });
  });

  await jobStore.createJob({
    ...data.value,
    status: 1,
    // address: addressData ?? [],
    address: region.value ?? [],
  });

  router.push('/company/job/list');
};
</script>

<style scoped></style>
