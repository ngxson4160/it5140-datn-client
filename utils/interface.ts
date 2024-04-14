// export interface IResponse {
//   statusCode: number
//   data: any
//   errorMessage: any
//   errorCode: string
//   timestamp: string
// }

export interface IMeta {
  code: number;
  statusCode: number;
  message: string;
  extraMeta?: object;
}

export interface IResponse {
  meta: IMeta;
  data: any;
}

export interface IPaginationResponse<T> {
  data: T;
  totalItems: number;
  page: number;
  totalPages: number;
  take: number;
}
