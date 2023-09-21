'use client';

import { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { usePathname } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { throttle } from 'lodash';
import { ToastContainer } from 'react-toastify';
import { initLikedSymbolMap, initSelectedSymbolMap, reset, useSymbolList } from '@/redux/slice/symbolSlice';
import FormTitleHighLightText from '../FormTitleHighLightText';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import Button from '@/components/Button/Button';
import { SearchSymbol, SelectedSymbolHorizonList, SearchSymbolResult } from '@/components/Search/SearchSymbol';
import { LockNotification } from '@/components/Notification';
import { LockNotificationTemplate } from '@/constants/notification';
import SymbolFormUnauthorized from '@/components/ErrorBoundary/ErrorFallback/SymbolForm/Unauthorized';
import SymbolEditResultModal, { SymbolEditResultModalProps } from './ResultModal/Modal';
import { useSymbolAsyncMutation } from '@/hooks/useSymbolAsyncMutation';
import { useLikes } from '@/hooks/useLikes';
import type { UseStepFormContext } from '../StepForm';
import type { SearchedSymbol } from '@/interfaces/Symbol';

interface SymbolFormProps {
  buttonText?: string;
  skipable?: boolean;
}

function handleView(formWrapper: HTMLDivElement | null) {
  if (window.innerHeight < 700) {
    if (formWrapper) {
      formWrapper.style.marginTop = '-32px';
    }

    return;
  }

  if (formWrapper) {
    formWrapper.style.removeProperty('margin-top');
  }
}

function cleanUp(formWrapper: HTMLDivElement | null) {
  if (formWrapper) {
    formWrapper.style.removeProperty('margin-top');
  }
}

// symbolForm
function SymbolForm({ buttonText = '선택 완료' }: SymbolFormProps) {
  const pathName = usePathname();

  const formContext = useFormContext() as UseStepFormContext;

  const formWrapperRef = useRef<HTMLDivElement>(null);
  const submitWrapperRef = useRef<HTMLDivElement>(null);

  const [isSubmit, setIsSubmit] = useState(false);

  const {
    like,
    unlike,
    getResultList,
    resetResultList,
    isSuccessLikes,
    isSuccessUnlikes,
    isUnauthorizedMutation,
    isFetching,
  } = useSymbolAsyncMutation();

  const {
    likedSymbols,
    invalidateQuery,
    removeQuery,
    loginRequired,
    status: likedSymbolStatus,
    isFetching: isLikesFetching,
  } = useLikes();

  const { dispatch, requestLikeSymbolMap, requestUnLikeSymbolMap, selectedSymbolMap } = useSymbolList();
  const [searchedSymbols, setSearchedSymbols] = useState<SearchedSymbol[]>([]);
  const selectedSymbols = Object.keys(selectedSymbolMap)?.length
    ? [...Array.from(Object.entries(selectedSymbolMap)).map(([key, value]) => ({ key, ...value } as SearchedSymbol))]
    : [];

  const hasNotRequest = !Object.keys(requestLikeSymbolMap).length && !Object.keys(requestUnLikeSymbolMap).length;

  const syncSymbols = () => {
    dispatch(reset());

    dispatch(
      initLikedSymbolMap({
        symbols: likedSymbols?.symbols ?? [],
      }),
    );

    dispatch(initSelectedSymbolMap());
  };

  const resizeThrottle = throttle((e: UIEvent) => {
    handleView(formWrapperRef.current);
  }, 300);

  const [showSubscribeNotification, setShowSubScribeNotification] = useState(false);

  const [resultModal, setResultModal] = useState<SymbolEditResultModalProps>({
    open: false,
    result: 'success',
    symbolResults: {
      success: {
        like: [],
        unlike: [],
      },
      fail: {
        like: [],
        unlike: [],
      },
    },
    onClose() {
      setResultModal((prev) => ({
        ...prev,
        open: false,
        result: 'success',
        symbolResults: {
          success: {
            like: [],
            unlike: [],
          },
          fail: {
            like: [],
            unlike: [],
          },
        },
      }));
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(requestUnLikeSymbolMap).length) {
      /*
        unlike : 관심심볼 응답에서의 id로 요청해야 함
      */
      await Promise.allSettled([
        ...Object.values(requestUnLikeSymbolMap).map((requestSymbol) => {
          return unlike({ requestId: requestSymbol.symbolId, symbol: requestSymbol });
        }),
      ]);
    }

    if (Object.keys(requestLikeSymbolMap).length) {
      await Promise.allSettled([
        ...Object.values(requestLikeSymbolMap).map((requestSymbol) => {
          return like({ symbol: requestSymbol });
        }),
      ]);
    }

    invalidateQuery.likedSymbol();

    setIsSubmit(true);
  };

  useLayoutEffect(() => {
    const formWrapperRefClone = formWrapperRef.current;

    window.addEventListener('resize', resizeThrottle);

    handleView(formWrapperRef.current);

    return () => {
      cleanUp(formWrapperRefClone);

      window.removeEventListener('resize', resizeThrottle);

      removeQuery.likedSymbol();
      removeQuery.likedCategory();

      syncSymbols();
    };
  }, []); /* eslint-disable-line */

  useEffect(() => {
    if (!isLikesFetching && likedSymbolStatus === 'success') {
      syncSymbols();
    }

    (async () => {
      if (!isSubmit) return;

      if (isUnauthorizedMutation) return;

      const { success, fail } = getResultList();

      if (pathName?.startsWith('/signup')) {
        await invalidateQuery.likedSymbol();

        formContext.done();

        return;
      }

      if (isSuccessLikes && isSuccessUnlikes) {
        setResultModal((prev) => ({
          ...prev,
          open: true,
          result: 'success',
          symbolResults: {
            success,
            fail,
          },
        }));
      }

      if (!isSuccessLikes || !isSuccessUnlikes) {
        flushSync(() => {
          setResultModal((prev) => ({
            ...prev,
            open: true,
            result: 'fail',
            symbolResults: {
              success,
              fail,
            },
          }));
        });
      }

      // reset
      resetResultList();

      setIsSubmit(false);
    })();
  }, [isSubmit, likedSymbolStatus, isLikesFetching]); /* eslint-disable-line */

  if (loginRequired || isUnauthorizedMutation) {
    return <SymbolFormUnauthorized />;
  }

  return (
    <div ref={formWrapperRef} className="relative">
      <div className="my-11 space-y-3">
        <h3 className="flex items-center justify-center text-xl font-bold">
          <FormTitleHighLightText content={'관심심볼'} />을 설정해주세요
        </h3>
        <h4 className="flex flex-col items-center justify-center text-sm font-semibold">
          <span>선택한 종목이 언급된</span>
          <span>뉴스 기사를 모아볼 수 있습니다.</span>
        </h4>
      </div>
      <form onSubmit={handleSubmit}>
        <SearchSymbol
          submitWrapper={submitWrapperRef.current}
          onSearch={(symbols) => setSearchedSymbols(symbols)}
          disabled={likedSymbolStatus === 'loading' || isLikesFetching}
        />
        <SearchSymbolResult
          isSyncing={likedSymbolStatus === 'loading' || isLikesFetching}
          symbols={searchedSymbols}
          onDispatch={(requiredSubscribe) => {
            if (requiredSubscribe) setShowSubScribeNotification(true);
          }}
        />
        <div ref={submitWrapperRef} className="fixed_inner fixed bottom-12">
          <SelectedSymbolHorizonList
            loading={likedSymbolStatus === 'loading' || isLikesFetching}
            symbols={selectedSymbols}
            shadowEffect
            closeButton
          />
          <div className="mx-auto mt-4 box-border w-full">
            <Button
              type="submit"
              disabled={likedSymbolStatus === 'loading' || hasNotRequest || isFetching || isLikesFetching}
              bgColorTheme="orange"
              textColorTheme="white"
              fullWidth
              className="relative disabled:!cursor-progress disabled:!bg-slate-300 disabled:!opacity-60"
            >
              {isFetching ? (
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                  <div className="translate-y-[3.4px]">
                    <MuiSpinner />
                  </div>
                </div>
              ) : null}
              {buttonText}
            </Button>
          </div>
        </div>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <LockNotification
        title={LockNotificationTemplate.MoreLikeRequiredSubscribe.title}
        content={LockNotificationTemplate.MoreLikeRequiredSubscribe.content}
        buttonText={LockNotificationTemplate.MoreLikeRequiredSubscribe.buttonText}
        linkURL={LockNotificationTemplate.MoreLikeRequiredSubscribe.linkURL}
        closeOnClick
        active={showSubscribeNotification}
        onClose={() => {
          setShowSubScribeNotification(false);
        }}
      />
      <SymbolEditResultModal
        open={resultModal.open}
        result={resultModal.result}
        onClose={resultModal.onClose}
        symbolResults={resultModal.symbolResults}
      />
    </div>
  );
}

export default SymbolForm;
