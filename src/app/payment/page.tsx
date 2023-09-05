import { Suspense } from 'react';
import { Metadata } from 'next';
import PaymentPage from '@/components/Payment/PaymentPage';
import PaymentLoading from '@/components/Payment/Loading/PaymentLoading';
import PaymentFetcher from '@/components/Payment/PaymentFetcher';
import NotFound from '@/components/NotFound';

export const revalidate = 0;

interface PageProps {
  params: {
    [key: string]: string;
  };
  searchParams?: {
    ['order_id']: string;
    ['order_code']: string;
    status: string;
    [key: string]: string;
  };
}

export const metadata: Metadata = {
  title: 'Triple A | 결제',
  description: '결제',
};

async function Payment({ searchParams }: PageProps) {
  const orderCode = searchParams ? searchParams['order_code'] : '';
  const status = searchParams ? searchParams['status'] : '';

  // if (status === 'success') {
  //   const res = await successSubscribe({ order_code: orderCode });

  //   if (res.status === HttpStatusCode.Ok) {
  //     return redirect('/');
  //   }
  // }

  // 현재는 백엔드에서 success 리다이렉트만 콜백해서 응답함
  if (status !== 'success' || !orderCode) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={<PaymentLoading />}>
      {/* @ts-expect-error server component */}
      <PaymentFetcher order_code={orderCode}>
        <PaymentPage />
      </PaymentFetcher>
    </Suspense>
  );
}

export default Payment;
