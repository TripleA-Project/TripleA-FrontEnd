'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HttpStatusCode } from 'axios';
import Button from '../Button/Button';
import { ErrorNotification } from '../Notification';
import { subscribe } from '@/service/subscribe';
import { useUser } from '@/hooks/useUser';
import MuiSpinner from '../UI/Spinner/MuiSpinner';
import { toastNotify } from '@/util/toastNotify';

interface SubscribeButtonProps {
  subscribeRedirectURL?: string;
}

function SubscribeButtonLoading() {
  return (
    <div className="skeleton_loading">
      <Button bgColorTheme="orange" textColorTheme="white" fullWidth>
        {' '}
      </Button>
    </div>
  );
}

function SubscribeButton({ subscribeRedirectURL }: SubscribeButtonProps) {
  const { push } = useRouter();

  const { user, isLoading: isUserLoading, errorType } = useUser();

  const [isFetchingSubscription, setIsFetchingSubscription] = useState(false);

  const [showNotification, setShowNotification] = useState(false);

  const RenderSubscribeButton = () => {
    if (user?.freeTrial) {
      return (
        <Button
          className="disabled:!bg-[#898A8D]"
          disabled={true}
          bgColorTheme="orange"
          textColorTheme="white"
          fullWidth
        >
          무료체험 이용 중
        </Button>
      );
    }

    switch (user?.membership) {
      case 'BASIC':
        return (
          <Button
            bgColorTheme="orange"
            textColorTheme="white"
            fullWidth
            className="relative disabled:!bg-[#f9b380]"
            disabled={isFetchingSubscription}
            onClick={async () => {
              try {
                setIsFetchingSubscription((prev) => true);

                const { data: response, status } = await subscribe({
                  url: subscribeRedirectURL || `${process.env.NEXT_PUBLIC_SITE_URL}/payment`,
                });

                setIsFetchingSubscription((prev) => false);

                if (status === HttpStatusCode.Ok) {
                  push(response.data!.payment);
                }
              } catch (err) {
                setIsFetchingSubscription((prev) => false);

                toastNotify('error', '결제 진행에 실패했습니다');
              }
            }}
          >
            {isFetchingSubscription ? (
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                <div className="translate-y-[3.4px]">
                  <MuiSpinner />
                </div>
              </div>
            ) : null}
            구독하기
          </Button>
        );
      case 'PREMIUM':
        return (
          <Button
            className="disabled:!bg-[#898A8D]"
            disabled={true}
            bgColorTheme="orange"
            textColorTheme="white"
            fullWidth
          >
            구독중
          </Button>
        );
      default:
        return isUserLoading ? (
          <SubscribeButtonLoading />
        ) : (
          <Button
            bgColorTheme="orange"
            textColorTheme="white"
            fullWidth
            disabled={isFetchingSubscription}
            onClick={() => {
              if (errorType === 'Unauthorized') {
                setShowNotification(true);
              }
            }}
          >
            구독하기
          </Button>
        );
    }
  };

  return (
    <>
      {RenderSubscribeButton()}
      <ErrorNotification
        content={`
          로그인 후
          이용가능합니다.
        `}
        buttonText={'로그인'}
        linkURL={'/login?continueURL=/mypage/membership'}
        closeOnClick
        active={showNotification}
        onClose={() => {
          setShowNotification(false);
        }}
      />
    </>
  );
}

export default SubscribeButton;
