export type TRole = 'SYSTEM_SUPER_ADMIN' | 'SYSTEM_MANAGER'

export interface IAuthState {
  id: string | null
  email: string
  roles: TRole[]
  firstName?: string | undefined
  lastName?: string | undefined
}

export interface ISystemLogin {
  email: string
  password: string
}

export const useAuthStore = defineStore(EStoreName.AUTH, {
  state: (): IAuthState => {
    return {
      id: null,
      email: '',
      roles: [],
      firstName: '',
      lastName: '',
    }
  },
  actions: {
    updateAuthStore(params: IAuthState) {
      this.id = params.id
      this.email = params.email
      this.roles = params.roles
      this.firstName = params.firstName
      this.lastName = params.lastName
    },
    async systemLogin(body: ISystemLogin) {
      const data = await handleSignIn('/system/login', body)

      if (data?.errorCode) return

      return navigateTo('/', {
        external: true,
      })
    },
  },
})
