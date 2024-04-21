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
  hours: null,
  workMode: null,
  officeName: '',
  city: [],
  address: [],
  quantity: 0,
  totalViews: 0,
  totalCandidate: 0,
  benefits: '',
  description: '',
  requirement: '',
  gender: null,
  yearExperienceMin: 0,
  yearExperienceMax: 0,
  hiringStartDate: '',
  hiringEndDate: '',
  status: EJobStatus.DRAFT,
  createdAt: '',
  createdBy: '',
  updatedAt: '',
  updatedBy: '',
  jobHasTags: [],
  creator: {
    id: null,
    email: '',
    avatar: null,
    firstName: '',
    lastName: '',
    company: {
      id: null,
      jobCategoryParentId: null,
      name: '',
      avatar: null,
    },
  },
};

export const useJobStore = defineStore(EStoreName.JOB, {
  state: () => ({}),
  actions: {
    async getJob(id: String) {
      return await useBaseFetch(`/jobs/${id}`);
    },

    async getListJob(query: IGetListJobParams) {
      return await useBaseFetch(`/jobs`, { query });
    },
  },
});
