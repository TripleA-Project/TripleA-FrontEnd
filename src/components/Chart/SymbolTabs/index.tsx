'use client';

import React from 'react';
import Tabs from './Tabs';

export type ChartTabPage = 'likeSymbol' | 'recommandSymbol';

function SymbolTab() {
  return (
    <div className="sticky top-[52px] -mx-4 bg-white">
      <Tabs />
    </div>
  );
}

export default SymbolTab;
