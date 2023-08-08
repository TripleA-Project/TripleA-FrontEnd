'use client';

import { useState } from 'react';
import StepForm from '../Form/StepForm';
import { CompleteEditProfiles, EditProfilesForm, ValidatePasswordForm } from '../Form/EditProfileForm';
import Avatar from '../Avatar';
import EditProfileMenu from './EditProfileMenu';
import { AppIcons } from '../Icons';
import { MEMBERSHIP } from '@/interfaces/User';

interface EditProfilePageProps {
  user: {
    email: string;
    fullName: string;
    memberShip: keyof typeof MEMBERSHIP;
  };
}

function EditProfile({ user }: EditProfilePageProps) {
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  if (mode === 'edit') {
    return (
      <StepForm
        headerType="NoBarArrow"
        headerTitle="프로필 수정"
        renderStepProgressBar={false}
        defaultValues={{
          email: user.email,
          fullName: user.fullName,
        }}
      >
        <ValidatePasswordForm />
        <EditProfilesForm hideHeader />
        <CompleteEditProfiles hideHeader />
      </StepForm>
    );
  }

  return (
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
          <Avatar profileIndex={3} fullName={user.fullName ?? ''} />
          <span className="font-bold">{user.fullName ?? ''}</span>
        </div>
      </div>
      <div className="mb-[61px] mt-[43px] font-bold text-[#5B6267]">{user.email ?? ''}</div>
      <EditProfileMenu />
    </div>
  );
}

export default EditProfile;
