'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

interface MounthSelectProps {
  disabled?: boolean;
  onYearselect?: (year: number) => void;
}

const MinYear = 2023;

const Years = Array.from({ length: dayjs().get('year') - MinYear + 1 }).map((_, idx) => {
  return MinYear + idx;
});

function YearSelect({ onYearselect, disabled = false }: MounthSelectProps) {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState<number>(dayjs().get('year'));

  useEffect(() => {
    if (!open) return;

    const targetMonthElement = document.querySelector(`button[name="year_select-${year}"]`);

    if (!targetMonthElement) return;

    targetMonthElement.scrollIntoView({ behavior: 'smooth' });
  }, [open]); /* eslint-disable-line */

  return (
    <div className="relative inline-flex w-16 cursor-pointer" onClick={() => !disabled && setOpen((prev) => !prev)}>
      <div className="box-border inline-flex w-full items-center gap-1 p-2">
        <div className="text-xs font-semibold">{year}</div>
        <button
          className={`relative z-[3] origin-center select-none text-xs transition ${
            open ? 'rotate-180 text-[#FD954A]' : '-rotate-360 text-[#9F9F9F]'
          }`}
        >
          ▼
        </button>
      </div>
      {open ? (
        <div className="absolute left-0 top-2 w-full select-none overflow-hidden rounded-[10px]">
          <div className="flex max-h-60 w-full flex-col gap-2 overflow-auto bg-[#F3F3F3] p-2 scrollbar-thin scrollbar-track-[#A7A7A7] scrollbar-thumb-[#FD954A] scrollbar-thumb-rounded-[0]">
            <div className="sticky top-0 -mx-2 -mt-2 box-border flex w-[calc(100%+16px)] -translate-y-2 justify-between bg-[#F3F3F3] pl-2 text-xs font-semibold text-[#FD954A]">
              {year}
            </div>
            {Years.map((year) => {
              return (
                <button
                  name={`year_select-${year}`}
                  key={`year_select-${year}`}
                  className="text-left text-xs font-semibold"
                  onClick={() => {
                    setYear(year);

                    onYearselect && onYearselect(year);

                    console.log({ year });
                  }}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default YearSelect;
