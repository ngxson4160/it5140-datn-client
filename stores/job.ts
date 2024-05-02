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
  status: EJobStatus.DRAFT,
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
  yearExperience: 0,
  hiringStartDate: '',
  hiringEndDate: '',
  status: EJobStatus.PUBLIC,
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
      return await useBaseFetch(`/jobs`, { query });
    },

    async createJob(body: IJobCreate) {
      return await useBaseFetch(`/jobs`, { method: 'POST', body });
    },
  },
});
