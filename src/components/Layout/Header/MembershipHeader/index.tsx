'use client';

import Header from '..';
import { useRouter } from 'next/navigation';
import { BackArrowButton } from '../BackButtonHeader/BackButton';

function MembershipHeader() {
  const { back } = useRouter();

  return (
    <Header fixed headerClassName="border-b-[#E5E7EC] border-b-2">
      <BackArrowButton onClick={() => back()} />
      <h2 className="font-semibold text-black">멤버십 정보</h2>
      <div> </div>
    </Header>
  );
}

export default MembershipHeader;
