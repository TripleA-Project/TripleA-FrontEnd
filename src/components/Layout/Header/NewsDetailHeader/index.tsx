'use client';

import { useRouter } from 'next/navigation';
import Header from '..';
import { NoBarBackArrowButton } from '../BackButtonHeader/BackButton';

function NewsDetailHeader() {
  const { back } = useRouter();

  return (
    <Header fixed headerClassName="border-b border-b-[#E5E7EC]">
      <NoBarBackArrowButton className="cursor-pointer" onClick={() => back()} />
    </Header>
  );
}

export default NewsDetailHeader;
