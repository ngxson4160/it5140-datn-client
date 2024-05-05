<template>
  <el-dialog
    v-model="syncDialogVisible"
    center
    align-center
    width="1200px"
    :close-on-press-escape="false"
  >
    <template #header>Ghi chú</template>

    <content-editor
      v-model:model-value="syncValue"
      placeholder="Nhập nội dung mô tả công việc"
    />

    <template #footer>
      <el-button
        type="danger"
        class="w-[100px]"
        @click="syncDialogVisible = false"
      >
        Hủy
      </el-button>
      <el-button type="primary" class="w-[100px]" @click="handleConfirm">
        Lưu
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
});

const emits = defineEmits([
  'update:dialogVisible',
  'update:value',
  'onConfirm',
]);

const syncDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (value: boolean) => {
    return emits('update:dialogVisible', value);
  },
});

const syncValue = computed({
  get: () => props.value,
  set: (value: string) => {
    return emits('update:value', value);
  },
});

const handleConfirm = () => {
  emits('onConfirm');
  syncDialogVisible.value = false;
};
</script>
