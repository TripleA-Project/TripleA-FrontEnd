import { axiosInstance } from './axios';
import {
  type SubscribeResponse,
  type SuccessSubscribeSearchParams,
  type SuccessSubscribeRequestConfig,
  type SuccessSubscribeResponse,
  type GetSubscribeSessionResponse,
  type UnSubscribeResponse,
} from '@/interfaces/Dto/Subscribe';

const subscribeBaseURL = '/api/subscribe';

/**
 * 구독 API (GET)
 */
export async function subscribe() {
  const subscribeResponse = await axiosInstance.get<SubscribeResponse>(subscribeBaseURL);

  return subscribeResponse;
}

/**
 * 구독 확인 API (GET)
 *
 * `order_code` subscribe API를 통해 결제가 완료된 이후 리다이렉트 된 URL의 order_code 파라미터 값 [**string**]
 */
export async function successSubscribe({ order_code }: SuccessSubscribeSearchParams) {
  const checkSubscribedUserResponse = await axiosInstance.get<SuccessSubscribeResponse>(`${subscribeBaseURL}/success`, {
    params: {
      order_code,
    },
  } as SuccessSubscribeRequestConfig);

  return checkSubscribedUserResponse;
}

/**
 * 구독 세션키 조회 API (GET)
 */
export async function getSubscribeSession() {
  const getSubscribeSessionResponse = await axiosInstance.get<GetSubscribeSessionResponse>(
    `${subscribeBaseURL}/session`,
  );

  return getSubscribeSessionResponse;
}

/**
 * 구독 취소 API (DELETE)
 */
export async function unSubscribe() {
  const cancelSubscribeResponse = await axiosInstance.delete<UnSubscribeResponse>(subscribeBaseURL);

  return cancelSubscribeResponse;
}
