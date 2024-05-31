<template>
  <el-dialog v-model="syncDialogVisible">
    <template #header>
      <p class="text-center font-bold text-xl">Thông tin chung</p>
    </template>

    <el-form
      ref="ruleForm"
      label-position="top"
      :model="formData"
      :rules="rules"
    >
      <div>
        <el-form-item
          label="Mục tiêu nghề nghiệp"
          prop="target"
          class="w-full"
          required
        >
          <el-input v-model="formData.target" class="mt-2 !h-10" />
        </el-form-item>
      </div>

      <div class="grid grid-cols-2 gap-y-4 gap-x-10 mt-4">
        <div class="col-span-1">
          <el-form-item
            label="Vị trí mong muốn"
            prop="desiredJobCategoryId"
            class="w-full"
            required
          >
            <select-job-category
              v-model="formData.desiredJobCategoryId"
              class="!w-full"
              :is-multiple="false"
            />
          </el-form-item>
        </div>

        <!-- <div class="col-span-1">
        <p class="mb-2">Địa điểm làm việc mong muốn</p>
        <select-city
          v-model="formData.desiredCityId"
          class="!w-full"
          :is-multiple="false"
        />
      </div> -->
        <div class="col-span-1">
          <el-form-item
            label="Số năm Kinh nghiệm"
            prop="yearExperience"
            class="w-full"
            required
          >
            <el-input v-model="formData.yearExperience" size="large" />
          </el-form-item>
        </div>

        <div class="col-span-1">
          <el-form-item
            label="Cấp bậc mong muốn"
            prop="desiredJobLevel"
            class="w-full"
            required
          >
            <select-job-level
              v-model="formData.desiredJobLevel"
              class="w-full"
            />
          </el-form-item>
        </div>

        <div class="col-span-1">
          <el-form-item
            label="Mức lương mong muốn"
            prop="desiredSalary"
            class="w-full"
            required
          >
            <el-input
              v-model="formData.desiredSalary"
              class="w-full"
              size="large"
            />
          </el-form-item>
        </div>

        <div class="col-span-1">
          <el-form-item
            label="Trình độ học vấn"
            prop="educationalLevel"
            class="w-full"
            required
          >
            <select-education-level
              v-model="formData.educationalLevel"
              class="w-full"
            />
          </el-form-item>
        </div>

        <div class="col-span-1">
          <el-form-item
            label="Hình thức làm việc"
            prop="desiredJobMode"
            class="w-full"
            required
          >
            <select-job-mode v-model="formData.desiredJobMode" class="w-full" />
          </el-form-item>
        </div>

        <!-- <div class="col-span-1">
        <p>Số năm Kinh nghiệm</p>
        <el-input v-model="formData.yearExperience" class="mt-2 !h-10" />
      </div> -->
      </div>
    </el-form>

    <template #footer>
      <div class="flex justify-center">
        <el-button type="primary" @click="handleConfirm">Lưu</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { MESSAGE_VALIDATE } from '~/utils/constant/message-validate';

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['update:dialogVisible', 'onConfirm']);

const formData = ref(props.data);

const syncDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (value: boolean) => {
    return emits('update:dialogVisible', value);
  },
});

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  target: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  desiredJobCategoryId: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
  ],
  yearExperience: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validateYearExperience,
      message: MESSAGE_VALIDATE.YEAR_EXPERIENCE,
      trigger: 'change',
    },
  ],
  desiredJobLevel: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  desiredSalary: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validateSalary,
      message: MESSAGE_VALIDATE.DESIRED_SALARY,
      trigger: 'change',
    },
  ],
  educationalLevel: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
  ],
  desiredJobMode: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
});

const handleConfirm = () => {
  if (!ruleForm.value) return;
  ruleForm.value.validate((valid) => {
    if (valid) {
      const data = {
        ...formData.value,
        yearExperience: +formData.value.yearExperience,
        desiredSalary: +formData.value.desiredSalary,
      };
      emits('onConfirm', data);
      syncDialogVisible.value = false;
    }
  });
};
</script>
