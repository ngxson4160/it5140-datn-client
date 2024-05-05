import type { IGetListJob } from '~/types/company';

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
    async getListJobs(query?: IGetListJob) {
      return await useBaseFetch(`companies/jobs`, { query });
    },

    async getListApplication(id: number, query: any) {
      return await useBaseFetch(`companies/jobs/${id}/applications`, { query });
    },

    async getListCandidate(query: any) {
      return await useBaseFetch(`companies/candidates`, { query });
    },

    async updateJobApplication(
      jobId: number,
      applicationId: number,
      body: any,
    ) {
      await useBaseFetch(
        `companies/jobs/${jobId}/applications/${applicationId}`,
        {
          method: 'PUT',
          body,
          loading: true,
        },
      );
      useNotificationSuccess({ title: 'Thành công!' });
    },
  },
});
