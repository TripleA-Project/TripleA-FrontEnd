import dayjs from 'dayjs';

const MilliSecond = {
  Second: 1000,
  Minute: 1000 * 60,
  Hour: 1000 * 60 * 60,
  Day: 1000 * 60 * 60 * 24,
  Month: 1000 * 60 * 60 * 24 * 30,
  Year: 1000 * 60 * 60 * 24 * 30 * 12,
} as const;

export const getRelativeTime = ({ targetDate, pivotDate }: { targetDate: string; pivotDate: string }) => {
  const IntlFormatter = new Intl.RelativeTimeFormat('ko');

  const pivotTime = dayjs(pivotDate);
  const targetTime = dayjs(targetDate);

  const diff = targetTime.diff(pivotTime);

  const seconds = parseInt((diff / MilliSecond.Second).toFixed(2), 10);
  if (Math.abs(seconds) < 1) return '방금 전';
  if (Math.abs(seconds) < 60) return IntlFormatter.format(seconds, 'second');

  const minute = parseInt((diff / MilliSecond.Minute).toFixed(2), 10);
  if (Math.abs(minute) < 60) return IntlFormatter.format(minute, 'minute');

  const hour = parseInt((diff / MilliSecond.Hour).toFixed(2), 10);
  if (Math.abs(hour) < 24) return IntlFormatter.format(hour, 'hour');

  const day = parseInt((diff / MilliSecond.Day).toFixed(2), 10);
  if (Math.abs(day) < 30) return IntlFormatter.format(day, 'day');

  const month = parseInt((diff / MilliSecond.Month).toFixed(2), 10);
  if (Math.abs(month) < 12) return IntlFormatter.format(month, 'month');

  return IntlFormatter.format(parseInt((diff / MilliSecond.Year).toFixed(2), 10), 'year');
};
