'use client';

import React, { useState, MouseEvent, MouseEventHandler } from 'react';
import styled from '@emotion/styled';

interface SelectComponentProps {
  children: string;
  selectedArr: string[] | [];
  setSelectedArr: any;
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
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`;

function Select2({ children, selectedArr, setSelectedArr }: SelectComponentProps) {
  const [selected, setSelected] = useState(false);

  const clickHandler: MouseEventHandler = (e: MouseEvent<HTMLLIElement> & { target: HTMLLIElement }) => {
    console.log(e.target.innerHTML);
    setSelected(!selected);
    if (selected === false) {
      setSelectedArr([...selectedArr, e.target.innerHTML]);
    } else {
      const filteredArray: string[] | [] = selectedArr.filter((item) => item !== e.target.innerText);
      setSelectedArr(filteredArray);
    }
  };

  return (
    <SelectItem className={selected ? 'selectItem selected' : 'selectItem'} onClick={clickHandler} selected={selected}>
      {children}
    </SelectItem>
  );
}

export default Select2;
