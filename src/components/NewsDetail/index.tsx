'use client';

import React from 'react';
import { BiBookmark } from 'react-icons/bi';
import { IoMdShare } from 'react-icons/io';
import { HiLink } from 'react-icons/hi';
import { RiThumbDownLine, RiThumbUpLine } from 'react-icons/ri';
import { BiBarChartSquare } from 'react-icons/bi';
import { BsPiggyBank } from 'react-icons/bs';
import styles from './index.module.css';

export function NewsDetail() {
  return (
    <div className="flex flex-col">
      <div className="p-4 text-xl font-semibold">
        Bank of America Securities는 Coupan에 대해 중립을 유지하고 목표가를 $19로 높입니다.{' '}
      </div>
      <div className="h-[40px]">
        <div className="absolute left-5 text-[12px] text-[#656565]">2023.11.11 11:33</div>
        <div className="absolute right-5 text-[15px] font-semibold text-[#bcbcbc]">언론사명</div>
      </div>
      <div className="flex p-[25px]">
        <div className="h-[23px] w-[23px] bg-[#FF9900]"></div>
        <div className="flex items-center justify-center text-[12px] font-semibold text-[#ACACAC]">
          감성분석 지수 : 5
        </div>
        <button className="text-[20px] text-[#ACACAC]">
          <IoMdShare />
        </button>
        <button className="text-[20px] text-[#ACACAC]">
          <BiBookmark />
        </button>
      </div>
      <div className="flex">
        <div className="ml-4 flex items-center justify-center rounded-full border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-500">
          <BiBarChartSquare className="text-[15px]" />
          금융
        </div>
        <div className="ml-4 flex items-center justify-center rounded-full border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-500">
          <BsPiggyBank className="mr-[5px] text-[15px]" />
          AAPL <span className="ml-[5px] text-[#E70000]">+0.5%</span>
        </div>
        <div className="ml-4 flex items-center justify-center rounded-full border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-500">
          <BsPiggyBank className="mr-[5px] text-[15px]" />
          TELA <span className="ml-[5px] text-[#2E49D7]">-0.2%</span>
        </div>
      </div>
      <div className="p-[16px]">
        <div className="h-[198px] w-[358px] bg-[#D9D9D9]">기사 사진</div>
      </div>
      <div className="p-[16px]">
        카카오 뷰는 이용자가 직접 관심 있는 콘텐츠를 발행하고 다른 사람이 발행한 보드를 구독할 수 있어요. 초기에는 쉬운
        콘텐츠 발행과 우수한 접근성, 그리고 뉴스레터와 같은 콘텐츠 구독모델이 인기를 끌면서 많은 기대를 받았습니다.
        <br />
        <br />
        하지만 이내 광고 수익만을 노리는 사람들이 퀄리티가 낮고 자극적인 제목의 낚시성 콘텐츠를 발행하다 보니 점차
        이용자들이 외면하기 시작했어요. 결국 2년을 못 채우고 새로운 서비스로 교체될 예정이죠.
      </div>
      <div className="ml-[16px] text-[11px] font-medium text-[#616161]">#키워드 #키워드 #키워드</div>
      <div className="mt-[10px] flex h-[150px] w-[280px] flex-col self-center rounded-[10px] bg-[#d9d9d9]">
        <div className="mt-5 self-center text-[13px] font-semibold">이 기사가 도움이 되었나요?</div>
        <div className="relative flex w-[280px] px-[60px]">
          <div className="absolute left-[70px] top-5 flex flex-col items-center justify-center">
            <div className="text-[30px]">
              <RiThumbUpLine />
            </div>
            <div className="mt-[10px] text-[10px] font-semibold">네</div>
          </div>
          <div className="absolute right-[70px] top-5 flex flex-col items-center justify-center">
            <div className="text-[30px]">
              <RiThumbDownLine />
            </div>
            <div className="mt-[10px] text-[10px] font-semibold">아니오</div>
          </div>
        </div>
      </div>
      <button>
        <div>
          <HiLink />
        </div>
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
  );
}

export default NewsDetail;
