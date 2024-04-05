export const useAuthSystem = (roles: TRole[]) => {
  const authStore = useAuthStore()

  handleGetProviders()

  return computed(() => {
    if (!authStore.id) return false

    roles = roles || ['SYSTEM_SUPER_ADMIN', 'SYSTEM_MANAGER']

    const isPermitted = authStore.roles.some((role) => roles.includes(role))

    return !!isPermitted
  })
}
