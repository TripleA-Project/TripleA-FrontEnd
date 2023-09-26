'use client';

import { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import EditProfileMenu from './EditProfileMenu';
import { AppIcons } from '../Icons';
import EditMode from './EditMode';
import { syncCookie } from '@/util/cookies';
import type { ProfilePayload } from '@/interfaces/Dto/User';

interface EditProfilePageProps {
  user?: ProfilePayload;
}

function EditProfile({ user }: EditProfilePageProps) {
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  useEffect(() => {
    syncCookie(user!.email);
  }, []); /* eslint-disable-line */

  if (mode === 'edit') {
    return <EditMode user={user} />;
  }

  return (
    <div className="mt-[73px] box-border px-4">
      <div className={`relative box-border pl-5 pr-[18.68px]`}>
        {mode === 'view' ? (
          <div
            className="absolute -top-4 left-[17px] flex w-[66px] -translate-y-full cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              setMode('edit');
            }}
          >
            <AppIcons.Edit className="h-3.5 w-3.5 shrink-0 [&>path]:fill-[#FC954A]" />
            <span className="text-xs font-semibold text-[#FC954A]">편집</span>
          </div>
        ) : null}
        <div className="flex items-center">
          <div className="flex items-center gap-[21px]">
            <Avatar profileIndex={3} fullName={user!.fullName} />
            <span className="font-bold">{user!.fullName}</span>
          </div>
        </div>
        <div className="mb-[61px] mt-[43px] font-bold text-[#5B6267]">{user!.email}</div>
        <EditProfileMenu />
      </div>
    </div>
  );
}

export default EditProfile;
