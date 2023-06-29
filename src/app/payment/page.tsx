import { Metadata } from 'next';
import { successSubscribe } from '@/service/subscribe';
import { HttpStatusCode } from 'axios';
import { redirect } from 'next/navigation';

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
  title: '결제',
  description: '결제',
};

async function Payment({ searchParams }: PageProps) {
  const orderCode = searchParams ? searchParams['order_code'] : '';
  const status = searchParams ? searchParams['status'] : '';

  console.log('orderCode: ', orderCode);
  console.log('params: ', { searchParams });

  if (status === 'success') {
    const res = await successSubscribe({ order_code: orderCode });

    console.log('payment: ', res);

    if (res.status === HttpStatusCode.Ok) {
      return redirect('/');
    }
  }

  return <div className="box-border overflow-auto p-4">결제 처리중...</div>;
}

export default Payment;
