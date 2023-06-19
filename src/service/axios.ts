import axios from 'axios';
import { getURL } from '@/util/url';
import { getCookie } from '@/util/cookies';

function createAxiosInstance() {
  const baseURL = process.env.NEXT_PUBLIC_SERVER ?? getURL();

  const axiosInstance = axios.create({
    baseURL,
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
