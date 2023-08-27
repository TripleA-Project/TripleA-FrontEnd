'use client';

import { AxiosError } from 'axios';
import InternalServerError from '@/components/ErrorBoundary/ErrorFallback/common/InternalServerError';

export default function Error({ error, reset }: { error: Error | AxiosError; reset: () => void }) {
  console.log('client ErrorBoundary: ', { error });

  return <InternalServerError />;
}
