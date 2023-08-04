'use client';

import { useLayoutEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { initLikedCategoryMap, initSelectedCategoryMap, reset, useCategoryList } from '@/redux/slice/categorySlice';
import { SearchCategory, SearchCategoryResult, SelectedCategoryHorizonList } from '@/components/Search/SearchCategory';
import Button from '@/components/Button/Button';
import { LockNotification } from '@/components/Notification';
import { disLikeCategory, getLikeCategory, likeCategory } from '@/service/category';
import useAuth from '@/hooks/useAuth';
import { LockNotificationTemplate } from '@/constants/notification';
import { toastNotify } from '@/util/toastNotify';
import { type Category } from '@/interfaces/Category';
import { type UseStepFormContext } from '../StepForm';

interface CategoryFormProps {
  buttonText?: string;
  skipable?: boolean;
  hasNotNavBar?: boolean;
}

function CategoryForm({ buttonText = '선택 완료', hasNotNavBar }: CategoryFormProps) {
  const queryClient = useQueryClient();

  const pathName = usePathname();
  const { push } = useRouter();

  const isSuccessRef = useRef(true);

  const formContext = useFormContext() as UseStepFormContext;

  const { status: authStatus } = useAuth();

  const { data: likedCategoryListResponse, status: likedCategoryStatus } = useQuery(
    ['likedCategoryList'],
    () => getLikeCategory(),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      select(payload) {
        return payload.data;
      },
    },
  );

  const { mutateAsync: like, status: likeStatus } = useMutation((id: number) => likeCategory({ id }), {
    retry: 0,
    onError: () => {
      if (isSuccessRef.current === true) {
        isSuccessRef.current = false;
      }
    },
  });
  const { mutateAsync: unlike, status: unlikeStatus } = useMutation((id: number) => disLikeCategory({ id }), {
    retry: 0,
    onError: () => {
      if (isSuccessRef.current === true) {
        isSuccessRef.current = false;
      }
    },
  });

  const isSubmittingRef = useRef(false);

  const [showSubscribeNotification, setShowSubScribeNotification] = useState(false);

  const [searchedCategories, setSearchedCategories] = useState<Category[]>([]);
  const { dispatch, requestLikeCategoryMap, requestUnLikeCategoryMap, selectedCategoryMap } = useCategoryList();
  const selectedCategories = [
    ...Array.from(Object.values(selectedCategoryMap)).map((category) => ({ ...category } as Category)),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmittingRef.current === true) return;

    isSubmittingRef.current = true;

    for (const category in requestUnLikeCategoryMap) {
      await unlike(requestUnLikeCategoryMap[category].categoryId);
    }

    for (const category in requestLikeCategoryMap) {
      await like(requestLikeCategoryMap[category].categoryId);
    }

    isSubmittingRef.current = false;

    if (isSuccessRef.current === true) {
      if (pathName.startsWith('/signup')) {
        formContext && formContext.done();

        return;
      }

      toastNotify('success', '관심 카테고리 처리 성공');
    }

    if (isSuccessRef.current === false) {
      toastNotify('error', '관심 카테고리 처리 실패');
    }

    // reset

    queryClient.invalidateQueries(['likedCategoryList']);

    dispatch(reset());
    dispatch(
      initLikedCategoryMap({
        categories: likedCategoryListResponse?.data?.length ? likedCategoryListResponse.data : [],
      }),
    );
    dispatch(initSelectedCategoryMap());

    isSuccessRef.current = true;
  };

  useLayoutEffect(() => {
    if (authStatus === 'Pending' || authStatus === 'Loading' || likedCategoryStatus === 'loading') return;

    if (authStatus !== 'AuthUser' || likedCategoryStatus === 'error' || likedCategoryListResponse.status !== 200) {
      push('/login?continueURL=/mypage/edit/category');

      return;
    }

    if (likedCategoryListResponse) {
      dispatch(reset());
    }

    dispatch(initLikedCategoryMap({ categories: likedCategoryListResponse.data ?? [] }));
    dispatch(initSelectedCategoryMap());
  }, [authStatus, likedCategoryStatus, likedCategoryListResponse]); /* eslint-disable-line */

  return (
    <>
      <div className="my-11 space-y-3">
        <h3 className="flex items-center justify-center text-xl font-bold">
          <span className="relative inline-block align-top">
            관심카테고리
            <div className="absolute bottom-0 left-0 -z-[1] h-2 w-full bg-[#FFB682]" />
          </span>
          를 설정해주세요
        </h3>
        <h4 className="flex flex-col items-center justify-center text-sm font-semibold">
          <span>선택한 카테고리에 해당하는</span>
          <span>뉴스 기사를 모아볼 수 있습니다.</span>
        </h4>
      </div>
      <form onSubmit={handleSubmit}>
        <SearchCategory onSearch={(categories) => setSearchedCategories(categories)} />
        <SearchCategoryResult
          loading={authStatus === 'Pending' || authStatus === 'Loading' || likedCategoryStatus !== 'success'}
          categories={searchedCategories}
          onDispatch={(requiredSubscribe) => {
            if (requiredSubscribe) {
              setShowSubScribeNotification(true);
            }
          }}
        />
        <div className={`fixed left-0 w-full ${hasNotNavBar ? 'bottom-2 ' : 'bottom-[calc(63px+8px)]'}`}>
          <div className="mx-auto box-border w-full max-w-screen-pc space-y-4 px-4 mobile:min-w-[390px]">
            <SelectedCategoryHorizonList shadowEffect closeButton categories={selectedCategories} />
            <Button
              type="submit"
              disabled={likeStatus === 'loading' || unlikeStatus === 'loading'}
              bgColorTheme="orange"
              textColorTheme="white"
              fullWidth
              className="disabled:!cursor-progress disabled:!bg-slate-400"
            >
              {likeStatus === 'loading' || unlikeStatus === 'loading' ? '요청처리 중' : buttonText}
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
    </>
  );
}

export default CategoryForm;
