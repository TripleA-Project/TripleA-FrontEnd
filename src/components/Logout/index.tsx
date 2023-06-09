'use client';

import { logout } from '@/service/auth';
import { deleteCookie } from '@/util/cookies';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function Logout() {
  const router = useRouter();

  const { mutate: loginMutate } = useMutation(() => logout(), {
    retry: 0,
    onSuccess: async () => {
      await deleteCookie('accessToken');
      router.replace('/');
    },
  });

  useLayoutEffect(() => {
    loginMutate();
  }, []); /* eslint-disable-line */

  return <>로그아웃 중</>;
}
