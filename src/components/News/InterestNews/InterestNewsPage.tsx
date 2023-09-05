'use client';

import { useRef } from 'react';
import { redirect } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { useIsFetching } from '@tanstack/react-query';
import { FiExternalLink } from 'react-icons/fi';
import CategoryChip from '@/components/UI/Chip/CategoryChip';
import SymbolChip from '@/components/UI/Chip/SymbolChip';
import FitPage from '@/components/Layout/FitPage';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import InfinityNewsList, { genLinkHashId } from './InfinityNewsList';
import InterestNewsPageTimeout from '@/components/ErrorBoundary/ErrorFallback/InterestNews/Timeout';
import { useLikes } from '@/hooks/useLikes';

function InterestNewsPage() {
  const { likedSymbols, likedCatgories, loginRequired, status } = useLikes();
  const isFetching = useIsFetching(['likedSymbolList']);

  const linkIconRef = useRef<HTMLDivElement>(null);
  const linkWrapperRef = useRef<HTMLDivElement>(null);

  if (status === 'loading' || isFetching) {
    return (
      <FitPage>
        <div className="box-border flex h-full w-full items-center justify-center px-4">
          <MuiSpinner />
        </div>
      </FitPage>
    );
  }

  if (status === 'error') {
    if (loginRequired) {
      redirect('/login');
    }
  }

  if (status === 'timeout') {
    return <InterestNewsPageTimeout />;
  }

  return (
    <>
      <div className="box-border px-4">
        <div className="sticky top-[55px] z-[5] -mt-4 h-4 bg-white"></div>
        <div className="sticky top-[71px] z-[5] box-border flex items-center justify-center border bg-white px-2 py-4">
          <div id="link_wrapper" ref={linkWrapperRef} className="flex items-center gap-1 overflow-auto scrollbar-none">
            <div
              ref={linkIconRef}
              className="sticky left-0 z-[4] flex shrink-0 items-center gap-1 self-stretch bg-white pr-2"
            >
              <span className="shrink-0 text-xs">바로가기</span>
              <FiExternalLink className="shrink-0" />
            </div>
            <div className="flex items-center gap-1">
              {likedCatgories
                ? likedCatgories.inAllCategory.map((category) => (
                    <button
                      key={genLinkHashId({ category })}
                      onClick={(e) => {
                        const target = document.getElementById(genLinkHashId({ category }));

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
              {likedSymbols
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
        {likedCatgories
          ? likedCatgories.inAllCategory.map((category, idx) => (
              <InfinityNewsList key={`${category.category}-${idx}`} category={category} />
            ))
          : null}
        {likedSymbols
          ? likedSymbols.symbols.map((symbol, idx) => (
              <InfinityNewsList key={`${symbol.symbol}-${idx}`} symbol={symbol} />
            ))
          : null}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default InterestNewsPage;
