import type { EOrderPaging, IPagination } from './common';

export interface CreateBlog {
  title: string;
  image: string;
  content: string;
}

export interface IGetListBlog extends IPagination {
  sortCreatedAt?: EOrderPaging;
  creatorId?: number;
  companyId?: number;
}
