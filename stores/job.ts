import { EJobStatus, type IGetListJobParams, type IJob } from '~/types/job';

export const InitJob: IJob = {
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

export const useJobStore = defineStore(EStoreName.JOB, {
  state: () => ({}),
  actions: {
    async getJob(id: number) {
      return await useBaseFetch(`/jobs/${id}`);
    },

    async getListJob(query: IGetListJobParams) {
      return await useBaseFetch(`/jobs`, { query });
    },
  },
});
