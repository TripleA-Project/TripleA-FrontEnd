import { Metadata } from 'next';
import Membership from '@/components/Membership';
import MembershipHeader from '@/components/Layout/Header/MembershipHeader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 멤버십 정보',
  description: 'Triple A 멤버십 정보',
};

function MembershipPage() {
  return (
    <>
      <MembershipHeader />
      <Membership />
    </>
  );
}

export default MembershipPage;
