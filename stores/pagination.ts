export interface IPaginationState {
  take: number
  page: number
  totalItems: number
  totalPages: number
}

export const usePaginationStore = defineStore(EStoreName.PAGINATION, {
  state: (): IPaginationState => {
    return {
      take: 10,
      page: 1,
      totalItems: 1,
      totalPages: 1,
    }
  },
  actions: {
    setPagination(
      params: Omit<IPaginationState, 'totalPages'> & { totalPages?: number },
    ) {
      this.take = params.take
      this.page = params.page
      this.totalItems = params.totalItems
      this.totalPages =
        params.totalPages || Math.ceil(params.totalItems / params.take)
    },
  },
})
