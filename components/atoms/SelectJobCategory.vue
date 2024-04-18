<template>
  <el-tree-select
    v-model="valueStrictly"
    :data="options"
    :render-after-expand="false"
    class="!w-[300px] !text-base"
    multiple
    show-checkbox
    collapse-tags
    check-on-click-node
    placeholder="Chọn nghề nghiệp"
  />
</template>

<script setup lang="ts">
import { useJobCategoryParentStore } from '~/stores/job-category-parent';

const value = ref();
const valueStrictly = ref();

const data = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: '1-1',
        children: [
          {
            value: '1-1-1',
            label: ' 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];

const jobCategoryParentStore = useJobCategoryParentStore();

// onMounted(async () => {
const jobCategoryParent =
  await jobCategoryParentStore.getListJobCategoryParent();
console.log(jobCategoryParent);

const options = jobCategoryParent.map((jobParent: any) => {
  const jobCategory = jobParent.jobCategories.map((jobCategory: any) => ({
    value: jobCategory.name,
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
