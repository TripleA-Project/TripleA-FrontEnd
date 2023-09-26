'use client';

import React, { useEffect } from 'react';
import StepForm from '../Form/StepForm';
import { CompleteEditPassword, EditPasswordForm, ValidatePasswordForm } from '../Form/EditProfileForm';
import { syncCookie } from '@/util/cookies';
import type { ProfilePayload } from '@/interfaces/Dto/User';

interface EditPasswordPageProps {
  user?: ProfilePayload;
}

function EditPasswordPage({ user }: EditPasswordPageProps) {
  useEffect(() => {
    syncCookie(user!.email);
  }, []); /* eslint-disable-line */

  return (
    <div className="mt-[73px] box-border px-4">
      <StepForm
        headerType="NoBarArrow"
        headerTitle="비밀번호 변경"
        renderStepProgressBar={false}
        defaultValues={{
          email: user!.email,
          fullName: user!.fullName,
        }}
      >
        <ValidatePasswordForm />
        <EditPasswordForm />
        <CompleteEditPassword hideHeader />
      </StepForm>
    </div>
  );
}

export default EditPasswordPage;
