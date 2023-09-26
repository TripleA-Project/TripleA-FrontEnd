'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import NewsHomeHeader from '../NewsHomeHeader';
import NewsDetailHeader from '../NewsDetailHeader';

export default function PageHeader() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const RenderingHeader = () => {
    if (pathName === '/') {
      const tab = searchParams?.get('tab');
      const isInterestTab = !!tab && tab === 'interest';

      return <NewsHomeHeader isLikeNewsPage={isInterestTab} />;
    }

    if (pathName?.startsWith('/detail')) {
      return <NewsDetailHeader />;
    }

    return <></>;
  };

  return <RenderingHeader />;
}
