import CryptoJS from 'crypto-js';
import { useLocalStorage } from '@vueuse/core';

interface IUser extends IAuthState {}

interface ILogin {
  user: IUser;
  token: string;
  refreshToken: string;
}

export interface IAuthLocalStorage {
  tokenClientEncrypt: string;
  dataClientEncrypt: string;
}

export function handleJWTEncrypt(payload: Object) {
  const runtimeConfig = useRuntimeConfig();

  return CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    runtimeConfig.public.nuxtAuthSecret,
  ).toString();
}

export function handleJWTDecrypt(token: string) {
  const runtimeConfig = useRuntimeConfig();

  return JSON.parse(
    CryptoJS.AES.decrypt(token, runtimeConfig.public.nuxtAuthSecret).toString(
      CryptoJS.enc.Utf8,
    ),
  );
}

export function generateIdFromString(inputString: string) {
  const hash = CryptoJS.SHA256(inputString);
  const id = hash.toString(CryptoJS.enc.Hex);
  return id;
}

/**
 * set auth localStorage
 */
export function handleSetAuthLocalStorage(payload: IAuthLocalStorage) {
  const tokenClientEncrypt = useLocalStorage('auth.session-token', '');
  tokenClientEncrypt.value = payload.tokenClientEncrypt;

  const dataClientEncrypt = useLocalStorage('auth.user-data', '');
  dataClientEncrypt.value = payload.dataClientEncrypt;
}

/**
 * get auth localStorage
 */
export function handleGetAuthLocalStorage() {
  const tokenClientEncrypt = useLocalStorage('auth.session-token', '');
  const dataClientEncrypt = useLocalStorage('auth.user-data', '');

  return {
    tokenClientEncrypt,
    dataClientEncrypt,
  };
}

/**
 * remove auth localStorage
 */
export function handleRemoveAuthLocalStorage() {
  const tokenClientEncrypt = useLocalStorage('auth.session-token', '');
  tokenClientEncrypt.value = null;
  const dataClientEncrypt = useLocalStorage('auth.user-data', '');
  dataClientEncrypt.value = null;
  const dataTemple = useLocalStorage('templeId', '');
  dataTemple.value = null;
  const tokenSwitchAccount = useLocalStorage('switchAccountToken', '');
  tokenSwitchAccount.value = null;
}

/**
 * set auth localStorage
 */
export function handleSetAuthCookie(payload: IAuthLocalStorage) {
  const tokenClientEncrypt = useCookie('auth.session-token');
  tokenClientEncrypt.value = payload.tokenClientEncrypt;

  const dataClientEncrypt = useCookie('auth.user-data');
  dataClientEncrypt.value = payload.dataClientEncrypt;
}

/**
 * get auth localStorage
 */
export function handleGetAuthCookie() {
  const tokenClientEncrypt = useCookie('auth.session-token');
  const dataClientEncrypt = useCookie('auth.user-data');

  return {
    tokenClientEncrypt: tokenClientEncrypt.value,
    dataClientEncrypt: dataClientEncrypt.value,
  };
}

/**
 * remove auth localStorage
 */
export function handleRemoveAuthCookie() {
  const tokenClientEncrypt = useCookie('auth.session-token');
  tokenClientEncrypt.value = null;
  const dataClientEncrypt = useCookie('auth.user-data');
  dataClientEncrypt.value = null;
}

/**
 * get auth middleware
 */
export function handleGetProviders() {
  const authStore = useAuthStore();

  /**
   * get cookie
   */
  const cookieSessionAuth = useCookie('auth.session-token').value;
  const cookieUserData = useCookie('auth.user-data').value;

  if (!cookieUserData || !cookieSessionAuth) return;
  /**
   * set localStorage
   */
  handleSetAuthLocalStorage({
    tokenClientEncrypt: cookieSessionAuth,
    dataClientEncrypt: cookieUserData,
  });
  /**
   * set pinia
   */
  const userData = handleJWTDecrypt(cookieUserData);

  authStore.updateAuthStore(userData);
  localStorage.setItem('templeId', userData.templeId);

  return true;
}

/**
 * sigIn
 */
export async function handleSignIn(
  endpoint: string,
  body: any, // FIXME: any
) {
  handleRemoveAuthCookie();
  handleRemoveAuthLocalStorage();

  const { data, meta } = await useBaseFetch<ILogin>(endpoint, {
    method: 'POST',
    body,
    loading: true,
  });

  // TODO: check có thể lỗi sau khi sửa
  if (meta.statusCode === 200) handleAuthData(data);
  return { data, meta };
}

export function handleAuthData(data: ILogin) {
  const payloadToken = {
    token: data.token,
    refreshToken: data.refreshToken,
  };

  const tokenClientEncrypt = handleJWTEncrypt(payloadToken);

  const payloadUserData: IAuthState = {
    id: data.user.id,
    email: data.user.email,
    roles: data.user.roles,
    firstName: data.user.firstName,
    lastName: data.user.lastName,
  };

  const dataClientEncrypt = handleJWTEncrypt(payloadUserData);

  /**
   * step 1: set local storage
   * step 2: set pinia
   * step 3: xu ly khi load lai trang middlawere get token from local add pinia
   * step 4: add token vao method common
   */

  /**
   * set localStorage
   */
  handleRemoveAuthLocalStorage();

  handleSetAuthLocalStorage({ tokenClientEncrypt, dataClientEncrypt });

  /**
   * set cookie
   */

  handleRemoveAuthCookie();

  handleSetAuthCookie({ tokenClientEncrypt, dataClientEncrypt });

  /**
   * set pinia
   */
  const authStore = useAuthStore();

  authStore.updateAuthStore(payloadUserData);
}

/**
 * logout
 */
export function handleLogout() {
  handleRemoveAuthCookie();

  handleRemoveAuthLocalStorage();

  // location.reload();

  navigateTo({ path: '/' });
}

/**
 * check login
 */
export function handleCheckLogin() {
  const userData = getUserData();
  const route = useRoute();

  if (!userData?.id) {
    const pathPreLogin = useLocalStorage('path-pre-login', '');
    pathPreLogin.value = route.path;

    navigateTo({ path: '/login' });
  }

  return !!userData?.id;
}
