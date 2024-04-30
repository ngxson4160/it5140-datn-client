<template>
  <el-select
    v-model="value"
    clearable
    placeholder="Chọn tình trạng hôn nhân"
    :size="size"
  >
    <el-option
      v-for="item in CMaritalStatus"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    >
      {{ item.name }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { CMaritalStatus } from '~/utils/constant/common';

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
