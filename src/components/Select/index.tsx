'use client';

import React, {useState} from 'react';

function Select({children, ...props}) {
  
  const [selected, setSelected] = useState(false)
  const selectedArray = props.selectedArray
  const setSelectedArray= props.setSelectedArray   

  const clickHandler = (e:MouseEvent) => {
    if(selected===false){
      setSelected(true)
      setSelectedArray([...selectedArray, e.target.innerText])
    } else {
      setSelected(true)
      const filteredArray = selectedArray.filter((item) => item !== e.target.innerText)
      setSelectedArray(filteredArray)
    }
  }
  
  
  return (
  <li className={selected? 'selectItem selected': 'selectItem'} onClick={clickHandler}>{children}</li>)
}

export default Select;
