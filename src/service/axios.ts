import axios, { AxiosError, HttpStatusCode, isAxiosError } from 'axios';
import { getCookie, getCookies, setCookie } from '@/util/cookies';
import { requestAccessToken } from './auth';
import { APIResponse } from '@/interfaces/Dto/Core';
import { ProfileResponse } from '@/interfaces/Dto/User';
import { ServerUserTokenCookies } from '@/util/serverCookies';

export const TIMEOUT_CODE = 'ECONNABORTED';

function createMoyaAxiosInstance() {
  const moyaAxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SITE_URL}/moya/api`,
    timeout: 30000,
    timeoutErrorMessage: '요청을 처리하는 시간이 오래걸려 중단되었습니다. 이용에 불편을 드려 죄송합니다.',
  });

  return moyaAxiosInstance;
}

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
      if (error instanceof AxiosError && isAxiosError(error)) {
        const { config, response } = error;

        if (!response) throw error;

        if (response) {
          if (response.data?.status === HttpStatusCode.Unauthorized) {
            const isAutoLogin = await getCookie('autoLogin');

            if (isAutoLogin) {
              try {
                const refreshResponse = await requestAccessToken();

                const authHeader = refreshResponse.headers['authorization'];

                if (authHeader) {
                  if (typeof window === 'undefined') {
                    const { data: profileResponse } = await axiosInstance.get<ProfileResponse>('/api/auth/user/me', {
                      headers: {
                        Authorization: `${authHeader}`,
                      },
                    });

                    ServerUserTokenCookies.set({
                      email: profileResponse.data!.email,
                      cookieName: 'accessToken',
                      cookieValue: (authHeader as string).replace(/Bearer /g, ''),
                      cookieOptions: {
                        path: '/',
                        maxAge: Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAXAGE),
                      },
                    });

                    config!.headers.Authorization = `${authHeader}`;
                  } else {
                    await setCookie('accessToken', (authHeader as string).replace(/Bearer /g, ''), {
                      path: '/',
                      maxAge: Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAXAGE),
                    });
                  }
                }

                return axiosInstance(config!);
              } catch (error) {
                if (error instanceof AxiosError) {
                  const { response } = error as AxiosError<APIResponse>;

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
export const moyaAxiosInstance = createMoyaAxiosInstance();
