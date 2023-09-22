'use client';

import { getRecommandSymbol } from '@/service/symbol';
import { useQuery } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { SymbolLikeCardList } from '../SymbolTabs/SymbolCard';
import NoRecommandSymbol from './NoRecommandSymbol';

function RecommandSymbol() {
  const { data: recommandSymbolPayload } = useQuery(['symbol', 'recommand'], () => getRecommandSymbol(), {
    retry: false,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
    suspense: true,
  });

  if (recommandSymbolPayload?.data && !recommandSymbolPayload.data?.length) {
    return <NoRecommandSymbol />;
  }

  return (
    <div className="mb-3 mt-5 box-border space-y-4">
      <SymbolLikeCardList symbols={recommandSymbolPayload!.data!} />
    </div>
  );
}

export default RecommandSymbol;
