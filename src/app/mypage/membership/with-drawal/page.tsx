import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { HttpStatusCode } from 'axios';
import StepForm from '@/components/Form/StepForm';
import { CheckWillProcess, WithDrawalForm } from '@/components/Form/MembershipWithDrawalForm';
import { getProfile } from '@/service/user';
import Redirect from './_components/Redirect';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 회원 탈퇴',
  description: '회원 탈퇴',
};

async function MembershipPage() {
  const { data: profilePayload } = await getProfile().catch(() => redirect('/login'));

  if (profilePayload.status !== HttpStatusCode.Ok || !profilePayload?.data) redirect('/login');

  return (
    <StepForm
      headerType="NoBarArrow"
      headerTitle="회원 탈퇴"
      headerClassName="border-b border-b-[#E5E7EC]"
      renderStepProgressBar={false}
    >
      <CheckWillProcess />
      <WithDrawalForm user={profilePayload.data} />
      <Redirect />
    </StepForm>
  );
}

export default MembershipPage;
