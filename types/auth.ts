import type { EGender } from './common';

export interface ICompanyRegisterAccount {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ICompanyInformation {
  jobCategoryParentId: number | null;
  name: string;
  totalStaff: number | null;
  primaryCity: string;
  primaryPhoneNumber: string;
}
