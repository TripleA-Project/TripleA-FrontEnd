import axios, { AxiosError, HttpStatusCode, isAxiosError } from 'axios';
import { getCookie, getCookies, setCookie } from '@/util/cookies';
import { requestAccessToken } from './auth';
import { APIResponse } from '@/interfaces/Dto/Core';
import { ProfileResponse } from '@/interfaces/Dto/User';

export const TIMEOUT_CODE = 'ECONNABORTED';

function createAxiosInstance() {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER,
    withCredentials: true,
    timeout: 30000,
    timeoutErrorMessage: '요청을 처리하는 시간이 오래걸려 중단되었습니다. 이용에 불편을 드려 죄송합니다.',
  });

  axiosInstance.interceptors.request.use(
    async (req) => {
      if (typeof window === 'undefined') {
        const cookies = await getCookies();

        console.log({ cookies });

        const cookie = cookies.length
          ? cookies
              .map(({ name, value }, idx, arr) => `${name}=${idx === arr.length - 1 ? value : `${value} `}`)
              .join(';')
          : '';

        req.headers.Cookie = cookie;
      }

      const accessToken = await getCookie('accessToken');

      if (accessToken) {
        req.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return req;
    },
    (error) => {
      throw error;
    },
  );

  axiosInstance.interceptors.response.use(
    async (res) => {
      return res;
    },
    async (error) => {
      if (isAxiosError(error)) {
        const { config, response } = error;

        if (!response) throw error;

        if (response) {
          if (response.data?.status === HttpStatusCode.Unauthorized) {
            const isAutoLogin = await getCookie('autoLogin');

            if (isAutoLogin) {
              try {
                const refreshResponse = await requestAccessToken();

                const accessToken = refreshResponse.headers['authorization'];

                console.log('[success] ', refreshResponse.data);

                if (accessToken) {
                  if (typeof window === 'undefined') {
                    const { data: profileResponse } = await axiosInstance.get<ProfileResponse>('/api/auth/user/me', {
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                      },
                    });

                    console.log('[user]', profileResponse.data);

                    const serverUserTokenCookies = await import('@/app/layout').then(
                      (mod) => mod.serverUserTokenCookies,
                    );

                    serverUserTokenCookies.set({
                      email: profileResponse.data!.email,
                      cookieName: 'accessToken',
                      cookieValue: (accessToken as string).replace('Bearer ', ''),
                      cookieOptions: {
                        path: '/',
                        maxAge: Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAXAGE),
                      },
                    });

                    config!.headers.Authorization = `Bearer ${accessToken}`;
                  } else {
                    await setCookie('accessToken', (accessToken as string).replace('Bearer ', ''), {
                      maxAge: Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAXAGE),
                      path: '/',
                    });
                  }
                }

                return axiosInstance(config!);
              } catch (error) {
                if (error instanceof AxiosError) {
                  const { response } = error as AxiosError<APIResponse>;

                  console.log(error.message);
                  console.log('[refreshErrorRequest] ', response?.request['_header']);
                  console.log('[refreshErrorResponsePayload] ', response?.data);

                  if (response) {
                    response.data = {
                      status: HttpStatusCode.Unauthorized,
                      msg: 'refresh token api fail',
                    };

                    throw error;
                  }
                }

                throw error;
              }
            }

            throw error;
          }
        }
      }

      throw error;
    },
  );

  return axiosInstance;
}

export const axiosInstance = createAxiosInstance();
