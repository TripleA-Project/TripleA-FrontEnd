'use client';

import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
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
          memberRole: user!.memberRole,
          freeTrial: user!.freeTrial,
        }}
      />
      <MembershipInfo user={user} />
      <MyPageMenu />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  );
}

export default MypageHome;
