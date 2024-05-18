import type {
  IGetListFavoriteJob,
  IGetListJobApplication,
  IUserProfile,
} from '~/types/user';

export const useUserStore = defineStore(EStoreName.User, {
  state: () => ({
    myProfile: {} as IUserProfile,
  }),
  actions: {
    async getMyProfile(): Promise<IUserProfile> {
      const { data } = await useBaseFetch(`/users/my-profile`);
      this.setMyProfile(data);
      return data;
    },

    async updateMyProfile(body: any): Promise<IUserProfile> {
      const { data } = await useBaseFetch(`/users/my-profile`, {
        method: 'PUT',
        body: { ...body },
        loading: true,
      });
      this.setMyProfile(data);
      useNotificationSuccess({ title: 'Thành công!' });
      return data;
    },

    async applyJob(jobId: number, body: any) {
      const { data } = await useBaseFetch(`/users/jobs/${jobId}/applications`, {
        method: 'POST',
        body: { ...body },
        loading: true,
      });
      useNotificationSuccess({ title: 'Thành công!' });
      return data;
    },

    async getListJobApplication(query: IGetListJobApplication) {
      const data = await useBaseFetch(`/users/applications`, { query });
      return data;
    },

    async getAccountInfo() {
      return await useBaseFetch(`/users/account-info`);
    },

    async updateAccountInfo(body: any) {
      const { data } = await useBaseFetch(`/users/account-info`, {
        method: 'PUT',
        body: { ...body },
        loading: true,
      });
      useNotificationSuccess({ title: 'Thành công!' });
      return data;
    },

    async getListFavorite(query: IGetListFavoriteJob) {
      return await useBaseFetch(`users/jobs/favorites`, {
        query,
        loading: true,
      });
    },

    setMyProfile(data: IUserProfile) {
      this.myProfile = data;
    },
  },
});
