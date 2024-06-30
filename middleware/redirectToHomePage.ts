export default defineNuxtRouteMiddleware((to) => {
  const cookieSystemData = useCookie('auth.user-data').value;
  if (cookieSystemData) {
    const systemData = handleJWTDecrypt(cookieSystemData);

    if (systemData && systemData.roles?.[0] === ERole.USER) {
      return navigateTo('/user');
    }

    if (systemData && systemData.roles?.[0] === ERole.COMPANY) {
      return navigateTo('/company/profile');
    }
  }
});
