'use client';

import Link from 'next/link';
import Button from '@/components/Button/Button';
import { AppIcons } from '@/components/Icons';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import { AxiosError, HttpStatusCode } from 'axios';
import { type FallbackProps } from 'react-error-boundary';
import { type APIResponse } from '@/interfaces/Dto/Core';

interface ErrorMeta {
  icon?: React.ReactNode;
  title: string;
  content: string;
  button?: React.ReactNode;
}

function createErrorMeta({ error, resetErrorBoundary }: FallbackProps): ErrorMeta {
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
          AI 분석을 확인 할 수 있어요
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
  }

  return {
    icon: <NotificationIcons.Error className="text-4xl" />,
    title: '에러',
    content: `
      에러가 발생했습니다.
      이용에 불편을 드려 죄송합니다.
    `,
    button: (
      <Button bgColorTheme="orange" textColorTheme="white" fullWidth onClick={() => resetErrorBoundary()}>
        다시 시도하기
      </Button>
    ),
  };
}

function AINewsAnalysisError({ error, resetErrorBoundary }: FallbackProps) {
  const { icon, title, content, button } = createErrorMeta({ error, resetErrorBoundary });

  return (
    <div className="flex flex-col items-center">
      {icon}
      <h3 className="mb-2.5 text-2xl font-bold text-[#FD954A]">{title}</h3>
      <p
        className="text-center text-[#4E525D]"
        dangerouslySetInnerHTML={{ __html: content.trim().replaceAll('\n', '<br />') }}
      />
      {button}
    </div>
  );
}

export default AINewsAnalysisError;
