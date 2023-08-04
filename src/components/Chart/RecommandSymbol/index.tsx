'use client';

import { getRecommandSymbol } from '@/service/symbol';
import { useQuery } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { SymbolLikeCardList, SymbolLikeCardListLoading } from '../SymbolTabs/SymbolCard';
import NoRecommandSymbol from './NoRecommandSymbol';

function RecommandSymbol() {
  const { data: recommandSymbolPayload, status: recommandSymbolStatus } = useQuery(
    ['symbol', 'recommand'],
    () => getRecommandSymbol(),
    {
      retry: false,
      refetchOnWindowFocus: false,
      select(response) {
        return response.data;
      },
    },
  );

  return (
    <>
      <div className="mb-3 mt-5 box-border space-y-4">
        {recommandSymbolStatus !== 'success' ? (
          <SymbolLikeCardListLoading />
        ) : recommandSymbolPayload.data && recommandSymbolPayload.data.length ? (
          <SymbolLikeCardList symbols={recommandSymbolPayload.data} />
        ) : (
          <NoRecommandSymbol />
        )}
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

export default RecommandSymbol;
