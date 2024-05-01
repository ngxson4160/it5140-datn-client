import type { IUserProfile } from '~/types/user';

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

    setMyProfile(data: IUserProfile) {
      this.myProfile = data;
    },
  },
});
