'use client';

import React, {useState, MouseEvent, MouseEventHandler} from 'react';


interface SelectComponentProps {
  children : string;
  selectedArray : string[] | [];
  setSelectedArray: any;
}


function Select({children, ...props}:SelectComponentProps) {
  
  const [selected, setSelected] = useState(false)
  const selectedArray = props.selectedArray
  const setSelectedArray= props.setSelectedArray   

  const clickHandler:MouseEventHandler = (e:MouseEvent) => {
    console.log(e.target.innerHTML)
    if(selected===false){
      setSelected(true)
      setSelectedArray([...selectedArray, e.target.innerHTML])
    } else {
      setSelected(true)
      const filteredArray:string[]|[] = selectedArray.filter((item) => item !== e.target.innerText)
      setSelectedArray(filteredArray)
    }
  }
  
  
  return (
  <li className={selected? 'selectItem selected': 'selectItem'} onClick={clickHandler}>{children}</li>)
}

export default Select;
