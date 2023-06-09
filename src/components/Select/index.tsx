'use client';

import React, {useState} from 'react';

function Select({children}) {
  const [selected, setSelected] = useState(false)

  const selectClickHandler = () => {
    if(selected===false){
      setSelected(true)
      
    } else {
      setSelected(true)
    }
  }
  
  
  return (
  <li className={selected? 'selectItem selected': 'selectItem'} onClick={selectClickHandler}>{children}</li>)
}

export default Select;
