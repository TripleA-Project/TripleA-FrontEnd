'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BiBookmark, BiUpload, BiBot, BiSmile } from 'react-icons/bi';
import { HiLink } from 'react-icons/hi';
import { RiThumbDownLine, RiThumbUpLine } from 'react-icons/ri';
import { BiBarChartSquare } from 'react-icons/bi';
import { BsPiggyBank } from 'react-icons/bs';
import { MdLink } from 'react-icons/md';
import Switch from 'react-switch';
import { Categories } from '../Categories';
import { IoIosArrowUp } from 'react-icons/io';
import { ImSad } from 'react-icons/im';

export function NewsDetail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState(true);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };

  const handleRenderSwitchIcon = () => null;

  const handleRenderHandle = () => (
    <div className={`react-switch-handle ${checked ? 'on' : 'off'}`}>{checked ? 'On' : 'Off'}</div>
  );

  const categories = [
    {
      icon: <BiBarChartSquare className="text-[15px]" />,
      label: '금융',
      percentage: null,
      color: null,
    },
    {
      icon: <BsPiggyBank className="mr-[5px] text-[15px]" />,
      label: 'AAPL',
      percentage: '+0.5%',
      color: '#E70000',
    },

    {
      icon: <BsPiggyBank className="mr-[5px] text-[15px]" />,
      label: 'TELA',
      percentage: '-0.2%',
      color: '#2E49D7',
    },
    {
      icon: <BiSmile className="mr-[5px] text-[15px]" />,
      label: '감성분석 지수 : 5',
      percentage: null,
      color: '#000000',
    },
  ];

  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="p-4 text-xl font-semibold">
        Bank of America Securities는 Coupan에 대해 중립을 유지하고 목표가를 $19로 높입니다.{' '}
      </div>
      <div className="h-[40px]">
        <div className="absolute left-5 text-[13px] font-bold text-[#777777]">
          Tech Spark
          <span className="ml-[8px] font-semibold">2023.11.11 11:33</span>
        </div>
        <button className="absolute right-12 text-[20px] font-semibold text-[#4e525d]">
          <BiUpload />
        </button>
        <button className="absolute right-5 text-[20px] font-semibold text-[#4e525d]">
          <BiBookmark />
        </button>
      </div>

      <div className={`gradient`}>
        <style jsx>{`
          .gradient {
            position: relative;
          }
          .gradient::before {
            content: '';
            position: absolute;
            left: 0;
            width: 16px;
            height: 36px;
            background: linear-gradient(to left, rgba(255, 255, 255, 0.001), white);
          }
          .gradient::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 20px;
            height: 36px;
            background: linear-gradient(to right, rgba(255, 255, 255, 0.001), white);
          }
          .container::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className={`container flex overflow-x-auto pl-[16px]`} ref={containerRef}>
          {categories.map((category, index) => (
            <Categories
              icon={category.icon}
              label={category.label}
              percentage={category.percentage}
              color={category.color}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className="relative h-[40px] pt-[16px]">
        <div className="absolute right-5 flex items-center justify-center text-[#4e525d]">
          <BiBot className="text-[20px]" />
          <span className="ml-[5px] text-[12px] font-semibold">한글 번역</span>
          <Switch
            onChange={handleChange}
            checked={checked}
            uncheckedIcon={
              <div className="align-center ml-[3px] mt-[3px] justify-center text-[10px] text-[#ffffff]">OFF</div>
            }
            checkedIcon={
              <div className="align-center ml-[5px] justify-center pt-[3px] text-[10px] text-[#ffffff]">ON</div>
            }
            handleDiameter={17}
            onHandleColor="#ffffff"
            offHandleColor="#ffffff"
            onColor="#fd954a"
            offColor="#ececec"
            height={21}
            width={43}
            boxShadow="0 0 2px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0 0 2px rgba(0, 0, 0, 0.6)"
            className="ml-2"
          />
        </div>
      </div>
      <div className="p-[16px]">
        <div className="flex h-[239px] w-[358px] flex-col items-center justify-center rounded-[8px]">
          <ImSad className="mb-[20px] text-[30px]" />
          <span className="text-[20px] font-semibold">요약문이 제공되지 않는</span>
          <span className="text-[20px] font-semibold">기사입니다.</span>
        </div>
      </div>
      <div className="p-[16px] text-[15px] font-medium leading-[23px]">
        카카오 뷰는 이용자가 직접 관심 있는 콘텐츠를 발행하고 다른 사람이 발행한 보드를 구독할 수 있어요. 초기에는 쉬운
        콘텐츠 발행과 우수한 접근성, 그리고 뉴스레터와 같은 콘텐츠 구독모델이 인기를 끌면서 많은 기대를 받았습니다.
        <br />
        <br />
        하지만 이내 광고 수익만을 노리는 사람들이 퀄리티가 낮고 자극적인 제목의 낚시성 콘텐츠를 발행하다 보니 점차
        이용자들이 외면하기 시작했어요. 결국 2년을 못 채우고 새로운 서비스로 교체될 예정이죠.
      </div>
      <div className="ml-[16px] text-[15px] font-medium text-[#fd954a]">#키워드 #키워드 #키워드</div>
      <div className="align-center mt-[20px] flex justify-center border-b-8 border-solid border-b-[#F5F7F9]">
        <button className="align-center mb-[20px] flex h-[54px] w-[358px] items-center justify-center rounded-lg bg-[#FD954A] text-[16px] font-bold text-[#ffffff]">
          <MdLink className="mr-[10px] text-[22px]" />
          <span>기사 원문 보러가기</span>
        </button>
      </div>

      {/* <div className="mt-[10px] flex h-[150px] w-[280px] flex-col self-center rounded-[10px] bg-[#d9d9d9]">
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
      </div> */}

      <div className="border-b-8 border-solid border-b-[#F5F7F9] py-[20px] pl-[16px] text-[20px] font-semibold">
        <span>다른 기사 더보기</span>
      </div>

      <div className="border-b-8 border-solid border-b-[#F5F7F9] py-[20px] pl-[16px] text-[20px] font-semibold">
        관심 카테고리에 추가하기
      </div>

      <div className="py-[20px] pl-[16px] text-[20px] font-semibold">관심 종목에 추가하기</div>
      <div className="align-center flex items-center justify-center">
        <button className="border-solidborder-[#d9d9d9] mb-[20px] flex h-[54px] w-[358px] items-center justify-center rounded-lg border text-[16px] font-bold">
          <IoIosArrowUp />
          <span className="ml-[10px] text-[16px] font-bold">맨 위로</span>
        </button>
      </div>

      <div className="h-[50px]"></div>
    </div>
  );
}

export default NewsDetail;
