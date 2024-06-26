export interface IJobCategory {
  id: number | null;
  name: string;
  jobCategories: Array<{
    id: string;
    name: string;
  }>;
}

export interface IJobCategoryResponse extends IResponse {
  data: IJobCategory[];
}

export const initJobCategory: IJobCategory = {
  id: null,
  name: '',
  jobCategories: [],
};

export const useJobCategoryParentStore = defineStore(
  EStoreName.JOB_CATEGORY_PARENT,
  {
    state: () => ({
      listJobCategory: [] as IJobCategory[],
    }),
    actions: {
      async getListJobCategoryParent(): Promise<IJobCategory[]> {
        if (!this.listJobCategory.length) {
          const { data } = await useBaseFetch('/job-category-parents');
          this.setListJobCategory(data);
        }
        return this.listJobCategory;
      },

      setListJobCategory(data: IJobCategory[]) {
        this.listJobCategory = data;
      },
    },
  },
);
