import type {
  ICompanyInformation,
  ICompanyRegisterAccount,
} from '~/types/auth';

export interface IAuthState {
  id: string | null;
  email: string;
  roles: TRole[];
  firstName?: string;
  lastName?: string;
}

export interface ISystemLogin {
  email: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export const useAuthStore = defineStore(EStoreName.AUTH, {
  state: (): IAuthState => {
    return {
      id: null,
      email: '',
      roles: [],
      firstName: '',
      lastName: '',
    };
  },
  actions: {
    updateAuthStore(params: IAuthState) {
      this.id = params.id;
      this.email = params.email;
      this.roles = params.roles;
      this.firstName = params.firstName;
      this.lastName = params.lastName;
    },

    async systemLogin(body: ISystemLogin) {
      const data = await handleSignIn('/auth/sign-in', body);
      return data;
    },

    async companySignUp(data: {
      user: ICompanyRegisterAccount;
      company: ICompanyInformation;
    }) {
      return await useBaseFetch('/auth/company/sign-up', {
        method: 'POST',
        body: data,
      });
    },

    async checkEmailExist(email: string) {
      return await useBaseFetch('/auth/check-email', {
        method: 'POST',
        body: { email },
      });
    },

    async changePassword(body: IChangePassword) {
      const data = await useBaseFetch(`/auth/change-password`, {
        method: 'PUT',
        body: { ...body },
        loading: true,
      });
      if (data.meta.statusCode === 200) {
        useNotificationSuccess({ title: 'Thành công!' });
      }
      return data;
    },
  },
});
