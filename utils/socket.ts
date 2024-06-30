import { io } from 'socket.io-client';

const systemData = ref();
const cookieSystemData = useCookie('auth.user-data').value;

if (cookieSystemData) {
  // systemData.value = await handleJWTDecrypt(cookieSystemData);
  systemData.value = handleJWTDecrypt(cookieSystemData);
}

const config = useRuntimeConfig();

export const socket = io(config.public.webSocket, {
  extraHeaders: {
    userId: systemData.value?.id ?? 0,
  },
});
