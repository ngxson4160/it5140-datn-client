<template>
  <el-select
    v-model="value"
    :multiple="isMultiple"
    :collapse-tags="isMultiple"
    :show-checkbox="isMultiple"
    clearable
    placeholder="Chọn lĩnh vực"
    :size="size"
  >
    <el-option
      v-for="item in jobCategoryParentStore.listJobCategory"
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

const jobCategoryParentStore = useJobCategoryParentStore();
await jobCategoryParentStore.getListJobCategoryParent();
</script>
