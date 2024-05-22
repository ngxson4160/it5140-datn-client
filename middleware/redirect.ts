const PATH_GUEST = [
  /^login$/,
  /^sign-up$/,
  /^company\/sign-up$/,
  /^forgot-password$/,
  /^forgot-password\/reset$/,
  /^$/,
  /^company\/\d+$/,
  /^company\/list$/,
  /^job\/\d+$/,
  /^job\/list$/,
  /^message$/,
  /^setting$/,
];

const PATH_USER = [
  /^user\/company\/\d+$/,
  /^user\/company\/list$/,
  /^user\/job\/\d+$/,
  /^user\/job\/application$/,
  /^user\/job\/list$/,
  /^user\/message$/,
  /^user\/setting$/,
  /^user$/,
  /^user\/profile$/,
];

const PATH_COMPANY = [
  /^company\/profile$/,
  /^company\/blog\/list$/,
  /^company\/candidate\/list$/,
  /^company\/candidate\/search$/,
  /^company\/job\/\d+$/,
  /^company\/job\/list$/,
  /^company\/job\/\d+\/edit$/,
  /^company\/job\/create$/,
  /^company\/message$/,
  /^company\/setting$/,
];

function checkPath(arr: RegExp[], str: string) {
  str = str.toLocaleLowerCase();
  if (str.startsWith('/')) {
    str = str.substring(1);
  }
  if (str.endsWith('/')) {
    str = str.slice(0, -1);
  }

  let isExistPath = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].test(str)) {
      isExistPath = true;
      break;
    }
  }
  return isExistPath;
}

export default defineNuxtRouteMiddleware((to) => {
  const cookieSystemData = useCookie('auth.user-data').value;

  if (!cookieSystemData) {
    if (!checkPath(PATH_GUEST, to.fullPath)) {
      return navigateTo('/');
    }
    return;
  }

  const systemData = handleJWTDecrypt(cookieSystemData);

  if (!systemData) {
    if (!checkPath(PATH_GUEST, to.fullPath)) {
      return navigateTo('/');
    }
    return;
  }

  if (systemData.roles?.[0] === ERole.USER) {
    if (!checkPath(PATH_USER, to.fullPath)) {
      return navigateTo('/user');
    }
    return;
  }

  if (systemData.roles?.[0] === ERole.COMPANY) {
    if (!checkPath(PATH_COMPANY, to.fullPath)) {
      return navigateTo('/company/profile');
    }
    return;
  }

  if (systemData.roles?.[0] === ERole.ADMIN) {
    if (!checkPath(PATH_USER, to.fullPath)) {
      return navigateTo('/admin/company/list');
    }
  }
});
