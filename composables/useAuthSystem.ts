export const useAuthSystem = (roles: TRole[]) => {
  const authStore = useAuthStore();

  handleGetProviders();

  return computed(() => {
    if (!authStore.id) return false;

    const isPermitted = authStore.roles.some((role) => roles.includes(role));

    return !!isPermitted;
  });
};
