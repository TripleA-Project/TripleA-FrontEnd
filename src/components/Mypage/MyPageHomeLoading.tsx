import React from 'react';
import ProfileLoading from '../Profile/ProfileLoading';
import MembershipInfoLoading from '../Membership/MembershipInfoLoading';
import MyPageMenuLoading from './MyPageMenuLoading';

function MyPageHomeLoading() {
  return (
    <div className={`mt-[73px] box-border px-4`}>
      <ProfileLoading />
      <MembershipInfoLoading />
      <MyPageMenuLoading />
    </div>
  );
}

export default MyPageHomeLoading;
