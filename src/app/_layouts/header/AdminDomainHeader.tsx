'use client';

import RowHeader from '@/components/Layout/Header/RowHeader';
import { usePathname } from 'next/navigation';
import NoticeDomainHeader from './NoticeDomainHeader';
import AdminUserMenuHeader from './AdminUserMenuHeader';

function AdminDomainHeader() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin/notice')) return <NoticeDomainHeader />;
  if (pathname.startsWith('/admin/users')) return <AdminUserMenuHeader />;
  return <RowHeader className="border-b" titleSection={<AdminTitle />} />;
}

export default AdminDomainHeader;

const AdminTitle = () => {
  const pathname = usePathname();

  if (pathname === '/admin/dashboard') return <h2 className="font-bold">유저 통계</h2>;

  if (pathname === '/admin/users') return <h2 className="font-bold">유저 관리</h2>;

  if (pathname === '/admin/notice') return <h2 className="font-bold">공지사항</h2>;
  if (pathname === '/admin/notice/post') return <h2 className="font-bold">공지사항 작성</h2>;
  if (pathname.startsWith('/admin/notice/post/')) return <h2 className="font-bold">공지사항 수정</h2>;

  return null;
};
