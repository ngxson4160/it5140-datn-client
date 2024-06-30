export default defineNuxtRouteMiddleware((to) => {
  const cookieSystemData = useCookie('auth.user-data').value;
  if (!cookieSystemData) return navigateTo(to.fullPath.replace('/user', ''));

  const systemData = handleJWTDecrypt(cookieSystemData);

  if (systemData && systemData.roles?.[0] === ERole.COMPANY) {
    return navigateTo('/company/profile');
  }
});
