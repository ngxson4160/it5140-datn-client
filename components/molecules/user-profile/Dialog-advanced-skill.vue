<template>
  <el-dialog v-model="syncDialogVisible">
    <template #header>
      <p class="text-center font-bold text-xl">Kỹ năng chuyên môn</p>
    </template>

    <p>Tên Kỹ năng</p>
    <el-input v-model="formData.name" class="mt-2 !h-10" />

    <p class="mt-4">Trình độ</p>
    <div class="mx-1">
      <el-slider v-model="formData.level" :step="10" />
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

const formData = ref({ ...props.data });

const syncDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (value: boolean) => {
    return emits('update:dialogVisible', value);
  },
});

const handleConfirm = () => {
  emits('onConfirm', formData.value);
  syncDialogVisible.value = false;
};
</script>
