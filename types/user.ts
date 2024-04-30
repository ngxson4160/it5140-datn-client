import type { EEducationLevel } from '#imports';

export interface IUserProfile {
  id: number;
  companyId: number | null;
  cityId: number | null;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  dob: string;
  gender: number;
  phoneNumber: string;
  district: string;
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
  educationalLevel: EEducationLevel;
  candidateInformation: {
    id: number;
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

export interface IUserProfileResponse extends IResponse {
  data: IUserProfile;
}
