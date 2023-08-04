'use client';

import React from 'react';
import Link from 'next/link';
import Avatar from '../Avatar';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { type ProfilePayload } from '@/interfaces/Dto/User';

interface ProfileProps {
  userProfile?: ProfilePayload;
}

function Profile({ userProfile }: ProfileProps) {
  const user = {
    email: userProfile?.email ?? '',
    fullName: userProfile?.fullName ?? '',
    membership: userProfile?.membership,
  };

  return (
    <div className={`relative box-border flex justify-between pl-5 pr-[18.68px]`}>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[21px]">
            <Avatar profileIndex={3} fullName={user.fullName ?? ''} />
            <div className="">
              <p className="font-bold">{user.fullName ?? ' '}</p>
              <Link href="/mypage/edit/profile" className="text-sm font-bold text-[#666C77]">
                기본 정보 보기
              </Link>
            </div>
          </div>
          <Link href="/mypage/edit/profile">
            <HiOutlineChevronRight className="shrink-0 text-2xl text-[#FD954A]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
