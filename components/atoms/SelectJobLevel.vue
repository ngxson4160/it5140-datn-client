<template>
  <el-select v-model="value" clearable placeholder="Cấp bậc" :size="size">
    <el-option
      v-for="item in data"
      :key="item.name"
      :value="item.value"
      :label="item.name"
    >
      {{ item.name }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { CJobLevel } from '~/utils/constant/job';

const props = defineProps({
  size: {
    type: String,
    default: 'large',
  },
});

const value = ref();

const data = CJobLevel;
</script>
