import axios, { AxiosError, HttpStatusCode, isAxiosError } from 'axios';
import { getCookie, setCookie } from '@/util/cookies';
import { requestAccessToken } from './auth';
import { APIResponse } from '@/interfaces/Dto/Core';

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
        const cookies = await import('next/headers').then((mod) => mod.cookies);

        const cookieList = cookies().getAll();
        console.log({ cookieList });
        // const cookie = cookieList.length
        //   ? cookieList
        //       .map(({ name, value }, idx, arr) => `${name}=${idx === arr.length - 1 ? value : `${value} `}`)
        //       .join(';')
        //   : '';

        // req.headers.Cookie = cookie;
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
      if (typeof window === 'undefined') {
        if (res.headers.authorization) {
          const token = (res.headers.authorization as string).replace('Bearer ', '');

          console.log({ token });

          const test = await axios.post(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/token`,
            { token },
            { withCredentials: true },
          );

          res.headers['set-cookie'] = test.headers['set-cookie'];

          //console.log('testSetCookie: ', test.headers['set-cookie']);
        }
      }

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
                    config!.headers.Authorization = `Bearer ${accessToken}`;
                  } else {
                    await setCookie('accessToken', (accessToken as string).replace('Bearer ', ''), {
                      maxAge: 60 * 60,
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
