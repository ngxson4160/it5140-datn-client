export const permittedSome = (rolesVisible: TRole[]): boolean => {
  const authStore = useAuthStore()
  const roles = authStore.roles
  return roles.some((role) => rolesVisible.includes(role))
}

export const redirectByRole = () => {
  if (permittedSome([ERole.SYSTEM_SUPER_ADMIN, ERole.SYSTEM_MANAGER]))
    return '/'
}
