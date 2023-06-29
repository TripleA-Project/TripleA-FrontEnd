'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BiBookmark, BiUpload, BiBot, BiSmile, BiBarChartSquare } from 'react-icons/bi';
// import { BsPiggyBank } from 'react-icons/bs';
import { MdLink } from 'react-icons/md';
import Switch from 'react-switch';
import { Categories } from '../Categories';
import { IoIosArrowUp } from 'react-icons/io';
import { ImSad } from 'react-icons/im';
import { latestNews, getNewsDetail } from '../../service/news';
// import { login } from '../../service/auth';
// import Modal2 from '@/components/Modal';
import NewsCard from '@/components/NewsCard';
import Select2 from '@/components/Select2';
import Image from 'next/image';

export function NewsDetailTest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState(true);
  const [newsDetail, setNewsDetail] = useState<any>({});
  const [cardNews, setCardNews] = useState<any>([]);
  const [selectedArr, setSelectedArr] = useState<any>([]);

  useEffect(() => {
    // Fetch news detail when the component mounts
    const fetchNewsDetail = async () => {
      try {
        const id = 55841332; // Replace 'your-news-id' with the actual news ID
        // const accessToken =
        //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmlwbGUtYSIsImlkIjoyOTcsImV4cCI6MTY4Nzk2MDA1MH0.m-ZjlSHXHOvO50gtq-QBAekZapgt5V_KHW8iPG9llNzHOIFDiomcvKqV7OW5eDOe2LeTiXnzK7m6SAdzsCAONw';
        const response = await getNewsDetail({ id });
        setNewsDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching news detail:', error);
      }
    };

    fetchNewsDetail();
  }, []);

  useEffect(() => {
    // Fetch news detail when the component mounts
    const fetchCardNews = async () => {
      try {
        const response = await latestNews();
        setCardNews(response.data?.data?.news?.slice(0, 3));
        console.log(response.data?.data?.news?.slice(0, 3));
      } catch (error) {
        console.error('Error fetching news detail:', error);
      }
    };

    fetchCardNews();
  }, []);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };

  // const handleRenderSwitchIcon = () => null;

  // const handleRenderHandle = () => (
  //   <div className={`react-switch-handle ${checked ? 'on' : 'off'}`}>{checked ? 'On' : 'Off'}</div>
  // );

  const getPercentage = () => {
    const priceDiff = newsDetail.data?.symbol?.price?.today?.close - newsDetail.data?.symbol?.price?.yesterday?.close;
    const rateChange = (priceDiff / newsDetail.data?.symbol?.price?.yesterday?.close) * 100;
    const roundedRateChange = rateChange.toFixed(1);
    return roundedRateChange;
  };

  const percentageResult = Number(getPercentage());

  const percentageColor = percentageResult > 0 ? '#E70000' : '#2E49D7';

  const fixDate = (publishedDate: any) => {
    const OGdate = publishedDate;
    const dateTime = new Date(OGdate);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const date = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${date} ${hours}:${minutes}`;
  };

  const categories = [
    {
      icon: <BiBarChartSquare className="text-[15px]" />,
      label: newsDetail.data?.category?.category || '',
      percentage: null,
      color: null,
    },
    {
      icon: <Image className="mr-[5px] h-[16px] w-[16px]" src={newsDetail.data?.symbol?.logo || ''} alt="icon" />,
      label: newsDetail.data?.symbol?.companyName || '',
      percentage: getPercentage() + '%',
      color: percentageColor,
    },
    {
      icon: <BiSmile className="mr-[5px] text-[15px]" />,
      label: '감성분석 지수 : ' + (newsDetail.data?.sentiment || 0),
      percentage: null,
      color: '#000000',
    },
  ];

  function upButton() {
    const scrollToTop = () => {
      if (window.scrollY > 0) {
        window.scrollTo(0, window.scrollY - 100);
        requestAnimationFrame(scrollToTop);
      }
    };

    scrollToTop();
  }

  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="p-4 text-xl font-semibold">{newsDetail.data?.kor?.title}</div>
      <div className="h-[40px]">
        <div className="absolute left-5 text-[13px] font-bold text-[#777777]">
          {newsDetail.data?.source}
          <span className="ml-[8px] font-semibold">{fixDate(newsDetail.data?.publishedDate)}</span>
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
          {/* @ts-ignore */}
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
        {newsDetail.data?.kor?.summary === null ? (
          <div className="flex h-[239px] w-[358px] flex-col items-center justify-center rounded-[8px]">
            <ImSad className="mb-[20px] text-[30px]" />
            <span className="text-[20px] font-semibold">요약문이 제공되지 않는</span>
            <span className="text-[20px] font-semibold">기사입니다.</span>{' '}
          </div>
        ) : (
          <Image src={newsDetail.data?.thumbnail} alt="thumbnail" />
        )}
      </div>
      <div className="p-[16px] text-[15px] font-medium leading-[23px]">
        {checked === true ? newsDetail.data?.kor?.summary : newsDetail.data?.eng?.summary}
      </div>
      <div className="ml-[16px] text-[15px] font-medium text-[#fd954a]">
        {newsDetail.data?.keyword?.map((item: string, index: number) => (
          <span key={index} className="mr-[5px]">
            #{item}
          </span>
        ))}
      </div>
      <div className="align-center mt-[20px] flex justify-center border-b-8 border-solid border-b-[#F5F7F9]">
        <button className="align-center mb-[20px] flex h-[54px] w-[358px] items-center justify-center rounded-lg bg-[#FD954A] text-[16px] font-bold text-[#ffffff]">
          <MdLink className="mr-[10px] text-[22px]" />
          <span>기사 원문 보러가기</span>
        </button>
      </div>
      <div className="border-b-8 border-solid border-b-[#F5F7F9] pl-[16px] pt-[20px] text-[20px] font-semibold">
        <span>다른 기사 더보기</span>
      </div>
      {cardNews.map((news: any) => (
        <NewsCard key={news} news={news} cardDirection="row" />
      ))}
      <div className="border-b-8 border-solid border-b-[#F5F7F9] pl-[16px] pt-[20px] text-[20px] font-semibold">
        관심 카테고리에 추가하기
      </div>
      <div className="ml-[16px] flex">
        <Select2 selectedArr={selectedArr} setSelectedArr={setSelectedArr}>
          게임
        </Select2>
        <Select2 selectedArr={selectedArr} setSelectedArr={setSelectedArr}>
          음악
        </Select2>
        <Select2 selectedArr={selectedArr} setSelectedArr={setSelectedArr}>
          엔터테이먼트
        </Select2>
        <Select2 selectedArr={selectedArr} setSelectedArr={setSelectedArr}>
          교육테크
        </Select2>
      </div>

      <div className="pl-[16px] pt-[20px] text-[20px] font-semibold">관심 종목에 추가하기</div>
      <div className="ml-[16px] flex">
        <Select2 selectedArr={selectedArr} setSelectedArr={setSelectedArr}>
          게임
        </Select2>
        <Select2 selectedArr={selectedArr} setSelectedArr={setSelectedArr}>
          음악
        </Select2>
        <Select2 selectedArr={selectedArr} setSelectedArr={setSelectedArr}>
          엔터테이먼트
        </Select2>
      </div>
      <div className="align-center flex items-center justify-center py-[20px]">
        <button
          className="border-solidborder-[#d9d9d9] mb-[20px] flex h-[54px] w-[358px] items-center justify-center rounded-lg border text-[16px] font-bold"
          onClick={upButton}
        >
          <IoIosArrowUp />
          <span className="ml-[10px] text-[16px] font-bold">맨 위로</span>
        </button>
      </div>

      <div className="h-[80px]"></div>
    </div>
  );
}

export default NewsDetailTest;
