'use client';

import { useRef } from 'react';
import { redirect } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { FiExternalLink } from 'react-icons/fi';
import CategoryChip from '@/components/UI/Chip/CategoryChip';
import SymbolChip from '@/components/UI/Chip/SymbolChip';
import InfinityNewsList, { genLinkHashId } from './InfinityNewsList';
import { useLikes } from '@/hooks/useLikes';

function InterestNewsPage() {
  const { likedSymbols, likedCatgories, loginRequired, status } = useLikes();
  const ref = useRef<HTMLDivElement>(null);

  if (loginRequired) {
    redirect('/login');
  }

  if (status === 'loading') {
    return <></>
  }

  return (
    <>
      <div ref={ref} className="box-border px-4">
        <div className='h-4 z-[4] bg-white sticky top-[55px] -mt-4'></div>
        <div className="sticky top-[71px] z-[4] box-border flex justify-center items-center border bg-white px-2 py-4">
          <div className='flex items-center overflow-auto scrollbar-none gap-1'>
            <div className="flex items-center gap-1 shrink-0 self-stretch sticky left-0 bg-white z-[4] pr-2">
              <span className='text-xs shrink-0'>바로가기</span> 
              <FiExternalLink className='shrink-0' />
            </div>
            <div className='gap-1 flex items-center'>
              {likedCatgories
                ? likedCatgories.inAllCategory.map((category) => (
                    <button
                      key={genLinkHashId({ category })}
                      onClick={() => {
                        const target = document.getElementById(genLinkHashId({ category }));

                        if (!target) return;

                        window?.scrollTo({ top: 0 });

                        window?.scrollTo({ top: target.getBoundingClientRect().top - 121.5 });
                      }}
                    >
                      <CategoryChip category={category} />
                    </button>
                  ))
                : null
              }
              {likedSymbols
                ? likedSymbols.symbols.map((symbol) => (
                    <button
                      key={genLinkHashId({ symbol })}
                      onClick={() => {
                        const target = document.getElementById(genLinkHashId({ symbol }));

                        if (!target) return;

                        window?.scrollTo({ top: 0 });

                        window.scrollTo({ top: target.getBoundingClientRect().top - 121.5 - 16 });
                      }}
                    >
                      <SymbolChip symbol={symbol} />
                    </button>
                  ))
                : null
              }
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
