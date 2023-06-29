import React from 'react';
import Image from 'next/image';
import Select from './index';
import { Category } from '@/interfaces/Category';
import { Symbol } from '@/interfaces/Symbol';
interface SelectContainerProps {
  arr: any;
  type: string;
  selectedArr?: string[];
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
        ? arr.map((item: Category) => {
            return (
              <Select key={item.categoryId} selectedArr={selectedArr} setSelectedArr={setSelectedArr}>
                {item.category}
              </Select>
            );
          })
        : arr.map((item: Symbol) => {
            return (
              <Select key={item.symbolId} selectedArr={selectedArr} setSelectedArr={setSelectedArr}>
                <Image src={item.logo ?? ''} alt="logo" width={10} height={10} />
                {item.symbol}
              </Select>
            );
          })}

      {number && <div></div>}
    </div>
  );
}
