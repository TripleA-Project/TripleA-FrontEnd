'use client';

import { AdminUserSearch, useAdminUserSearch } from '@/redux/slice/adminUserSearchSlice';
import ResetSearch from './ResetSearch';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { MEMBERSHIP, MEMBER_ROLE } from '@/interfaces/User';

const memberRoleLabel = {
  USER: '유저',
  ADMIN: '관리자',
} as const;

const membershipLabel = {
  BASIC: '일반 회원',
  PREMIUM: '구독 회원',
} as const;

function getTitle(searchState: AdminUserSearch) {
  if (searchState.recent) {
    if (searchState.recent.type === 'memberRole') {
      return memberRoleLabel[searchState.recent.value as keyof typeof MEMBER_ROLE];
    }

    if (searchState.recent.type === 'membership') {
      return membershipLabel[searchState.recent.value as keyof typeof MEMBERSHIP];
    }

    return searchState.recent.value;
  }

  return '';
}

function AdminUsersTitle() {
  const { search } = useAdminUserSearch();

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
