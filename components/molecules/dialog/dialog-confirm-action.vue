<template>
  <el-dialog
    v-model="syncDialogVisible"
    class="!w-max-[500px]"
    width="500"
    center
    align-center
  >
    <template #header>
      <p class="text-base font-bold text-center">Xác nhận</p>
    </template>
    <div class="text-center">
      <slot></slot>
    </div>

    <template #footer>
      <el-button
        type="primary"
        class="w-[84px]"
        @click="syncDialogVisible = false"
      >
        Hủy
      </el-button>
      <el-button type="danger" class="w-[84px]" @click="handleConfirm">
        Đồng ý
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
  content: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['update:dialogVisible', 'onConfirm']);

const syncDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (value: boolean) => {
    return emits('update:dialogVisible', value);
  },
});

const handleConfirm = () => {
  emits('onConfirm');
  syncDialogVisible.value = false;
};
</script>
