<template>
  <el-form label-position="top" :model="syncData" style="max-width: 600px">
    <div class="flex justify-between">
      <el-form-item label="Họ" class="w-full" required>
        <el-input v-model="syncData.firstName" class="!h-11" />
      </el-form-item>
      <el-form-item label="Tên" class="w-full ml-10" required>
        <el-input v-model="syncData.lastName" class="!h-11" />
      </el-form-item>
    </div>
    <el-form-item label="Địa chỉ email" class="w-full" required>
      <el-input v-model="syncData.email" class="!h-11" />
    </el-form-item>
    <el-form-item label="Mật khẩu" class="w-full" required>
      <el-input v-model="syncData.password" class="!h-11" />
    </el-form-item>
    <el-form-item label="Nhập lại mật khẩu" class="w-full" required>
      <el-input v-model="syncData.confirmPassword" class="!h-11" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { type ICompanyRegisterAccount } from '@/types/auth';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['update:data']);

const syncData = computed({
  get: () => props.data,
  set: (value: Object) => {
    return emits('update:data', value);
  },
});
</script>

<style scoped></style>
