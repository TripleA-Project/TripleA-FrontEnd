'use client';

import React, { useEffect } from 'react';
import Profile from '../Profile';
import MembershipInfo from '../Membership/MembershipInfo';
import MyPageMenu from './MyPageMenu';
import { syncCookie } from '@/util/cookies';
import type { ProfilePayload } from '@/interfaces/Dto/User';

interface MypageHomeProps {
  user?: ProfilePayload;
}

function MypageHome({ user }: MypageHomeProps) {
  useEffect(() => {
    syncCookie(user!.email);
  }, []); /* eslint-disable-line */

  return (
    <div className={`mt-[73px] box-border px-4`}>
      <Profile
        userProfile={{
          email: user!.email,
          fullName: user!.fullName,
          membership: user!.membership,
        }}
      />
      <MembershipInfo />
      <MyPageMenu />
    </div>
  );
}

export default MypageHome;
