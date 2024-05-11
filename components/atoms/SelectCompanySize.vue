<template>
  <el-select
    v-model="value"
    clearable
    placeholder="Chọn quy mô công ty"
    :size="size"
    class="w-full"
  >
    <el-option
      v-for="item in CCompanySizeType"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    >
      {{ item.name }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { CCompanySizeType } from '~/utils/constant/common';

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
