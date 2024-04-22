'use client';

import { ROUTE_PATH } from '@/constants/routePath';
import { Notice } from '@/interfaces/Notice';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface NoticeListProps {
  noticeList: Notice[];
}

function NoticeList({ noticeList }: NoticeListProps) {
  return (
    <div className="border-b border-l border-r">
      <RowHeader stickyHeader className="top-[76px] h-12 border-b border-t bg-white">
        <NoticeListHeader />
      </RowHeader>
      {!noticeList.length ? (
        <div className="flex h-[320px] w-full items-center justify-center">
          <span className="font-bold">등록된 공지사항이 없습니다.</span>
        </div>
      ) : (
        noticeList.map(({ id, title }, index) => <NoticeRow key={id} index={index} noticeId={id} noticeTitle={title} />)
      )}
    </div>
  );
}

export default NoticeList;

const RowHeader = ({
  stickyHeader = false,
  className,
  children,
}: {
  stickyHeader?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  const classNames = twMerge([stickyHeader && 'sticky top-0', className]);

  return <div className={classNames}>{children}</div>;
};

const Row = ({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}) => {
  const classNames = twMerge([`flex w-full h-full items-center`, className]);

  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  );
};

const Column = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  const classNames = twMerge(['grow-[1] h-full box-border p-2 basis-0 break-all', className]);

  return <div className={classNames}>{children}</div>;
};

const NoticeListHeader = () => {
  return (
    <Row>
      <Column className={`flex grow-[1] items-center justify-center`}>No</Column>
      <Column className={`flex grow-[9] items-center justify-center`}>제목</Column>
    </Row>
  );
};

const NoticeRow = ({ index, noticeId, noticeTitle }: { index: number; noticeId: number; noticeTitle: string }) => {
  const pathname = usePathname();
  const { push } = useRouter();

  const navigateNoticeDetail = (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    const prefix = pathname.startsWith('/admin') ? '/admin' : '';
    push(prefix + ROUTE_PATH.NOTICE.DETAIL(id));
  };

  return (
    <Row
      onClick={navigateNoticeDetail(noticeId)}
      className="cursor-pointer transition-colors duration-200 hover:bg-gray-200"
    >
      <Column className={`flex grow-[1] items-center justify-center`}>{index + 1}</Column>
      <Column className={`flex grow-[9] items-center overflow-hidden`}>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{noticeTitle}</span>
      </Column>
    </Row>
  );
};
