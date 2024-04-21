<template>
  <el-tree-select
    v-model="valueStrictly"
    :data="options"
    :render-after-expand="false"
    class="!w-[300px]"
    multiple
    show-checkbox
    collapse-tags
    clearable
    check-on-click-node
    placeholder="Chọn nghề nghiệp"
    size="large"
  />
</template>

<script setup lang="ts">
import { useJobCategoryParentStore } from '~/stores/job-category-parent';

const value = ref();
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
