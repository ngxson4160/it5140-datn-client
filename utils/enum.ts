export enum ERole {
  ROOT = 1,
  ADMIN = 2,
  COMPANY = 3,
  USER = 4,
}

export enum EOrderPaging {
  ASC = 'asc',
  DESC = 'desc',
}

export enum EStoreName {
  AUTH = 'auth',
  COMMON = 'common',
  PAGINATION = 'pagination',
  UPLOAD = 'upload',
  JOB_CATEGORY_PARENT = 'jobCategoryParent',
  JOB = 'job',
  City = 'city',
  COMPANY = 'company',
  User = 'User',
}

export enum EGender {
  MALE,
  FEMALE,
  OTHER,
}

export enum EMaritalStatus {
  SINGLE,
  MARRIED,
}

export enum EUserStatus {
  INACTIVE,
  ACTIVE,
}

export enum EEducationLevel {
  ELEMENTARY,
  JUNIOR_HIGHT_SCHOOL,
  HIGHT_SCHOOL,
  COLLEGE,
  BACHELOR,
  ENGINEER,
  MASTER,
  DOCTOR,
}

export enum EApplicationStatus {
  WAITING_CV,
  APPROVE_CV,
  REJECT_CV,
  INTERVIEW,
  PROCESSING,
  SUCCESS,
  FAILURE,
  // DELETED,
}

export enum EJobType {
  NOT_YET,
  IN_PROGRESS,
  EXPIRED,
}

export enum ECompanySizeType {
  TINY,
  SMALL,
  LITTLE,
  FAT,
  LARGE,
  BIG,
}

export enum EPublicCVType {
  NOT_PUBLIC = 0,
  SYSTEM_CV = 1,
  ATTACHMENT_CV = 2,
}
