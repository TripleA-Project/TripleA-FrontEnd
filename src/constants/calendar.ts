import dayjs from 'dayjs';

export const Days = Array.from({ length: 7 }).map((_, idx) => {
  const current = dayjs().clone();

  return current.set('day', idx).format('dd');
});

export const Kor_Days = ['일', '월', '화', '수', '목', '금', '토'];
