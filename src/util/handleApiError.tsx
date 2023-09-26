import ChartUnauthorized from '@/components/ErrorBoundary/ErrorFallback/Chart/Unauthorized';
import NewsNotFound from '@/components/ErrorBoundary/ErrorFallback/NewsDetail/NewsNotFound';
import Unauthorized from '@/components/ErrorBoundary/ErrorFallback/NewsDetail/Unauthorized';
import PaymentUnauthorized from '@/components/ErrorBoundary/ErrorFallback/Payment/Unauthorized';
import InternalServerError from '@/components/ErrorBoundary/ErrorFallback/common/InternalServerError';
import Timeout from '@/components/ErrorBoundary/ErrorFallback/common/Timeout';
import { APIResponse } from '@/interfaces/Dto/Core';
import { NewsDetailResponse } from '@/interfaces/Dto/News';
import { GetSymbolStockResponse } from '@/interfaces/Dto/Stock';
import { SuccessSubscribeResponse } from '@/interfaces/Dto/Subscribe';
import { GetSymbolResponse } from '@/interfaces/Dto/Symbol';
import { TIMEOUT_CODE } from '@/service/axios';
import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';

export function checkNewsDetailApiError(apiResponse: AxiosResponse<NewsDetailResponse> | AxiosError) {
  if (apiResponse instanceof AxiosError) {
    const { code, response } = apiResponse as AxiosError<APIResponse>;

    if (code === TIMEOUT_CODE) {
      return <Timeout />;
    }

    if (response?.data.status === HttpStatusCode.Unauthorized) {
      return <Unauthorized />;
    }

    return <InternalServerError />;
  }

  const newsDetailPayload = apiResponse.data?.data;

  if (!newsDetailPayload) {
    return <NewsNotFound />;
  }

  return false;
}

export function checkPaymentApiError(apiResponse: AxiosResponse<SuccessSubscribeResponse> | AxiosError) {
  console.log('is paymentError: ', apiResponse instanceof AxiosError);

  if (apiResponse instanceof AxiosError) {
    const { code, response } = apiResponse as AxiosError<APIResponse>;

    console.log('error: ', response?.data);
    console.log('error request: ', response?.request);

    if (response?.data.status === HttpStatusCode.Unauthorized) {
      return <PaymentUnauthorized />;
    }

    return <InternalServerError />;
  }

  return false;
}

export function checkSymbolChartApiError({
  apiResponse,
  loginContinueURL,
}: {
  apiResponse: [AxiosResponse<GetSymbolStockResponse>, AxiosResponse<GetSymbolResponse>] | AxiosError;
  loginContinueURL?: string;
}) {
  if (apiResponse instanceof AxiosError) {
    const { code, response } = apiResponse as AxiosError<APIResponse>;

    if (response?.data.status === HttpStatusCode.Unauthorized) {
      return <ChartUnauthorized continuePath={loginContinueURL || '/chart'} />;
    }
  }

  return false;
}
