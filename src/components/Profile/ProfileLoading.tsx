import React from 'react';
import AvatarLoading from '../Avatar/AvatarLoading';
import { HiOutlineChevronRight } from 'react-icons/hi';

function ProfileLoading() {
  return (
    <div className={`relative box-border flex justify-between pl-5 pr-[18.68px]`}>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[21px]">
            <AvatarLoading />
            <div className="skeleton_loading flex shrink-0 flex-col gap-1">
              <p className="h-6 w-16 rounded-2xl" />
              <p className="h-5 w-24 rounded-2xl" />
            </div>
          </div>
          <HiOutlineChevronRight className="shrink-0 text-2xl text-[#FD954A]" />
        </div>
      </div>
    </div>
  );
}

export default ProfileLoading;
