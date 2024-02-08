'use client';

import { setupMSWClient } from '@/util/msw';
import dayjs from 'dayjs';
import { useLayoutEffect } from 'react';

function SetupClientMSW() {
  useLayoutEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' && typeof window !== 'undefined') {
      console.log(`[${dayjs().format('YYYY-MM-DD HH:mm:sss')}]`);
      setupMSWClient();
    }
  }, []);

  return null;
}

export default SetupClientMSW;
