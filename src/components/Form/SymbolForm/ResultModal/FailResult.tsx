'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import { AppIcons } from '@/components/Icons';
import SymbolChip from '@/components/UI/Chip/SymbolChip';
import FormTitleHighLightText from '../../FormTitleHighLightText';
import type { SymbolResultList } from '@/hooks/useSymbolAsyncMutation';
import type { SearchedSymbol } from '@/interfaces/Symbol';

interface FailResultProps {
  symbolResults: {
    success: SymbolResultList;
    fail: SymbolResultList;
  };
  onClose: () => void;
}

function FailSymbolResult({ symbolResults, onClose }: FailResultProps) {
  const serializeResult = (symbol: SearchedSymbol) => {
    return <SymbolChip key={symbol.symbol} symbol={symbol} />;
  };

  const Results = ({ title, symbols }: { title: string; symbols: SearchedSymbol[] }) => {
    return symbols?.length ? (
      <div className="space-y-2 overflow-auto scrollbar-none">
        <h3 className="text-sm font-bold text-[#565759] underline underline-offset-2">{title}</h3>
        <div className="flex h-14 w-full gap-4 overflow-auto scrollbar-none">
          {symbols.map((symbol) => serializeResult(symbol))}
        </div>
      </div>
    ) : null;
  };

  const renderSymbols = {
    success: {
      like: <Results title="관심심볼 생성 성공" symbols={symbolResults.success.like} />,
      unlike: <Results title="관심심볼 삭제 성공" symbols={symbolResults.success.unlike} />,
    },
    fail: {
      like: <Results title="관심심볼 생성 실패" symbols={symbolResults.fail.like} />,
      unlike: <Results title="관심심볼 삭제 실패" symbols={symbolResults.fail.unlike} />,
    },
  };

  return (
    <div>
      {/* header */}
      <div className="absolute right-4 top-4">
        <button
          onClick={() => {
            onClose();
          }}
        >
          <AppIcons.CloseFill.Orange />
        </button>
      </div>
      <div className="mt-8 flex flex-col items-center gap-7">
        <div className="mb-3 text-center">
          <FormTitleHighLightText content={'관심심볼 설정'} />
        </div>
      </div>
      {/* content */}
      {renderSymbols.success.like}
      {renderSymbols.success.unlike}
      {renderSymbols.fail.like}
      {renderSymbols.fail.unlike}
      <Link href="/" className="mt-10 block">
        <Button bgColorTheme="orange" textColorTheme="white" className={`mx-auto h-fit w-fit px-8 py-2`}>
          홈으로
        </Button>
      </Link>
    </div>
  );
}

export default FailSymbolResult;
