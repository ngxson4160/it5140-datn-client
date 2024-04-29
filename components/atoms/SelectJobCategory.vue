<template>
  <el-tree-select
    v-model="valueStrictly"
    class="!w-[300px]"
    :data="options"
    :render-after-expand="false"
    :multiple="isMultiple"
    :show-checkbox="isMultiple"
    :collapse-tags="isMultiple"
    clearable
    check-on-click-node
    placeholder="Chọn nghề nghiệp"
    size="large"
  />
</template>

<script setup lang="ts">
import { useJobCategoryParentStore } from '~/stores/job-category-parent';

const props = defineProps({
  isMultiple: {
    type: Boolean,
    default: true,
  },
});

const valueStrictly = ref();

const jobCategoryParentStore = useJobCategoryParentStore();

const jobCategoryParent =
  await jobCategoryParentStore.getListJobCategoryParent();

const options = jobCategoryParent.map((jobParent: any) => {
  const jobCategory = jobParent.jobCategories.map((jobCategory: any) => ({
    value: jobCategory.id,
    label: jobCategory.name,
  }));

  return {
    value: jobParent.name,
    label: jobParent.name,
    children: jobCategory,
  };
});
</script>

<style scoped></style>
