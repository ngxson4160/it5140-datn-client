<template>
  <el-select
    v-model="value"
    multiple
    collapse-tags
    show-checkbox
    clearable
    placeholder="Chọn tỉnh/thành phố"
    size="large"
  >
    <el-option
      v-for="item in useCity.listCities"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
      {{ item.name }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
const value = ref('');

const useCity = useCityStore();

await useCity.getListCities();
</script>
