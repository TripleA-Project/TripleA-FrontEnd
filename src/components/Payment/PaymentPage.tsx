'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import FitPage from '../Layout/FitPage';
import { MdTaskAlt } from 'react-icons/md';
import { ProfilePayload } from '@/interfaces/Dto/User';
import { syncCookie } from '@/util/cookies';

interface PaymentPageProps {
  user?: ProfilePayload;
}

function PaymentPage({ user }: PaymentPageProps) {
  const queryClient = useQueryClient();
  const { refresh, replace } = useRouter();

  useEffect(() => {
    syncCookie(user!.email);

    setTimeout(() => {
      replace('/');
    }, 1000);

    return () => {
      queryClient.invalidateQueries(['profile']);

      refresh();
    };
  }, []); /* eslint-disable-line */

  return (
    <FitPage>
      <div className="box-border flex h-full flex-col items-center justify-center gap-2 px-4">
        <MdTaskAlt className="text-[48px] text-emerald-500" />
        <p>결제 성공</p>
      </div>
    </FitPage>
  );
}

export default PaymentPage;
