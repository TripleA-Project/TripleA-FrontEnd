'use client'; //button icon 때문에
import React, { useState } from 'react';
import SelectContainer from '@/components/Select/SelectContainer';
import Button from '@/components/Button/Button';
import { symbolArr } from '@/constants/symbolArr';

export default function InterestedStockPage() {
  const [arr, setArr] = useState(symbolArr);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const newArr = symbolArr.filter(
        (item) => item.companyName.includes(e.target.value) || item.symbol.includes(e.target.value),
      );
      setArr(newArr);
    } else {
      setArr(symbolArr);
    }
  };

  return (
    <div className="flex flex-col gap-[80px] bg-white px-[50px] py-[50px]">
      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col gap-[20px]">
          <h3 className="relative flex justify-center text-[20px] font-semibold">
            <span className="border-b-[7px] border-solid border-b-[rgba(253,149,73,0.7)] pb-[-20px]">관심 종목</span>
            <span>을 선택해주세요</span>
          </h3>
          <p className="text-center text-[14px]">
            선택한 종목이 언급된
            <br />
            뉴스 기사를 모아볼 수 있습니다.
          </p>
        </div>
        <input
          type="text"
          className="m-auto h-[46px] w-full rounded-lg border border-solid border-[#454C52] px-[10px] outline-0 placeholder:text-[#DBDEE1]"
          placeholder="종목 검색"
          onChange={inputChangeHandler}
        />
      </div>
      <SelectContainer arr={arr} type="stock" />
      <Button
        type="button"
        sizeTheme="large"
        bgColorTheme="orange"
        textColorTheme="white"
        onClick={() => {
          console.log('ddd');
        }}
      >
        선택 완료
      </Button>
    </div>
  );
}
