"use client"
import React , {useState} from 'react'
import SelectContainer from '@/components/Select/SelectContainer'
import Button from '@/components/Button/Button'
import { newsCategory } from '@/constants/newsCategory' //get category 한 data

export default function InterestedCategoryPage() {

  const [selectedArr, setSelectedArr] = useState([])
  const [arr, setArr] = useState(newsCategory)

  const inputChangeHandler = (e) => {
    if(e.target.value){
      const newArr = newsCategory.filter((item)=>item.label.includes(e.target.value) )
      setArr(newArr)
    } else {
      setArr(newsCategory)
    }
  }

  return (
      <div className='flex flex-col gap-[80px] bg-white px-[50px] py-[50px]'>
        <div className='flex flex-col gap-[50px]'>
          <div className='flex flex-col gap-[20px]'>
            <h3 className='flex justify-center text-[20px] font-semibold relative'>
              <span className='border-b-[7px] border-b-[rgba(253,149,73,0.7)] border-solid pb-[-20px]'>관심 카테고리</span><span>를 선택해주세요</span>
            </h3>
            <p className='text-center text-[14px]'>선택한 카테고리에 해당하는<br/>뉴스 기사를 모아볼 수 있습니다.</p>
          </div>
          <input type="text" className='w-full h-[46px] outline-0 border border-solid border-[#454C52] rounded-lg px-[10px] placeholder:text-[#DBDEE1] m-auto' placeholder='카테고리 검색' onChange={inputChangeHandler}/>
        </div>
        <SelectContainer arr={arr} type='category' selectedArr={selectedArr} setSelectedArr={setSelectedArr}/>
        <Button type='button' sizeTheme='large' bgColorTheme='orange' textColorTheme='white' clickHandler={()=>{console.log('ddd')}}>선택 완료</Button>
    </div>
  )
}
