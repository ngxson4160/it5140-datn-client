<template>
  <el-select v-model="value" clearable placeholder="Hình thức" size="large">
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
import { CJobMode } from '~/utils/constant/job';

const value = ref();

const data = CJobMode;
</script>
