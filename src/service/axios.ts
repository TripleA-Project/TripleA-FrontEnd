import axios from 'axios';
import { getURL } from '@/util/url';
import { getCookie } from '@/util/cookies';

function createAxiosInstance() {
  // const baseURL = process.env.NEXT_PUBLIC_SERVER ?? getURL();
  // 지금 환경변수를 바로 설정할 수 없을 것 같아 임시로 직접 작성함
  const axiosInstance = axios.create({
    baseURL: 'http://54.180.102.131:8081',
    withCredentials: true,
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

  return axiosInstance;
}

export const axiosInstance = createAxiosInstance();
