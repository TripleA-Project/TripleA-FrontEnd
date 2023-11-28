'use client';

import { Suspense, useEffect, useState } from 'react';
import { CalenderDate } from '../Calendar/MuiCalendar';
import { ToastContainer } from 'react-toastify';
import HistoryNewsListFetcher from './HistoryNewsListFetcher';
import { ProfilePayload } from '@/interfaces/Dto/User';
import { HistoryPayload } from '@/interfaces/Dto/History';
import { IoMdCheckmark } from 'react-icons/io';
import HistoryCalendar from '../Calendar/HistoryCalendar';
import HistoryNotification from './Notification/HistoryNotification';
import HistoryNewsListLoading from './Loading/HistoryNewsListLoading';
import SelectedDateText from './SelectedDateText';
import HistoryNewsList, { type HistoryNewsFilter } from '../News/HistoryNews/HistoryNewsList';
import { syncCookie } from '@/util/cookies';
import { getInitialDate } from './helper/calendar';

interface HistoryPageProps {
  user?: ProfilePayload;
  history?: HistoryPayload;
  year: number;
  month: number;
}

function HistoryPage({ user, history, year, month }: HistoryPageProps) {
  const initialDate = getInitialDate({ year, month });

  const [date, setDate] = useState<CalenderDate>({
    selectedDate: initialDate,
    startDate: initialDate,
    endDate: null,
  });

  const [filter, setFilter] = useState<HistoryNewsFilter>({ order: 'descending', bookmark: false });

  const disabled = !user || user.membership === 'BASIC';

  useEffect(() => {
    syncCookie(user!.email);
  }, []); /* eslint-disable-line */

  return (
    <>
      <section>
        <section className="my-3 flex items-center justify-end gap-1">
          <div className="relative inline-flex align-top">
            <input
              id="check_bookmark"
              type="checkbox"
              className="peer relative box-border h-[18px] w-[18px] appearance-none rounded-sm border bg-white transition-colors duration-75 checked:border-orange-400 checked:bg-orange-400"
              disabled={disabled}
              defaultChecked={filter.bookmark}
              onChange={() => {
                setFilter((prev) => ({ ...prev, bookmark: !prev.bookmark }));
              }}
            />
            <IoMdCheckmark className="pointer-events-none invisible absolute left-0 top-0 text-lg text-white peer-checked:visible" />
          </div>
          <label htmlFor="check_bookmark" className="text-sm font-semibold text-[#9AA1A9]">
            북마크만 보기
          </label>
        </section>
        <HistoryCalendar
          disabled={disabled}
          onChangeDate={({ selectedDate, startDate, endDate }) => {
            setDate((prev) => ({ ...prev, selectedDate, startDate, endDate }));
          }}
        />
      </section>
      <section className="relative mt-5">
        <HistoryNotification user={user} />
        {/* contentHeader */}
        <div className="mb-4 flex w-full items-center justify-between">
          <SelectedDateText date={date} />
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
        {/* historyNewsList */}
        <div className="min-h-[18.75rem]">
          <Suspense fallback={<HistoryNewsListLoading />}>
            <HistoryNewsListFetcher history={history} targetDate={{ ...date }}>
              <HistoryNewsList filter={filter} />
            </HistoryNewsListFetcher>
          </Suspense>
        </div>
      </section>
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
