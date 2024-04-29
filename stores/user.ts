import type { IUserProfileResponse } from '~/types/user';

export const useUserStore = defineStore(EStoreName.User, {
  state: () => ({}),
  actions: {
    async getMyProfile(): Promise<IUserProfileResponse> {
      return await useBaseFetch(`/users/my-profile`);
    },
  },
});
