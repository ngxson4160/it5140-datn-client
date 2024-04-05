export type TRole = 'SYSTEM_SUPER_ADMIN' | 'SYSTEM_MANAGER'

type TLink = {
  label: string
  icon?: string
  iconClass?: string
  avatar?: { src: string }
  badge?: number
  to?: string
  click?: () => void
  children?: TLink[]
}

export interface ICommonState {
  links: TLink[]
  loading: boolean
}

export const useCommonStore = defineStore(EStoreName.COMMON, {
  state: (): ICommonState => {
    return {
      links: [
        {
          label: 'Post',
          icon: 'i-heroicons-newspaper',
          to: '/post',
        },
        {
          label: 'My Details',
          icon: 'i-heroicons-flag',
          to: '/my-page',
        },
        {
          label: 'Profiles',
          icon: 'i-heroicons-user',
          to: '/',
        },

        {
          label: 'Roles & Permission',
          icon: 'i-heroicons-bolt-slash',
          to: '/dasdsada',
        },
        {
          label: 'Billing',
          icon: 'i-heroicons-bell-snooze',
          to: '/dsad',
          badge: 20,
        },
        {
          label: 'Dashboard',
          icon: 'i-heroicons-chart-pie',
          to: '/dasda',
        },
      ],
      loading: false,
    }
  },
  actions: {
    async templeLogin(body: ISystemLogin) {
      const data = await handleSignIn('/temple/login', body)

      if (data?.errorCode) return

      return navigateTo('/temple/users', {
        external: true,
      })
    },
    async userLogin(body: ISystemLogin) {
      return await handleSignIn('/user/login', body)
    },
  },
})
