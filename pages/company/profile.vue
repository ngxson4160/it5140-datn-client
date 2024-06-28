<template>
  <div class="bg-white mr-4 px-4 pt-4 pb-10 shadow-md rounded-md">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Thông tin chung" name="information-general">
        <el-form
          ref="ruleForm"
          label-position="top"
          :model="company"
          :rules="rules"
          class="w-[1250px]"
        >
          <div class="grid grid-cols-2 gap-x-6 mt-4">
            <div class="col-span-1">
              <el-form-item
                label="Tên công ty"
                prop="name"
                class="w-full"
                required
              >
                <el-input
                  v-model:model-value="company.name"
                  class="col-span-1"
                  size="large"
                />
              </el-form-item>
            </div>
            <div class="col-span-1">
              <el-form-item
                label="Email"
                prop="primaryEmail"
                class="w-full"
                required
              >
                <el-input
                  v-model:model-value="company.primaryEmail"
                  class="col-span-1"
                  size="large"
                />
              </el-form-item>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-x-6 mt-4">
            <div class="col-span-1">
              <el-form-item
                label="Mã số thuế"
                prop="taxCode"
                class="w-full"
                required
              >
                <el-input
                  v-model:model-value="company.taxCode"
                  class="col-span-1"
                  size="large"
                />
              </el-form-item>
            </div>
            <div class="col-span-1">
              <el-form-item label="Website" prop="website" class="w-full">
                <el-input
                  v-model:model-value="company.website"
                  class="col-span-1"
                  size="large"
                />
              </el-form-item>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-x-6 mt-4">
            <div class="col-span-1">
              <el-form-item
                label="Lĩnh vực hoạt động"
                prop="jobCategoryParentId"
                class="w-full"
                required
              >
                <select-job-parent
                  v-model="company.jobCategoryParentId"
                  class="col-span-1 w-full"
                  size="large"
                  :is-multiple="false"
                />
              </el-form-item>
            </div>
            <div class="col-span-1">
              <el-form-item
                label="Quy mô công ty"
                prop="sizeType"
                class="w-full"
                required
              >
                <select-company-size
                  v-model="company.sizeType"
                  class="col-span-1 w-full"
                  size="large"
                />
              </el-form-item>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-x-6 mt-4">
            <div class="col-span-1">
              <el-form-item
                label="Địa chỉ"
                prop="primaryAddress"
                class="w-full"
                required
              >
                <el-input
                  v-model:model-value="company.primaryAddress"
                  class="col-span-1"
                  size="large"
                />
              </el-form-item>
            </div>
            <div class="col-span-1">
              <el-form-item
                label="Số điện thoại"
                prop="primaryPhoneNumber"
                class="w-full"
                required
              >
                <el-input
                  v-model:model-value="company.primaryPhoneNumber"
                  class="col-span-1"
                  size="large"
                />
              </el-form-item>
            </div>
          </div>

          <el-form-item
            label="Mô tả công ty"
            prop="aboutUs"
            class="w-full"
            required
          >
            <content-editor
              v-model:model-value="company.aboutUs"
              class="w-full"
            />
          </el-form-item>

          <div class="flex justify-end mt-10">
            <el-button type="primary" size="large" @click="onUpdateCompany">
              Lưu
            </el-button>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Avatar/Ảnh bìa" name="avatar-coverImage">
        <div class="w-[1196px]">
          <div class="flex ml-10">
            <div class="flex flex-col gap-y-2">
              <p class="text-sm">Logo công ty</p>
              <img
                v-if="!isEmptyObject(company.avatar)"
                :key="company.avatar"
                :src="company.avatar"
                class="w-[150px] h-[150px] object-cover border p-[3px] bg-white rounded-md"
              />
              <div
                v-else
                class="w-[150px] h-[150px] flex items-center border p-[3px] bg-white rounded-md"
              >
                <loading-custom class="ml-14" />
              </div>
              <up-load-image
                v-model:data-upload="company.avatar"
                title="Thay đổi avatar"
                @on-success="onUpdateAvatar"
              />
            </div>

            <div class="flex flex-col gap-y-2 ml-[250px] !w-[698px]">
              <p class="text-sm">Ảnh bìa</p>
              <img
                v-if="!isEmptyObject(company.coverImage)"
                :key="company.coverImage"
                :src="company.coverImage"
                class="!w-[698px] h-[150px] border rounded-lg object-cover"
              />
              <div
                v-else
                class="flex items-center !w-[698px] h-[150px] border rounded-lg"
              >
                <loading-custom class="ml-[320px]" />
              </div>
              <div class="flex justify-end">
                <up-load-image
                  v-model:data-upload="company.coverImage"
                  title="Thay đổi ảnh bìa"
                  @on-success="onUpdateCoverImage"
                />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { MESSAGE_VALIDATE } from '~/utils/constant/message-validate';

definePageMeta({
  layout: 'company-dashboard',
  // middleware: ['redirect'],
  roles: [ERole.COMPANY],
});

const activeName = ref('information-general');

const companyStore = useCompanyStore();

const loading = ref(false);

const company = ref();
const { data } = await companyStore.getMyCompany();
company.value = data;

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  name: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  primaryEmail: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validateEmail,
      message: MESSAGE_VALIDATE.EMAIL,
      trigger: 'change',
    },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  taxCode: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validateNumber,
      message: MESSAGE_VALIDATE.TAX_CODE,
      trigger: 'change',
    },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  jobCategoryParentId: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  sizeType: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  primaryAddress: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  primaryPhoneNumber: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validatePhoneNumber,
      message: MESSAGE_VALIDATE.PHONE_NUMBER,
      trigger: 'change',
    },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  aboutUs: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateContent, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
});

const onUpdateCompany = () => {
  if (!ruleForm.value) return;
  ruleForm.value.validate(async (valid) => {
    if (valid) {
      await companyStore.updateMyCompany({ ...company.value });
    }
  });
};

const onUpdateAvatar = async (url: string) => {
  await companyStore.updateMyCompany({ avatar: url });
};

const onUpdateCoverImage = async (url: string) => {
  await companyStore.updateMyCompany({ coverImage: url });
};
</script>

<style scoped></style>
