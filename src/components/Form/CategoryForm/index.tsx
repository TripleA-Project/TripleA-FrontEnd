'use client';

import { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { usePathname } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { throttle } from 'lodash';
import { ToastContainer } from 'react-toastify';
import { initLikedCategoryMap, initSelectedCategoryMap, reset, useCategoryList } from '@/redux/slice/categorySlice';
import FormTitleHighLightText from '../FormTitleHighLightText';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import { SearchCategory, SearchCategoryResult, SelectedCategoryHorizonList } from '@/components/Search/SearchCategory';
import Button from '@/components/Button/Button';
import { LockNotification } from '@/components/Notification';
import { LockNotificationTemplate } from '@/constants/notification';
import CategoryFormUnauthorized from '@/components/ErrorBoundary/ErrorFallback/CategoryForm/Unauthorized';
import CategoryEditResultModal, { CategoryEditResultModalProps } from './ResultModal/Modal';
import { useLikes } from '@/hooks/useLikes';
import useCategoryAsyncMutation from '@/hooks/useCategoryAsyncMutation';
import type { UseStepFormContext } from '../StepForm';
import type { Category } from '@/interfaces/Category';

interface CategoryFormProps {
  buttonText?: string;
  skipable?: boolean;
}

function handleView(formWrapper: HTMLDivElement | null) {
  if (window.innerHeight < 700) {
    if (formWrapper) {
      formWrapper.style.marginTop = '-40px';
    }

    return;
  }
}

function cleanUp(formWrapper: HTMLDivElement | null) {
  if (formWrapper) {
    formWrapper.style.removeProperty('margin-top');
  }
}

// categoryForm
function CategoryForm({ buttonText = '선택 완료' }: CategoryFormProps) {
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
  } = useCategoryAsyncMutation();

  const {
    likedCategories,
    invalidateQuery,
    removeQuery,
    loginRequired,
    status: likedCategoryStatus,
    isFetching: isLikesFetching,
  } = useLikes();

  const { dispatch, requestLikeCategoryMap, requestUnLikeCategoryMap, selectedCategoryMap } = useCategoryList();
  const [searchedCategories, setSearchedCategories] = useState<Category[]>([]);
  const selectedCategories = [
    ...Array.from(Object.values(selectedCategoryMap)).map((category) => ({ ...category } as Category)),
  ];

  const hasNotRequest = !Object.keys(requestLikeCategoryMap).length && !Object.keys(requestUnLikeCategoryMap).length;

  const syncCategories = () => {
    dispatch(reset());

    dispatch(
      initLikedCategoryMap({
        categories: likedCategories?.categories ?? [],
      }),
    );

    dispatch(initSelectedCategoryMap());
  };

  const resizeThrottle = throttle((e: UIEvent) => {
    handleView(formWrapperRef.current);
  }, 300);

  const [showSubscribeNotification, setShowSubScribeNotification] = useState(false);

  const [resultModal, setResultModal] = useState<CategoryEditResultModalProps>({
    open: false,
    result: 'success',
    categoryResults: {
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

    if (Object.keys(requestUnLikeCategoryMap).length) {
      if (!likedCategories.categories) return;

      /*
        unlike : 관심카테고리 응답에서의 id로 요청해야 함
      */
      await Promise.allSettled([
        ...Object.values(requestUnLikeCategoryMap).map((requestCategory) => {
          // const unlikeTarget = likedCategories.categories!.find(
          //   (likedCategory) => likedCategory.category === categoryName,
          // );

          return unlike({ requestId: requestCategory.categoryId, category: requestCategory });
        }),
      ]);
    }

    if (Object.keys(requestLikeCategoryMap).length) {
      if (!likedCategories.allCategories) return;

      /*
        like : 전체 카테고리 id로 요청해야 함
      */
      await Promise.allSettled([
        ...Object.keys(requestLikeCategoryMap).map((categoryName) => {
          const likeTarget = likedCategories.allCategories!.find(
            (likedCategory) => likedCategory.category === categoryName,
          );

          return like({ requestId: likeTarget!.categoryId, category: likeTarget! });
        }),
      ]);
    }

    invalidateQuery.likedCategory();

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

      syncCategories();
    };
  }, []); /* eslint-disable-line */

  useEffect(() => {
    if (!isLikesFetching && likedCategoryStatus === 'success') {
      syncCategories();
    }

    (async () => {
      if (!isSubmit) return;

      if (isUnauthorizedMutation) return;

      const { success, fail } = getResultList();

      if (pathName?.startsWith('/signup')) {
        await invalidateQuery.likedCategory();

        formContext.done();

        return;
      }

      if (isSuccessLikes && isSuccessUnlikes) {
        setResultModal((prev) => ({
          ...prev,
          open: true,
          result: 'success',
          categoryResults: {
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
            categoryResults: {
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
  }, [isSubmit, likedCategoryStatus, isLikesFetching]); /* eslint-disable-line */

  if (loginRequired || isUnauthorizedMutation) {
    return <CategoryFormUnauthorized />;
  }

  return (
    <div ref={formWrapperRef} className="relative">
      <div className="my-11 space-y-3">
        <h3 className="flex items-center justify-center text-xl font-bold">
          <FormTitleHighLightText content={'관심카테고리'} />를 설정해주세요
        </h3>
        <h4 className="flex flex-col items-center justify-center text-sm font-semibold">
          <span>선택한 카테고리에 해당하는</span>
          <span>뉴스 기사를 모아볼 수 있습니다.</span>
        </h4>
      </div>
      <form onSubmit={handleSubmit}>
        <SearchCategory
          submitWrapper={submitWrapperRef.current}
          onSearch={(categories) => setSearchedCategories(categories)}
          disabled={likedCategoryStatus === 'loading' || isLikesFetching}
        />
        <SearchCategoryResult
          isSyncing={isLikesFetching}
          categories={searchedCategories}
          onDispatch={(requiredSubscribe) => {
            if (requiredSubscribe) {
              setShowSubScribeNotification(true);
            }
          }}
        />
        <div ref={submitWrapperRef} className={`fixed_inner fixed bottom-12 `}>
          <SelectedCategoryHorizonList
            loading={likedCategoryStatus === 'loading' || isLikesFetching}
            shadowEffect
            closeButton
            categories={selectedCategories}
          />
          <div className="mx-auto mt-4 w-full">
            <Button
              type="submit"
              disabled={likedCategoryStatus === 'loading' || hasNotRequest || isFetching || isLikesFetching}
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
      <CategoryEditResultModal
        open={resultModal.open}
        result={resultModal.result}
        onClose={resultModal.onClose}
        categoryResults={resultModal.categoryResults}
      />
    </div>
  );
}

export default CategoryForm;
