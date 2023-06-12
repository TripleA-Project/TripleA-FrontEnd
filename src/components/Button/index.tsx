'use client';

import React from 'react';
import {
  AiOutlineSearch,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineArrowLeft,
  AiOutlineLeft,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineRight,
} from 'react-icons/ai';
import { FiSearch, FiX } from 'react-icons/fi';
import { BsBookmark, BsBookmarkFill, BsFillShareFill } from 'react-icons/bs';
import { css } from '@emotion/react';
import { MdCancel } from 'react-icons/md';
import { TfiExport } from 'react-icons/tfi';
import { RiPencilFill } from 'react-icons/ri';

type Props = {
  title?: string;
};

export function BlueMediumButton({ title }: Props) {
  return (
    <div>
      <button className="font-Medium m-3 mx-auto flex h-10 w-72 items-center justify-center rounded-xl bg-[#5645F6] text-base text-white">
        {title}
      </button>
    </div>
  );
}
export function GrayMidiumButton({ title }: Props) {
  return (
    <div>
      <button className="m-3 mx-auto flex h-10 w-72 items-center justify-center rounded-xl bg-gray-600 text-base font-semibold text-white">
        {title}
      </button>
    </div>
  );
}
export function GrayMidiumRoundedButton({ title }: Props) {
  return (
    <div>
      <button className="m-3 mx-auto flex h-10 w-72 items-center justify-center rounded-2xl bg-gray-600 text-base font-semibold text-white">
        {title}
      </button>
    </div>
  );
}
export function BlueLongButton({ title }: Props) {
  return (
    <div>
      <button className="text-sx m-3 mx-auto flex h-10 w-full items-center justify-center bg-[#5645F6] text-white">
        {title}
      </button>
    </div>
  );
}
export function BlueSemiLargeButton({ title }: Props) {
  return (
    <div>
      <button className="m-3 mx-auto flex h-14 w-56 items-center justify-center rounded-xl bg-blue-500 text-center text-base font-semibold text-white">
        {title}
      </button>
    </div>
  );
}
export function BlueLargeButton({ title }: Props) {
  return (
    <div>
      <button className="text-sx m-3 mx-auto flex h-14 w-40 items-center justify-center rounded-xl bg-blue-500 text-center font-semibold text-white">
        {title}
      </button>
    </div>
  );
}
export function BlackMediumButton({ title }: Props) {
  return (
    <button className="font-Medium m-3 mx-auto flex h-10 w-72 items-center justify-center rounded-2xl bg-black text-base text-white">
      {title}
    </button>
  );
}
export function BlueSmallButton({ title }: Props) {
  return (
    <button className="m-3 mx-auto flex h-12 w-28 items-center justify-center rounded-xl bg-blue-500 text-base font-semibold text-white">
      {title}
    </button>
  );
}
export function BlueBorderButton({ title }: Props) {
  return (
    <button className="m-3 mx-auto flex h-12 w-28 items-center justify-center rounded-xl border-2 border-solid border-blue-500 text-base font-semibold text-black">
      {title}
    </button>
  );
}
export function GrayTextButton({ title }: Props) {
  return (
    <button className="mx-auto flex h-auto w-auto items-center justify-center border-b-2 border-solid border-gray-500 text-gray-500">
      {title}
    </button>
  );
}
export function TextButton({ title }: Props) {
  return <button className="mx-auto flex items-center justify-center">{title}</button>;
}
export function SearchButton() {
  return (
    <button>
      <AiOutlineSearch className=" h-10 w-10 object-cover" />
    </button>
  );
}
export function SearchShortButton() {
  return (
    <button>
      <FiSearch className=" h-7 w-7 object-cover" />
    </button>
  );
}
export function BookMarkButton() {
  return (
    <button>
      <BsBookmark className=" h-6 w-6 object-cover" />
    </button>
  );
}
export function BookMarkOnButton() {
  return (
    <button>
      <BsBookmarkFill className=" h-6 w-6 object-cover" />
    </button>
  );
}
// export function BookMarkNumberButton() {
//   return (
//     <button>
//       <div className="flex-coulmn items-center justify-center">
//         <div className="mr-2">
//           <BsBookmark className=" h-6 w-6 object-cover" />
//         </div>
//         <span className="mx-auto flex items-center justify-center px-2 py-1 text-xs">10</span>
//       </div>
//     </button>
//   );
// }

export function BookMarkNumberButton() {
  const containerStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  // const iconStyles = css`
  //   margin-right: 0.5rem;
  //   height: 1.5rem;
  //   width: 1.5rem;
  //   object-fit: cover;
  // `;

  const numberStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  `;

  return (
    <button>
      <div css={containerStyles}>
        <div>
          <BsBookmark style={{ height: '1.5rem', width: '1.5rem', objectFit: 'cover' }} />
        </div>
        <span css={numberStyles}>15</span>
      </div>
    </button>
  );
}
export function HeartOnButton() {
  return (
    <button>
      <AiFillHeart className=" h-6 w-6 object-cover" />
    </button>
  );
}
export function HeartButton() {
  return (
    <button>
      <AiOutlineHeart className=" h-6 w-6 object-cover" />
    </button>
  );
}
export function LeftButton() {
  return (
    <button>
      <AiOutlineArrowLeft className="color:gray h-6 w-6 object-cover" />
    </button>
  );
}
export function BackButton() {
  return (
    <button>
      <AiOutlineLeft className=" h-6 w-6 object-cover" />
    </button>
  );
}
export function BottomButton() {
  return (
    <button>
      <AiOutlineDown className=" h-6 w-6 object-cover" />
    </button>
  );
}
export function CancelButton() {
  return (
    <button>
      <MdCancel className=" h-6 w-6 object-cover" />
    </button>
  );
}
export function UpButton() {
  return (
    <button>
      <AiOutlineUp className=" h-6 w-6 object-cover" />
    </button>
  );
}
export function ExportButton() {
  return (
    <button>
      <TfiExport className=" h-6 w-6 object-cover" />
    </button>
  );
}

export function ChecktButton() {
  return (
    <button>
      <AiOutlineCheckCircle className=" h-6 w-6 object-cover" />
    </button>
  );
}

export function CheckOntButton() {
  return (
    <button>
      <AiFillCheckCircle className=" h-6 w-6 object-cover" />
    </button>
  );
}
export function PenButton() {
  return (
    <button>
      <RiPencilFill className=" h-6 w-6 object-cover text-gray-500" />
    </button>
  );
}
export function ShareButton() {
  return (
    <button>
      <BsFillShareFill className=" h-6 w-6 object-cover text-gray-500" />
    </button>
  );
}
export function BookMarkGrayButton() {
  return (
    <button>
      <BsBookmark className=" h-6 w-6 object-cover text-gray-500" />
    </button>
  );
}
export function CancelGrayButton() {
  return (
    <button>
      <MdCancel className=" h-6 w-6 object-cover text-gray-500" />
    </button>
  );
}
export function XButton() {
  return (
    <button>
      <FiX className=" h-6 w-6 object-cover" />
    </button>
  );
}
export function RightButton() {
  return (
    <button>
      <AiOutlineRight className=" h-6 w-6 object-cover" />
    </button>
  );
}
