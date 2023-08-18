'use client';

import { throttle } from 'lodash';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

function Footer() {
  const pathName = usePathname();

  const footerRef = useRef<HTMLElement>(null);

  const allowedPathList = ['/', '/mypage'];

  const handleResize = () => {
    const page = document.getElementById('page_wrapper');

    if (page) {
      page.style.minHeight = `calc(100vh - ${footerRef.current?.getBoundingClientRect()?.height ?? 128}px`;
    }
  };

  const resizeThrottle = throttle((e: UIEvent) => {
    handleResize();
  }, 300);

  useEffect(() => {
    if (!allowedPathList.includes(pathName)) return;

    const page = document.getElementById('page_wrapper');

    if (page) {
      page.style.paddingBottom = '0';
      page.style.minHeight = `calc(100vh - ${footerRef.current?.getBoundingClientRect()?.height ?? 128}px`;
    }

    window.addEventListener('resize', resizeThrottle);

    return () => {
      window.removeEventListener('resize', resizeThrottle);

      page?.style.removeProperty('padding-bottom');
      page?.style.removeProperty('min-height');
    };
  }, [pathName]); /* eslint-disable-line */

  return allowedPathList.includes(pathName) ? (
    <footer ref={footerRef} className="inner mb-[63px] !p-0">
      <div className="box-border flex w-full flex-wrap gap-8 bg-gray-200 px-2 footer:flex-col footer:pb-4">
        <div className="box-border w-[65%] py-4 text-xs footer:w-full">
          <h3 className="sr-only">사업자 정보</h3>
          <div className="flex gap-2">
            <p className="w-24 font-bold">사업자 등록번호</p>
            <p className="">711-86-00050</p>
          </div>
          <div className="flex gap-2">
            <p className="w-24 font-bold">통신판매업신고</p>
            <p>제2020-서울영등포-2864호</p>
          </div>
          <div className="flex gap-2">
            <p className="w-24 font-bold">주소</p>
            <address>서울시 영등포구 당산로 41길 11, E동 1202호</address>
          </div>
          <div className="flex gap-2">
            <p className="font-bold">대표자/개인정보관리책임자</p>
            <p>박혜정</p>
          </div>
          <div className="mt-4 text-right">
            <p>Copyright &copy; 2023 시스메틱 All rights reserved</p>
          </div>
        </div>
        <div className="box-border flex flex-1 flex-col text-xs font-bold footer:w-full">
          <h3 className="mt-1 text-lg">고객센터</h3>
          <div className="space-y-1">
            <div className="flex w-max gap-2">
              <p className="w-14">1:1 문의</p>
              <address>
                <a href="mailto:help@moya.ai">help@moya.ai</a>
              </address>
            </div>
            <div className="flex w-max gap-2">
              <p className="w-14">제휴문의</p>
              <address>
                <a href="mailto:ceo@sysmetic.co.kr" className="w-max">
                  ceo@sysmetic.co.kr
                </a>
              </address>
            </div>
            <div className="flex w-max gap-2">
              <p className="w-14">TEL</p>
              <address>
                <a href="tel:0263381880">02-6338-1880</a>
              </address>
            </div>
          </div>
        </div>
      </div>
    </footer>
  ) : null;
}

export default Footer;
