<template>
  <div class="bg-[#f2f5f8] pb-20">
    <el-form
      ref="ruleForm"
      label-position="top"
      :model="data"
      :rules="rules"
      class="w-[1200px]"
    >
      <div class="mx-auto bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/edit-title-primary.svg" class="w-8 h-8" />
        <div>
          <el-form-item prop="title" class="w-full" required>
            <p class="font-bold text-xl mb-4">Tiêu đề tuyển dụng</p>
            <el-input
              v-model="data.title"
              class="!h-10 !w-[1000px] input-border-b-only"
              placeholder="Nhập tiêu đề công việc"
            />
          </el-form-item>
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/job-primary.svg" class="w-8 h-8" />
        <div>
          <el-form-item prop="jobCategoryId" class="w-full" required>
            <div class="flex flex-col">
              <p class="font-bold text-xl mb-4">Ngành nghề</p>
              <select-job-category
                v-model="data.jobCategoryId"
                :is-multiple="false"
              />
            </div>
          </el-form-item>
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img
          src="@/assets/images/information-circle-primary.svg"
          class="w-8 h-8"
        />

        <div class="w-full pr-12">
          <p class="font-bold text-xl mb-4">Thông tin chung</p>

          <div class="grid grid-cols-8 gap-x-10">
            <div class="col-span-3">
              <el-form-item
                label="Số lượng tuyển"
                prop="quantity"
                class="w-full"
                required
              >
                <el-input v-model="data.quantity" placeholder="Nhập số lượng" />
              </el-form-item>
            </div>
            <div class="col-span-5">
              <el-form-item
                label="Loại công việc"
                prop="jobMode"
                class="w-full"
                required
              >
                <select-job-mode
                  v-model="data.jobMode"
                  class="w-[377px]"
                  size="medium"
                />
              </el-form-item>
            </div>

            <div class="col-span-3">
              <el-form-item label="Giới tính" prop="gender" class="w-full">
                <el-select
                  v-model="data.gender"
                  class="w-full"
                  clearable
                  placeholder="Bỏ qua nếu không yêu cầu"
                >
                  <el-option
                    v-for="(item, index) in genderOption"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-span-3">
              <el-form-item
                label="Cấp bậc"
                prop="level"
                class="level-full"
                required
              >
                <select-job-level
                  v-model="data.level"
                  class="w-full"
                  size="medium"
                />
              </el-form-item>
            </div>
            <div class="col-span-2">
              <el-form-item
                label="Kinh nghiệm"
                prop="yearExperience"
                class="w-full"
                required
              >
                <select-job-experience
                  v-model="data.yearExperience"
                  class="w-full"
                  size="medium"
                />
              </el-form-item>
            </div>
          </div>

          <el-form-item label="Thời gian làm việc" prop="time" class="w-full">
            <el-input v-model="data.time" class="!w-[795px]" />
          </el-form-item>

          <el-form-item label="Mức lương" class="w-full" required>
            <div class="flex flex-col">
              <select-type-salary
                v-model:value="salary"
                @rule-form="handleSetRuleFormSelectSalary"
              />
            </div>
          </el-form-item>

          <el-form-item label="Khu vực làm việc" class="w-full" required>
            <div>
              <div v-for="(el, index) in region" :key="index" class="mt-2">
                <select-job-region
                  v-model:value="region[index]"
                  class="w-full"
                  :show-remove-region="region.length > 1"
                  :index-region="index + 1"
                  @rule-form="handleSetRuleFormSelectRegion"
                  @remove-region="handleRemoveRegion(index)"
                />
              </div>
              <el-button class="mt-4" type="primary" @click="handleAddRegion">
                Thêm khu vực
              </el-button>
            </div>
          </el-form-item>
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/edit-text-primary.svg" class="w-8 h-8" />
        <div>
          <el-form-item prop="description" class="w-full" required>
            <p class="font-bold text-xl mb-4">Mô tả công việc</p>
            <div class="grow-1">
              <content-editor
                v-model:model-value="data.description"
                class="w-[1075px]"
                placeholder="Nhập nội dung mô tả công việc"
              />
            </div>
          </el-form-item>
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/edit-text-primary.svg" class="w-8 h-8" />
        <div>
          <el-form-item prop="requirement" class="w-full" required>
            <p class="font-bold text-xl mb-4">Yêu cầu ứng viên</p>
            <content-editor
              v-model:model-value="data.requirement"
              class="w-[1075px]"
              placeholder="Nhập nội dung mô tả yêu cầu ứng viên"
            />
          </el-form-item>
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/edit-text-primary.svg" class="w-8 h-8" />
        <div>
          <el-form-item prop="benefits" class="w-full" required>
            <p class="font-bold text-xl mb-4">Phúc lợi ứng viên</p>
            <content-editor
              v-model:model-value="data.benefits"
              class="w-[1075px]"
              placeholder="Nhập nội dung mô tả phúc lợi ứng viên"
            />
          </el-form-item>
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg w-full">
        <img src="@/assets/images/receive-box-primary.svg" class="w-8 h-8" />
        <div>
          <p class="font-bold text-xl mb-4">Thông tin nhận CV</p>
          <div class="flex gap-x-16 w-full">
            <el-form-item
              label="Hạn chót nhận CV"
              prop="hiringEndDate"
              class="w-full"
              required
            >
              <el-date-picker
                v-model="data.hiringEndDate"
                type="date"
                placeholder="dd/mm/yyyy"
                format="DD/MM/YYYY"
                :disabled-date="handleDisableDate"
              />
            </el-form-item>

            <el-form-item
              label="Nhận thông báo ứng tuyển"
              prop="allowNotification"
              class="w-full"
              required
            >
              <el-select v-model="data.allowNotification" class="w-full">
                <el-option
                  v-for="(item, index) in allowNotificationOption"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>

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
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { IJobRegion } from '~/components/atoms/SelectJobRegion.vue';
import { EGender } from '~/types/common';
import type { IJobCreate } from '~/types/job';

