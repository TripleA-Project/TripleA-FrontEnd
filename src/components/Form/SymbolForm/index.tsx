'use client';

import { useLayoutEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { HttpStatusCode } from 'axios';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { throttle } from 'lodash';
import { ToastContainer } from 'react-toastify';
import { initLikedSymbolMap, initSelectedSymbolMap, reset, useSymbolList } from '@/redux/slice/symbolSlice';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import Button from '@/components/Button/Button';
import { SearchSymbol, SelectedSymbolHorizonList, SearchSymbolResult } from '@/components/Search/SearchSymbol';
import { LockNotification } from '@/components/Notification';
import { disLikeSymbol, getLikeSymbol, likeSymbol } from '@/service/symbol';
import { getProfile } from '@/service/user';
import { toastNotify } from '@/util/toastNotify';
import { LockNotificationTemplate } from '@/constants/notification';
import { type UseStepFormContext } from '../StepForm';
import { type SearchedSymbol } from '@/interfaces/Symbol';

interface SymbolFormProps {
  buttonText?: string;
  skipable?: boolean;
}

function SymbolForm({ buttonText = '선택 완료' }: SymbolFormProps) {
  const queryClient = useQueryClient();

  const pathName = usePathname();
  const { push } = useRouter();

  const formContext = useFormContext() as UseStepFormContext;

  const handleView = () => {
    if (window.innerHeight < 700) {
      formWrapperRef.current!.style.marginTop = '-32px';

      return;
    }

    formWrapperRef.current!.style.removeProperty('margin-top');
  };

  const resizeThrottle = throttle((e: UIEvent) => {
    handleView();
  }, 300);

  const cleanUp = () => {
    formWrapperRef.current?.style.removeProperty('margin-top');
  };

  const { data: profileResponse, status: profileStatus } = useQuery(['profile'], () => getProfile(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  const { data: likedSymbolResponse, status: likedSymbolStatus } = useQuery(
    ['likedSymbolList'],
    () => getLikeSymbol(),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      select(response) {
        return response.data;
      },
    },
  );

  const formWrapperRef = useRef<HTMLDivElement>(null);
  const submitWrapperRef = useRef<HTMLDivElement>(null);

  const isSubmittingRef = useRef(false);
  const isSuccessRef = useRef(true);

  const { mutateAsync: like, status: likeStatus } = useMutation((symbol: string) => likeSymbol({ symbol }), {
    retry: 0,
    onSuccess(data, symbolName) {
      successSymbolListRef.current.like.push(symbolName);
    },
    onError(error, symbolName) {
      failSymbolListRef.current.like.push(symbolName);

      if (isSuccessRef.current === true) {
        isSuccessRef.current = false;
      }
    },
  });

  const { mutateAsync: unlike, status: unlikeStatus } = useMutation((id: number) => disLikeSymbol({ id }), {
    retry: 0,
    onSuccess(data, index) {
      if (likedSymbolResponse?.data) {
        const symbol = likedSymbolResponse.data.find((_, idx) => idx === index - 1)!.symbol;

        successSymbolListRef.current.unlike.push(symbol);
      }
    },
    onError(error, index, context) {
      if (likedSymbolResponse?.data) {
        const symbol = likedSymbolResponse.data.find((_, idx) => idx === index - 1)!.symbol;

        failSymbolListRef.current.unlike.push(symbol);

        if (isSuccessRef.current === true) {
          isSuccessRef.current = false;
        }
      }
    },
  });

  const successSymbolListRef = useRef<{ like: string[]; unlike: string[] }>({
    like: [],
    unlike: [],
  });
  const failSymbolListRef = useRef<{ like: string[]; unlike: string[] }>({
    like: [],
    unlike: [],
  });

  const [showSubscribeNotification, setShowSubScribeNotification] = useState(false);

  const [searchedSymbols, setSearchedSymbols] = useState<SearchedSymbol[]>([]);
  const { dispatch, requestLikeSymbolMap, requestUnLikeSymbolMap, selectedSymbolMap } = useSymbolList();
  const selectedSymbols = Object.keys(selectedSymbolMap)?.length
    ? [
        ...Array.from(Object.entries(selectedSymbolMap)).map(
          ([key, value]) => ({ symbol: key, ...value } as SearchedSymbol),
        ),
      ]
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmittingRef.current === true) return;

    isSubmittingRef.current = true;

    if (Object.keys(requestUnLikeSymbolMap).length) {
      await Promise.allSettled([
        ...Object.keys(requestUnLikeSymbolMap).map((symbol) => {
          if (likedSymbolResponse?.data) {
            const unlikeTarget = likedSymbolResponse.data.find((likedSymbol) => likedSymbol.symbol === symbol);

            return unlike(unlikeTarget ? unlikeTarget.symbolId : -1);
          }
        }),
      ]);
    }

    if (Object.keys(requestLikeSymbolMap).length) {
      await Promise.allSettled([...Object.keys(requestLikeSymbolMap).map((symbol) => like(symbol.toUpperCase()))]);
    }

    isSubmittingRef.current = false;

    if (isSuccessRef.current === true) {
      if (pathName.startsWith('/signup')) {
        queryClient.invalidateQueries(['likedSymbolList']);

        formContext.done();

        return;
      }

      toastNotify('success', '관심 심볼 처리 성공');
    }

    if (isSuccessRef.current === false) {
      toastNotify('error', '관심 심볼 처리 실패');
    }

    // reset

    queryClient.invalidateQueries(['likedSymbolList']);

    dispatch(reset());
    dispatch(
      initLikedSymbolMap({
        symbols:
          likedSymbolResponse?.data?.map((symbol) => {
            const likedSymbolIdx = likedSymbolResponse.data?.findIndex(
              (likeSymbol) => likeSymbol.symbol === symbol.symbol,
            );

            return {
              ...symbol,
              requestId: likedSymbolIdx! + 1,
            };
          }) ?? [],
      }),
    );
    dispatch(initSelectedSymbolMap());

    isSuccessRef.current = true;

    successSymbolListRef.current.like = [];
    successSymbolListRef.current.unlike = [];

    failSymbolListRef.current.like = [];
    failSymbolListRef.current.unlike = [];
  };

  useLayoutEffect(() => {
    if (profileStatus === 'loading' || likedSymbolStatus === 'loading') return;

    if (
      profileStatus === 'error' ||
      likedSymbolStatus === 'error' ||
      likedSymbolResponse.status !== HttpStatusCode.Ok
    ) {
      push('/login?continueURL=/mypage/edit/symbol');

      return;
    }

    if (likedSymbolResponse) {
      dispatch(reset());
      dispatch(
        initLikedSymbolMap({
          symbols:
            likedSymbolResponse.data?.map((symbol) => {
              const likedSymbolIdx = likedSymbolResponse.data?.findIndex(
                (likeSymbol) => likeSymbol.symbol === symbol.symbol,
              );

              return {
                ...symbol,
                requestId: likedSymbolIdx! + 1,
              };
            }) ?? [],
        }),
      );
    }

    dispatch(initSelectedSymbolMap());
  }, [profileStatus, likedSymbolStatus, likedSymbolResponse]); /* eslint-disable-line */

  useLayoutEffect(() => {
    window.addEventListener('resize', resizeThrottle);

    handleView();

    return () => {
      cleanUp();
    };
  }, []); /* eslint-disable-line */

  return (
    <div ref={formWrapperRef} className="relative">
      <div className="my-11 space-y-3">
        <h3 className="flex items-center justify-center text-xl font-bold">
          <span className="relative inline-block align-top">
            관심심볼
            <div className="absolute bottom-0 left-0 -z-[1] h-2 w-full bg-[#FFB682]" />
          </span>
          을 설정해주세요
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
          disabled={profileStatus === 'loading' || likedSymbolStatus !== 'success'}
        />
        <SearchSymbolResult
          loading={profileStatus === 'loading' || likedSymbolStatus !== 'success'}
          symbols={searchedSymbols}
          onDispatch={(requiredSubscribe) => {
            if (requiredSubscribe) setShowSubScribeNotification(true);
          }}
        />
        <div ref={submitWrapperRef} className="fixed_inner fixed bottom-12">
          <SelectedSymbolHorizonList
            loading={profileStatus === 'loading' || likedSymbolStatus !== 'success'}
            symbols={selectedSymbols}
            shadowEffect
            closeButton
          />
          <div className="mx-auto mt-4 box-border w-full">
            <Button
              type="submit"
              disabled={likedSymbolStatus === 'loading' || likeStatus === 'loading' || unlikeStatus === 'loading'}
              bgColorTheme="orange"
              textColorTheme="white"
              fullWidth
              className="relative disabled:!cursor-progress disabled:!bg-slate-300 disabled:!opacity-60"
            >
              {likeStatus === 'loading' || unlikeStatus === 'loading' ? (
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
    </div>
  );
}

export default SymbolForm;

// className={`fixed left-0 w-full ${hasNotNavBar ? 'bottom-2 ' : 'bottom-[calc(63px+8px)]'}`}
