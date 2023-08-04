'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { ToastContainer } from 'react-toastify';
import { IoMdCheckmark } from 'react-icons/io';
import HistoryCalendar from '../Calendar/HistoryCalendar';
import HistoryNewsList, { HistoryNewsFilter } from '../News/HistoryNews/HistoryNewsList';
import { NewsListLoading } from '../News/NewsList';
import HistoryNotification from '../Notification/HistoryNotification';
import useAuth from '@/hooks/useAuth';
import { getNewsHistory } from '@/service/news';
import { HistoryNotificationTemplate } from '@/constants/notification';
import { type NewsHistory } from '@/interfaces/History';
import { type CalenderDate } from '../Calendar/MuiCalendar';

function HistoryPage() {
  const [date, setDate] = useState<CalenderDate>({
    selectedDate: dayjs(),
    startDate: null,
    endDate: null,
  });

  const [historyNotification, setHistoryNotification] = useState<{
    active: boolean;
    dimHeight?: number;
    type: keyof typeof HistoryNotificationTemplate;
  }>({
    active: false,
    type: 'RequiredSubscribe',
  });

  const [isRender, setIsRender] = useState(false);

  const [newsHistory, setNewsHistory] = useState<NewsHistory[]>([]);

  const [filter, setFilter] = useState<HistoryNewsFilter>({ order: 'descending', bookmark: false });

  const { user } = useAuth();

  const {
    data: historyPayload,
    status: historyStatus,
    error: historyError,
  } = useQuery(
    [
      'history',
      date.selectedDate?.format('YYYY-MM-DD'),
      date.startDate?.format('YYYY-MM-DD'),
      date.endDate?.format('YYYY-MM-DD'),
    ],
    () =>
      getNewsHistory({
        year: Number(date.startDate ? date.startDate.format('YYYY') : date.selectedDate!.format('YYYY')),
        month: Number(date.startDate ? date.startDate.format('M') : date.selectedDate!.format('M')),
      }),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (historyStatus === 'loading') return;

    if (historyStatus === 'error' || historyPayload.data.status === HttpStatusCode.Unauthorized) {
      const history = document.getElementById('history');

      if (isAxiosError<typeof historyPayload>(historyError)) {
        const { response } = historyError;

        if (response) {
          if (response.status === HttpStatusCode.Unauthorized) {
            window.scrollTo(0, 0);

            setHistoryNotification((prev) => ({
              ...prev,
              active: true,
              type: 'RequiredSubscribe',
              dimHeight: history ? history.getBoundingClientRect().top + 52 : undefined,
            }));

            setTimeout(() => {
              setIsRender(true);
            }, 200);
          }

          return;
        }
      }

      window.scrollTo(0, 0);

      setHistoryNotification((prev) => ({
        ...prev,
        active: true,
        type: 'RequiredSubscribe',
        dimHeight: history ? history.getBoundingClientRect().top + 62 : undefined,
      }));

      setTimeout(() => {
        setIsRender(true);
      }, 200);

      return;
    }

    if (user && user.membership === 'BASIC') {
      window.scrollTo(0, 0);

      const history = document.getElementById('history');

      setHistoryNotification((prev) => ({
        ...prev,
        active: true,
        type: 'RequiredSubscribe',
        dimHeight: history ? history.getBoundingClientRect().top + 62 : undefined,
      }));

      setTimeout(() => {
        setIsRender(true);

        setNewsHistory(historyPayload.data.status === HttpStatusCode.Ok ? historyPayload.data.data ?? [] : []);
      }, 200);

      return;
    }

    setIsRender(true);

    setNewsHistory(
      historyPayload?.data.data && historyPayload.data.status === HttpStatusCode.Ok ? historyPayload.data.data : [],
    );
  }, [historyPayload, historyStatus, user, date]); /* eslint-disable-line */

  return (
    <>
      <section>
        <section className="my-3 flex items-center justify-end gap-1">
          <div className="relative inline-flex align-top">
            <input
              id="check_bookmark"
              type="checkbox"
              className="peer relative box-border h-[18px] w-[18px] appearance-none rounded-sm border bg-white transition-colors duration-75 checked:border-orange-400 checked:bg-orange-400"
              disabled={
                !!historyError ||
                (historyPayload?.data && historyPayload.data.status !== HttpStatusCode.Ok) ||
                (user && user.membership === 'BASIC')
              }
              defaultChecked={filter.bookmark}
              onChange={() => setFilter((prev) => ({ ...prev, bookmark: !prev.bookmark }))}
            />
            <IoMdCheckmark className="pointer-events-none invisible absolute left-0 top-0 text-lg text-white peer-checked:visible" />
          </div>
          <label htmlFor="check_bookmark" className="text-sm font-semibold text-[#9AA1A9]">
            북마크만 보기
          </label>
        </section>
        <HistoryCalendar
          disabled={
            !!historyError ||
            (historyPayload?.data && historyPayload.data.status !== HttpStatusCode.Ok) ||
            (user && user.membership === 'BASIC')
          }
          onChangeDate={({ selectedDate, startDate, endDate }) => {
            setDate((prev) => ({ ...prev, selectedDate, startDate, endDate }));
          }}
        />
      </section>
      <section id="history" className="mt-5">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-semibold">
            {date.startDate && date.endDate
              ? `${date.startDate.format('YYYY.MM.DD')}~${date.endDate.format('DD')}`
              : `${date.selectedDate?.format('YYYY.MM.DD')}`}
          </p>
          <div className="text-xs text-[#9AA1A9]">
            <button
              onClick={() =>
                setFilter((prev) => ({ ...prev, order: prev.order === 'descending' ? 'ascending' : 'descending' }))
              }
            >
              {filter.order === 'descending' ? '최근 본 날짜 순' : '오래된 날짜 순'}
            </button>
          </div>
        </div>
        <div className="mt-3.5">
          {historyStatus === 'loading' ? <NewsListLoading length={3} /> : null}
          {isRender ? (
            <HistoryNewsList
              historyList={newsHistory}
              targetDate={{ selectedDate: date.selectedDate, startDate: date.startDate, endDate: date.endDate }}
              filter={filter}
            />
          ) : null}
        </div>
      </section>
      <HistoryNotification
        active={historyNotification.active}
        dimHeight={historyNotification.dimHeight}
        bottom={63}
        notificationType={historyNotification.type}
        onClose={() => {
          setHistoryNotification((prev) => ({
            ...prev,
            active: false,
          }));
        }}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default HistoryPage;
