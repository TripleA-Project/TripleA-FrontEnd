import dayjs from 'dayjs';

export const getInitialDate = ({ year, month }: { year: string | number | null; month: string | number | null }) => {
  const today = dayjs();

  const initialDates = {
    year: Number(year) || today.get('years'),
    month: Number(month) || today.get('month') + 1,
    day: Number(month) && Number(month) === today.get('month') + 1 ? today.get('dates') : 1,
  };

  return dayjs(`${initialDates.year}-${initialDates.month}-${initialDates.day}`);
};
