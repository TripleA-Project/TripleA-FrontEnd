'use client';

import RowHeader from '@/components/Layout/Header/RowHeader';
import GradientBox from '@/components/UI/Gradient/GradientBox';
import BackActionButton from '@/components/Button/BackActionButton';

function NoticeDomainHeader() {
  return (
    <RowHeader
      className="border-b"
      leftSection={<BackActionButton />}
      titleSection={<h2 className="font-bold">공지사항</h2>}
      gradientBottom={<GradientBox positionBottom={-1} boxHeight={24} />}
    />
  );
}

export default NoticeDomainHeader;
