'use client';

import Link from 'next/link';
import Button from '@/components/Button/Button';
import { AppIcons } from '@/components/Icons';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { AxiosError, HttpStatusCode } from 'axios';
import { type FallbackProps } from 'react-error-boundary';
import { type APIResponse } from '@/interfaces/Dto/Core';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface ErrorMeta {
  icon?: React.ReactNode;
  title: string;
  content: string;
  button?: React.ReactNode;
}

function createErrorMeta({
  error,
  resetErrorBoundary,
  queryClient,
}: FallbackProps & { queryClient: QueryClient }): ErrorMeta {
  if (error instanceof AxiosError) {
    const { response } = error as AxiosError<APIResponse>;

    if (response?.data.status === HttpStatusCode.BadRequest) {
      return {
        icon: <NotificationIcons.Error className="text-4xl" />,
        title: '혜택 소진',
        content: `
          AI분석 이용량(일 10회)을 
          모두 사용했습니다.
          내일 다시 이용해주세요.
        `,
      };
    }

    if (response?.data.status === HttpStatusCode.Unauthorized) {
      return {
        icon: <AppIcons.Lock className="translate-x-4" />,
        title: '구독제 회원만',
        content: `
          구독 후
          AI 분석을 확인 할 수 있어요.
        `,
        button: (
          <Link href="/mypage/membership" className="w-full">
            <Button bgColorTheme="orange" textColorTheme="white" fullWidth>
              구독하러 가기
            </Button>
          </Link>
        ),
      };
    }

    if (response?.data.status === HttpStatusCode.Conflict) {
      // 409 에러

      return {
        icon: <NotificationIcons.Error className="text-4xl" />,
        title: `잠시만 기다려주세요`,
        content: `
          서버에 요청중입니다.
          잠시만 기다려주세요.
        `,
      };
    }

    if (response?.data.status === HttpStatusCode.TooManyRequests) {
      // 429에러

      return {
        icon: <NotificationIcons.Error className="text-4xl" />,
        title: '다시 시도해주세요',
        content: `
          사용량이 많아 중단되었습니다.
          잠시 후 다시 요청해주세요.
        `,
        button: (
          <Button
            bgColorTheme="orange"
            textColorTheme="white"
            fullWidth
            onClick={() => {
              queryClient.refetchQueries(['news', 'analysis']);

              resetErrorBoundary();
            }}
          >
            다시 시도하기
          </Button>
        ),
      };
    }
  }

  return {
    icon: <NotificationIcons.Error className="text-4xl" />,
    title: '에러',
    content: `
      에러가 발생했습니다.
      이용에 불편을 드려 죄송합니다.
    `,
    button: (
      <Button
        bgColorTheme="orange"
        textColorTheme="white"
        fullWidth
        onClick={() => {
          queryClient.refetchQueries(['news', 'analysis']);

          resetErrorBoundary();
        }}
      >
        다시 시도하기
      </Button>
    ),
  };
}

function AINewsAnalysisError({ error, resetErrorBoundary }: FallbackProps) {
  const queryClient = useQueryClient();

  const { icon, title, content, button } = createErrorMeta({ error, resetErrorBoundary, queryClient });

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (error instanceof AxiosError) {
      if (error?.response?.data?.status === HttpStatusCode.Conflict) {
        timer = setTimeout(() => {
          queryClient.refetchQueries(['news', 'analysis']);

          resetErrorBoundary();
        }, 3000);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [error]); /* eslint-disable-line */

  return (
    <div className="flex flex-col items-center">
      {icon}
      <h3 className="mb-2.5 text-2xl font-bold text-[#FD954A]">{title}</h3>
      <p
        className="text-center text-[#4E525D]"
        dangerouslySetInnerHTML={{ __html: content.trim().replaceAll('\n', '<br />') }}
      />
      {button ?? null}
    </div>
  );
}

export default AINewsAnalysisError;
