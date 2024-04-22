'use client';

import RowHeader from '@/components/Layout/Header/RowHeader';
import GradientBox from '@/components/UI/Gradient/GradientBox';
import BackActionButton from '@/components/Button/BackActionButton';
import { NoticeMenuAction } from '@/components/Menu/Admin/AdminNoticeMenu';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const AdminNoticeMenu = dynamic(() => import('@/components/Menu/Admin/AdminNoticeMenu'), { ssr: false });

function NoticeDomainHeader() {
  const pathname = usePathname();

  const isOpenNoticeMenu = () => {
    if (pathname === '/notice' || pathname === '/admin/notice') {
      return true;
    }

    if (pathname.includes('/notice/post')) return false;

    if (pathname.includes('/notice/')) return true;

    return false;
  };

  const getMenuMeta: () => { action: NoticeMenuAction; id?: number } = () => {
    if (pathname === '/notice' || pathname === '/admin/notice') {
      return {
        action: 'list',
        id: undefined,
      };
    }

    if (pathname.startsWith('/notice/')) {
      return {
        action: 'detail',
        id: Number(pathname.split('/notice/')[1]),
      };
    }

    if (pathname.startsWith('/admin/notice/')) {
      return {
        action: 'detail',
        id: Number(pathname.split('/admin/notice/')[1]),
      };
    }

    return {
      action: 'list',
      id: undefined,
    };
  };

  const noticeMenuMeta = getMenuMeta();

  return (
    <RowHeader
      className="border-b"
      leftSection={<BackActionButton />}
      titleSection={<h2 className="font-bold">공지사항</h2>}
      rightSection={
        isOpenNoticeMenu() ? (
          <Suspense fallback={<></>}>
            <AdminNoticeMenu action={noticeMenuMeta.action} id={noticeMenuMeta.id} />
          </Suspense>
        ) : undefined
      }
      gradientBottom={<GradientBox positionBottom={-1} boxHeight={24} />}
    />
  );
}

export default NoticeDomainHeader;
