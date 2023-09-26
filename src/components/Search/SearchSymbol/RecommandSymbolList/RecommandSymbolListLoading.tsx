import React from 'react';
import SymbolChip from '@/components/UI/Chip/SymbolChip';

function RecommandSymbolListLoading() {
  return (
    <div className="animate__animated animate__fadeIn flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, idx) => (
        <SymbolChip key={`loadingRecommand-${idx}`} loading />
      ))}
    </div>
  );
}

export default RecommandSymbolListLoading;
