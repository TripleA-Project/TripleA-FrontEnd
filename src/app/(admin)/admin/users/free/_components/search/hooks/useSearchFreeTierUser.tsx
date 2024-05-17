'use client';

import { FreeTrialUser, FreeTrialUsersPayload } from '@/interfaces/Dto/Admin/free-trial/GetFreeTrialUsersDto';
import { useMutation } from '@tanstack/react-query';

interface SearchFreeTierUserRequest {
  freeTierUsers: FreeTrialUsersPayload;
  targetField: Exclude<keyof FreeTrialUser, 'id' | 'freeTier'>;
  keyword: string;
}

interface UseSearchFreeTierUser {
  onSuccess?: (data: FreeTrialUser[], variables: SearchFreeTierUserRequest, context: unknown) => void;
  onError?: (error: Error, variables: SearchFreeTierUserRequest, context: unknown) => void;
}

export function useSearchFreeTierUser({ onSuccess, onError }: UseSearchFreeTierUser = {}) {
  const { mutate, status } = useMutation({
    mutationKey: ['search', 'freeTier'],
    mutationFn: (request: SearchFreeTierUserRequest) => searchFreeTierUser({ ...request }),
    onSuccess,
    onError,
  });

  return {
    searchFreeTierUser: mutate,
    searchFreeTierUserStatus: status,
  };
}

async function searchFreeTierUser({ freeTierUsers, targetField, keyword }: SearchFreeTierUserRequest) {
  return freeTierUsers.filter((freeTierUser) => {
    const target = freeTierUser[targetField];
    if (target === null) return false;

    return target.search(keyword) > -1;
  });
}
