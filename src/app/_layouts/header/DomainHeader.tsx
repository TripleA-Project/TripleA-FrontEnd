'use client';

import { usePathname } from 'next/navigation';
import NoticeDomainHeader from './NoticeDomainHeader';
import AdminDomainHeader from './AdminDomainHeader';

function DomainHeader() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return <AdminDomainHeader />;
  }

  if (pathname.startsWith('/notice')) {
    return <NoticeDomainHeader />;
  }

  return null;
}

export default DomainHeader;
