'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SelectContainer from '@/components/Select/SelectContainer';
// import { EditIcon } from '@/components/Icon'
import EditIcon from '../../../public/icons/pencil.svg';
import IconButton from '../Button/IconButton';
import Image from 'next/image';

interface InterestSectionProps {
  title: string;
  arr: object[];
  type: string;
}

export default function InterestSection({ title, arr, type }: InterestSectionProps) {
  const [isOpened, setIsOpened] = useState(true);
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <h2 className="align-center my-[10px] flex gap-1">
        {isOpened ? (
          <IconButton
            className=" text-[28px]"
            icon="right"
            sizeTheme="icon"
            bgColorTheme="none"
            textColorTheme="black"
            onClick={() => {
              setIsOpened(!isOpened);
            }}
          />
        ) : (
          <IconButton
            className=" text-[28px]"
            icon="down"
            sizeTheme="icon"
            bgColorTheme="none"
            textColorTheme="black"
            onClick={() => {
              setIsOpened(!isOpened);
            }}
          />
        )}
        <p className="text-[20px] font-semibold">{title}</p>
        {/* EditIcon */}
        <Image
          src={EditIcon}
          alt="edit icon"
          className=" text-[28px] text-[#ADADAD] hover:cursor-pointer"
          onClick={
            title === '관심 카테고리'
              ? () => router.push('/interested/category')
              : () => router.push('/interested/stock')
          }
        />
      </h2>
      {isOpened && <SelectContainer arr={arr} type={type} />}
    </div>
  );
}
