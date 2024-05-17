<template>
  <el-dialog v-model="syncDialogVisible" center align-center width="1200px">
    <iframe :src="url" class="w-full h-[700px]"></iframe>

    <template #footer>
      <el-button
        type="primary"
        class="w-[150px]"
        @click="syncDialogVisible = false"
      >
        Đóng
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
});

const emits = defineEmits(['update:dialogVisible', 'onConfirm']);

const syncDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (value: boolean) => {
    return emits('update:dialogVisible', value);
  },
});
</script>
