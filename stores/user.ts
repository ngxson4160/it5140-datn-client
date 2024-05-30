import type {
  IAccountInfo,
  IGetListFavoriteJob,
  IGetListJobApplication,
  IUserProfile,
} from '~/types/user';

export const useUserStore = defineStore(EStoreName.User, {
  state: () => ({
    myProfile: {} as IUserProfile,
    accountInfo: {} as IAccountInfo,
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
      if (isEmptyObject(this.accountInfo)) {
        const data = await useBaseFetch(`/users/account-info`);
        this.setAccountInfo(data.data);
        return data;
      } else {
        return this.accountInfo;
      }
    },

    async updateAccountInfo(body: any) {
      const { data } = await useBaseFetch(`/users/account-info`, {
        method: 'PUT',
        body: { ...body },
        loading: true,
      });
      this.setAccountInfo(data);
      useNotificationSuccess({ title: 'Thành công!' });
      return data;
    },

    async deleteJobApplication(jobId: number) {
      return await useBaseFetch(`users/jobs/${jobId}/applications`, {
        method: 'DELETE',
        loading: true,
        notification: true,
      });
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

    setAccountInfo(data: IAccountInfo) {
      this.accountInfo = data;
    },
  },
});
