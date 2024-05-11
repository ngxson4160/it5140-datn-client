import type { ECompanySizeType } from '@/utils/enum.ts';

export interface ICompanyRegisterAccount {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ICompanyInformation {
  name: string;
  jobCategoryParentId: number | null;
  primaryPhoneNumber: string;
  primaryAddress: string;
  sizeType: ECompanySizeType | null;
}
