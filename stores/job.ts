import {
  EJobStatus,
  type IGetListJobParams,
  type IJob,
  type IJobCreate,
  type IJobResponse,
} from '~/types/job';

export const InitJob: IJobResponse = {
  id: null,
  creatorId: null,
  jobCategoryId: null,
  title: '',
  position: '',
  salaryMin: 0,
  salaryMax: 0,
  images: [],
  jobMode: null,
  level: null,
  officeName: '',
  city: [],
  address: [],
  quantity: 0,
  totalViews: 0,
  totalCandidate: 0,
  benefits: '',
  description: '',
  requirement: '',
  time: '',
  gender: null,
  yearExperience: 0,
  hiringStartDate: '',
  hiringEndDate: '',
  status: EJobStatus.PUBLIC,
  createdAt: '',
  createdBy: '',
  updatedAt: '',
  updatedBy: '',
  tags: [],
  cities: [],
};

export const initCreateJob: IJobCreate = {
  title: '',
  jobCategoryId: null,
  salaryMin: 0,
  salaryMax: 0,
  jobMode: null,
  level: null,
  officeName: '',
  address: [],
  quantity: null,
  totalViews: 0,
  totalCandidate: 0,
  benefits: '',
  description: '',
  requirement: '',
  time: '',
  gender: null,
  yearExperience: null,
  hiringStartDate: '',
  hiringEndDate: '',
  status: EJobStatus.PUBLIC,
  allowNotification: true,
  createdAt: '',
  createdBy: '',
  updatedAt: '',
  updatedBy: '',
  cityIds: [],
};

export const useJobStore = defineStore(EStoreName.JOB, {
  state: () => ({}),
  actions: {
    async getJob(id: number) {
      return await useBaseFetch(`/jobs/${id}`);
    },

    async getListJob(query: IGetListJobParams) {
      return await useBaseFetch(`/jobs`, { query, loading: true });
    },

    async createJob(body: IJobCreate) {
      return await useBaseFetch(`/jobs`, { method: 'POST', body });
    },

    async update(jobId: number, body: Partial<IJobCreate>) {
      return await useBaseFetch(`/jobs/${jobId}`, {
        method: 'PUT',
        body,
        loading: true,
        notification: true,
      });
    },

    async reopen(
      jobId: number,
      body: { hiringStartDate: string; hiringEndDate: string },
    ) {
      return await useBaseFetch(`/jobs/${jobId}/reopen`, {
        method: 'PUT',
        body,
        loading: true,
        notification: true,
      });
    },

    async favoriteJob(jobId: number, body: { isFavorite: boolean }) {
      return await useBaseFetch(`/jobs/${jobId}/favorites`, {
        method: 'POST',
        body,
        loading: true,
        notification: true,
      });
    },

    async deleteJob(jobId: number) {
      return await useBaseFetch(`/jobs/${jobId}`, {
        method: 'DELETE',
        loading: true,
        notification: true,
      });
    },
  },
});
