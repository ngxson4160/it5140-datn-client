<template>
  <div class="flex items-center justify-between w-[800px]">
    <div>
      <p class="text-sm text-gray mb-1">Chọn kiểu</p>
      <el-select v-model="value" @change="changeSalaryType">
        <el-option
          v-for="(item, index) in ETypeSalary"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div class="flex justify-between">
      <div v-if="value === ETypeSalary.FROM || value === ETypeSalary.FROM_TO">
        <p class="text-sm text-gray mb-1">Từ</p>
        <el-input v-model="salary.salaryMin" />
      </div>
      <span v-if="value === ETypeSalary.FROM_TO" class="mx-8 pt-7">-</span>
      <div v-if="value === ETypeSalary.TO || value === ETypeSalary.FROM_TO">
        <p class="text-sm text-gray mb-1">Lên tới</p>
        <el-input v-model="salary.salaryMax" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
enum ETypeSalary {
  FROM = 'Từ',
  TO = 'Lên tới',
  FROM_TO = 'Khoảng',
  DEAL = 'Thỏa thuận',
}
const value = ref();

const salary = ref({
  salaryMin: null,
  salaryMax: null,
});

const changeSalaryType = () => {
  salary.value = {
    salaryMin: null,
    salaryMax: null,
  };
};

const emits = defineEmits(['update:value']);

watch(
  () => salary.value,
  (newVal) => {
    emits('update:value', newVal);
  },
);
</script>

<style scoped></style>
