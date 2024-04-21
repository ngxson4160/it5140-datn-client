export enum EGender {
  MALE,
  FEMALE,
  OTHER,
}

export enum EOrderPaging {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IPagination {
  page?: number;
  limit?: number;
  filter?: string;
  order?: EOrderPaging;
}
