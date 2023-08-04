'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import StepForm from '../Form/StepForm';
import { CompleteEditPassword, EditPasswordForm, ValidatePasswordForm } from '../Form/EditProfileForm';
import { getProfile } from '@/service/user';

function EditPasswordPage() {
  const {
    data: profileResponse,
    status: profileStatus,
    error: profileError,
  } = useQuery(['profile'], () => getProfile(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  if (profileStatus === 'loading') return null;

  if (profileStatus === 'error') {
    if (isAxiosError(profileError)) {
      const { response } = profileError;

      if (response?.status === HttpStatusCode.Unauthorized) {
        redirect('/login?continueURL=/mypage/edit/password');
      }
    }

    return null;
  }

  if (profileResponse?.status === HttpStatusCode.Unauthorized) {
    redirect('/login?continueURL=/mypage/edit/password');
  }

  return (
    <StepForm
      defaultValues={{
        email: profileResponse.data?.email ?? '',
        fullName: profileResponse.data?.fullName ?? '',
      }}
    >
      <ValidatePasswordForm hideHeader />
      <EditPasswordForm hideHeader />
      <CompleteEditPassword hideHeader />
    </StepForm>
  );
}

export default EditPasswordPage;
