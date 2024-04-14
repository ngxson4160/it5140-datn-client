// export default defineNuxtRouteMiddleware((_to, _from) => {
//   const roles = _to.meta.roles as TRole[];

//   const isSystem = useAuthSystem(roles);
//   const authStore = useAuthStore();

//   if (!authStore.id) {
//     return navigateTo({ path: '/login' });
//   }

//   return true;
// });
