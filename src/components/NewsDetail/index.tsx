'use client';

import React from 'react'
import { BiBookmark } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";
import { HiLink } from "react-icons/hi";
import styles from './index.module.css';

export function NewsDetail() {
  return (
      <div>
          <div className='text-xl font-semibold p-4'>Bank of America Securities는 Coupan에 대해 중립을 유지하고 목표가를 $19로 높입니다. </div>
          <div className='h-[40px]'>
              <div className='font-semibold text-[15px] text-[#616161] absolute left-5'>언론사명</div>
              <div className='font-normal text-[15px] text-[#656565] absolute right-5'>2023.11.11 11:33</div>
          </div>
          <div className='flex p-[25px]'>
              <div className='w-[23px] h-[23px] bg-[#FF9900]'></div>
              <div className='font-semibold text-[12px] text-[#ACACAC] flex justify-center items-center'>감성분석 지수 : 5</div>
              <button className='text-[#ACACAC] text-[20px]'><IoMdShare/></button>
              <button className='text-[#ACACAC] text-[20px]'><BiBookmark /></button>
          </div>
          <div>
              <div>카테고리명</div>
          </div>
          <div className='p-[16px]'>
              <div className='w-[358px] h-[198px] bg-[#D9D9D9]'>기사 사진</div>
          </div>
          <div>카카오 뷰는 이용자가 직접 관심 있는 콘텐츠를 발행하고 다른 사람이 발행한 보드를 구독할 수 있어요. 초기에는 쉬운 콘텐츠 발행과 우수한 접근성,
              그리고 뉴스레터와 같은 콘텐츠 구독모델이 인기를 끌면서 많은 기대를 받았습니다. 하지만 이내 광고 수익만을 노리는 사람들이 퀄리티가 낮고 자극적인
              제목의 낚시성 콘텐츠를 발행하다 보니 점차 이용자들이 외면하기 시작했어요. 결국 2년을 못 채우고 새로운 서비스로 교체될 예정이죠.
          </div>
          <div>#키워드 #키워드 #키워드</div>
          <div>
              <div>위 기사가 어땠나요?</div>
              <div>
                  <div></div>
                  <div>최고에요!</div>
              </div>
              <div>
                  <div></div>
                  <div>별로에요!</div>
              </div>
          </div>
          <button>
              <div><HiLink/></div>
              <div>기사 원문 보러가기</div>
          </button>
          <div>다른 기사 더보기</div>
          <div>
              <div></div>
              <div>유럽이 망해가고 있어요</div>
          </div>
          <div>
              <div>관심 카테고리에 추가하기</div>
              <div></div>
          </div>
          <div>
              <div>관심 종목에 추가하기</div>
              <div></div>
          </div>
    </div>
  )
}

export default NewsDetail