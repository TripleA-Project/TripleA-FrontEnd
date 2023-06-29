import React from 'react';
import Select from './index';
import { symbolInterface } from '@/constants/symbolArr';
import { categoryInterface } from '@/constants/newsCategory';

interface SelectContainerProps {
  arr: symbolInterface[] | categoryInterface[];
  type: string;
  selectedArr?: [];
  setSelectedArr?: Function;
  number?: boolean;
}

export default function SelectContainer({
  arr,
  type,
  selectedArr,
  setSelectedArr,
  number = false,
}: SelectContainerProps) {
  return (
    <div className="inline-flex flex-col justify-start gap-[6px]">
      {type === 'category'
        ? arr.map((item) => {
            const { categoryId, label } = item as categoryInterface;
            return (
              //@ts-ignore
              <Select key={item.categoryId} selectedArr={selectedArr as any[]} setSelectedArr={setSelectedArr}>
                {label}
              </Select>
            );
          })
        : arr.map((item) => {
            const { symbolId, companyName, logo, symbol } = item as symbolInterface;
            return (
              //@ts-ignore
              <Select key={item.symbolId} selectedArr={selectedArr} setSelectedArr={setSelectedArr}>
                {logo}
                {symbol}
                {companyName}
              </Select>
            );
          })}

      {number && <div></div>}
    </div>
  );
}
