export const useJobCategoryParentStore = defineStore(
  EStoreName.JOB_CATEGORY_PARENT,
  {
    state: () => ({}),
    actions: {
      async getListJobCategoryParent() {
        try {
          const { data } = await useBaseFetch('/job-category-parents');
          return data;
        } catch (error: any) {
          console.log(error);
        }
      },
    },
  },
);
