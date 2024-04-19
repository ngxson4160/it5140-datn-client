<template>
  <el-form label-position="top" :model="syncData" style="max-width: 600px">
    <el-form-item label="Tên công ty" class="w-full" required>
      <el-input v-model="syncData.name" class="!h-11" />
    </el-form-item>
    <el-form-item label="Ngành nghề" class="w-full" required>
      <el-input v-model="syncData.jobCategoryParentId" class="!h-11" />
    </el-form-item>
    <el-form-item label="Số điện thoại" class="w-full" required>
      <el-input v-model="syncData.primaryPhoneNumber" class="!h-11" />
    </el-form-item>
    <el-form-item label="Địa chỉ" class="w-full" required>
      <select-city v-model="syncData.primaryCity" />
    </el-form-item>
    <el-form-item label="Tổng số nhân viên" class="w-full" required>
      <el-input v-model="syncData.totalStaff" class="!h-11" type="number" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
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
