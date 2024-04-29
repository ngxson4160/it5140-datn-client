export enum EGender {
  MALE,
  FEMALE,
  OTHER,
}

export const VGender = ['Nam', 'Nữ', 'Khác'];

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
