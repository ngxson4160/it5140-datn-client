export interface ICompany {
  id: number | null;
  name: string;
  avatar: string;
  coverImage: string;
  primaryAddress: string;
  totalStaff: number | null;
}

export const useCompanyStore = defineStore(EStoreName.COMPANY, {
  state: () => ({}),
  actions: {},
});
