import type { EGender, IPagination } from './common';

export enum EJobStatus {
  DRAFT,
  PUBLIC,
  DELETED,
}

export enum EJobMode {
  PART_TIME,
  FULL_TIME,
}

export enum EApplicationStatus {
  WAITING_CV,
  APPROVE_CV,
  REJECT_CV,
  INTERVIEW,
  PROCESSING,
  SUCCESS,
  FAILURE,
  DELETED,
}

export enum EJobLevel {
  INTERN,
  STAFF,
  LEADER,
  HEAD_OR_DEPUTY_DEPARTMENT,
  MANAGER,
  HEAD_BRANCH,
  VICE_DIRECTOR,
  DIRECTOR,
}

export enum EJobSalary {
  UNDER_TEN,
  TEN_TO_FIFTEEN,
  FIFTEEN_TO_TWENTY,
  TWENTY_TO_TWENTY_FIVE,
  TWENTY_FIVE_TO_THIRTY,
  THIRTY_TO_FIFTY,
  HIGHER_FIFTY,
  AGREEMENT,
}

export enum EJobExperience {
  NOT_AVAILABLE,
  UNDER_ONE,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  HIGHER_FIVE,
}

export interface IJob {
  id: number | null;
  creatorId: number | null;
  jobCategoryId: number | null;
  title: string;
  position: string;
  salaryMin: number | null;
  salaryMax: number | null;
  images: Array<string>;
  jobMode: EJobMode | null;
  level: EJobLevel | null;
  officeName: string;
  city: Array<string>;
  address: object[];
  quantity: number;
  totalViews: number;
  totalCandidate: number;
  benefits: string;
  description: string;
  requirement: string;
  time: string;
  gender: EGender | null;
  yearExperience: number;
  hiringStartDate: string;
  hiringEndDate: string;
  status: EJobStatus;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  // tags: Array<{ id: number; name: string }>;
  // cities: Array<{ id: number; name: string }>;
}

export interface IJobResponse extends IJob {
  tags: Array<{ id: number; name: string }>;
  cities: Array<{ id: number; name: string }>;
}

export interface IJobCreate {
  title: string;
  jobCategoryId: number | null;
  salaryMin: number;
  salaryMax: number;
  jobMode: null;
  level: null;
  officeName: string;
  quantity: number | null;
  totalViews: number;
  totalCandidate: number;
  benefits: string;
  description: string;
  requirement: string;
  time: string;
  gender: null;
  yearExperience: number;
  hiringStartDate: string;
  hiringEndDate: string;
  status: EJobStatus;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  cityIds: number[];
  address: Array<{
    cityId: number | null;
    cityName: string;
    address: Array<{
      districtId: number | null;
      districtName: string;
      data: string;
    }>;
  }>;
}

export interface IGetListJobParams extends IPagination {
  filter?: string;
  cityIds?: number[];
  jobCategoryIds?: number[];
  jobMode?: EJobMode;
  level?: EJobLevel;
  salaryMin?: number;
  salaryMax?: number;
  yearExperienceMin?: number;
  yearExperienceMax?: number;
  companyId?: number;
  all?: boolean;
}
