'use client';

import React, {useState, MouseEvent, MouseEventHandler} from 'react';
import styled from '@emotion/styled';

interface SelectComponentProps {
  children : string;
  selectedArray : string[] | [];
  setSelectedArray: any;
}
interface NewsCategoryItemProps {
  selected: boolean;
}

function Select({children, ...props}:SelectComponentProps) {
  
  const [selected, setSelected] = useState(false)
  const selectedArray = props.selectedArray
  const setSelectedArray= props.setSelectedArray   

  const clickHandler:MouseEventHandler = (e:MouseEvent<HTMLLIElement> & {target:HTMLLIElement}) => {
    console.log(e.target.innerHTML)
    setSelected(!selected)
    if(selected===false){
      setSelectedArray([...selectedArray, e.target.innerHTML])
    } else {
      const filteredArray:string[]|[] = selectedArray.filter((item) => item !== e.target.innerText)
      setSelectedArray(filteredArray)
    }
  }
  
  
  return (
  <NewsCategoryItem className={selected? 'selectItem selected': 'selectItem'} onClick={clickHandler} selected={selected}>{children}</NewsCategoryItem>)
}

export default Select;

//style
const NewsCategoryItem = styled.li<NewsCategoryItemProps>`
  display: inline-block;
  border: 1px solid ${({selected})=> selected ? '#6A6A6A': '#000'};
  border-radius: 25px;
  margin: 5px;
  padding: 10px 20px;
  background-color:${({selected})=>selected? '#6A6A6A' : '#E0E0E0'};
  color: #fff;
`