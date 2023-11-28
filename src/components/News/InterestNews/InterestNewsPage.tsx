'use client';

import { useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useIsFetching } from '@tanstack/react-query';
import { FiExternalLink } from 'react-icons/fi';
import CategoryChip from '@/components/UI/Chip/CategoryChip';
import SymbolChip from '@/components/UI/Chip/SymbolChip';
import FitPage from '@/components/Layout/FitPage';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import InfinityNewsList, { genLinkHashId } from './InfinityNewsList';
import InterestNewsPageTimeout from '@/components/ErrorBoundary/ErrorFallback/InterestNews/Timeout';
import InterestNewsPageInternalServerError from '@/components/ErrorBoundary/ErrorFallback/InterestNews/InternalServerError';
import PreventOutsideScroll from '@/components/PreventOutsideScroll';
import { useLikes } from '@/hooks/useLikes';
import { Category } from '@/interfaces/Category';

function InterestNewsPage() {
  const { push } = useRouter();

  const { likedSymbols, likedCategories, loginRequired, status } = useLikes();

  const isFetching = useIsFetching(['likedSymbolList']);

  const linkIconRef = useRef<HTMLDivElement>(null);
  const linkWrapperRef = useRef<HTMLDivElement>(null);

  const getMatchingCategoryMap = ({
    categories,
    allCategories,
  }: {
    categories: typeof likedCategories.categories;
    allCategories: typeof likedCategories.allCategories;
  }) => {
    if (!categories || !allCategories) return null;

    const resultMap = new Map<string, Category>();

    allCategories.forEach((allCategoryItem) => {
      resultMap.set(allCategoryItem.category, allCategoryItem);
    });

    return resultMap.size ? resultMap : null;
  };

  const matchedCategoriesMap = useMemo(
    () =>
      getMatchingCategoryMap({ categories: likedCategories.categories, allCategories: likedCategories.allCategories }),
    [likedCategories.categories, likedCategories.allCategories] /* eslint-disable-line */,
  );

  if (status === 'loading' || isFetching) {
    return (
      <FitPage>
        <div className="box-border flex h-full w-full items-center justify-center px-4">
          <MuiSpinner />
        </div>
      </FitPage>
    );
  }

  if (status === 'timeout') {
    return <InterestNewsPageTimeout />;
  }

  if (status === 'error') {
    if (loginRequired) {
      /*
        - 기존 메인 최신 뉴스 탭에서
        관심 뉴스 탭 클릭 시
        로그인 하지 않은 경우,
        관심 뉴스 페이지를 렌더링하지 않고
        로그인 팝업을 보여주던 것과
        동일한 레이아웃을 제공
        (
          기존 피그마에서는 
          직접 관련뉴스 탭으로 이동한 경우 
          로그인 하지 않은 경우에 대한 구현물이 없어, 
          기존 임의로 다른 UI를 제공하던 것을
          해당 방식으로 변경
        )

        - 뉴스 탭에서의 api 커스텀 hook과
          관심 뉴스에서의 api 커스텀 hook이 동일하므로,
          관심 뉴스 api 커스텀 hook에서 에러가 발생한 경우
          뉴스탭에서도 동일한 에러가 발생할 것임

        - 일반적인 흐름으로는
          탭 버튼을 직접 클릭하고
          검사 이후 유효한 경우 이동되기 때문에
          해당 로직이 실행되지 않지만,
          주소창에 직접 입력하거나
          주소를 공유해서 이동할 경우 발생할 수 있음
      */
      push('/');

      const interestTab = document.getElementById('news-tab__interest');

      interestTab?.click();

      return null;
    }

    return <InterestNewsPageInternalServerError />;
  }

  return (
    <>
      <div className="box-border px-4">
        <div className="sticky top-[55px] z-[5] -mt-4 h-4 bg-white"></div>
        <PreventOutsideScroll>
          <div className="sticky top-[71px] z-[5] box-border flex items-center justify-center border bg-white px-2 py-4">
            <div
              id="link_wrapper"
              ref={linkWrapperRef}
              className="flex items-center gap-1 overflow-auto scrollbar-none"
              onWheel={(e) => {
                e.currentTarget.scroll({ left: e.currentTarget.scrollLeft + e.deltaY });
              }}
            >
              <div
                ref={linkIconRef}
                className="sticky left-0 z-[4] flex shrink-0 items-center gap-1 self-stretch bg-white pr-2"
              >
                <span className="shrink-0 text-xs">바로가기</span>
                <FiExternalLink className="shrink-0" />
              </div>
              <div className="flex items-center gap-1">
                {likedCategories.categories
                  ? likedCategories.categories.map((category) => (
                      <button
                        key={genLinkHashId({ category })}
                        onClick={(e) => {
                          const target = document.getElementById(
                            genLinkHashId({ category: matchedCategoriesMap!.get(category.category) }),
                          );

                          if (!target) return;

                          /*
                          left:
                            button left - 
                            stickyElement width - 
                            stickyElement rightPadding - 
                            wrapper padding
                        */

                          linkWrapperRef.current?.scroll({
                            left: e.currentTarget.offsetLeft - linkIconRef.current!.offsetWidth - 8 - 8,
                            behavior: 'smooth',
                          });

                          window?.scrollTo({
                            top: target.offsetTop - linkWrapperRef.current!.offsetHeight - 114,
                            behavior: 'smooth',
                          });
                        }}
                      >
                        <CategoryChip category={category} />
                      </button>
                    ))
                  : null}
                {likedSymbols.symbols
                  ? likedSymbols.symbols.map((symbol) => (
                      <button
                        key={genLinkHashId({ symbol })}
                        onClick={(e) => {
                          const target = document.getElementById(genLinkHashId({ symbol }));

                          if (!target) return;

                          /*
                          left:
                            button left - 
                            stickyElement width - 
                            stickyElement rightPadding - 
                            wrapper padding
                        */

                          linkWrapperRef.current?.scroll({
                            left: e.currentTarget.offsetLeft - linkIconRef.current!.offsetWidth - 8 - 8,
                            behavior: 'smooth',
                          });

                          window?.scrollTo({
                            top: target.offsetTop - linkWrapperRef.current!.offsetHeight - 114,
                            behavior: 'smooth',
                          });
                        }}
                      >
                        <SymbolChip symbol={symbol} />
                      </button>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </PreventOutsideScroll>
        {likedCategories.categories && likedCategories.allCategories
          ? likedCategories.categories.map((category, idx) => {
              const targetCategory = matchedCategoriesMap!.get(category.category);

              return <InfinityNewsList key={`${category.category}-${idx}`} category={targetCategory} />;
            })
          : null}
        {likedSymbols.symbols
          ? likedSymbols.symbols.map((symbol, idx) => (
              <InfinityNewsList key={`${symbol.symbol}-${idx}`} symbol={symbol} />
            ))
          : null}
      </div>
    </>
  );
}

export default InterestNewsPage;
