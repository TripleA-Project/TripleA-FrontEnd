'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SymbolChip from '@/components/UI/Chip/SymbolChip';
import { ClickAwayListener, Tooltip } from '@mui/material';
import { BsQuestionCircle } from 'react-icons/bs';
import DispatchSearchSymbolChip from './DispatchSearchSymbolChip';
import { getRecommandSymbol } from '@/service/symbol';

interface RecommandSymbolListProps {
  onDispatch?: (requiredSubscribe: boolean) => void;
}

function RecommandSymbolList({ onDispatch }: RecommandSymbolListProps) {
  const { data: recommandSymbolPayload, status: recommandSymbolStatus } = useQuery(
    ['symbol', 'recommand'],
    () => getRecommandSymbol(),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      select(response) {
        return response.data;
      },
    },
  );

  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div>
      <h2 className="mb-6 flex items-center gap-1 text-sm font-bold">
        요즘 뜨는 종목
        <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
          <div>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => setTooltipOpen(false)}
              open={tooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <p>
                  유저들이 많이 선택한 종목을 제공합니다.
                  <br />
                  관련 데이터가 없을 경우
                  <br />
                  제공할 수 있는 종목이 없을 수 있습니다.
                </p>
              }
            >
              <button type="button" className="flex items-center" onClick={() => setTooltipOpen((prev) => !prev)}>
                <BsQuestionCircle />
              </button>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </h2>
      {recommandSymbolStatus === 'loading' ? (
        <div className="flex flex-col gap-3">
          <SymbolChip loading />
          <SymbolChip loading />
          <SymbolChip loading />
        </div>
      ) : null}
      {recommandSymbolPayload?.data?.length ? (
        <div className="flex h-[160px] w-max flex-col gap-3 overflow-auto scrollbar-thin scrollbar-thumb-[#DBDEE1] scrollbar-thumb-rounded-lg">
          {recommandSymbolPayload.data.map((symbol, idx) => (
            <DispatchSearchSymbolChip
              key={`recommand-${symbol.symbol.toUpperCase()}-${idx}`}
              symbol={symbol}
              allowClickDispatch
              onDispatch={onDispatch}
            />
          ))}
        </div>
      ) : recommandSymbolStatus === 'loading' ? null : (
        <p className="text-[#9AA2A9]">요즘 뜨는 종목을 제공할 수 없습니다.</p>
      )}
    </div>
  );
}

export default RecommandSymbolList;
