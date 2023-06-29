'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import IconButton from '../Button/IconButton';
import LogoIcon from '../Icon/LogoIcon';
import { Symbol } from '@/interfaces/Symbol';
import Link from 'next/link';

interface SearchSymbolData {
  symbolData: Symbol;
}

function SymbolCard({ symbolData }: SearchSymbolData) {
  console.log({ symbolData });
  const [imgError, setImgError] = useState<boolean>(false);

  if (!symbolData) {
    return null;
  }

  const clickHandle = () => {
    console.log('얍');
  };

  const imgErrorHandle = () => {
    setImgError(true);
  };
  const symbolTodayClosePrice = symbolData.price.today.close;
  const symbolChangePrice = symbolData.price.today.close - symbolData.price.yesterday.close;
  const symbolSharePrice = (
    ((symbolData.price.today.close - symbolData.price.yesterday.close) / symbolData.price.yesterday.close) *
    100
  ).toFixed(1);

  return (
    <Link
      href={`/chart/symbol?name=${symbolData.symbol}`}
      key={symbolData.symbolId}
      className="flex  items-center  justify-between  py-[5px] pl-4 pr-2"
    >
      <div className="h-[42px] w-[42px] overflow-hidden rounded-[50%] text-center align-middle">
        {!imgError ? (
          <Image
            src={symbolData.logo ?? ''}
            alt={symbolData.symbol}
            width={42}
            className="w-full object-cover"
            onError={imgErrorHandle}
          />
        ) : (
          <LogoIcon className="mx-auto flex h-[50%] w-[50%] items-center object-cover text-center" />
        )}
      </div>
      <div className="ml-4 mr-[10.5px] w-[121px]">
        <div className="text-sm font-semibold text-[#000]">{symbolData.symbol}</div>
        <div className="text-xs text-[#AEAEAE]">{symbolData.companyName}</div>
      </div>
      <div className="">
        <div className="text-center text-sm font-semibold text-black">{symbolTodayClosePrice}</div>
        <div className="text-center text-xs font-medium text-[#E0144C]">
          {symbolChangePrice.toFixed(1)} ({symbolSharePrice}%)
        </div>
      </div>
      <div className="ml-[72px] text-[#E5E7EC]">
        <IconButton
          icon="heartfill"
          textColorTheme="none"
          bgColorTheme="none"
          sizeTheme="icon"
          iconSize="24px"
          onClick={clickHandle}
          className="text-2xl"
        />
      </div>
    </Link>
  );
}

export default SymbolCard;
