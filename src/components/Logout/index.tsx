'use client';

import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/service/auth';
import { deleteCookie } from '@/util/cookies';

export default function Logout() {
  const queryClient = useQueryClient();
  const { replace, refresh } = useRouter();
  const { mutate: loginMutate } = useMutation(() => logout(), {
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
    loginMutate();
  }, []); /* eslint-disable-line */

  return <>로그아웃 중</>;
}
