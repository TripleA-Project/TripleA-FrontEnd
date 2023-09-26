'use client';

import React from 'react';
import StepForm from '../Form/StepForm';
import { ProfilePayload } from '@/interfaces/Dto/User';
import { CompleteEditProfiles, EditProfilesForm, ValidatePasswordForm } from '../Form/EditProfileForm';

interface Props {
  user?: ProfilePayload;
}

function EditTest({ user }: Props) {
  return (
    <div className="mt-[73px] box-border px-4">
      <StepForm
        headerType="NoBarArrow"
        headerTitle="프로필 수정"
        renderStepProgressBar={false}
        defaultValues={{
          email: user!.email,
          fullName: user!.fullName,
        }}
      >
        <ValidatePasswordForm />
        <EditProfilesForm />
        <CompleteEditProfiles hideHeader />
      </StepForm>
    </div>
  );
}

export default EditTest;
