<template>
  <el-dialog v-model="syncDialogVisible">
    <template #header>
      <p class="text-center font-bold text-xl">{{ title }}</p>
    </template>
    <slot />
    <template #footer>
      <div class="flex justify-center">
        <el-button type="primary" @click="handleConfirm">
          {{ textButton }}
        </el-button>
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
  title: {
    type: String,
    default: '',
  },
  textButton: {
    type: String,
    default: 'Lưu',
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

<style scoped></style>
