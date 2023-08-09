import axios, { HttpStatusCode, isAxiosError } from 'axios';
import { getCookie, setCookie } from '@/util/cookies';
import { requestAccessToken } from './auth';

export const TIMEOUT_CODE = 'ECONNABORTED';

function createAxiosInstance() {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER,
    withCredentials: true,
    timeout: 15000,
    timeoutErrorMessage: '요청을 처리하는 시간이 오래걸려 중단되었습니다. 이용에 불편을 드려 죄송합니다.',
  });

  axiosInstance.interceptors.request.use(
    async (req) => {
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
            const refreshToken = await getCookie('refreshToken');
            const isAutoLogin = await getCookie('autoLogin');

            if (refreshToken && isAutoLogin) {
              try {
                const refreshResponse = await requestAccessToken();

                const accessToken = refreshResponse.headers['authorization'];

                if (accessToken) {
                  await setCookie('accessToken', (accessToken as string).replace('Bearer ', ''), {
                    maxAge: 60 * 60,
                    path: '/',
                  });
                }

                return axiosInstance(config!);
              } catch (error) {
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
