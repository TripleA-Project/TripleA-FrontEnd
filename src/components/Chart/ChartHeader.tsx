import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { type SentimentData } from '@/service/chart';
import { DeltaPriceColor, DeltaPriceType, type PriceInfo } from '@/util/chart';

interface ChartHeaderProps {
  priceInfo: PriceInfo;
  sentimentData: SentimentData[];
  symbol: string;
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

function ChartHeader({ symbol, companyName, priceInfo, sentimentData }: ChartHeaderProps) {
  const { delta, close } = priceInfo;

  return (
    <div className="mb-5 flex justify-between">
      <div>
        <h3 className="text-xl font-semibold text-[#131F3C]">{companyName || symbol}</h3>
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
            stroke={sentimentData[0]?.color ?? '#cbd5e1'}
            className="fill-transparent"
          ></circle>
        </svg>
      </div>
    </div>
  );
}

export default ChartHeader;
