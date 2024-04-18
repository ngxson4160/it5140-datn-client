<template>
  <el-select
    v-model="value"
    multiple
    collapse-tags
    show-checkbox
    placeholder="Chọn kiểu làm việc"
    size="large"
  >
    <el-option
      v-for="item in listCity"
      :key="item.id"
      :label="item.name"
      :value="item.name"
    >
      {{ item.name }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
const value = ref('');

const listCity = ref<any>({});
const { data } = await useBaseFetch('cities');
listCity.value = data;
</script>
