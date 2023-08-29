import React from 'react';
import { CalenderDate } from '../Calendar/MuiCalendar';

interface SelectedDateTextProps {
  date: CalenderDate;
}

function SelectedDateText({ date }: SelectedDateTextProps) {
  return (
    <p className="text-xl font-semibold">
      {date.startDate && date.endDate
        ? `${date.startDate.format('YYYY.MM.DD')}~${date.endDate.format('DD')}`
        : `${date.selectedDate?.format('YYYY.MM.DD')}`}
    </p>
  );
}

export default SelectedDateText;
