<template>
  <el-dialog v-model="syncDialogVisible">
    <template #header>
      <p class="text-center font-bold text-xl">Chứng chỉ</p>
    </template>

    <el-form
      ref="ruleForm"
      label-position="top"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="Tên chứng chỉ" prop="name" class="w-full" required>
        <el-input v-model="formData.name" size="large" />
      </el-form-item>

      <el-form-item label="Tổ chức" prop="organization" class="w-full" required>
        <el-input v-model="formData.organization" size="large" />
      </el-form-item>

      <div class="grid grid-cols-2 gap-y-4 gap-x-10 mt-4">
        <div class="col-span-1">
          <el-form-item
            label="Ngày bắt đầu"
            prop="start"
            class="w-full"
            required
          >
            <el-date-picker
              v-model="formData.start"
              class="!w-full"
              size="large"
            />
          </el-form-item>
        </div>

        <div class="col-span-1">
          <el-form-item label="Ngày hết hạn" prop="end" class="w-full" required>
            <el-date-picker
              v-model="formData.end"
              class="!w-full"
              size="large"
            />
          </el-form-item>
        </div>
      </div>

      <el-form-item label="Mô tả thêm" prop="description" class="w-full">
        <el-input v-model="formData.description" size="large" />
      </el-form-item>
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
  name: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  organization: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  start: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  end: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
});

const handleConfirm = () => {
  if (!ruleForm.value) return;
  ruleForm.value.validate((valid) => {
    if (valid) {
      const start = new Date(formData.value.start);
      formData.value.start = start.toISOString();
      if (formData.value.end) {
        const end = new Date(formData.value.end);
        formData.value.end = end.toISOString();
      }
      emits('onConfirm', formData.value);
      syncDialogVisible.value = false;
    }
  });
};
</script>
