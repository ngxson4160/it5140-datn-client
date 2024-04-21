import { UseFetchOptions } from '#app';

export interface IJwt {
  token: string;
  refreshToken: string;
}

export async function useBaseFetch<T>(
  request: typeof NitroFetchRequest,
  opts?: UseFetchOptions<T> & {
    loading?: boolean;
  },
) {
  const loading = opts?.loading === undefined ? true : opts?.loading;

  const config = useRuntimeConfig();

  const { tokenClientEncrypt } = handleGetAuthCookie();

  let token;
  if (tokenClientEncrypt) {
    const client = handleJWTDecrypt(tokenClientEncrypt) as IJwt;
    token = client.token;
  }

  // let loadingInstance;

  // if (loading) {
  //   loadingInstance = ElLoading.service({ fullscreen: true });
  // }

  const {
    data: dataOrigin,
    error: errorOrigin,
    pending,
    refresh,
    // @ts-expect-error
  } = await useFetch<T>(request, {
    baseURL: config.public.baseURL,
    ...(token && {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    ...opts,
  });

  if (
    opts &&
    opts.method &&
    ['POST', 'PUT', 'DELETE', 'PATCH'].includes(opts?.method as string)
  ) {
    sleep(300);
  }

  // loadingInstance?.close();

  const error: IResponse | null = errorOrigin?.value?.data || null;

  // if (error) useNotificationError({ title: error?.errorMessage })
  if (error) useNotificationError({ title: error?.meta.message });

  // @ts-expect-error
  const data = dataOrigin?.value?.data as T;

  // @ts-expect-error
  const meta = dataOrigin?.value?.meta;

  return { error, pending, refresh, data, meta };
}

function sleep(ms: number) {
  const start = new Date().getTime();
  const expire = start + ms;
  let i = 0;
  while (new Date().getTime() < expire) {
    i++;
  }
  return i;
}
