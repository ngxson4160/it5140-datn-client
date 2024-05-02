export interface ICompany {
  id: number | null;
  name: string;
  avatar: string;
  coverImage: string;
  primaryAddress: string;
  totalStaff: number | null;
}

export const useCompanyStore = defineStore(EStoreName.COMPANY, {
  state: () => ({}),
  actions: {
    async getListJobs(query?: any) {
      return await useBaseFetch(`companies/jobs`, { query });
    },

    async getListApplication(id: number, query: any) {
      return await useBaseFetch(`companies/jobs/${id}/applications`, { query });
    },
  },
});
