'use client';

import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { type SentimentData } from '@/service/chart';
import { DeltaPriceColor, DeltaPriceType, getPriceInfo, type PriceInfo } from '@/util/chart';
import { Symbol } from '@/interfaces/Symbol';

interface ChartHeaderProps {
  priceInfo: PriceInfo;
  sentimentData?: SentimentData[];
  symbol: string;
  symbolPayload?: Symbol | null;
  companyName?: string;
}

const StyledDeltaPrice = styled.p<{ type: keyof typeof DeltaPriceType }>`
  ${({ type }) =>
    css`
      color: ${DeltaPriceColor[type]};
    `}
`;

export function ChartHeaderLoading() {
  return (
    <div className="mb-5 flex justify-between">
      <div>
        <div className="skeleton_loading relative">
          <h3 className="h-7 w-20 rounded-md bg-slate-500"></h3>
          <p className="mt-2 h-9 w-28 rounded-md"></p>
        </div>
        <p className="skeleton_loading">
          <span className="inline-block h-4 w-8 rounded-md bg-slate-500" />{' '}
          <span className="inline-block h-4 w-8 rounded-md bg-slate-500" />
        </p>
      </div>
      <div className="flex items-center justify-center">
        <svg className="w-10 overflow-visible" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx={50} cy={50} r={50} strokeWidth={20} className="fill-transparent stroke-slate-300"></circle>
        </svg>
      </div>
    </div>
  );
}

function ChartHeader({ symbolPayload, symbol, companyName, priceInfo, sentimentData }: ChartHeaderProps) {
  const { delta, close } = symbolPayload
    ? getPriceInfo({ today: symbolPayload.price.today, yesterday: symbolPayload.price.yesterday })
    : { delta: { type: 'NO_CHANGE' as const, value: 0, percent: 0 }, close: 0 };
  // const { delta, close } = priceInfo;

  return (
    <div className="mb-5 flex justify-between">
      <div>
        <h3 className="text-xl font-semibold text-[#131F3C]">
          {symbolPayload?.companyName || symbolPayload?.symbol.toUpperCase() || ''}
        </h3>
        <p className="text-3xl text-black">{`${close} USD`}</p>
        <StyledDeltaPrice type={delta.type}>
          <span>
            {DeltaPriceType[delta.type]} {delta.value}
          </span>{' '}
          <span>
            ({DeltaPriceType[delta.type]} {delta.percent}%)
          </span>
        </StyledDeltaPrice>
      </div>
      <div className="flex items-center justify-center">
        <svg className="w-10 overflow-visible" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx={50}
            cy={50}
            r={50}
            strokeWidth={20}
            stroke={sentimentData && sentimentData.length ? sentimentData[sentimentData.length - 1].color : '#cbd5e1'}
            className="fill-transparent transition-colors duration-300"
          ></circle>
        </svg>
      </div>
    </div>
  );
}

export default ChartHeader;
