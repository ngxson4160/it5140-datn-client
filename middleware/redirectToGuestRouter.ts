export default defineNuxtRouteMiddleware((to) => {
  const cookieSystemData = useCookie('auth.user-data').value;
  if (!cookieSystemData) return navigateTo(to.fullPath.replace('/user', ''));
});
