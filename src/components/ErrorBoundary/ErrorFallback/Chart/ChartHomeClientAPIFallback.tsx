'use client';

import { useSearchParams } from 'next/navigation';
import { AxiosError, HttpStatusCode } from 'axios';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/Button/Button';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { TIMEOUT_CODE } from '@/service/axios';
import { type FallbackProps } from 'react-error-boundary';
import { type APIResponse } from '@/interfaces/Dto/Core';
import FitPage from '@/components/Layout/FitPage';
import { ReactQueryHashKeys } from '@/constants/queryHashKeys';

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
  tab,
}: FallbackProps & { queryClient: QueryClient; tab: string | null }): ErrorMeta {
  const retryQuery = () => {
    queryClient.refetchQueries(ReactQueryHashKeys.getLikedSymbols);
    queryClient.refetchQueries(ReactQueryHashKeys.getRecommandSymbols);

    resetErrorBoundary();
  };

  const resetQuery = () => {
    queryClient.removeQueries(ReactQueryHashKeys.getLikedSymbols);
    queryClient.removeQueries(ReactQueryHashKeys.getRecommandSymbols);

    resetErrorBoundary();
  };

  if (error instanceof AxiosError) {
    const { code, response } = error as AxiosError<APIResponse>;

    if (code === TIMEOUT_CODE) {
      return {
        icon: <NotificationIcons.Error className="text-4xl" />,
        title: '요청 만료',
        content: `
          요청을 처리하는 시간이 오래걸려
          중단되었습니다.
          이용에 불편을 드려 죄송합니다.
        `,
        button: (
          <Button
            bgColorTheme="orange"
            textColorTheme="white"
            className="h-fit w-fit px-2 py-1"
            onClick={() => {
              retryQuery();
            }}
          >
            다시 시도하기
          </Button>
        ),
      };
    }

    if (response?.data.status === HttpStatusCode.Unauthorized) {
      return {
        icon: <NotificationIcons.VeryDissatisfied className="text-4xl" />,
        title: '로그인',
        content: `
          로그인 후
          차트 페이지를 볼 수 있습니다
        `,
        button: (
          <Button
            bgColorTheme="orange"
            textColorTheme="white"
            className="h-fit w-fit px-2 py-1"
            onClick={() => {
              resetQuery();
            }}
          >
            로그인
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
        className="h-fit w-fit px-2 py-1"
        onClick={() => {
          retryQuery();
        }}
      >
        다시 시도하기
      </Button>
    ),
  };
}

function ChartHomeClientAPIErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const { icon, title, content, button } = createErrorMeta({ error, resetErrorBoundary, queryClient, tab });

  return (
    <FitPage path="chartHome" className="box-border flex items-center justify-center px-4">
      <div className="flex w-full flex-col items-center">
        {icon}
        <h3 className="mb-2.5 text-2xl font-bold text-[#FD954A]">{title}</h3>
        <p
          className="mb-2 text-center text-[#4E525D]"
          dangerouslySetInnerHTML={{ __html: content.trim().replaceAll('\n', '<br />') }}
        />
        {button ?? null}
      </div>
    </FitPage>
  );
}

export default ChartHomeClientAPIErrorFallback;
