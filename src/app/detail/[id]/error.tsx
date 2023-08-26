'use client';

import Button from '@/components/Button/Button';
import Unauthorized from '@/components/ErrorBoundary/ErrorFallback/NewsDetail/Unauthorized';
import FitPage from '@/components/Layout/FitPage';
import NewsDetailHeader from '@/components/Layout/Header/NewsDetailHeader';
import { APIResponse } from '@/interfaces/Dto/Core';
import { deleteCookie } from '@/util/cookies';
import { AxiosError, HttpStatusCode } from 'axios';

// 에러 디버그를 위한 임시 조치
export default function Error({ error, reset }: { error: Error | AxiosError; reset: () => void }) {
  console.log('client ErrorBoundary: ', { error });

  // if (error instanceof AxiosError) {
  //   const { code, response } = error as AxiosError<APIResponse>;

  //   if (response) {
  //     if (response.data.status === HttpStatusCode.Unauthorized) {
  //       return (
  //         <>
  //           <NewsDetailHeader />
  //           <Unauthorized />
  //         </>
  //       );
  //     }
  //   }
  // }

  return (
    <FitPage>
      <div className="flex h-full w-full items-center justify-center">
        <p>에러가 발생했습니다</p>
        <Button
          bgColorTheme="orange"
          textColorTheme="white"
          onClick={async () => {
            await deleteCookie('accessToken');
            await deleteCookie('autoLogin');

            reset();
            location?.reload();
          }}
        >
          다시 시도
        </Button>
      </div>
    </FitPage>
  );
}
