import type { EOrderPaging, IPagination } from './common';
import type { ENotificationStatus } from '~/utils/enum';

export interface IGetListNotification extends IPagination {
  sortCreatedAt?: EOrderPaging;
}

export interface IUpdateManyNotification {
  content?: string;

  status?: ENotificationStatus;
}
