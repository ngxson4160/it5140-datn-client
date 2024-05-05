import type { EOrderPaging, IPagination } from './common';
import type { EJobLevel } from './job';

export interface IGetListJob extends IPagination {
  title?: string;
  type?: string;
  status?: string;
  sortCreatedAt?: EOrderPaging;
}

export interface IGetListCandidate extends IPagination {
  jobId?: number;
  status?: string;
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
  candidateFirstName: string;
  candidateLastName: string;
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
