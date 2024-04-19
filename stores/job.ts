import { EJobStatus, type EGender } from '~/utils/enum';

export interface IJob {
  id: number | null;
  creatorId: number | null;
  jobCategoryId: number | null;
  title: string;
  position: string;
  salaryMin: number;
  salaryMax: number;
  images: Array<string>;
  hours: number | null;
  workMode: number | null;
  officeName: string;
  city: Array<string>;
  address: Array<string>;
  quantity: number;
  totalViews: number;
  totalCandidate: number;
  benefits: string;
  description: string;
  requirement: string;
  gender: EGender | null;
  yearExperienceMin: number;
  yearExperienceMax: number;
  hiringStartDate: string;
  hiringEndDate: string;
  status: EJobStatus;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  jobHasTags: Array<{
    id: number;
    tagId: number;
    jobId: number;
  }>;
  creator: {
    id: number | null;
    email: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    company: {
      id: number | null;
      jobCategoryParentId: number | null;
      name: string;
      avatar: string | null;
    };
  };
}

export interface IUploadResponse extends IResponse {
  data: IFileInformation;
}

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
  },
});
