'use client';

import React, { useEffect, useRef, useState } from 'react';
import SymbolLogoImage from '@/components/Image/SymbolLogoImage';
import { AppIcons } from '@/components/Icons';
import { DeltaPriceColor, DeltaPriceType, getPriceInfo } from '@/util/chart';
import { type Symbol } from '@/interfaces/Symbol';

export interface OnChipChangeResult {
  type: 'like' | 'unlike' | 'unknown';
  status: 'error' | 'success';
}

export interface SymbolChipProps {
  symbol?: Omit<Symbol, 'price' | 'symbolId'> & Partial<Pick<Symbol, 'price' | 'symbolId'> & { name: string }>;
  loading?: boolean;
  selected?: boolean;
  shadowEffect?: boolean;
  showPrice?: boolean;
  closeButton?: boolean;
  onChange?: () => Promise<OnChipChangeResult>;
  onClose?: () => void;
}

function SymbolChip({
  symbol,
  loading,
  selected = false,
  shadowEffect,
  showPrice,
  closeButton,
  onChange,
  onClose,
}: SymbolChipProps) {
  const [checked, setChecked] = useState(selected);
  const [isRender, setIsRender] = useState(true);
  const changeTrigger = useRef<boolean>(false);

  const symbolPrice =
    symbol?.price && symbol.price.today && symbol.price.yesterday && showPrice
      ? getPriceInfo({ today: symbol.price.today ?? 0, yesterday: symbol.price.yesterday ?? 0 })
      : null;

  const handleClick = () => {
    if (onChange) {
      setChecked((prev) => !prev);
      changeTrigger.current = true;
    }
  };

  const handleChange = async () => {
    if (onChange && changeTrigger.current === true) {
      const { status } = await onChange();

      if (status === 'error') {
        setChecked((prev) => !prev);

        changeTrigger.current = false;

        return;
      }

      changeTrigger.current = false;
    }
  };

  useEffect(() => {
    handleChange();
  }, [checked]); /* eslint-disable-line */

  useEffect(() => {
    setChecked(!!selected);
  }, [selected]);

  if (loading) {
    return (
      <div
        className={`skeleton_loading box-border inline-flex h-9 w-40 shrink-0 cursor-pointer select-none items-center justify-between rounded-full border border-[#E5E7EC] px-3.5 py-2 align-top`}
      >
        <div className="h-5 w-5 rounded-full" />
        <div className="![background:none]">
          <span className="![background:none]">&nbsp;</span>
        </div>
      </div>
    );
  }

  return (symbol?.symbol || symbol?.name) && isRender ? (
    <div
      className={`box-border inline-flex h-9 w-max max-w-sm shrink-0 cursor-pointer select-none items-center justify-between rounded-full border px-3.5 py-2 align-top ${
        checked ? 'border-[#FC954A] bg-[#FFF0E4]' : 'border-[#E5E7EC] bg-white'
      } ${shadowEffect ? 'my-2.5 ml-[9px]' : 'm-0'} ${
        checked && shadowEffect ? 'shadow-[0_0_15px_0_rgba(252,149,74,0.3)]' : 'shadow-none'
      }`}
      onClick={handleClick}
    >
      <div className="flex shrink-0 items-center">
        <SymbolLogoImage type="Chip" symbol={symbol.symbol || symbol.name || ''} src={symbol.logo} />
        <div className="ml-1.5 flex w-max max-w-[140px] gap-1 text-xs">
          <span className="shrink-0 font-bold">{symbol.symbol || symbol.name || ''}</span>
          {symbol.companyName ? <span className="truncate">{symbol.companyName}</span> : null}
        </div>
        {symbolPrice ? (
          <div className="ml-1 flex shrink-0 gap-1 text-xs" style={{ color: DeltaPriceColor[symbolPrice.delta.type] }}>
            <span>{symbolPrice.close === 0 ? 0 : symbolPrice.close?.toFixed(1) ?? '-'} USD</span>
            <span>
              ({`${DeltaPriceType[symbolPrice.delta.type]}`}
              {symbolPrice.delta.percent})%
            </span>
          </div>
        ) : null}
      </div>
      {closeButton ? (
        <button
          className="ml-2"
          onClick={() => {
            onClose && onClose();
            setIsRender(false);
          }}
        >
          <AppIcons.CloseFill.Orange />
        </button>
      ) : null}
    </div>
  ) : null;
}

export default SymbolChip;
