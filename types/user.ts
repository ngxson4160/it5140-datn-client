import type { IPagination } from './common';
import type { EEducationLevel, EPublicCvType } from '~/utils/enum';

export interface IUserProfile {
  id: number;
  companyId: number | null;
  cityId: number | null;
  districtId: number | null;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  dob: string;
  gender: number;
  phoneNumber: string;
  maritalStatus: number;
  address: string;
  status: number;
  createdAt: string;
  createdBy: null;
  updatedAt: string;
  updatedBy: null;
  city: {
    id: number;
    name: string;
  };
  district: {
    id: number;
    name: string;
  };
  educationalLevel: EEducationLevel;
  candidateInformation: {
    id: number;
    publicCvType: EPublicCvType;
    publicAttachmentCv: string | null;
    target: string;
    userId: number;
    desiredJobCategoryId: number;
    desiredCityId: number;
    desiredSalary: number;
    desiredJobLevel: number;
    desiredJobMode: number;
    cv: Array<{
      title: string;
      url: string;
    }>;
    yearExperience: number;
    workExperience: Array<{
      position: string;
      companyName: string;
      start: string;
      end: string;
      description: string;
    }>;
    education: Array<{
      name: string;
      major: string;
      organization: string;
      start: string;
      end: string;
      description: string;
    }>;
    certificate: Array<{
      name: string;
      organization: string;
      start: string;
      end: string;
      description: string;
    }>;
    advancedSkill: Array<{
      name: string;
      level: number;
    }>;
    languageSkill: Array<{
      name: string;
      level: number;
    }>;
    project: Array<{
      name: string;
      start: string;
      end: string;
      description: string;
    }>;
    status: number;
    createdAt: string;
    createdBy: null;
    updatedAt: string;
    updatedBy: null;
    desiredCity: {
      id: number;
      name: string;
    };
    desiredJobCategory: {
      id: number;
      name: string;
    };
  };
}

export interface IJobApplication {
  id: number | null;
  userId: number | null;
  jobId: number | null;
  status: number | null;
  interviewSchedule: null;
  createdAt: string;
  createdBy: number | null;
  updatedAt: string;
  updatedBy: number | null;
  candidateCv: string;
  job: {
    id: number | null;
    title: string;
    salaryMin: number | null;
    salaryMax: number | null;
    hiringEndDate: string;
    company: {
      id: number | null;
      name: string;
      avatar: string;
      coverImage: null;
    };
    cities: Array<{
      id: number | null;
      name: string;
    }>;
    tags: Array<{
      id: number | null;
      name: string;
    }>;
  };
}

export interface IAccountInfo {
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUserProfileResponse extends IResponse {
  data: IUserProfile;
}

export interface IGetListJobApplication extends IPagination {
  status?: number;
}

export interface IGetListFavoriteJob extends IPagination {}
