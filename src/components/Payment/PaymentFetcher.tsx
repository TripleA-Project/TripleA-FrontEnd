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
  console.log('[paymentFetcher Props]', { order_code });

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('done');
    }, 1000);
  });

  const paymentResponse = await successSubscribe({ order_code }).catch((err) => {
    return err as AxiosError;
  });

  const paymentApiError = checkPaymentApiError(paymentResponse);
  if (paymentApiError !== false) return paymentApiError;

  const profileResponse = await getProfile().catch((err) => {
    return err as AxiosError;
  });
  if (profileResponse instanceof AxiosError) {
    console.log('profileError: ', profileResponse);
    return <InternalServerError />;
  }

  const profilePayload = profileResponse.data.data;

  const childComponent = cloneElement(children, {
    user: profilePayload,
  });

  return <>{childComponent}</>;
}

export default PaymentFetcher;
