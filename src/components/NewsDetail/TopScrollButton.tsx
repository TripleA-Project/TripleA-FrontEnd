'use client';

import { MdOutlineArrowBackIosNew } from 'react-icons/md';

function TopScrollButton() {
  return (
    <button
      className="mb-1 box-border flex w-full items-center justify-center rounded-lg border border-[#D9D9D9] bg-white px-4 py-[15px]"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <div className="flex w-max items-center gap-2">
        <MdOutlineArrowBackIosNew className="rotate-90 text-lg text-black" />
        <span className="font-bold">맨 위로</span>
      </div>
    </button>
  );
}

export default TopScrollButton;
