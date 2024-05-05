<template>
  <el-dialog v-model="syncDialogVisible">
    <template #header>
      <p class="text-center font-bold text-xl">Chứng chỉ</p>
    </template>

    <p>Tên chứng chỉ</p>
    <el-input v-model="formData.name" class="mt-2 !h-10" />

    <p class="mt-4">Tổ chức</p>
    <el-input v-model="formData.organization" class="mt-2 !h-10" />

    <div class="grid grid-cols-2 gap-y-4 gap-x-10 mt-4">
      <div class="col-span-1">
        <p class="mb-2">Ngày bắt đầu</p>
        <el-date-picker v-model="formData.start" class="!w-full" />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Ngày hết hạn</p>
        <el-date-picker v-model="formData.end" class="!w-full" />
      </div>
    </div>

    <p class="mt-4">Mô tả thêm</p>
    <el-input v-model="formData.description" class="mt-2 !h-10" />

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

const formData = ref({ ...props.data });

const syncDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (value: boolean) => {
    return emits('update:dialogVisible', value);
  },
});

const handleConfirm = () => {
  const start = new Date(formData.value.start);
  formData.value.start = start.toISOString();
  if (formData.value.end) {
    const end = new Date(formData.value.end);
    formData.value.end = end.toISOString();
  }
  emits('onConfirm', formData.value);
  syncDialogVisible.value = false;
};
</script>
