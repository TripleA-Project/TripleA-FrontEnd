import Image from 'next/image';
import React from 'react';
import Lock from '../../../public/lockIcon.svg';
import Button from '../Button/Button';
import Link from 'next/link';

interface NotifyProps {
  title: string;
  content: string;
  buttonText: string;
  linkTarget: string;
}

function ChartNotify({ title, content, buttonText, linkTarget }: NotifyProps) {
  return (
    <div className="fixed bottom-14 left-0 box-border w-full rounded-tl-2xl rounded-tr-2xl border-transparent bg-white p-4 drop-shadow-[0_-4px_4px_rgba(0,0,0,0.06)]">
      <div className="mx-auto box-border min-w-[390px] overflow-hidden sm:w-full md:max-w-[768px]">
        <h3 className="text-center text-2xl font-bold text-[#FD954A]">{title}</h3>
        <p className="text-center text-[#4E525D]">{content}</p>
        <Image src={Lock} alt="lock icon" className="mx-auto" />
        <Link href={linkTarget}>
          {/* @ts-ignore */}
          <Button className="!w-full" bgColorTheme="orange" textColorTheme="white">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ChartNotify;
