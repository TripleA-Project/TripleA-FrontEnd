'use client';

import { AdminUserTypeKey } from '@/redux/slice/adminUserListSlice';
import { AdminUserSearch, useAdminUserSearch } from '@/redux/slice/adminUserSearchSlice';
import { twMerge } from 'tailwind-merge';
import ResetFreeTierUserSearch from './search/ResetFreeTierUserSearch';

function AdminFreeTrialTitle() {
  const { search } = useAdminUserSearch<AdminUserTypeKey.FreeTierUsers>();

  if (search.recent) {
    return (
      <Wrapper>
        <SectionTitle className="flex w-full shrink-0 gap-1">
          <span className="max-w-full overflow-hidden text-ellipsis rounded-lg bg-gray-100 px-1">
            {getTitle(search)}
          </span>
          <span className="shrink-0">검색 결과</span>
        </SectionTitle>
        <div className="mt-1">
          <ResetFreeTierUserSearch />
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <SectionTitle>무료체험 관리</SectionTitle>
    </Wrapper>
  );
}

export default AdminFreeTrialTitle;

const SectionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const classNames = twMerge(['text-xl font-bold', className]);

  return <h2 className={classNames}>{children}</h2>;
};

const Wrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const classNames = twMerge(['h-[64px]', className]);

  return <section className={classNames}>{children}</section>;
};

function getTitle(searchState: AdminUserSearch<AdminUserTypeKey.FreeTierUsers>) {
  if (searchState.recent) {
    switch (searchState.recent.type) {
      case 'email':
      case 'fullName':
      case 'memo':
        return searchState.recent.value;
      case 'freeTierStartDate':
        return `무료체험을 ${searchState.recent.value} 부터 시작`;
      case 'freeTierEndDate':
        return `무료체험이 ${searchState.recent.value} 에 종료`;
    }
  }

  return '';
}
