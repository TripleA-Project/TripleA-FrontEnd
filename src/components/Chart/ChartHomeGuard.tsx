import React, { cloneElement } from 'react';
import { getProfile } from '@/service/user';
import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import ChartUnauthorized from '../ErrorBoundary/ErrorFallback/Chart/Unauthorized';
import type { APIResponse } from '@/interfaces/Dto/Core';
import type { ProfileResponse } from '@/interfaces/Dto/User';
import ChartInternalServerError from '../ErrorBoundary/ErrorFallback/Chart/InternalServerError';

interface ChartHomeGuardProps {
  children: React.ReactElement;
}

async function ChartHomeGuard({ children }: ChartHomeGuardProps) {
  const profileResponse = await getProfile().catch((err) => {
    return err as AxiosError;
  });

  if (profileResponse instanceof AxiosError) {
    const { code, response } = profileResponse as AxiosError<APIResponse>;

    if (response?.data.status === HttpStatusCode.Unauthorized) return <ChartUnauthorized />;

    return <ChartInternalServerError />;
  }

  const profilePayload = (profileResponse as AxiosResponse<ProfileResponse>).data.data;

  const childComponent = cloneElement(children, {
    user: profilePayload,
  });

  return <>{childComponent}</>;
}

export default ChartHomeGuard;
