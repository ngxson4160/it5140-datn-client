<template>
  <el-select
    v-model="value"
    clearable
    placeholder="Chọn trình độ học vấn"
    :size="size"
  >
    <el-option
      v-for="item in CEducationLevel"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    >
      {{ item.name }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { CEducationLevel } from '~/utils/constant/common';

const props = defineProps({
  isMultiple: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'large',
  },
});

const value = ref('');
</script>
