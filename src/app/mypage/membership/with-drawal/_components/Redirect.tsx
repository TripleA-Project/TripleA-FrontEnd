'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

function Redirect() {
  useEffect(() => {
    redirect('/');
  }, []);

  return <div>홈으로 이동 중...</div>;
}

export default Redirect;
