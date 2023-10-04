'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';

interface Month {
  label: keyof typeof Months;
  month: number;
}

interface MounthSelectProps {
  disabled?: boolean;
  onMonthselect?: ({ label, month }: Month) => void;
}

const Months = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
} as const;

function MonthSelect({ onMonthselect, disabled = false }: MounthSelectProps) {
  const monthQuery = useSearchParams().get('month');

  const getTargetMonthLabel = () => {
    if (!monthQuery) return null;

    const target = Array.from(Object.entries(Months)).find(([key, value]) => value === Number(monthQuery) - 1)![0];

    return target as Month['label'];
  };

  const getRenderLabel = (label: Month['label']) => {
    const monthValue = Months[label];

    return `${label} (${monthValue + 1}월)`;
  };

  const initialMonth: Month = {
    label: getTargetMonthLabel() ?? (dayjs().format('MMMM') as Month['label']),
    month: monthQuery ? Number(monthQuery) : dayjs().get('month'),
  };

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Month>({
    ...initialMonth,
  });

  useEffect(() => {
    if (!open) return;

    const targetMonthElement = document.querySelector(`button[name="${month.label}"]`) as HTMLButtonElement | null;

    if (!targetMonthElement) return;

    const parent = targetMonthElement.parentElement;

    if (!parent) return;

    parent.scroll({ top: targetMonthElement.offsetTop + 32, behavior: 'smooth' });
  }, [open]); /* eslint-disable-line */

  return (
    <div
      className="relative inline-flex w-[130px] cursor-pointer"
      onClick={() => !disabled && setOpen((prev) => !prev)}
    >
      <div className="box-border inline-flex w-full items-center gap-1 p-2">
        <div className="text-xs font-semibold">{getRenderLabel(month.label)}</div>
        <button
          className={`relative z-[3] origin-center select-none text-xs transition ${
            open ? 'rotate-180 text-[#FD954A]' : '-rotate-360 text-[#9F9F9F]'
          }`}
        >
          ▲
        </button>
      </div>
      {open ? (
        <div className="absolute left-0 top-2 w-full select-none overflow-hidden rounded-[10px]">
          <div className="flex max-h-60 w-full flex-col gap-2 overflow-auto bg-[#F3F3F3] p-2 scrollbar-thin scrollbar-track-[#A7A7A7] scrollbar-thumb-[#FD954A] scrollbar-thumb-rounded-[0]">
            <div className="sticky top-0 -mx-2 -mt-2 box-border flex w-[calc(100%+16px)] -translate-y-2 justify-between bg-[#F3F3F3] pl-2 text-xs font-semibold text-[#FD954A]">
              {getRenderLabel(month.label)}
            </div>
            {(Object.keys(Months) as (keyof typeof Months)[]).map((label) => {
              return (
                <button
                  name={label}
                  key={label}
                  className="text-left text-xs font-semibold"
                  onClick={() => {
                    setMonth({ label, month: Months[label] });

                    onMonthselect && onMonthselect({ label, month: Months[label] });
                  }}
                >
                  {getRenderLabel(label)}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MonthSelect;
