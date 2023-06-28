'use client';

import React, { useState, MouseEvent, MouseEventHandler, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

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
  justify-content: space-evenly;
  border: 1px solid ${({ selected }) => (selected ? '#FD954A' : '#DBDEE1')};
  border-radius: 25px;
  margin: 5px;
  padding: 8px 12px;
  background-color: ${({ selected }) => (selected ? '#FFF0E4' : '#FFF')};
  color: #000;
  &:hover {
    cursor: pointer;
  }
`;

function Select({ children, selectedArr, setSelectedArr, symbol }: SelectComponentProps) {
  const [selected, setSelected] = useState(false);
  const router = useRouter();
  const clickHandler: MouseEventHandler = (e: MouseEvent<HTMLLIElement> & { target: HTMLLIElement }) => {
    if (symbol) {
      console.log(symbol);
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

  return (
    <SelectItem
      className={'flex gap-[5px] ' + selected ? 'selectItem selected' : 'selectItem'}
      onClick={clickHandler}
      selected={selected}
    >
      {children}
    </SelectItem>
  );
}

export default Select;
