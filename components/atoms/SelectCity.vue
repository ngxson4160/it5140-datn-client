<template>
  <el-select
    v-model="value"
    :multiple="isMultiple"
    :collapse-tags="isMultiple"
    :show-checkbox="isMultiple"
    clearable
    placeholder="Chọn tỉnh/thành phố"
    :size="size"
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

const useCity = useCityStore();

await useCity.getListCities();
</script>
