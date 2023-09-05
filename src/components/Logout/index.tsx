'use client';

import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FitPage from '../Layout/FitPage';
import MuiSpinner from '../UI/Spinner/MuiSpinner';
import { logout } from '@/service/auth';
import { deleteCookie } from '@/util/cookies';

export default function Logout() {
  const queryClient = useQueryClient();
  const { replace, refresh } = useRouter();
  const { mutate: logoutMutate } = useMutation(() => logout(), {
    retry: 0,
    onSuccess: async () => {
      await deleteCookie('accessToken');
      await deleteCookie('autoLogin');

      queryClient.removeQueries();

      refresh();

      replace('/');
    },
  });

  useLayoutEffect(() => {
    logoutMutate();
  }, []); /* eslint-disable-line */

  return (
    <FitPage>
      <div className="box-border flex h-full flex-col items-center justify-center gap-2 px-4">
        <p>로그아웃 중입니다</p>
        <MuiSpinner />
      </div>
    </FitPage>
  );
}
