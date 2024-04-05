export interface IResponse {
  statusCode: number
  data: any
  errorMessage: any
  errorCode: string
  timestamp: string
}

export interface IPaginationResponse<T> {
  data: T
  totalItems: number
  page: number
  totalPages: number
  take: number
}
