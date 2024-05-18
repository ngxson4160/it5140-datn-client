import type { EGender, EOrderPaging, IPagination } from './common';
import type { EJobLevel, EJobMode } from './job';
import type {
  EApplicationClassify,
  ECompanySizeType,
  EEducationLevel,
  EMaritalStatus,
} from '~/utils/enum';

export interface IGetListJob extends IPagination {
  title?: string;
  type?: string;
  status?: string;
  sortCreatedAt?: EOrderPaging;
}

export interface IGetListCandidate extends IPagination {
  name?: string;
  jobId?: number;
  status?: string;
  classify?: string;
  sortCreatedAt?: EOrderPaging;
}

export interface ICandidate {
  id: number;
  userId: number;
  jobId: number;
  status: number;
  interviewSchedule: string | null;
  companyRemark: string;
  candidateCv: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhoneNumber: string;
  createdAt: string | null;
  createdBy: number | null;
  updatedAt: string | null;
  updatedBy: number | null;
  job: {
    title: string;
  };
}

export interface IUpdateCompany {
  name?: string;
  primaryEmail?: string;
  taxCode?: string;
  website?: string;
  jobCategoryParentId?: number | null;
  sizeType?: ECompanySizeType;
  primaryAddress?: string;
  primaryPhoneNumber?: string;
  aboutUs?: string;
  avatar?: string;
  coverImage?: string;
}

export interface IGetListCompany extends IPagination {
  name?: string;
}

export interface ISearchCandidate extends IPagination {
  filter?: string;
  cityId?: number;
  yearExperienceMin?: number;
  yearExperienceMax?: number;
  desiredJobCategoryIds?: number[];
  gender?: EGender;
  desiredJobLevel?: EJobLevel;
  desiredJobMode?: EJobMode;
  maritalStatus?: EMaritalStatus;
  educationalLevel?: EEducationLevel;
}
