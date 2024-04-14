'use client';

import { useAdminUserSearch } from '@/redux/slice/adminUserSearchSlice';
import ResetSearch from './ResetSearch';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { MEMBERSHIP } from '@/interfaces/User';

const membershipLabel = {
  BASIC: '일반 회원',
  PREMIUM: '구독 회원',
} as const;

function AdminUsersTitle() {
  const { search } = useAdminUserSearch();

  if (search.recent) {
    return (
      <Wrapper>
        <SectionTitle className="flex w-full shrink-0 gap-1">
          <span className="max-w-full overflow-hidden text-ellipsis rounded-lg bg-gray-100 px-1">
            {search.type === 'membership' ? membershipLabel[search.recent as keyof typeof MEMBERSHIP] : search.recent}
          </span>
          <span className="shrink-0">검색 결과</span>
        </SectionTitle>
        <div className="mt-1">
          <ResetSearch />
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <SectionTitle>유저 관리</SectionTitle>
    </Wrapper>
  );
}

export default AdminUsersTitle;

const SectionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const classNames = twMerge(['text-xl font-bold', className]);

  return <h2 className={classNames}>{children}</h2>;
};

const Wrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const classNames = twMerge(['h-[64px]', className]);

  return <section className={classNames}>{children}</section>;
};
