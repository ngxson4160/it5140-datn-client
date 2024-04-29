<template>
  <el-select
    v-model="value"
    clearable
    placeholder="Số năm kinh nghiệm"
    :size="size"
  >
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
import { CJobExperience, CJobExperienceValue } from '~/utils/constant/job';

const props = defineProps({
  size: {
    type: String,
    default: 'large',
  },
});

const value = ref();

const data = CJobExperience;

const emits = defineEmits(['update:value']);

watch(
  () => value.value,
  (newVal) => {
    if (newVal !== '') {
      emits('update:value', CJobExperienceValue[newVal].value);
    } else {
      emits('update:value', undefined);
    }
  },
);
</script>
