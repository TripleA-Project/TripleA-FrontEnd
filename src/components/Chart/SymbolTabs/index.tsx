'use client';
import React, { useState } from 'react';
import MyLikeSymbol from '../MyLikeSymbol';
import RecommandSymbol from '../RecommandSymbol';

function SymbolTabs() {
  const [tab, setTab] = useState<'myLikeSymbol' | 'recommandSymbol'>('myLikeSymbol');

  return (
    <>
      <div className="flex justify-center">
        <button
          className={`box-border flex h-[54px] flex-1 items-center justify-center border-b-2 bg-white font-bold ${
            tab === 'myLikeSymbol' ? 'border-black text-black' : 'border-[#9AA1A9] text-[#9AA1A9]'
          }`}
          onClick={() => setTab('myLikeSymbol')}
        >
          내 심볼
        </button>
        <button
          className={`box-border flex h-[54px] flex-1 items-center justify-center border-b-2 bg-white font-bold ${
            tab === 'recommandSymbol' ? 'border-black text-black' : 'border-[#9AA1A9] text-[#9AA1A9]'
          }`}
          onClick={() => setTab('recommandSymbol')}
        >
          관심 심볼
        </button>
      </div>

      {tab === 'myLikeSymbol' ? <MyLikeSymbol /> : <RecommandSymbol />}
    </>
  );
}

export default SymbolTabs;
