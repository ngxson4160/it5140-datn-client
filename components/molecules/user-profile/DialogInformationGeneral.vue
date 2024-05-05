<template>
  <el-dialog v-model="syncDialogVisible">
    <template #header>
      <p class="text-center font-bold text-xl">Thông tin chung</p>
    </template>

    <div>
      <p>Mục tiêu nghề nghiệp</p>
      <el-input v-model="formData.target" class="mt-2 !h-10" />
    </div>

    <div class="grid grid-cols-2 gap-y-4 gap-x-10 mt-4">
      <div class="col-span-1">
        <p class="mb-2">Vị trí mong muốn</p>
        <select-job-category
          v-model="formData.desiredJobCategoryId"
          class="!w-full"
          :is-multiple="false"
        />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Địa điểm làm việc mong muốn</p>
        <select-city
          v-model="formData.desiredCityId"
          class="!w-full"
          :is-multiple="false"
        />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Cấp bậc mong muốn</p>
        <select-job-level v-model="formData.desiredJobLevel" class="w-full" />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Mức lương mong muốn</p>
        <el-input v-model="formData.desiredSalary" class="w-full" />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Trình độ học vấn</p>
        <select-education-level
          v-model="formData.educationalLevel"
          class="w-full"
        />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Hình thức làm việc</p>
        <select-job-mode v-model="formData.desiredJobMode" class="w-full" />
      </div>

      <div class="col-span-1">
        <p>Số năm Kinh nghiệm</p>
        <el-input v-model="formData.yearExperience" class="mt-2 !h-10" />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-center">
        <el-button type="primary" @click="handleConfirm">Lưu</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
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

const handleConfirm = () => {
  const data = {
    ...formData.value,
    yearExperience: +formData.value.yearExperience,
    desiredSalary: +formData.value.desiredSalary,
  };
  emits('onConfirm', data);
  syncDialogVisible.value = false;
};
</script>
