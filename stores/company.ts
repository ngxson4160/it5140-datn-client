import type {
  IGetListCompany,
  IGetListJob,
  ISearchCandidate,
  IUpdateCompany,
} from '~/types/company';

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
      return await useBaseFetch(`companies/jobs`, { query, loading: true });
    },

    // async getListApplication(id: number, query: any) {
    //   return await useBaseFetch(`companies/jobs/${id}/applications`, { query });
    // },

    async getMyCompany() {
      return await useBaseFetch(`companies/my-company`, {
        loading: true,
      });
    },

    async updateMyCompany(body: IUpdateCompany) {
      await useBaseFetch(`companies/my-company`, {
        method: 'PUT',
        body,
        loading: true,
        notification: true,
      });
    },

    async getListCandidate(query: any) {
      return await useBaseFetch(`companies/candidates`, {
        query,
        loading: true,
      });
    },

    async getDetail(id: number) {
      return await useBaseFetch(`companies/${id}`, { loading: true });
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
          notification: true,
        },
      );
    },

    async getListCompany(query: IGetListCompany) {
      return await useBaseFetch(`companies`, { query, loading: true });
    },

    async searchCandidate(query: ISearchCandidate) {
      const data = await useBaseFetch(`/candidates`, {
        method: 'GET',
        query,
        loading: true,
      });
      return data;
    },

    async viewProfileCandidate(id: number) {
      const data = await useBaseFetch(
        `companies/candidates/${id}/view-profile`,
        {
          method: 'POST',
        },
      );
      return data;
    },
  },
});
