export default defineNuxtRouteMiddleware((_to, _from) => {
  const roles = _to.meta.roles as TRole[];

  if (!roles) return true;

  const isSystem = useAuthSystem(roles);
  const authStore = useAuthStore();

  // if (!authStore.id || !isSystem.value) {
  //   return navigateTo({ path: '/404' });
  // }

  if (!authStore.id) {
    return navigateTo({ path: '/login' });
  }

  if (!isSystem.value) {
    return navigateTo({ path: '/404' });
  }

  return true;
});
