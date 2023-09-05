import React, { cloneElement } from 'react';
import { AxiosError } from 'axios';
import InternalServerError from '../ErrorBoundary/ErrorFallback/common/InternalServerError';
import { successSubscribe } from '@/service/subscribe';
import { checkPaymentApiError } from '@/util/handleApiError';
import { getProfile } from '@/service/user';

interface PaymentFetcherProps {
  order_code: string;
  children: React.ReactElement;
}

async function PaymentFetcher({ order_code, children }: PaymentFetcherProps) {
  const paymentResponse = await successSubscribe({ order_code }).catch((err) => {
    return err as AxiosError;
  });

  const paymentApiError = checkPaymentApiError(paymentResponse);
  if (paymentApiError !== false) return paymentApiError;

  const profileResponse = await getProfile().catch((err) => {
    return err as AxiosError;
  });
  if (profileResponse instanceof AxiosError) {
    return <InternalServerError />;
  }

  const profilePayload = profileResponse.data.data;

  const childComponent = cloneElement(children, {
    user: profilePayload,
  });

  return <>{childComponent}</>;
}

export default PaymentFetcher;