definePageMeta({
  layout: 'company-dashboard',
  // middleware: ['redirect'],
  roles: [ERole.COMPANY],
});

const handleDisableDate = (data: any) => {
  const now = new Date();
  return data.getTime() < now.getTime();
};

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
];

const allowNotificationOption = [
  {
    label: 'Có',
    value: true,
  },
  {
    label: 'Không',
    value: false,
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

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  title: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  jobCategoryId: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  quantity: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validateNumber,
      message: 'Số lượng không hợp lệ',
      trigger: 'change',
    },
  ],
  jobMode: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  // gender: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  level: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  yearExperience: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  description: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  requirement: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  benefits: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  hiringEndDate: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
});

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

const handleRemoveRegion = (index: number) => {
  if (index > -1) {
    region.value.splice(index, 1);
  }
};

const ruleFormSelectSalary = ref<FormInstance>();
const handleSetRuleFormSelectSalary = (val: FormInstance) => {
  ruleFormSelectSalary.value = val;
};
const ruleFormSelectRegion = ref<FormInstance[]>([]);
const handleSetRuleFormSelectRegion = (val: FormInstance) => {
  ruleFormSelectRegion.value.push(val);
};
const handleSubmitCreateJob = async () => {
  if (
    !ruleForm.value ||
    !ruleFormSelectSalary.value ||
    !ruleFormSelectRegion.value
  )
    return;
  let validForm = true;
  // Validate salary form
  await new Promise((resolve) => {
    ruleFormSelectSalary.value?.validate((valid) => {
      validForm = valid;
      resolve(valid);
    });
  });

  // Validate region forms
  for (const el of ruleFormSelectRegion.value) {
    await new Promise((resolve) => {
      el?.validate((valid) => {
        validForm = validForm && valid;
        resolve(valid);
      });
    });
  }

  ruleForm.value.validate(async (valid) => {
    if (valid && validForm) {
      region.value.forEach((el) => {
        if (el.cityId) data.value.cityIds.push(el.cityId);
      });

      data.value.salaryMin = salary.value.salaryMin
        ? +salary.value.salaryMin
        : 0;
      data.value.salaryMax = salary.value.salaryMax
        ? +salary.value.salaryMax
        : 0;
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
    }
  });
};
</script>

<style class="scss"></style>
