'use client';

import MuiCalendar, { type MuiCalendarProps } from './MuiCalendar';

interface HistoryCalendarProps extends MuiCalendarProps {}

function HistoryCalendar({ onChangeDate, activeRangeSelect = true, disabled = false }: HistoryCalendarProps) {
  return (
    <div className="mx-auto w-max rounded-[4px] bg-white px-3 pb-0 pt-3 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
      <MuiCalendar
        disabled={disabled}
        activeRangeSelect={activeRangeSelect}
        onChangeDate={({ selectedDate, startDate, endDate, isRangeSelected }) => {
          onChangeDate && onChangeDate({ selectedDate, startDate, endDate, isRangeSelected });
        }}
      />
    </div>
  );
}

export default HistoryCalendar;
