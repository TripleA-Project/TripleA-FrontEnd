'use client';

import { adminTokenVerify } from '@/util/actions/jwt';
import { useCallback, useState } from 'react';

export function useAdminVerify() {
  const [verified, setVerified] = useState(false);

  const adminVerify = useCallback(async () => {
    const result = await adminTokenVerify();

    setVerified(result);
  }, []);

  return {
    verified,
    adminVerify,
  };
}
