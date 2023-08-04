import axios, { HttpStatusCode, isAxiosError } from 'axios';
// import { getURL } from '@/util/url';
import { getCookie, setCookie } from '@/util/cookies';
import { requestAccessToken } from './auth';
import { redirect } from 'next/navigation';

export const TIMEOUT_CODE = 'ECONNABORTED';

function createAxiosInstance() {
  // const baseURL = process.env.NEXT_PUBLIC_SERVER ?? getURL();
  // 지금 환경변수를 바로 설정할 수 없을 것 같아 임시로 직접 작성함
  const axiosInstance = axios.create({
    baseURL: 'http://54.180.102.131:8081',
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
          if (!response.config.url?.includes('/api/auth/user/me')) {
            throw error;
          }
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
                const continueURL = typeof window !== undefined ? window.location.pathname : '';

                redirect(continueURL ? `/login?continueURL=${continueURL}` : '/login');
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
