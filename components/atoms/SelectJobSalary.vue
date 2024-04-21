<template>
  <el-select v-model="value" placeholder="Mức lương" size="large" clearable>
    <el-option
      v-for="item in data"
      :key="item.value"
      :value="item.value"
      :label="item.name"
    >
      {{ item.name }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { CJobSalary, CJobSalaryValue } from '~/utils/constant/job';

const value = ref();

const data = CJobSalary;

const emits = defineEmits(['update:value']);

watch(
  () => value.value,
  (newVal) => {
    if (newVal !== '') {
      emits('update:value', CJobSalaryValue[newVal].value);
    } else {
      emits('update:value', undefined);
    }
  },
);
</script>
