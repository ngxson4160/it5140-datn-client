export interface IUserProfile {
  id: number;
  companyId: null;
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
  candidateInformation: {
    id: number;
    userId: number;
    cv: string[];
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
      major: string;
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
    desiredSalary: number;
    desiredJobLevel: number;
    desiredMode: number;
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
