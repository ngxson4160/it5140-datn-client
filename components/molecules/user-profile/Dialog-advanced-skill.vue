<template>
  <el-dialog v-model="syncDialogVisible">
    <template #header>
      <p class="text-center font-bold text-xl">Kỹ năng chuyên môn</p>
    </template>

    <el-form
      ref="ruleForm"
      label-position="top"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="Tên Kỹ năng" prop="name" class="w-full" required>
        <el-input v-model="formData.name" class="mt-2 !h-10" />
      </el-form-item>

      <div class="mx-1">
        <el-form-item label="Trình độ" prop="level" class="w-full">
          <el-slider v-model="formData.level" :step="10" />
        </el-form-item>
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

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  name: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  // level: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
});

const handleConfirm = () => {
  if (!ruleForm.value) return;
  ruleForm.value.validate((valid) => {
    if (valid) {
      emits('onConfirm', formData.value);
      syncDialogVisible.value = false;
    }
  });
};
</script>
