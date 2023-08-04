'use client';

import { setView, useNewsListFilter } from '@/redux/slice/newsListFilterSlice';
import { MdApps, MdTableRows } from 'react-icons/md';

export type NewsView = 'box' | 'grid';

function ViewFilter() {
  const { filter, dispatch } = useNewsListFilter();

  const viewHandler = () => {
    const filterView: NewsView = filter.view === 'box' ? 'grid' : 'box';

    dispatch(setView({ view: filterView }));
  };

  return (
    <div className="flex gap-1.5">
      <MdTableRows
        role="button"
        className={`${filter.view === 'box' ? 'text-[#4E525D]' : 'text-[#E5E7EC]'} text-2xl`}
        onClick={viewHandler}
      />
      <MdApps
        role="button"
        className={`${filter.view === 'grid' ? 'text-[#4E525D]' : 'text-[#E5E7EC]'} text-2xl`}
        onClick={viewHandler}
      />
    </div>
  );
}

export default ViewFilter;
