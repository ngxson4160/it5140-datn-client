import { io } from 'socket.io-client';

const systemData = ref();
const cookieSystemData = useCookie('auth.user-data').value;

if (cookieSystemData) {
  // systemData.value = await handleJWTDecrypt(cookieSystemData);
  systemData.value = handleJWTDecrypt(cookieSystemData);
}

export const socket = io('http://localhost:3010', {
  extraHeaders: {
    userId: systemData.value?.id ?? 0,
  },
});
