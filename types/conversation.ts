import type { IPagination } from './common';

export interface IGetMessageConversation extends IPagination {
  cursor?: number;
}

export interface IListConversation extends IPagination {
  cursor?: number;
}
