'use client';

import styled from '@emotion/styled';
import React, { useState, useEffect, MouseEvent, MouseEventHandler, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { searchSymbol } from '@/service/symbol';

interface SelectComponentProps {
  children: ReactNode;
  selectedArr?: string[] | [];
  setSelectedArr?: any;
  symbol?: string;
}
interface SelectItemProps {
  selected: boolean;
}

//style
const SelectItem = styled.li<SelectItemProps>`
  display: inline-flex;
  width: fit-content;
  height: 36px;
  gap: 10px;
  align-items: center;
  border: 1px solid ${({ selected }) => (selected ? '#FD954A' : '#DBDEE1')};
  border-radius: 25px;
  padding: 8px 20px;
  background-color: ${({ selected }) => (selected ? '#FFF0E4' : '#FFF')};
  color: #000;
  &:hover {
    cursor: pointer;
  }
`;

function Select({ children, selectedArr, setSelectedArr, symbol }: SelectComponentProps) {
  const [selected, setSelected] = useState(false);

  const clickHandler: MouseEventHandler = (e: MouseEvent<HTMLLIElement> & { target: HTMLLIElement }) => {
    if (symbol) {
      const router = useRouter();
      router.push(`./api/symbol?symbol=${id}`);
    } else {
      setSelected(!selected);
      if (selected === false) {
        setSelectedArr([...selectedArr, e.target.innerHTML]);
      } else {
        const filteredArray: string[] | [] = selectedArr.filter((item) => item !== e.target.innerText);
        setSelectedArr(filteredArray);
      }
    }
  };
  useEffect(() => {}, []);
  return (
    <SelectItem className={selected ? 'selectItem selected' : 'selectItem'} onClick={clickHandler} selected={selected}>
      {children}
    </SelectItem>
  );
}

export default Select;
